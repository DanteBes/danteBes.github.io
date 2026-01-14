import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const sourceDir = path.join(__dirname, "../blog");
const targetDir = path.join(__dirname, "../public/blog");

// Файлы, которые не нужно удалять из целевой папки
const protectedFiles = ["blog-list.json", "README.md"];

// Проверяет, является ли файл медиа-файлом или markdown
function isSyncableFile(file) {
  const lowerFile = file.toLowerCase();
  if (lowerFile === "readme.md") return false;
  
  return (
    file.endsWith(".md") ||
    file.endsWith(".png") ||
    file.endsWith(".jpg") ||
    file.endsWith(".jpeg") ||
    file.endsWith(".gif") ||
    file.endsWith(".webp") ||
    file.endsWith(".svg")
  );
}

// Создаем целевую папку, если её нет
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

try {
  // Проверяем, существует ли исходная папка
  if (!fs.existsSync(sourceDir)) {
    console.log("📁 Папка blog/ не найдена, создаю...");
    fs.mkdirSync(sourceDir, { recursive: true });
    console.log("✅ Папка blog/ создана. Добавьте туда ваши MD файлы.");
    
    // Если исходной папки нет, удаляем все синхронизируемые файлы из целевой
    if (fs.existsSync(targetDir)) {
      const targetFiles = fs.readdirSync(targetDir);
      let deletedCount = 0;
      
      targetFiles.forEach((file) => {
        if (isSyncableFile(file) && !protectedFiles.includes(file)) {
          const targetPath = path.join(targetDir, file);
          fs.unlinkSync(targetPath);
          deletedCount++;
          console.log(`🗑️  Удален: ${file}`);
        }
      });
      
      if (deletedCount > 0) {
        console.log(`✅ Удалено ${deletedCount} файлов из public/blog/`);
      }
    }
    
    process.exit(0);
  }

  // Читаем все файлы из исходной папки
  const sourceFiles = fs.readdirSync(sourceDir);
  const mdFiles = sourceFiles.filter(
    (file) => file.endsWith(".md") && file.toLowerCase() !== "readme.md"
  );
  
  // Также копируем изображения и другие медиа-файлы
  const mediaFiles = sourceFiles.filter(
    (file) =>
      file.endsWith(".png") ||
      file.endsWith(".jpg") ||
      file.endsWith(".jpeg") ||
      file.endsWith(".gif") ||
      file.endsWith(".webp") ||
      file.endsWith(".svg")
  );

  const sourceSyncableFiles = new Set([...mdFiles, ...mediaFiles]);

  let copiedCount = 0;
  let updatedCount = 0;
  let deletedCount = 0;

  // Копируем и обновляем файлы из исходной папки
  sourceSyncableFiles.forEach((file) => {
    const sourcePath = path.join(sourceDir, file);
    const targetPath = path.join(targetDir, file);

    const sourceStats = fs.statSync(sourcePath);
    const sourceMtime = sourceStats.mtime.getTime();

    // Проверяем, существует ли файл в целевой папке
    if (fs.existsSync(targetPath)) {
      const targetStats = fs.statSync(targetPath);
      const targetMtime = targetStats.mtime.getTime();

      // Копируем только если исходный файл новее
      if (sourceMtime > targetMtime) {
        fs.copyFileSync(sourcePath, targetPath);
        updatedCount++;
        console.log(`🔄 Обновлен: ${file}`);
      }
    } else {
      // Файл не существует, копируем
      fs.copyFileSync(sourcePath, targetPath);
      copiedCount++;
      console.log(`📋 Скопирован: ${file}`);
    }
  });

  // Удаляем файлы из целевой папки, которых нет в исходной
  if (fs.existsSync(targetDir)) {
    const targetFiles = fs.readdirSync(targetDir);
    
    targetFiles.forEach((file) => {
      // Удаляем только синхронизируемые файлы, которых нет в исходной папке
      if (
        isSyncableFile(file) &&
        !protectedFiles.includes(file) &&
        !sourceSyncableFiles.has(file)
      ) {
        const targetPath = path.join(targetDir, file);
        fs.unlinkSync(targetPath);
        deletedCount++;
        console.log(`🗑️  Удален: ${file}`);
      }
    });
  }

  // Выводим итоговую статистику
  const changes = [];
  if (copiedCount > 0) changes.push(`${copiedCount} скопировано`);
  if (updatedCount > 0) changes.push(`${updatedCount} обновлено`);
  if (deletedCount > 0) changes.push(`${deletedCount} удалено`);

  if (changes.length > 0) {
    console.log(`✅ Синхронизация завершена: ${changes.join(", ")}`);
  } else {
    console.log("✅ Все файлы синхронизированы");
  }
} catch (error) {
  console.error("❌ Ошибка при синхронизации файлов блога:", error);
  process.exit(1);
}
