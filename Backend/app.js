import express from "express";
import "dotenv/config";
import cors from "cors";
import bodyParser from "body-parser";
import path from "path";
import { fileURLToPath } from "url";
import swaggerDocs from "./src/utils/swagger.js";
import ConnectionSequelize from "./src/utils/connection.js";
import initializeAssociations from "./src/associations/index.js";  // ✅ Importing associations

// Import Routes
import authRoutes from "./src/routes/authRoutes.js";
import postRouter from "./src/routes/postRoutes.js";
import postPickUpRouter from "./src/routes/postPickupRoutes.js";
import userRouter from "./src/routes/user.route.js";

// Import Services
import './src/servives/cronjob.js';

// App Initialization
const app = express();
const PORT = process.env.PORT ?? 6000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(cors({
  origin: ["http://localhost:3000", "http://localhost:5000"],
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Serve static files from React build
// app.use(express.static(path.join(__dirname, "../Frontend/donation/build")));

// Routes
app.use('/api', authRoutes);
app.use('/api', postRouter);
app.use('/api', postPickUpRouter);
app.use('/api', userRouter);

// Swagger Documentation
swaggerDocs(app, PORT);

// Catch-All Handler for React App
// app.use((req, res) => {
//   res.sendFile(path.join(__dirname, "../Frontend/donation/build/index.html"));
// });

// Initialize Associations
initializeAssociations();

// Database Connection & Server Start
const main = async () => {
  try {
    await ConnectionSequelize.sync({ alter: true });
    app.listen(PORT, () => console.log(`✅ Server is running on http://localhost:${PORT}`));
  } catch (error) {
    console.error(`❌ Error starting server: ${error}`);
  }
};

main();
