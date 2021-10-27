import express from "express";
import listEndpoints from "express-list-endpoints";

const server = express();

const port = 3001;

//server to listen on the port, it is stores into a variable
server.listen(port, () => {
  console.log("listening on port: ", port);
});
