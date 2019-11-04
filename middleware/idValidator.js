module.exports = (idName_string) => (req, res, next) => {
    
    // When setting up back_end code, "idName_string" SHOULD be a string:
    if (!idName_string || typeof idName_string !== "string" || !idName_string instanceof String) {
        const error = {
            status: 500,
            details: "Back end code error: names for each req.params should be a string!"
        }
        next(error);
    }

    
}