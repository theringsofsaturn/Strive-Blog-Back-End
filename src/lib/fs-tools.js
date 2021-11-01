import fs from "fs-extra"; // will enable to read or write the json file at the particular path
import { fileURLToPath } from "url"; // it's core module to convert the current url from import.meta.url to current file path
import { join, dirname } from "path"; // core modules, dirname will localize the directory name, join will join directory with json file name

import { v2 as cloudinary } from "cloudinary"; // cloudinary module
import { CloudinaryStorage } from "multer-storage-cloudinary"; // cloudinary module

//  fs variables
const {
  readJSON,
  writeJSON,
  writeFile,
  readFile,
  remove,
  createReadStream,
  createWriteStream,
} = fs;

// obtaining the path to the authors json file
//1. starting from the current file path
// const currentFilePath = fileURLToPath(import.meta.url);
//2. Next we obtain the path of the directory the current file is in
// const currentDirPath = dirname(currentFilePath);
//3. Next step is to concatenate the directory path with the json file name which is authors.json
//ATTENTION USE THE METHOD JOIN (from path) AND NOT CONCATENATE AS USUAL WITH +, this way will function for every system
// const authorsJSONPath = join(currentDirPath, "authors.json");

const blogPostsJSONPath = join(
  dirname(fileURLToPath(import.meta.url)),
  "../data/blogs.json"
);

export const blogPostsFolderPath = join(
  dirname(fileURLToPath(import.meta.url)),
  "../../public/img/blogs"
);

const authorsJSONPath = join(
  dirname(fileURLToPath(import.meta.url)),
  "../data/authors.json"
);

export const authorsAvatarsFolderPath = join(
  dirname(fileURLToPath(import.meta.url)),
  "../../public/img/authors"
);

// const publicFolderPath = join(process.cwd(), "./public/img/"); //process.cwd() is ROOT

// *************** AUTHORS ****************
export const readAuthors = () => readJSON(authorsJSONPath);
export const writeAuthors = (content) => writeJSON(authorsJSONPath, content);
export const getAuthorsReadableStream = () => createReadStream(authorsJSONPath);

// Avatars

// cloudinary method
export const saveAvatarCloudinary = new CloudinaryStorage({
  cloudinary,
  params: {
    format: "jpg",
    folder: "striveBlog/avatars",
  },
});

// fs-methods

// Save avatar
export const saveAvatar = (fileName, content) =>
  writeFile(join(authorsAvatarsFolderPath, fileName), content); // content is buffer

// Remove avatar
export const removeAvatar = (fileName) =>
  remove(join(authorsAvatarsFolderPath, fileName));

// ************* BLOG POSTS *****************
export const readBlogPosts = () => readJSON(blogPostsJSONPath);
export const writeBlogPosts = () => writeJSON(blogPostsJSONPath); // content is array

// Covers

// cloudinary method
export const saveCoverCloudinary = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "striveBlog/covers",
  },
});

// fs method
export const saveCover = (fileName, content) =>
  writeFile(join(blogsImgFolderPath, fileName), content);
export const removeCover = (fileName) =>
  remove(join(blogsImgFolderPath, fileName));
