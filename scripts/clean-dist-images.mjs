
import { readdir, stat, unlink } from "node:fs/promises";
import path from "node:path";

const distDir = path.resolve("dist");

let removedCount = 0;
let removedBytes = 0;

async function walk(directory) {
  const entries = await readdir(directory, {
    withFileTypes: true,
  });

  for (const entry of entries) {
    const filePath = path.join(directory, entry.name);

    if (entry.isDirectory()) {
      await walk(filePath);
      continue;
    }

    if (
      !entry.isFile() ||
      path.extname(entry.name).toLowerCase() !== ".png"
    ) {
      continue;
    }

    const webpPath =
      filePath.slice(0, -path.extname(filePath).length) +
      ".webp";

    try {
      await stat(webpPath);

      const fileInfo = await stat(filePath);

      await unlink(filePath);

      removedCount++;
      removedBytes += fileInfo.size;

      console.log(
        `已清理：${path.relative(distDir, filePath)}`
      );
    } catch (error) {
      if (error.code !== "ENOENT") {
        throw error;
      }
    }
  }
}

try {
  await stat(distDir);
} catch {
  console.error("找不到 dist 文件夹，请先执行构建。");
  process.exit(1);
}

await walk(distDir);

console.log("--------------------------------");
console.log(`清理 PNG 数量：${removedCount}`);
console.log(
  `减少体积：${(removedBytes / 1024 / 1024).toFixed(2)} MiB`
);
console.log("dist 图片清理完成！");
