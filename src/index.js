const express = require("express");
const mongoose = require("mongoose");
const { DB_URL, PORT } = require("./configs/ENV");
const cors = require("cors");
const fs = require("fs");
const { allRoutes } = require("./routes/allRoutes");
const { checkCpuUsage } = require("./utils/cpuUsage");
const multer = require("multer");

const app = express();

const isExistUploadDirectory = (req, res, next) => {
  const uploadsDir = "./uploads";
  if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir);
  }
  next();
};



app.use(isExistUploadDirectory);

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  })
);

app.use(express.json());

allRoutes.forEach((route) => {
  if (route.method === "GET") {
    app.get(route.path, route.handler);
  } else if (route.method === "POST" && route.isFileUpload) {
    app.post(route.path, upload.any(), route.handler);
  } else if (route.method === "POST") {
    app.post(route.path, route.handler);
  } else if (route.method === "DELETE") {
    app.delete(route.path, route.handler);
  } else if (route.method === "PUT") {
    app.put(route.path, route.handler);
  }
});

mongoose
  .connect(DB_URL)
  .then(() => console.log("Connected to Mongo"))
  .catch((err) => console.error("Failed to connect to MongoDB:", err));

app.listen(PORT, () => {
  console.log(`[server]: Server is running at ${PORT}`);
});

// Task 2 : Check CPU usage every 30 sec if its more than 70% restart the server
setInterval(checkCpuUsage, 1000 * 30);
