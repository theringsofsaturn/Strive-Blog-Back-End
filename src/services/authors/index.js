import express from "express"; // We need to import express to use it's functionalities

import uniqid from "uniqid"; // will generate a unique ID for the authors

import createError from "http-errors"; // create http errors
import multer from "multer";

import { validationResult } from "express-validator";
import { authorsValidation } from "./validation.js";

import { pipeline } from "stream";

import {
  readAuthors,
  writeAuthors,
  saveAvatarCloudinary,
  getAuthorsReadableStream,
} from "../../lib/fs-tools.js";

// Router is a set of endpoints that share something like a prefix. authorsRouter is going to have /authors a a prefix.
//  Here we use Router express functionality to provide Routing to the server
const authorsRouter = express.Router();

// Create a new author
authorsRouter.post("/", authorsValidation, async (req, res, next) => {
  try {
    const errorList = validationResult(req);

    if (errorList.isEmpty()) {
      //1. read the the content of authors.json
      const authors = await readAuthors();
      //2. read the requests body
      const newAuthor = {
        ...req.body,
        id: uniqid(),
        createdAt: new Date(),
      };
      //3. push new author to the array
      authors.push(newAuthor);
      //4. Rewrite the new array to the json file
      await writeAuthors(authors);
      //5. send back the the ID as response
      res.status(201).send(newAuthor);
    } else {
      next(createError(400, { errorList }));
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
});

// Get all the authors
authorsRouter.get("/", async (req, res, next) => {
  try {
    const errorList = validationResult(req);

    if (errorList.isEmpty) {
      //1. read the the content of authors.json
      const authors = await readAuthors();
      //2. send back the array of authors
      res.status(200).send(authors);
    } else {
      next(createError(400, { errorList }));
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
});

export default authorsRouter;
