import express from "express";
import uniqid from "uniqid";
import createError from "http-errors";
import { validationResult } from "express-validator";
import {
  readBlogPosts,
  writeBlogPosts,
  readAuthors,
  saveCoverCloudinary,
} from "../../../src/lib/fs-tools.js";

import {
  getBlogPostPDFReadableStream,
  generateBlogPostPDFAsync,
} from "../../lib/pdfMakeTools.js";
import { pipeline } from "stream";
import { sendEmail } from "../../lib/emailMakeTools.js";
import { blogPostValidation, blogPostCommentValidation } from "./validation.js";
import multer from "multer";

const blogPostsRouter = express.Router();

// blog post information
blogPostsRouter.get("/", async (req, res, next) => {
  try {
    const blogPosts = await readBlogPosts();
    console.log(blogPosts);

    if (req.query && req.query.title) {
      const filteredBlogPosts = blogPosts.filter((post) =>
        post.title
          .toLocaleLowerCase()
          .includes(req.query.title.toLocaleLowerCase())
      );
      res.send(filteredBlogPosts);
    } else {
      res.send(blogPosts);
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
});
