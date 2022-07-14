// an async wrapper logic to remove filthy try catch blocks 
// also helps creating our own error handling middleware



const asyncWrapper = (fn) => {
    return async (req, res, next) => {
        try {
            await fn(req, res, next)
        } catch (err) {
            next(err)
        }
    }
}

module.exports = asyncWrapper