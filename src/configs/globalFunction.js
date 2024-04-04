// const { getDayOfWeek } = require("../helpers/timings");
const {
  IScheduledInsert,
  ScheduledInsertModel,
} = require("../models/Schedule-insert");
const { scheduleJob } = require("node-schedule");

const csvtojson = require("csvtojson");
const fs = require("fs");
const { AgentModel } = require("../models/insurance/Agent");
const { UsersModel } = require("../models/insurance/Users");
const { AccountsModel } = require("../models/insurance/Accounts");
const { CategoryModel } = require("../models/insurance/Category");
const { CompanyModel } = require("../models/insurance/Company");
const { PolicyInfoModel } = require("../models/insurance/PolicyInfo");
const mongoose = require("mongoose");
const path = require("path");

const getDayOfWeek = (day) => {
  const dayOfWeek = [
    "sunday",
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
  ]
    .map((d) => d.toLowerCase())
    .indexOf(day.toLowerCase());
  return dayOfWeek;
};

const scheduledInsertFun = async (data) => {
  const { day, time } = data;
  const [hours, minutes] = time.split(":").map(Number);
  const dayOfWeek = getDayOfWeek(day);
  const scheduledTime = new Date();
  scheduledTime.setDate(
    scheduledTime.getDate() + ((dayOfWeek - scheduledTime.getDay() + 7) % 7)
  );
  scheduledTime.setHours(hours);
  scheduledTime.setMinutes(minutes);

  scheduleJob(scheduledTime, async function () {
    const scheduledData = await new ScheduledInsertModel({
      message: data.message,
      day: data.day,
      time: data.time,
      status: data.status,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
    });
    await scheduledData.save();
  });
  return true;
};

const processFile = async (file) => {
  const date = new Date();
  const workerScriptPath = path.join(__dirname, "..", "..", file.path);

  try {
    const csvData = await csvtojson().fromFile(workerScriptPath);
    for (let index = 0; index < csvData.length; index++) {
      const data = csvData[index];

      const savedAgentData = await AgentModel.findOneAndUpdate(
        { name: data.agent },
        { $setOnInsert: { status: 1, createdAt: date, updatedAt: date } },
        { upsert: true, new: true }
      );

      await AccountsModel.findOneAndUpdate(
        { name: data.account_name },
        { $setOnInsert: { status: 1, createdAt: date, updatedAt: date } },
        { upsert: true, new: true }
      );
      const categorySavedData = await CategoryModel.findOneAndUpdate(
        { name: data.category_name },
        { $setOnInsert: { status: 1, createdAt: date, updatedAt: date } },
        { upsert: true, new: true }
      );

      const companySavedData = await CompanyModel.findOneAndUpdate(
        { name: data.company_name },
        { $setOnInsert: { status: 1, createdAt: date, updatedAt: date } },
        { upsert: true, new: true }
      );

      const savedUserData = await UsersModel.findOneAndUpdate(
        {
          $or: [{ phone: data.phone }, { email: data.email }],
        },
        {
          $setOnInsert: {
            firstName: data.firstname,
            dob: data.dob,
            address: data.address,
            phone: data.phone,
            state: data.state,
            zipCode: data.zip,
            email: data.email,
            gender: data.gender,
            userType: data.userType,
            status: 1,
            createdAt: date,
            updatedAt: date,
          },
        },
        { upsert: true, new: true }
      );

      await PolicyInfoModel.findOneAndUpdate(
        { policyNumber: data.policy_number },
        {
          $setOnInsert: {
            policyNumber: data.policy_number,
            policyStartDate: data.policy_start_date,
            policyEndDate: data.policy_end_date,
            policyCategoryId: new mongoose.Types.ObjectId(
              categorySavedData?._id
            ),
            companyId: new mongoose.Types.ObjectId(companySavedData?._id),
            userId: new mongoose.Types.ObjectId(savedUserData?._id),
            agentId: new mongoose.Types.ObjectId(savedAgentData?._id),
            status: 1,
            createdAt: date,
            updatedAt: date,
          },
        },
        { upsert: true, new: true }
      );
    }
    console.log("Completed...");
  } catch (error) {
    console.error("Error reading CSV file:", error);
  }

  return true;
};

const genTask = () => {
  console.log("dsa");
};

module.exports = { scheduledInsertFun, processFile, genTask };
