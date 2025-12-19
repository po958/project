import express from "express";
import cors from "cors";
import dotenv from "dotenv";

// ROUTES
import authRoutes from "./routes/auth.js";
import adminRoutes from "./routes/admin.js";
import orderRoutes from "./routes/orders.js";
import mpesaRoutes from "./routes/mpesa.js";
import smsRoutes from "./routes/sms.js";

dotenv.config();

const app = express();

/* ───────────── MIDDLEWARE ───────────── */
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* ───────────── HEALTH CHECK ───────────── */
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "DevNullx API running 🚀"
  });
});

/* ───────────── API ROUTES ───────────── */
app.use("/api/auth", authRoutes);       // user login/register/forgot
app.use("/api/admin", adminRoutes);     // admin login
app.use("/api/orders", orderRoutes);    // purchases
app.use("/api/mpesa", mpesaRoutes);     // MPESA STK push
app.use("/api/sms", smsRoutes);         // OTP / notifications

/* ───────────── 404 HANDLER ───────────── */
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found"
  });
});

/* ───────────── ERROR HANDLER ───────────── */
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({
    success: false,
    message: "Server error"
  });
});

/*
 ⚠️ IMPORTANT:
 ❌ DO NOT use app.listen()
 ✅ Vercel handles server automatically
*/
export default app;
