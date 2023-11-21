module.exports = {
  REGISTER_MESSAGE: {
    EMPTY_PARAM: "Name, username, email and phone are mandatory",
    DATA_EXIST:
      "User with that name, username, email, phone, or username already exist",
    SUCCESS: (name) => `Registration successful for ${name}`,
  },
};
