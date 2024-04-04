const dotenv = require("dotenv");

dotenv.config();

const PORT = process.env.PORT || 8000;
const DB_URL = process.env.DB_URL || "";
const CPU_RESTART_PER = parseInt(process.env.CPU_RESTART_PER || "70");
const MODE = process.env.MODE || "localhost";
const FILE_BASE_URL = MODE === "localhost" ? `http://localhost:${PORT}/` : "";

module.exports = { PORT, DB_URL, CPU_RESTART_PER, MODE, FILE_BASE_URL };
