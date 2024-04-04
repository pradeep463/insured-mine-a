const mongoose = require("mongoose");

const { Schema } = mongoose;

const agentSchema = new Schema({
  name: {
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

const AgentModel = mongoose.model("Agents", agentSchema);

module.exports = { AgentModel };
