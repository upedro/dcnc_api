import { Document, Model, model, Schema, Mongoose } from "mongoose";


export interface IIncidentes {
  id: string;
  dossie: string;
  tipoSubpasta: string;
  numCNJ: string;
  Juizo: string;
  ufJuizo: string;
  OrgaoJulgador: string;
  concluido: boolean;
  tempo_trabalho: string;
  robo_id: string;
  encontrou_duplicidade: boolean;
  ja_possui_cadastro: boolean;
  erro_cadastro: boolean;
  horario_inicio: number;
  horario_terminio: number;
}

// const laudoBennerSchema = new Schema({}, { strict: false });

const incidentesSchema: Schema = new Schema({
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
  tipoSubpasta: {
    type: String,
    required: false,
    unique: false
  },
  numCNJ: {
    type: String,
    required: false,
    unique: false
  },
  Juizo: {
    type: String,
    required: false,
    unique: false
  },
  ufJuizo: {
    type: String,
    required: false,
    unique: false
  },
  OrgaoJulgador: {
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
  encontrou_duplicidade: {
    type: Boolean,
    required: false,
    unique: false,
    default: false
  },
  ja_possui_cadastro: {
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
  horario_inicio: {
    type: Number,
    required: false,
    unique: false
  },
  horario_terminio: {
    type: Number,
    required: false,
    unique: false
  },
  update_at: {
    type: Date,
    default: Date.now
  }
},{collection:'incidentesCPJ'});

const IncidentesCPJ = model<IIncidentes>("Incidentes", incidentesSchema);

export default IncidentesCPJ;
