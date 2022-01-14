import bcrypt from "bcryptjs";
import config from "config";
import { Router, Response } from "express";
import { check, validationResult } from "express-validator/check";
import gravatar from "gravatar";
import HttpStatusCodes from "http-status-codes";
import jwt from "jsonwebtoken";

import Payload from "../../types/Payload";
import Request from "../../types/Request";
import LaudoBenner from "../../models/LaudoBenner";

const router: Router = Router();

// @route   POST api/user
// @desc    Register user given their email and password, returns the token upon successful registration
// @access  Public


router.post("/", async function (req: Request, res: Response) {
  const data = await LaudoBenner.create(req.body);
  return res
    .status(HttpStatusCodes.OK)
    .json(data);
});



router.get("/", async function (req: Request, res: Response) {
  const { limit , offset, sort, order, dossie, robo_id, laudo_id, upload_concluido, erro_cadastro } = req.query

  const criteria = {
    ...(dossie ? {dossie: (dossie as any) as string}: {} ),
    ...(robo_id ? {robo_id: (robo_id as any) as string}: {} ),
    ...(laudo_id ? {laudo_id: (laudo_id as any) as string}: {} ),
    ...(upload_concluido ? {upload_concluido: (upload_concluido as any) as boolean}: {} ),
    ...(erro_cadastro ? {erro_cadastro: (erro_cadastro as any) as boolean}: {} ),
  }

  let findQuery = LaudoBenner.find(criteria)
    .limit(Number(limit))
    .sort(sort ? {[sort as string]: order === 'ASC' ? 'asc' : 'desc'} : { data: 'desc'})
    .skip(Number(offset))

  const countQuery = LaudoBenner.count(criteria)

  const total = await countQuery.exec()
  const laudos = await findQuery.exec()

  return res
    .status(HttpStatusCodes.OK)
    .json({laudos,total});
});



export default router;
