const express = require("express");
const router = express.Router();
const { User, Account } = require("../db");
const zod = require("zod");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");
const { authMiddleWare } = require("../middleware");

const signupSchema = zod.object({
  username: zod.string(),
  firstname: zod.string(),
  lastname: zod.string(),
  password: zod.string(),
});

const siginSchema = zod.object({
  username: zod.string(),
  password: zod.string(),
});

const updateSchema = zod.object({
  firstName: zod.string().optional(),
  lastName: zod.string().optional(),
  password: zod.string().optional(),
});

router.post("/signup", async (req, res) => {
  try {
    signupSchema.parse(req.body);
  } catch (error) {
    res.status(411).json({
      message: "Email already taken / Incorrect inputs",
    });
  }

  const { username, firstname, lastname, password } = req.body;

  try {
    const exisitingUser = await User.findOne({
      username: username,
    });

    if (exisitingUser) {
      return res.status(411).json({
        message: "Email already taken / Incorrect inputs",
      });
    }
  } catch (error) {
    res.status(411).json({
      message: "Error while finding The User",
    });
  }

  const user = await User.create({
    username: username,
    firstName: firstname,
    lastName: lastname,
    password: password,
  });

  await Account.create({
    userId: user._id,
    balance: 1 + Math.random() * 10000,
  });

  const token = jwt.sign({ userId: user._id }, JWT_SECRET);
  res.json({
    message: "User created successfully",
    token: token,
    userId: user._id,
  });
});

router.post("/signin", async (req, res) => {
  try {
    await siginSchema.parse(req.body);
  } catch (error) {
    res.status(411).json({
      message: "Error while logging in",
    });
  }

  const user = await User.findOne({
    username: req.body.username,
    password: req.body.password,
  });

  if (user) {
    const token = jwt.sign({ userId: user._id }, JWT_SECRET);
    res.json({
      token: token,
      userId: user._id,
    });
    return;
  }

  res.status(411).json({
    message: "Error while logging in",
  });
});

router.put("/", authMiddleWare, async (req, res) => {
  try {
    await updateSchema.parse(req.body);
  } catch (error) {
    res.status(411).json({
      message: "Error while updating information",
    });
  }

  const user = await User.updateOne(
    { _id: req.userId },
    {
      $set: req.body,
    }
  );
  console.log(user);
  res.json({
    message: "Updated successfully",
  });
});

router.get("/user1", authMiddleWare, async (req, res) => {
  const user = await User.findOne({ _id: req.userId });
  res.json({
    firstName: user.firstName,
  });
});

router.get("/bulk", async (req, res) => {
  const subName = req.query.filter || "";
  const users = await User.find({
    $or: [
      {
        firstName: { $regex: subName, $options: "i" },
      },
      {
        lastName: { $regex: subName },
      },
    ],
  });
  res.json({
    user: users.map((user) => {
      return {
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        _id: user._id,
      };
    }),
  });
});

module.exports = router;
