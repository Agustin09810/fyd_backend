require('dotenv').config();
const jsonwebtoken = require('jsonwebtoken');

let RSA_PUBLIC_KEY = process.env.PUBLIC_KEY.replace(' ', '\n');
let begin = '-----BEGIN PUBLIC KEY-----\n';
let end = '\n-----END PUBLIC KEY-----';
RSA_PUBLIC_KEY = begin + RSA_PUBLIC_KEY + end;


function authValidate (req, res, next) {
    if (req.headers.authorization) {
        const token = req.headers.authorization;
        jsonwebtoken.verify(token, RSA_PUBLIC_KEY, (err, decoded) => {
            if (err) {
                console.log(err);
                return res.status(401).json({
                    message: 'Auth failed'
                });
            }
            req.userData = decoded;
            next();
        });
    } else {
        return res.status(401).json({
            message: 'Auth failed'
        });
    }
}

module.exports = {authValidate};