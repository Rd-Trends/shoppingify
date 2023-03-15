import bcrypt from "bcrypt";
import passport from "passport";
import LocalStrategy from "passport-local";

import User from "../models/user";

passport.serializeUser(function (user, done) {
  // serialize the username into session
  done(null, user);
});

passport.deserializeUser(async function (user, done) {
  done(null, user);
});

passport.use(
  new LocalStrategy(
    {
      passReqToCallback: true,
      usernameField: "email",
      passwordField: "password",
    },
    async (req, email, password, done) => {
      const user = await User.findOne({ email });
      if (!user) {
        return done(null, null, {
          message: "this email hasn't been registered",
        });
      }
      if (!(await bcrypt.compare(password, user.password))) {
        return done(null, false, { message: "Incorrect email or password" });
      }

      return done(null, {
        name: user.name,
        email: user.email,
        _id: user._id,
      });
    }
  )
);

export default passport;
