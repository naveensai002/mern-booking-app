import express, { Request, Response } from "express";
import User from "../models/user";
import jwt from "jsonwebtoken";
import { body, validationResult } from "express-validator";

const router = express.Router();
//api/users/register
router.post(
  "/register",
  [
    body("firstName", "first name is required").isString(),
    body("lastName", "last name is required").isString(),
    body("email", "Email is required").isEmail(),
    body("password", "Password with 6 or more characters").isLength({
      min: 6,
    }),
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.array() });
    }
    try {
      let user = await User.findOne({
        email: req.body.email,
      });

      if (user) {
        return res.status(400).json({ message: "User already exist" });
      }
      user = new User(req.body);
      await user.save();

      //jwt
      const token = jwt.sign(
        { userId: user.id },
        process.env.JWT_SECRET_KEY as string,
        {
          expiresIn: "1d",
        }
      );
      //cookie
      res.cookie("auth_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 86400000,
      });
      return res.sendStatus(200);
    } catch (error) {
      console.log(error);
      res.status(500).send({ message: "something went wrong" });
    }
  }
);

export default router;
