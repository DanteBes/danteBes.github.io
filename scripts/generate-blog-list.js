import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const blogDir = path.join(__dirname, '../public/blog');
const outputFile = path.join(blogDir, 'blog-list.json');

// Функция для преобразования slug в title
function slugToTitle(slug) {
  const words = slug
    .replace(/\.md$/, '')
    .split('-');
  
  // Капитализируем только первое слово, остальные в нижнем регистре
  return words
    .map((word, index) => 
      index === 0 
        ? word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
        : word.toLowerCase()
    )
    .join(' ');
}

try {
  // Читаем все MD файлы из папки blog
  const files = fs.readdirSync(blogDir);
  const mdFiles = files.filter(file => 
    file.endsWith('.md') && 
    file !== 'blog-list.json' && 
    file.toLowerCase() !== 'readme.md'
  );

  const posts = mdFiles.map(file => {
    const filePath = path.join(blogDir, file);
    const stats = fs.statSync(filePath);
    const slug = file.replace('.md', '');
    const title = slugToTitle(slug);
    
    // Получаем даты создания и редактирования
    const createdAt = stats.birthtime || stats.ctime; // birthtime - дата создания, ctime - fallback
    const updatedAt = stats.mtime; // mtime - дата последнего редактирования
    
    return {
      slug,
      title,
      createdAt: createdAt.toISOString(),
      updatedAt: updatedAt.toISOString()
    };
  }).sort((a, b) => a.title.localeCompare(b.title, 'ru'));

  const blogList = {
    posts
  };

  // Записываем в JSON файл
  fs.writeFileSync(outputFile, JSON.stringify(blogList, null, 2), 'utf-8');
  console.log(`✅ Сгенерирован blog-list.json с ${posts.length} постами:`);
  posts.forEach(post => {
    console.log(`   - ${post.title} (${post.slug})`);
  });
} catch (error) {
  console.error('❌ Ошибка при генерации списка блогов:', error);
  process.exit(1);
}
