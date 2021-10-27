import express from "express";
import uniqid from "uniqid";
import createError from "http-errors";
import multer from "multer";

// Router is a set of endpoints that share something like a prefix. authorsRouter is going to have /authors a a prefix
const authorsRouter = express.Router(); 
