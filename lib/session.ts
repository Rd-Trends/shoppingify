import MongoStore from "connect-mongo";
import { NextFunction,Request, Response } from "express-serve-static-core";
import session from "express-session";

export default function (req: Request, res: Response, next: NextFunction) {
  const mongo = process.env.MONGODB_URI;
  const expiryDate = 1000 * 60 * 60 * 24 * 7; //7 days

  return session({
    secret: process.env.TOKEN_SECRET!,
    store: MongoStore.create({ mongoUrl: mongo }),
    resave: false,
    saveUninitialized: false,
    cookie: {
      expires: new Date(Date.now() + expiryDate),
      maxAge: expiryDate,
      secure: false,
    },
  })(req, res, next);
}
