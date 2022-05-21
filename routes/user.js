const { authorization, admin } = require("../middleware");
const upload = require("../multer/index");

const router = require("express").Router();

const userController = require("../controller/user");

router.put("/:id", authorization, userController().updateUser);

router.post(
  "/:id/upload",
  upload.single("profile_pic"),
  userController().uploadImg
);

router.delete("/:id", admin, userController().deleteUser);

router.get("/:id", authorization, userController().getUser);

router.get("/", admin, userController().getAllUsers);

module.exports = router;
