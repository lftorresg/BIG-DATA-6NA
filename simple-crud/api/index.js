import express from "express";
import cors from "cors";
import { connectDB } from "./db.js";
import userRoutes from "./routes/users.js";

const app = express();

// Conectar ao MongoDB
connectDB();

app.use(express.json());
app.use(cors());

app.use("/", userRoutes);

app.listen(8800, () => {
  console.log("Servidor rodando na porta 8800");
});