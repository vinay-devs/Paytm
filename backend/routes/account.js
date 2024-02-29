const express = require("express");
const router = express.Router();
const { Account } = require("../db");
const { default: mongoose } = require("mongoose");
const { authMiddleWare } = require("../middleware");

router.get("/balance", authMiddleWare, async (req, res) => {
  const userId = req.userId;
  const userAccount = await Account.findOne({
    userId: userId,
  });
  res.json({
    balance: userAccount.balance,
  });
});

router.post("/transfer", authMiddleWare, async (req, res) => {
  const session = await mongoose.startSession();
  console.log(typeof req.body.to);
  console.log(typeof req.body.amount);
  const { to, amount } = req.body;

  session.startTransaction();
  const account = await Account.findOne({ userId: req.userId }).session(
    session
  );

  if (!account || account.balance < amount) {
    await session.abortTransaction();
    return res.status(400).json({
      message: "Insufficient balance",
    });
  }

  const toAccount = await Account.findOne({ userId: to }).session(session);

  if (!toAccount) {
    await session.abortTransaction();
    return res.status(400).json({
      message: "Invalid account",
    });
  }

  // Perform the transfer
  await Account.updateOne(
    { userId: req.userId },
    { $inc: { balance: -amount } }
  ).session(session);
  await Account.updateOne(
    { userId: to },
    { $inc: { balance: amount } }
  ).session(session);

  // Commit the transaction
  await session.commitTransaction();
  res.json({
    message: "Transfer successful",
  });
});

module.exports = router;
