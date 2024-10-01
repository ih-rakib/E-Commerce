const verifyAdmin = (req, res, next) => {
    if (req.role !== 'admin') {
        return res.status(403).send({ success: false, message: "you are not authorized to perform this action!" })
    }
    next()
}

module.exports = verifyAdmin