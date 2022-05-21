const jwt = require("jsonwebtoken");

module.exports = {
  createToken: (id, isAdmin = false) => {
    const access_token = jwt.sign({ id, isAdmin }, process.env.JWT_SEC_KEY, {
      expiresIn: "1d",
    });
    return access_token;
  },

  verifyToken: async (token) => {
    return await jwt.verify(token, process.env.JWT_SEC_KEY);
  },
};
