import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const sourceDir = path.join(__dirname, "../blog");
const targetDir = path.join(__dirname, "../public/blog");

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
    process.exit(0);
  }

  // Читаем все файлы из исходной папки
  const files = fs.readdirSync(sourceDir);
  const mdFiles = files.filter(
    (file) => file.endsWith(".md") && file.toLowerCase() !== "readme.md"
  );
  
  // Также копируем изображения и другие медиа-файлы
  const mediaFiles = files.filter(
    (file) =>
      file.endsWith(".png") ||
      file.endsWith(".jpg") ||
      file.endsWith(".jpeg") ||
      file.endsWith(".gif") ||
      file.endsWith(".webp") ||
      file.endsWith(".svg")
  );

  const allFiles = [...mdFiles, ...mediaFiles];

  if (allFiles.length === 0) {
    console.log("📝 В папке blog/ нет файлов для синхронизации");
    process.exit(0);
  }

  let copiedCount = 0;
  let updatedCount = 0;

  // Копируем каждый файл
  allFiles.forEach((file) => {
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

  if (copiedCount > 0 || updatedCount > 0) {
    console.log(
      `✅ Синхронизация завершена: ${copiedCount} скопировано, ${updatedCount} обновлено`
    );
  } else {
    console.log("✅ Все файлы синхронизированы");
  }
} catch (error) {
  console.error("❌ Ошибка при синхронизации файлов блога:", error);
  process.exit(1);
}
