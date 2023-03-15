import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth2";

import { server } from "../config";
import User from "../models/user";

passport.serializeUser(function (user, done) {
  // serialize the username into session
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: `${server}/api/auth/google/callback`,
      passReqToCallback: true,
    },
    async (request, accessToken, refreshToken, profile, done) => {
      try {
        const email = profile.emails[0].value;
        if (!email) {
          return done(null, null, {
            message: "no email address is registered with this account",
          });
        }
        const userExists = await User.findOne({ email });

        if (userExists) {
          const { email, name, _id, photo, bio, phone } = userExists;
          return done(null, { email, name, _id });
        }

        // if user doesn't exists, create a new user
        const user = new User({
          name: profile.displayName,
          email: profile.emails[0].value,
        });

        await user.save();
        return done(null, {
          name: user.name,
          email: user.email,
          _id: user._id,
        });
      } catch (error) {
        return done(error, false);
      }
    }
  )
);

export default passport;
