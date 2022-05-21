const User = require("../models/User");
const {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} = require("firebase/storage");

module.exports = () => {
  return {
    updateUser: async (req, res) => {
      console.log("update data " + JSON.stringify(req.body));
      if (req.body.password) {
        // req.body.password = CryptoJS.AES.encrypt(req.body.password, process.env.PASS_SEC_KEY).toString();
      }

      try {
        const updateUser = await User.findByIdAndUpdate(
          req.params.id,
          { $set: req.body },
          { new: true }
        );
        res.status(200).json(updateUser);
      } catch (e) {
        res.status(500).json(e);
      }
    },

    // uploadImg: async (req, res) => {
    //   console.log(req);
    //   return res.send(req.body);

    //   const fileName = new Date().getTime() + file.name;

    //   /** Firebase Upload code  */
    //   const storage = getStorage(app);
    //   const storageRef = ref(storage, fileName);

    //   const uploadTask = uploadBytesResumable(storageRef, file);

    //   uploadTask.on(
    //     "state_changed",
    //     (snapshot) => {
    //       // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
    //       const progress =
    //         (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    //       console.log("Upload is " + progress + "% done");
    //       switch (snapshot.state) {
    //         case "paused":
    //           console.log("Upload is paused");
    //           break;
    //         case "running":
    //           console.log("Upload is running");
    //           break;
    //       }
    //     },
    //     (error) => {
    //       // A full list of error codes is available at
    //       // https://firebase.google.com/docs/storage/web/handle-errors
    //       switch (error.code) {
    //         case "storage/unauthorized":
    //           // User doesn't have permission to access the object
    //           break;
    //         case "storage/canceled":
    //           // User canceled the upload
    //           break;

    //         // ...

    //         case "storage/unknown":
    //           // Unknown error occurred, inspect error.serverResponse
    //           break;
    //       }
    //     },
    //     () => {
    //       // Upload completed successfully, now we can get the download URL
    //       getDownloadURL(uploadTask.snapshot.ref)
    //         .then((downloadURL) => {
    //           console.log("File available at", downloadURL);
    //           const user = { ...updatedUser, img: downloadURL };
    //           // console.log(product)
    //           updateUser(dispatch, user);
    //         })
    //         .catch((e) => console.log(e));
    //     }
    //   );

    //   if (req.body.password) {
    //     // req.body.password = CryptoJS.AES.encrypt(req.body.password, process.env.PASS_SEC_KEY).toString();
    //   }

    //   try {
    //     const updateUser = await User.findByIdAndUpdate(
    //       req.params.id,
    //       { $set: { img: "ee" } },
    //       { new: true }
    //     );
    //     res.status(200).json(updateUser);
    //   } catch (e) {
    //     res.status(500).json(e);
    //   }
    // },

    uploadImg: async (req, res) => {
      // Due to lack of time has not been done this part.

      // However I have done basic things such upload the images to the server using multer.

      if (!req.file) {
        return res
          .status(500)
          .json({ error: "Something problem with your file name" });
      }

      res.send(req.file);
    },

    deleteUser: async (req, res) => {
      try {
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json("user hasbeen deleted ..");
      } catch (e) {
        res.status(500).json(e);
      }
    },

    // GEt User
    getUser: async (req, res) => {
      try {
        const user = await User.findById(req.params.id);
        const { password, ...rest } = user._doc;
        res.status(200).json(rest);
      } catch (e) {
        res.status(500).json(e);
      }
    },

    // GEt ALL USERS
    getAllUsers: async (req, res) => {
      try {
        const users = await User.find();
        res.status(200).json(users);
      } catch (e) {
        res.status(500).json(e);
      }
    },
  };
};
