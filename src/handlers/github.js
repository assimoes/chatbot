function post(req, res, next) {  
    res.send(req.body);
    next();
};

module.exports = {
    post: post
}