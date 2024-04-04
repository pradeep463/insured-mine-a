// const { Worker, isMainThread, workerData } = require("worker_threads");
import { Worker, isMainThread, workerData } from "worker_threads";

// const { processCSVFile } = require("../configs/globalFunction.ts");
if (!isMainThread) {
  const filePath = workerData;
  console.log(filePath);

  // processCSVFile(filePath);
  // Parse the file, extract data, and save to MongoDB
  // Example:
  // const data = parseFile(filePath);
  // saveToMongoDB(data);
}
