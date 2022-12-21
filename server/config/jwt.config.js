const jwt = require("jsonwebtoken");
const userKey = process.env.USERS_KEY
module.exports.secret = userKey;
module.exports.authenticate = (req, res, next) => {
    jwt.verify(req.cookies.userToken, userKey, (err, payload) => {
        if (err) { 
            res.status(401).json({verified: false});
        } else {
            next();
        }
    });
}