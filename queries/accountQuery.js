const db = require("../data/dbConfig");


const findAll = () => {
    return db("accounts");
}

const findById = (id) => {
    return db("accounts")
            .where({ id })
            .first();
}

const findByName = (name) => {
    return db("accounts")
            .where({ name })
            .first();
}

const insert = async (newAccount) => {
    const [id] = await db("accounts")
            .insert(newAccount)
            // .returning("id")
    return findById(id);
}

const update = async (id, changes) => {
    const success = await db("accounts")
                            .where({ id })
                            .update( changes )
    if (success) {
        return findById(id);
    } else throw ("Error Updating account info")
}

const remove = (id) => {
    return db("accounts")
        .where({ id })
        .del();
}

module.exports = {
    findAll,
    findById,
    findByName,
    insert,
    update, 
    remove
}