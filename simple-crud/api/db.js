import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect("mongodb+srv://matheusciriaco:matheus017@cluster0.g8y53.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB conectado!");
  } catch (error) {
    console.error("Erro ao conectar com MongoDB", error);
    process.exit(1);
  }
};