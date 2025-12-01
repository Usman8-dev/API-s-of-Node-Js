const jwt = require('jsonwebtoken');
const userModel = require('../models/user-model');
const cookieParser = require('cookie-parser');

const IsLoginUser = async (req, res, next) => {
    if (!req.cookies.token) {
        res.send('Please login First!')
    } else {
        try {
            var decoded = jwt.verify(req.cookies.token, process.env.JWT_KEY);
            let user = await userModel.findOne({ email: decoded.email }).select('-password');

            if (!user) {
                return res.status(401).json({ message: 'User not found' });
            }
            req.user = user;
            next();
        } catch (err) {
            // res.send('error', "Something Went Wrong!")
            return res.status(401).json({
                success: false,
                message: 'Invalid or expired token. Please login again.'
            });
        }
    }
}

module.exports = { IsLoginUser };