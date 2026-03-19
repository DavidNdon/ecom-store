import { neon } from "@neondatabase/serverless";
import dotenv from "dotenv";

dotenv.config();

const { PGHOST, PGDATABASE, PGUSER, PGPASSWORD } = process.env;
export const sql = neon(
  `postgresql://${PGUSER}:${PGPASSWORD}@${PGHOST}/${PGDATABASE}?sslmode=require&channel_binding=require`
  
  //psql 'postgresql://neondb_owner:npg_lgADt1P8MCYe@ep-rough-cloud-ad7ye4i3-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require'
);

