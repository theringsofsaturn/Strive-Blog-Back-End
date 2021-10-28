import express from "express"; // We need to import express to use it's functionalities

import uniqid from "uniqid"; // will generate a unique ID for the authors

import createError from "http-errors"; // create http errors
import multer from "multer";

import { validationResult } from "express-validator";
import { authorsValidation } from "./validation.js";

import { pipeline } from "stream";

// Router is a set of endpoints that share something like a prefix. authorsRouter is going to have /authors a a prefix.
//  Here we use Router express functionality to provide Routing to the server
const authorsRouter = express.Router();

authorsRouter.post("/", authorsValidation, async (req, res, next) => {
  try {
    const errorList = validationResult(req);

    if (errorList.isEmpty()) {
      //1. read the the content of authors.json
      const authors = readAuthors();
      //2. read the requests body
      const newAuthor = {
        ...req.body,
        id: uniqid(),
        createdAt: new Date(),
      };
      //3. push new author to the array
      authors.push(newAuthor);
      //4. Rewrite the new array to the json file
      writeAuthors(authors);
      //5. send back the the ID as response
      res.status(201).send({ newAuthor });
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
});


export default authorsRouter