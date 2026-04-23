import path from "path";
import fs from "fs/promises";
import { randomUUID } from "crypto";

const ALLOWED_TYPES = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/avif": "avif",
};
const ALLOWED_FOLDERS = ["hero", "covers", "issues", "team", "topics", "distributors", "misc", "logo"];
const MAX_SIZE_BYTES = 8 * 1024 * 1024; // 8 MB

export async function saveUpload(file: File, subfolder: string): Promise<string> {
  if (!(file.type in ALLOWED_TYPES)) {
    throw new Error("Niedozwolony typ pliku. Akceptowane: JPEG, PNG, WebP, AVIF.");
  }
  if (file.size > MAX_SIZE_BYTES) {
    throw new Error("Plik jest za duży. Maksymalny rozmiar to 8 MB.");
  }

  const safeSubfolder = path.basename(subfolder);
  if (!ALLOWED_FOLDERS.includes(safeSubfolder)) {
    throw new Error("Niedozwolony folder docelowy.");
  }

  const ext = ALLOWED_TYPES[file.type as keyof typeof ALLOWED_TYPES];
  const filename = `${randomUUID()}.${ext}`;
  const uploadDir = path.join(process.cwd(), "public", "uploads", safeSubfolder);
  await fs.mkdir(uploadDir, { recursive: true });
  const filepath = path.join(uploadDir, filename);

  const buffer = Buffer.from(await file.arrayBuffer());
  await fs.writeFile(filepath, buffer);

  return `/uploads/${safeSubfolder}/${filename}`;
}
