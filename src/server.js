import express from "express";
import cors from "cors"
import listEndpoints from "express-list-endpoints";

const server = express();
const port = 3001; //server to listen on the port, it is stores into a variable

//*********** MIDDLEWARES ***************************
const loggerMiddleware = (res, req, next) => {
  console.log(
    `REQ METHOD ${req.method} -- REQ URL ${req.url} -- ${new Date()}`
  );
  next();
};

server.use(loggerMiddleware)
//cors and express are middlewares
server.use(express.json) //this has to be specified BEFORE the routes, otherwise the body will be undefined
server.use(cors()) //cors connects BE with FE

// routes
server.use("/authors", authorsRouter)
server.use("/blogs", blogRouter)

console.table(listEndpoints(server))

//server to listen on the port, it is stores into a variable
server.listen(port, () => {
  console.log("listening on port: ", port);
});
