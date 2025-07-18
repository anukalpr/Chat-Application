const jwt = require('jsonwebtoken');
const generateTokenAndVerify = (userId, res) => {
    const token = jwt.sign({ userId }, 'z9VObZ29dgq/98FM3Qdzx2Z4SaYtJli59+3SFcjPWo4=', { expiresIn: "5d" });

    res.cookie("jwt", token, {
        httpOnly: true,
        secure: false,
        sameSite: "lax"
    });
};

module.exports = generateTokenAndVerify;