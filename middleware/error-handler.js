const { CustomAPIerror } = require("../erros/custom-errors")

// an error handling middleware 
const errorHandler = (err, req, res, next) => {
    console.log('error is ', err)
    if (err instanceof CustomAPIerror) {
        console.log('if block runs')
        return res.status(err.statusCode).json({ msg: err.message })
    }
    return res.status(500).json({ msg: `Something went wrong please try again later` })
}


module.exports = errorHandler