const User = require("../models/UsersModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// POST:  localhost:400/api/v1/register
exports.Register = async (req, res) => {
  try {
    const { userName, password, email } = req.body;

    console.log(req.body);

    if (!userName || !password || !email) {
      return res.status(400).json({
        success: false,
        msg: "Invalid username, password, or email",
      });
    }

    const isEmail = await User.findOne({ email: email });

    if (isEmail) {
      return res.status(409).json({
        success: false,
        msg: "Email Already Exists",
      });
    }

    const genSalt = await bcrypt.genSalt();
    const HashPass = await bcrypt.hash(password, genSalt);

    const user = await User.create({
      userName: userName,
      password: HashPass,
      email: email,
    });

    const Token = jwt.sign(
      {
        userdata: user._id,
      },
      "MernDev",
      { expiresIn: "24h" } // Token expires in 1 hour
    );

    res.status(201).json({
      success: true,
      Token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      err: error.message,
    });
  }
};

// POST : localhost:400/api/v1/login
exports.Login = async (req, res) => {
  try {
    const { userName, password } = req.body;

    if (!userName || !password) {
      return res.status(400).json({
        success: false,
        msg: "Invalid username, password",
      });
    }

    const user = await User.findOne({ userName: userName });

    if (!user) {
      return res.status(400).json({
        success: false,
        msg: "Invalid Crtedentials",
      });
    }

    const isPassMatch = await bcrypt.compare(password, user.password);
    if (!isPassMatch) {
      return res.status(404).json({
        success: false,
        content: "Invalid Crtedentials",
      });
    }

    const Token = jwt.sign(
      {
        userdata: user._id,
      },
      "MernDev",
      { expiresIn: "24h" } // Token expires in 1 hour
    );

    res.status(201).json({
      success: true,
      Token,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
      err: error,
    });
  }
};

exports.LoadUser = async (req, res) => {
  try {
    const Token = req.headers.authorization;

    if (!Token) {
      return res.status(404).json({
        err: " Token is empty",
      });
    }

    const decoded = await jwt.verify(Token, "MernDev");

    const user = await User.findById(decoded.userdata);

    res.status(201).json({
      success: true,
      user,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      err: error,
    });
  }
};
