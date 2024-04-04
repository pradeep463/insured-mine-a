const osu = require("node-os-utils");
const { exec } = require("child_process");
const { CPU_RESTART_PER } = require("../configs/ENV");

const cpu = osu.cpu;

/**
 * Function to check CPU usage and restart the server if it exceeds the 70% limit.
 */

const checkCpuUsage = () => {
  cpu.usage().then((cpuPercentage) => {
    console.log(cpuPercentage);
    if (cpuPercentage > CPU_RESTART_PER) restartServer();
  });
};

/**
 * Function to restart the server.
 */

const restartServer = () => {
  exec("ls -l", (error, stdout, stderr) => {
    // Executing shell command, This is for testing change that to `pm2 restart src/index.ts` working
    if (error) {
      console.error(`exec error: ${error}`);
      return;
    }
    console.log(`stdout: ${stdout}`);
    console.error(`stderr: ${stderr}`);
  });
};

module.exports = { checkCpuUsage };
