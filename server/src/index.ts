import { connectDB } from "./config/db";
import app from "./app";
import "dotenv/config";

const PORT = Number(process.env.PORT) || 5000;

const start = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Server is listening ${PORT}`);
    });
  } catch (err) {
    console.log(err, "test");
  }
};

start();
