const express = require('express');
const helmet = require("helmet");
const accountRouter = require("./routes/accountRouter");
const errorHandler = require("./middleware/errorHandler");

// Basic Setups
const server = express();
server.use(helmet());
server.use(express.json());

// Endpoints
server.use("/api/accounts", accountRouter);
server.get("/", (req, res) => {
    res.send("Why, hello there!")
})

// Error Handling
server.use("/", (req, res, next) => {
    const error = {
        status: 404,
        details: "It seems you've found an endpoint that doesn't exist o.o"
    }
    next(error);
})
server.use(errorHandler);

module.exports = server;