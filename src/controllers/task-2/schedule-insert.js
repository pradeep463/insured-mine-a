const { scheduledInsertFun } = require("../../configs/globalFunction");
const schedule = require("node-schedule");

async function scheduledInsert(req, res) {
  let message = req?.body?.message || "";
  let day = req?.body?.day || "";
  let time = req?.body?.time || "";

  try {
    if (message && day && time) {
      const validDay =
        /^(Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday)$/i.test(
          day
        );

      const validTime = /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/.test(time);

      if (!validDay) {
        throw new Error(
          "Invalid day format. Please provide a valid day [Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday]."
        );
      }

      if (!validTime) {
        throw new Error(
          "Invalid time format. Please provide a valid time in HH:MM format (24-hour)."
        );
      }

      scheduledInsertFun({
        message: message,
        day: day,
        time: time,
        status: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      res.json({
        status: true,
        message: `Message inserting scheduled @${day}-${time}`,
        date: new Date(),
      });
    } else {
      throw new Error("Invalid Request [message,day,time]");
    }
  } catch (error) {
    res.json({
      status: false,
      message: error.toString(),
      date: new Date(),
    });
  }
}

module.exports = { scheduledInsert };
