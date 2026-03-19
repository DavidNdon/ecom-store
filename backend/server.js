import dotenv from "dotenv";
dotenv.config();

import express, { json } from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import { router } from "./routes/productRoutes.js";
import { sql } from "./config/connectDB.js";


const PORT = process.env.PORT;
const app = express();

app.use(cors());
app.use(express.json());
app.use(helmet());
app.use(morgan("dev"));
// test the server
app.get('/', (req, res) => {
    res.send("server running successfully");
})

app.use("/api/products", router);

async function initDB() {
  try {
    await sql`
      CREATE TABLE IF NOT EXISTS products(
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        image VARCHAR(255) NOT NULL,
        price DECIMAL(10, 2) NOT NULL,
        description TEXT DEFAULT 'High-quality product designed to meet your needs. Crafted with premium materials and attention to detail, this item offers excellent value and durability. Perfect for everyday use or as a thoughtful gift.',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
      `;
        console.log("Database in postgress connected successfully")
  } catch (error) {
    console.error("Database connection failed", error);
  }
}

initDB().then(() => {
  app.listen(PORT, () => {
    console.log(`server running at port http://localhost:${PORT}`);
  });
});
