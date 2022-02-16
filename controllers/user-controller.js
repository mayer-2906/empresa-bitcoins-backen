const { response } = require("express");
const bcrypt = require("bcryptjs");

const User = require("../models/user");
const Coin = require("../models/coin-model");

const getUsers = async (resq, res = response) => {
  try {
    const users = await User.find({}, "name email rol age");
    console.log();
    res.json({
      ok: 200,
      users,
    });
  } catch (e) {
    res.json({
      ok: 400,
      msg: e.message,
    });
  }
};

const getUser = async (req, res = response) => {
  const uid = req.params.id;
  try {
    const user = await User.findById(uid).populate(
      "coins",
      "name symbol value"
    );
    res.json({
      ok: true,
      message: "user find",
      user,
    });
  } catch (error) {
    res.json({
      ok:false,
      message: error
    })
  }
};

const createUser = async (req, res = response) => {
  try {
    const { name, password, email } = req.body;

    const isUserExist = await User.findOne({ email });

    if (isUserExist) {
      console.log(isUserExist);
      res.status(500).json({
        ok: 500,
        message: "user Exist",
      });
    } else {
      const user = new User(req.body);

      //encript password
      const salt = bcrypt.genSaltSync();
      user.password = bcrypt.hashSync(password, salt);

      //save user
      await user.save();

      res.json({
        ok: 200,
        msg: "user create",
        user,
      });
    }
  } catch (e) {
    res.json({
      ok: 400,
      msg: "Error of create user",
      error: e.message,
    });
  }
};

const updateUser = async (req, resp = response) => {
  const uid = req.params.id;

  try {
    const user = await User.findById(uid);
    if (!user) {
      return resp.status(404).json({
        ok: false,
        message: "user not exits",
      });
    }

    const { password, email, ...fieldUpdate } = req.body;
    if (user.email !== email) {
      const isExistEmail = await User.findOne({ email: req.body.email });
      if (isExistEmail) {
        return resp.status(500).json({
          ok: false,
          message: "email belongs to another user",
        });
      }
    }

    fieldUpdate.email = email;

    const userUpdate = await User.findByIdAndUpdate(uid, fieldUpdate, {
      new: true,
    });

    resp.json({
      ok: 200,
      userUpdate,
    });
  } catch (e) {
    resp.status(500).json({
      ok: false,
      message: "connection failed",
      errors: e.message,
    });
  }
};

const addCoin = async (req, resp = response) => {
  const { idCoin } = req.body;
  const uidUser = req.params.id;

  try {
    const newCoin = await Coin.findById(idCoin);
    if (!newCoin) {
      return resp.json({
        ok: false,
        message: "moneda no existe",
      });
    }
    const user = await User.findById(uidUser);
    if (!user) {
      return resp.json({
        ok: false,
        message: "usuario no existe",
      });
    }

    const { coins } = user;
    coins.push(idCoin);

    const userUpdate = await User.findByIdAndUpdate(
      uidUser,
      { coins },
      { new: true }
    );

    resp.status(200).json({
      ok: true,
      message: "coin addd a user",
      userUpdate,
    });
  } catch (error) {
    resp.status(500).json({
      ok: false,
      message: "Error al conectarse a la db",
      error,
    });
  }
};

const deleteUser = async (req, resp = response) => {
  const uid = req.params.id;
  try {
    const user = await User.findById(uid);
    if (!user) {
      return resp.status(500).json({
        ok: false,
        message: "user does not exits",
      });
    }
    await User.findByIdAndDelete(uid);
    resp.json({
      ok: true,
      message: "delete user",
    });
  } catch (e) {
    resp.status(500).json({
      ok: false,
      message: `talk with admin`,
    });
  }
};

module.exports = {
  getUsers,
  getUser,
  createUser,
  updateUser,
  addCoin,
  deleteUser,
};
