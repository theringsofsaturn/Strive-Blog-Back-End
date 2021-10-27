import fs from "fs-extra";
import { fileURLToPath } from "url";
import { join, dirname } from "path";

const { readJSON, writeJSON, writeFile } = fs;

const blogsJSONPath = join(
  dirname(fileURLToPath(import.meta.url)),
  "../data/blogs.json"
);

const authorsJSONPath = join(
  dirname(fileURLToPath(import.meta.url)),
  "../data/authors.json"
);

const publicFolderPath = join(process.cwd(), "./public/img/"); //process.cwd() is ROOT

export const getBlogs = () => readJSON(blogsJSONPath);
export const writeBlogs = () => writeJSON(blogsJSONPath); // content is array
export const getauthors = () => readJSON(authorsJSONPath);
export const writeauthors = () => writeJSON(authorsJSONPath);

export const savePicture = (fileName, content) =>
  writeFile(join(publicFolderPath, fileName), content); // content is bufferFormat
