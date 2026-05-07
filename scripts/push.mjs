#!/usr/bin/env bun
import { $ } from 'bun';

const BLUE = '\x1b[34m';
const GREEN = '\x1b[32m';
const RED = '\x1b[31m';
const RESET = '\x1b[0m';

const gitDir = (await $`git rev-parse --git-dir`.text()).trim();

const checks = await Promise.all([
  $`test -f ${gitDir}/MERGE_HEAD && echo yes || echo no`.text(),
  $`test -d ${gitDir}/rebase-merge && echo yes || echo no`.text(),
  $`test -f ${gitDir}/CHERRY_PICK_HEAD && echo yes || echo no`.text(),
  $`test -f ${gitDir}/REVERT_HEAD && echo yes || echo no`.text(),
]);

const [merge, rebase, cherry, revert] = checks.map(s => s.trim());

if (merge === 'yes') {
  console.error(`${RED}❌ Незавершённый merge. Заверши или отмени его.${RESET}`);
  process.exit(1);
}
if (rebase === 'yes') {
  console.error(`${RED}❌ Незавершённый rebase. Заверши или отмени его.${RESET}`);
  process.exit(1);
}
if (cherry === 'yes') {
  console.error(`${RED}❌ Незавершённый cherry-pick. Заверши или отмени его.${RESET}`);
  process.exit(1);
}
if (revert === 'yes') {
  console.error(`${RED}❌ Незавершённый revert. Заверши или отмени его.${RESET}`);
  process.exit(1);
}

const status = await $`git status --porcelain`.text();
if (!status.trim()) {
  console.log(`${BLUE}ℹ Нет изменений для коммита.${RESET}`);
  process.exit(0);
}

console.log(`${BLUE}Обнаружены изменения:${RESET}\n${status}`);

console.log(`${BLUE}Запускаю opencode...${RESET}`);

const result = await $`opencode run --dangerously-skip-permissions \
  "Посмотри текущие изменения в репозитории, придумай осмысленное описание для коммита, закоммить и запушь изменения в GitHub. Если есть проблема, остановись и напиши об ошибке."`.nothrow();

if (result.exitCode === 0) {
  console.log(`\n${GREEN}✅ Изменения закоммичены и отправлены в GitHub.${RESET}`);
} else {
  console.error(`\n${RED}❌ Ошибка при коммите и пуше.${RESET}`);
  process.exit(1);
}
