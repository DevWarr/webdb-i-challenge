const express = require("express");
const accountQuery = require("../queries/accountQuery");

const router = express.Router();

router.get("/", (req, res, next) => {
    accountQuery.findAll()
        .then(accounts => res.status(200).json(accounts))
        .catch(err => {
            console.log(err);
            next(null)
        })
})

router.post("/", (req, res, next) => {
    
})

router.get("/:account_id", (req, res, next) => {
    
})

router.put("/:account_id", (req, res, next) => {
    
})

router.delete("/:account_id", (req, res, next) => {
    
})

module.exports = router;