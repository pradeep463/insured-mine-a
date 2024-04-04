const mongoose = require("mongoose");

const scheduledInsertSchema = new mongoose.Schema({
  message: {
    type: String,
    required: true,
  },
  day: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  status: {
    type: Number,
    required: true,
    validate: {
      validator: Number.isInteger,
    },
  },
  createdAt: {
    type: Date,
    required: true,
  },
  updatedAt: {
    type: Date,
    required: true,
  },
});

const ScheduledInsertModel = mongoose.model(
  "ScheduledInsert",
  scheduledInsertSchema
);

module.exports = { ScheduledInsertModel };
