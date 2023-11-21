const UserModels = require("../../models/user");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const ApiResponse = require("../../helper/response");
const { Op } = require("sequelize");
const { REGISTER_ERROR_CODE } = require("../../const/response/errorCode");
const { REGISTER_MESSAGE } = require("../../const/response/message");

const createNewUser = async (req, res) => {
  const email = req.body.email;
  const name = req.body.name;
  const phone = req.body.phone;
  const username = req.body.username;
  if (email == null || name == null || phone == null || username == null) {
    return ApiResponse.forbidden(
      res,
      REGISTER_MESSAGE.EMPTY_PARAM,
      REGISTER_ERROR_CODE.EMPTY_PARAM
    );
  } else {
    let data = {
      name: name,
      username: username,
      email: email,
      password: bcrypt.hashSync(req.body.password, saltRounds),
      phone: req.body.phone,
    };
    try {
      const userExist = await UserModels.findOne({
        where: {
          [Op.or]: [{ name }, { username }, { email }, { phone }],
        },
      });
      if (!userExist) {
        const newUser = await UserModels.create(data);
        return ApiResponse.created(res, REGISTER_MESSAGE.SUCCESS(newUser.name));
      } else {
        return ApiResponse.forbidden(
          res,
          REGISTER_MESSAGE.DATA_EXIST,
          REGISTER_ERROR_CODE.DATA_EXIST
        );
      }
    } catch (error) {
      return ApiResponse.serverError(res, error);
    }
  }
};

module.exports = {
  createNewUser,
};
