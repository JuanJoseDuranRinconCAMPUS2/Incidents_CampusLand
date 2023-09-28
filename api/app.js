import express from "express";
import { loadEnv } from "vite";
import cors from "cors";

import Area from "./routes/area.js";
import Classroom from "./routes/classroom.js";
import Category_Inc from "./routes/category_Inc.js";
import Type_Inc from "./routes/type_Inc.js";
import Document_type from "./routes/document_type.js";
import Gender from "./routes/gender.js";
import Comp_Status from "./routes/comp_Status.js";
import User from "./routes/user.js";
import Incidents from "./routes/incidents.js";
import Computers from "./routes/computers.js";

import UserCreation from "./routes/UserCreation.js";
import LoginUser from "./routes/loginUser.js";

console.clear();
const env = loadEnv("development", process.cwd(), 'VITE');

const IncidentsApi = express();
IncidentsApi.use(express.json());
IncidentsApi.use(cors({
    origin: `http://${env.VITE_HOSTNAME}:${env.VITE_PORT_FRONTEND}`,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'accept-version,Content-Type,Authorization',
    preflightContinue: false,
}));

//loginNative
// ════════ ⋆★⋆ ════════
IncidentsApi.use('/UserCreation', UserCreation);
IncidentsApi.use('/LoginUser', LoginUser);
// ════════ ⋆★⋆ ════════

// Endpoints API
// ════════ ⋆★⋆ ════════
IncidentsApi.use('/Area', Area);
IncidentsApi.use('/Classroom', Classroom);
IncidentsApi.use('/Category_Inc', Category_Inc);
IncidentsApi.use('/Type_Inc', Type_Inc);
IncidentsApi.use('/Document_type', Document_type);
IncidentsApi.use('/Gender', Gender);
IncidentsApi.use('/Comp_Status', Comp_Status);
IncidentsApi.use('/User', User);
IncidentsApi.use('/Incidents', Incidents);
IncidentsApi.use('/Computers', Computers);
// ════════ ⋆★⋆ ════════

const config = {
    port: env.VITE_PORT_BACKEND,
    hostname: env.VITE_HOSTNAME
  };
  
  IncidentsApi.listen(config, ()=>{console.log(`http://${env.VITE_HOSTNAME}:${env.VITE_PORT_BACKEND}`);})