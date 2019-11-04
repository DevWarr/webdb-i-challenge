const express = require("express");
const accountQuery = require("../queries/accountQuery");
const idValidator = require("../middleware/idValidator");
const bodyValidator = require("../middleware/bodyValidator");

const router = express.Router();

router.get("/", (req, res, next) => {
    accountQuery.findAll()
        .then(accounts => res.status(200).json(accounts))
        .catch( err => next({ devMessage: err.toString() }) )
})

router.post("/", bodyValidator(["name", "budget"]), (req, res, next) => {
    const newAccount = res.locals.valid;

    accountQuery.findByName(newAccount.name)
        .then(existingAccount => {
            if (existingAccount) {
                next({status:400, details:"An account already exists with this name!"});
            } else {
                accountQuery.insert(newAccount)
                    .then(account => {
                        res.status(200).json(account);
                    })
            }
        })
        .catch( err => next({ devMessage: err.toString() }) )
})

router.get("/:account_id", idValidator(accountQuery, "account_id"), (req, res, next) => {
    res.status(200).json(res.locals.account);
})

router.put("/:account_id", idValidator(accountQuery, "account_id"), bodyValidator(["name", "budget"]), (req, res, next) => {
    const { valid: updatedAccount, account: currentAccount } = res.locals;

    // Confirm that our updated name is still usable in the database
    accountQuery.findByName(updatedAccount.name)
        .then(existingAccount => {
            if (existingAccount && existingAccount.id != currentAccount.id) {
                next({status:400, details:"An account already exists with this name!"});
            } else {
                accountQuery.update( currentAccount.id, updatedAccount )
                    .then(account => {
                        res.status(200).json(account);
                    })
            }
        })
        .catch( err => next({ devMessage: err.toString() }) )
})

router.delete("/:account_id", idValidator(accountQuery, "account_id"), (req, res, next) => {
    accountQuery.remove(req.params.account_id)
        .then(success => {
            res.sendStatus(204);
        })
        .catch( err => next({ devMessage: err.toString() }) )
})

module.exports = router;