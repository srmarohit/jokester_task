const { verifyToken } = require("../token");

const middlewares = {
  auth: async (req, res, next) => {
    // authenticate only token
    console.log(req.headers);
    let token = req.headers.authorization;
    if (token) {
      token = token.split(" ")[1];
      const user = await verifyToken(token);
      console.log(user);
      req.user = user;
      next();
    } else {
      return res.status(401).json("you are not authenticated");
    }
  },

  authorization: (req, res, next) => {
    // authenticate token and params id ( authorize user along with user ID as passed as parameter)
    middlewares.auth(req, res, () => {
      console.log(req.user);
      if (req.user.id === req.params.id || req.user.isAdmin) {
        next();
      } else {
        res.status(403).json("You are not allowed to do that!! ");
      }
    });
  },

  admin: (req, res, next) => {
    middlewares.auth(req, res, () => {
      if (req.user.isAdmin) {
        next();
      } else {
        res.status(403).json("You are not Admin..");
      }
    });
  },
};

module.exports = middlewares;
