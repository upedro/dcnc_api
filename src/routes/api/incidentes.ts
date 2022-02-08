import bcrypt from "bcryptjs";
import config from "config";
import { Router, Response } from "express";
import { check, validationResult } from "express-validator/check";
import gravatar from "gravatar";
import HttpStatusCodes from "http-status-codes";
import jwt from "jsonwebtoken";

import Payload from "../../types/Payload";
import Request from "../../types/Request";
import Incidentes from '../../models/IncidentesCPJ'

const router: Router = Router();

// @route   POST api/user
// @desc    Register user given their email and password, returns the token upon successful registration
// @access  Public


router.post("/", async function (req: Request, res: Response) {
  const data = await Incidentes.create(req.body);
  return res
    .status(HttpStatusCodes.OK)
    .json(data);
});



router.get("/", async function (req: Request, res: Response) {
  const { limit , offset, sort, order, dossie, robo_id, laudo_id, encontrou_duplicidade 
    ,concluido, ja_possui_cadastro, erro_cadastro } = req.query

  const criteria = {
    ...(dossie ? {dossie: (dossie as any) as string}: {} ),
    ...(robo_id ? {robo_id: (robo_id as any) as string}: {} ),
    ...(laudo_id ? {laudo_id: (laudo_id as any) as string}: {} ),
    ...(encontrou_duplicidade ? {encontrou_duplicidade: (encontrou_duplicidade as any) as boolean}: {} ),
    ...(concluido ? {concluido: (concluido as any) as boolean}: {} ),
    ...(ja_possui_cadastro ? {ja_possui_cadastro: (ja_possui_cadastro as any) as boolean}: {} ),
    ...(erro_cadastro ? {erro_cadastro: (erro_cadastro as any) as boolean}: {} ),
  }

  let findQuery = Incidentes.find(criteria)
    .limit(Number(limit))
    .sort(sort ? {[sort as string]: order === 'ASC' ? 'asc' : 'desc'} : { data: 'desc'})
    .skip(Number(offset))

  const countQuery = Incidentes.count(criteria)

  const total = await countQuery.exec()
  const incidentes = await findQuery.exec()

  return res
    .status(HttpStatusCodes.OK)
    .json({incidentes,total});
});

router.get("/metrics", async function (req: Request, res: Response) {
  const { limit , offset, sort, order, dossie, robo_id, laudo_id, concluido, erro_cadastro } = req.query

  let criteria = {
    concluido: false
  }
  let findQuery = Incidentes.find(criteria)
  let countQuery = Incidentes.countDocuments(criteria)
  let totalConcluidoFalse = await countQuery.exec()

  
  let criteria1 = {
    concluido: true
  }
   findQuery = Incidentes.find(criteria1)
   countQuery = Incidentes.countDocuments(criteria1)
   let totalConcluidoTrue = await countQuery.exec()

  let criteria2 = {
    erro_cadastro: true
  }
   findQuery = Incidentes.find(criteria2)
   countQuery = Incidentes.countDocuments(criteria2)
   let totalErroCadastroTrue = await countQuery.exec()

  //  let criteria3 = {
  //   ja_possui_cadastro: false,
  //   concluido: false,
  //   erro_cadastro: false,
  //   encontrou_duplicidade: false

  // }

  let criteria3 = {concluido: false,ja_possui_cadastro: false,erro_processo: false}
   findQuery = Incidentes.find(criteria3)
   countQuery = Incidentes.countDocuments(criteria3)
   let totalJaPossuiCadastroFalse = await countQuery.exec()

   let criteria4 = {
    encontrou_duplicidade: true
  }
   findQuery = Incidentes.find(criteria4)
   countQuery = Incidentes.countDocuments(criteria4)
   let totalEncontrouDuplicidadeTrue = await countQuery.exec()

   const agg = Incidentes.aggregate([
    {
      $group:{
        _id:null,
        horasTrabalho: {$sum: "$tempo_trabalho"}
      }
    }
 ])
 
 
 let horasTrabalho = await agg.exec()
 horasTrabalho = horasTrabalho[0].horasTrabalho

  return res
    .status(HttpStatusCodes.OK)
    .json({
      totalConcluidoFalse, totalConcluidoTrue,totalErroCadastroTrue,
      totalJaPossuiCadastroFalse, totalEncontrouDuplicidadeTrue,
      horasTrabalho
      });
});



export default router;
