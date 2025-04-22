import User from "../Models/UserSchema.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import nodemailer from "nodemailer";
import speakeasy from "speakeasy";
import qrcode from "qrcode";

dotenv.config();

export const registerUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const hashPassword = await bcrypt.hash(password, 10);

    //default username generating
    const baseUsername = email.split("@")[0];
    const username = baseUsername.replace(/[0-9]/g, "").toLowerCase();

    const newUser = new User({ username, email, password: hashPassword });
    await newUser.save();
    res
      .status(200)
      .json({ message: "User Registered Successfully", result: newUser });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Registration Failed Internal server error" });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userDetail = await User.findOne({ email });
    if (!userDetail) {
      return res.status(401).json({ message: "User Not Found" });
    }
    const passwordMatch = await bcrypt.compare(password, userDetail.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid password" });
    }
    //jwt part token creation after signin
    const token = jwt.sign(
      { _id: userDetail._id },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "1h" }
    );
    userDetail.token = token;
    await userDetail.save();

    res
      .status(200)
      .json({ message: "User Logged In Successfully", token: token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Login Failed Internal server error" });
  }
};

export const getuser = async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId);
    res.status(200).json({ message: "Authorized user", data: [user] });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Internal server error Failed to get the user" });
  }
};

export const forgotPassword = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: "1d",
  });
  var transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465, // Or try port 587 if this fails
    secure: true, // Use SSL
    auth: {
      user: process.env.PASSMAIL,
      pass: process.env.PASSKEY,
    },
    tls: {
      rejectUnauthorized: false, // Bypass SSL certificate issues (dev only)
    },
  });

  var mailOptions = {
    from: process.env.PASSMAIL,
    to: user.email,
    subject: "Password Reset",
    text:
      "You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n" +
      "Please click on the following link, or paste this into your browser to complete the process:\n\n" +
      `http://localhost:3003/reset-password/${user._id}/${token}`,
  };
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.error("Error sending email:", error);
      return res.status(500).json({ message: "Internal server error", error });
    } else {
      res.status(200).json({ message: "Email sent successfully" });
    }
  });
};

export const resetPassword = async (req, res) => {
  const { id, token } = req.params;
  const { password } = req.body;
  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Invalid token" });
    } else {
      bcrypt
        .hash(password, 10)
        .then((hash) => {
          User.findByIdAndUpdate({ _id: id }, { password: hash })
            .then((ele) => res.send({ status: "Success" }))
            .catch((err) => res.send({ status: err }));
        })
        .catch((err) => res.send({ status: err }));
    }
  });
};

export const google = async (req, res, next) => {
  const { email, username, profilePicture } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user) {
      const token = jwt.sign(
        { id: user._id, isAdmin: user.isAdmin },
        process.env.JWT_SECRET_KEY
      );

      const { password: passkey, ...rest } = user._doc;

      res
        .status(200)
        .json({ message: "User LoggedIn Successfully", rest, token });
    } else {
      const generatePassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);
      const hashedPassword = bcrypt.hashSync(generatePassword, 10);
      const newUser = new User({
        username:
          username.toLowerCase().split(" ").join("") +
          Math.random().toString(9).slice(-4),
        email,
        password: hashedPassword,
        profilePicture: profilePicture,
      });
      await newUser.save();
      const token = jwt.sign(
        { id: newUser._id, isAdmin: newUser.isAdmin },
        process.env.JWT_SECRET_KEY
      );

      const { password: passkey, ...rest } = newUser._doc;

      res
        .status(200)
        .json({ message: "User LoggedIn Successfully", rest, token });
    }
  } catch (error) {
    next(error);
  }
};

export const generate2FA = async (req, res) => {
  try {
    const secret = speakeasy.generateSecret({
      name: `Autointelli (${req.body.email})`,
    });

    const qrCode = await qrcode.toDataURL(secret.otpauth_url);

    // Save secret.base32 in DB with the user for later verification
    res.json({ qrCode, secret: secret.base32 });
  } catch (err) {
    res.status(500).json({ message: "Error generating 2FA" });
  }
};

export const verify2FA = (req, res) => {
  const { token, secret } = req.body;

  const verified = speakeasy.totp.verify({
    secret,
    encoding: "base32",
    token,
  });

  if (verified) {
    res.json({
      message: "✅ Two-Factor Authentication verified successfully.",
    });
  } else {
    res
      .status(400)
      .json({ message: "❌ Invalid authentication code. Please try again." });
  }
};
