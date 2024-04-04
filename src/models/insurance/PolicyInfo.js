const mongoose = require("mongoose");

const { Schema } = mongoose;

const policyInfoSchema = new Schema({
  policyNumber: {
    type: String,
    required: true,
  },
  policyStartDate: {
    type: Date,
    required: true,
  },
  policyEndDate: {
    type: Date,
    required: true,
  },
  policyCategoryId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  companyId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  agentId: {
    type: Schema.Types.ObjectId,
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

const PolicyInfoModel = mongoose.model("PolicyInfo", policyInfoSchema);

module.exports = { PolicyInfoModel };
    