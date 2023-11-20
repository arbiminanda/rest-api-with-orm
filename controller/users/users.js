const UserModels = require("../../models/user");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const ApiResponse = require("../../helper/response");

const createNewUser = async (req, res) => {
  const email = req.body.email;
  const name = req.body.name;
  const phone = req.body.phone;
  const username = req.body.username;
  let data = {
    name: name,
    phone: req.body.phone,
    email: email,
    username: username,
    password: bcrypt.hashSync(req.body.password, saltRounds),
  };
  if (email == null || name == null || phone == null || username == null) {
    return ApiResponse.wrongUserCreds(
      res,
      "Name, email, phone and username are mandatory",
      1001
    );
  } else {
    try {
      await UserModels.create(data);
      res.json({
        msg: `Successfully registered account for ${name}, you can log in now`,
        status: "success",
      });
    } catch (error) {
      // Log the error for debugging purposes
      console.error("Error creating a new user:", error);

      // Return a generic server error response
      return ApiResponse.serverError(res, error);
    }
    // try {
    //   [checkUser] = await UsersModels.checkNameEmailPhoneUsernameExist(
    //     name,
    //     email,
    //     phone,
    //     username
    //   );
    //   if (checkUser.length === 0) {
    //     try {
    //       await UsersModels.createNewUser(data);
    //       res.json({
    //         msg: `Successfully regist account for ${name}, you can login now`,
    //         status: "success",
    //       });
    //     } catch (error) {
    //       return ApiResponse.serverError(res, error);
    //     }
    //   } else {
    //     return ApiResponse.dataExist(
    //       res,
    //       "User with that name, email, phone, or username already exist"
    //     );
    //   }
    // } catch (error) {
    //   return ApiResponse.serverError(res, error);
    // }
  }
};

module.exports = {
  createNewUser,
};
