const { parentPort, workerData, isMainThread } = require("worker_threads");
const { processFile } = require("../../configs/globalFunction");
if (!isMainThread) if (workerData) processFile(workerData);
