import { NextApiResponse } from "next";
import nextConnect from "next-connect";

import { NextApiReq } from "../../../interface";
import init from "../../../middleware/init";

const handler = nextConnect();

handler.use(init).post((req: NextApiReq, res: NextApiResponse, next) => {
  req.logout((err) => {
    if (err) return next(err);
    return res.status(204).end();
  });
});

export default handler;
