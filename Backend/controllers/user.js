const User = require('../models/User');

const addUser = async (req, res, next) => {
  try {
    if (!req.body.phoneNumber) {
      throw new Error("Phone number is mandatory");
    }
    const name = req.body.name;
    const email = req.body.email;
    const phoneNumber = req.body.phoneNumber;

    const data = await User.create({
      name: name,
      email: email,
      phoneNumber: phoneNumber,
    });
    res.status(200).json({ newUserDetail: data });
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

const getUser = async (req, res, next) => {
  try {
    const users = await User.findAll();
    res.status(200).json({ allUsers: users });
  } catch (err) {
    console.log("Get user is failing", JSON.stringify(err));
    res.status(500).json({ error: err });
  }
};

const deleteUser = async (req, res, next) => {
  try {
    if (req.params.id == "undefined") {
      console.log("ID is missing");
      return res.status(404).json({ error: "ID is missing" });
    }
    const uId = req.params.id;
    await User.destroy({ where: { id: uId } });
    res.sendStatus(200);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

module.exports = {
  addUser,
  getUser,
  deleteUser
};
