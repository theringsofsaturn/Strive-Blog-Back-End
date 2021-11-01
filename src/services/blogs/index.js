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

const blogRouter = express.Router();
