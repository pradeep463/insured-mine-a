const { scheduledInsert } = require("../controllers/task-2/schedule-insert");
// const { test } = require("../controllers/testController");
const {
  uploadCsv,
  getPolicyByUserName,
  getUsersPolicies,
} = require("../controllers/task-1/insurance");

const allRoutes = [
//   { method: "GET", isFileUpload: false, path: "/", handler: test },
  {
    method: "POST",
    isFileUpload: false,
    path: "/api/v1/task-2/scheduled-insert",
    handler: scheduledInsert,
  },
  {
    method: "POST",
    isFileUpload: true,
    path: "/api/v1/task-1/upload-csv",
    handler: uploadCsv,
  },
  {
    method: "GET",
    isFileUpload: false,
    path: "/api/v1/task-1/get-policy-by-username",
    handler: getPolicyByUserName,
  },
  {
    method: "GET",
    isFileUpload: false,
    path: "/api/v1/task-1/get-users-policies",
    handler: getUsersPolicies,
  },
];

module.exports = { allRoutes };
