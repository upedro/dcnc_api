import { Document, Model, model, Schema, Mongoose } from "mongoose";



export interface ILaudoBenner {
  id: number;
  titulo: Array<string>;
  arquivo: string;
  tipo: string;
  cod: string;
  dossie: string;
  n_processo: string;
  resposavel: string;
  documentos: Array<string>;
  paths: Array<string>;
  concluido: boolean;
  tempo_trabalho: string;
  robo_id: string;
  upload_concluido: boolean;
  erro_cadastro: boolean;
  data:string;
}

// const laudoBennerSchema = new Schema({}, { strict: false });

const laudoBennerSchema: Schema = new Schema({
  id: {
    type: String,
    required: false,
    unique: false
  },
  dossie: {
    type: String,
    required: false,
    unique: false
  },
  titulo: {
    type: [String],
    required: false,
    unique: false
  },
  documentos: {
    type: [String],
    required: false,
    unique: false
  },
  paths: {
    type: [String],
    required: false,
    unique: false
  },
  arquivo: {
    type: String,
    required: false,
    unique: false
  },
  tipo: {
    type: String,
    required: false,
    unique: false
  },
  cod: {
    type: String,
    required: false,
    unique: false
  },
  n_processo: {
    type: String,
    required: false,
    unique: false
  },
  resposavel: {
    type: String,
    required: false,
    unique: false
  },
  concluido: {
    type: Boolean,
    required: false,
    unique: false,
    default: false
  },
  upload_concluido: {
    type: Boolean,
    required: false,
    unique: false,
    default: false
  },
  erro_cadastro: {
    type: Boolean,
    required: false,
    unique: false,
    default: false
  },
  tempo_trabalho: {
    type: String,
    required: false,
    unique: false
  },
  robo_id: {
    type: String,
    required: false,
    unique: false
  },
  data: {
    type: String,
    required: false,
    unique: false
  },
  update_at: {
    type: Date,
    default: Date.now
  }
});

const LaudoBenner = model<ILaudoBenner>("LaudoBenner", laudoBennerSchema);

// const LaudoBenner = model('LaudoBenner', laudoBennerSchema, 'laudos_benner');

export default LaudoBenner;
