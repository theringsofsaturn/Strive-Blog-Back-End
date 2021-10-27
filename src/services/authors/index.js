import express from "express"; // We need to import express to use it's functionalities
import uniqid from "uniqid"; // will generate a unique ID for the authors
import createError from "http-errors";
import multer from "multer";
import { validationResult } from "express-validator";
import { authorsValidation } from "./validation";
import { pipeline } from "stream";
import json2csv from "json2csv";

// Router is a set of endpoints that share something like a prefix. authorsRouter is going to have /authors a a prefix.
//  Here we use Router express functionality to provide Routing to the server
const authorsRouter = express.Router();

authorsRouter.post("/author", (req, res, next) => {
  // remember to add server.use(express.json()) to the server file
  //1. read the requests body

  const newAuthor = {
    ...req.body,
    ID: uniqid(),
    createdAt: new Date(),
  };

  //2. read the the content of authors.json

  const authors = readAuthors;

  //3. push new author to the array

  authors.push(newAuthor);

  //4. Rewrite the new array to the json file
  writeAuthors(authors)

  const authors = readAuthors();
});
