const User = require("../models/User");
const { createToken } = require("../token");

module.exports = () => {
  return {
    register: async (req, res) => {
      console.log(req.body);
      const newUser = new User(req.body);
      try {
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
      } catch (e) {
        res.status(500).json(e);
      }
    },

    login: async (req, res) => {
      console.log(req.body);
      try {
        //console.log(req.body.password)
        const user = await User.findOne({ email: req.body.email });
        if (!user) return res.status(400).json({ error: "Wrong Email" });

        // const hashedPassword = CryptoJS.AES.decrypt(
        //   user.password,
        //   process.env.PASS_SEC_KEY
        // ).toString(CryptoJS.enc.Utf8);

        if (user.password != req.body.password)
          return res.status(400).send({ error: "Wrong password" });

        const access_token = createToken(user._id, user.isAdmin);

        const { password, ...rest } = user._doc;

        res.status(200).json({ ...rest, access_token });
      } catch (e) {
        res.status(500).json("Error in Login : " + e);
      }
    },
  };
};
