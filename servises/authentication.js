const JWT = require('jsonwebtoken');

const secret = "$$new@123eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9";


function createTokenForUser(user) {
  const payload = {
    _id: user._id,
    fullName: user.fullName,
    email: user.email,
    profileImageURL: user.profilePicURL,
    role: user.role,
  };
  const token = JWT.sign(payload, secret);
  return token;

}


function validateToken(token) {
  const payload = JWT.verify(token, secret);
  return payload;
}

module.exports = { createTokenForUser, validateToken, }