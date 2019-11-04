const db = require("../data/dbConfig");


const findAll = () => {
    return db("accounts");
}

const findById = (id) => {
    
}

const insert = (newAccount) => {
    
}

const update = (id, changes) => {
    
}

const remove = (id) => {
    
}

module.exports = {
    findAll,
    findById,
    insert,
    update, 
    remove
}