const express = require('express');
const helmet = require("helmet");
const accountRouter = require("./routes/accountRouter");

const server = express();

server.use(helmet());
server.use(express.json());

server.use("/api/accounts", accountRouter);

module.exports = server;