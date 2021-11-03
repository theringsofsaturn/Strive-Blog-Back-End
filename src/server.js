import express from "express";
import cors from "cors"
import listEndpoints from "express-list-endpoints";
import authorsRouter from "./services/authors/index.js"
import blogPostsRouter from "./services/blogs/index.js"

import {
  notFoundHandler,
  badRequestHandler,
  forbiddenHandler,
  genericServerErrorHandler,
} from "./errorHandlers.js"

const server = express(); // const app = express();
const port = 3001; //server to listen on the port, it is stored into a variable

//*********** MIDDLEWARES ***************************
// const loggerMiddleware = (res, req, next) => {
//   console.log(
//     `REQ METHOD ${req.method} -- REQ URL ${req.url} -- ${new Date()}`
//   );
//   next();
// };

// server.use(loggerMiddleware)
//cors and express are middlewares
server.use(express.json()) //this has to be specified BEFORE the routes, otherwise the body will be undefined *** the same as app.use(express.json());
server.use(cors()) //cors connects BE with FE *** the same as app.use(cors());

// *********************** ROUTES ***************************
server.use("/authors", authorsRouter)
server.use("/blogPosts", blogPostsRouter)

// *********************** ERROR MIDDLEWARES ***************************
// always to be defined after all the routes
server.use(notFoundHandler)
server.use(badRequestHandler)
server.use(forbiddenHandler)
server.use(genericServerErrorHandler)

console.table(listEndpoints(server))

//server to listen on the port, it is stored into a variable
server.listen(port, () => {
  console.log("listening on port: ", port);
});

server.on("error", console.log);
