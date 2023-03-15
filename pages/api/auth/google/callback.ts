import nextConnect from "next-connect";

import passport from "../../../../lib/passportGoogle";
import init from "../../../../middleware/init";

const handler = nextConnect();

handler.use(init).get(
  passport.authenticate("google", {
    successRedirect: "/",
    failureRedirect: "/auth/login",
  })
);

export default handler;
