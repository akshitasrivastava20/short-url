// const jwt=require('jsonwebtoken');
// const secret="jhunnukibubutunnu"
// function setUser(user){
//     return jwt.sign({
//         id:user._id,
//         email:user.email,
//     },secret);

// }

// function getUser(token){
//     if(!token) return null;
//    return jwt.verify(token,secret);
// }

// module.exports={
//     setUser,
//     getUser,
// }

const jwt = require('jsonwebtoken');
const secret = "jhunnukibubutunnu"; // Ideally, store this in process.env.JWT_SECRET

function setUser(user) {
    return jwt.sign(
        {
            id: user._id,
            email: user.email,
        },
        secret,
        { expiresIn: '1h' } // Token expires in 1 hour
    );
}

function getUser(token) {
    if (!token) return null;

    // Remove 'Bearer ' prefix if present
    if (token.startsWith('Bearer ')) {
        token = token.split(' ')[1];
    }

    try {
        return jwt.verify(token, secret);
    } catch (err) {
        console.error('JWT verification failed:', err.message);
        return null;
    }
}

module.exports = {
    setUser,
    getUser,
};
