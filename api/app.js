import express from "express";
import { loadEnv } from "vite";
import cors from "cors";

import Area from "./routes/area.js";
import Classroom from "./routes/classroom.js";

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
// ════════ ⋆★⋆ ════════

// Endpoints API
// ════════ ⋆★⋆ ════════
IncidentsApi.use('/Area', Area);
IncidentsApi.use('/Classroom', Classroom);
// ════════ ⋆★⋆ ════════

const config = {
    port: env.VITE_PORT_BACKEND,
    hostname: env.VITE_HOSTNAME
  };
  
  IncidentsApi.listen(config, ()=>{console.log(`http://${env.VITE_HOSTNAME}:${env.VITE_PORT_BACKEND}`);})