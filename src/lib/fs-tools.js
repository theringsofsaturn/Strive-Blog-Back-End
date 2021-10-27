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

export const getBlogs = () => readJSON(blogsJSONPath);
export const writeBlogs = () => writeJSON(blogsJSONPath);
export const getauthors = () => readJSON(authorsJSONPath);
export const writeauthors = () => writeJSON(authorsJSONPath);
