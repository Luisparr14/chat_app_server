const userModel = require("../../models/user.model");

const getUsers = async (req, res) => {
  try {
    const users = await userModel
      .find({ _id: { $ne: req.uid } })
      .sort("-online");

    if (!users) {
      return res.status(404).json({
        ok: false,
        message: "Users not found",
      });
    }

    res.json({
      ok: true,
      message: "Users list",
      users,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      message: "Unexpected error",
    });
  }
};

module.exports = {
  getUsers
};
