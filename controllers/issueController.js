const issueModel = require("../models/issueModel");
const { validateCreateIssue, validateUpdateIssue } = require("../utils/validators/issueValidator");

exports.reportIssue = async (req, res) => {
  try {
    const ownerId = req.user.ownerId;
    const issueData = {
      ...req.body,
      ownerId
    };
    
    const { error } = validateCreateIssue(issueData);
    if (error) return res.status(400).json({ error: error.details[0].message });
    
    const result = await issueModel.reportIssue(issueData);
    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAllIssues = async (req, res) => {
  try {
    const ownerId = req.user.ownerId;
    const result = await issueModel.getAllIssues(ownerId);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getIssue = async (req, res) => {
  try {
    const ownerId = req.user.ownerId;
    const result = await issueModel.getIssueById(req.params.id, ownerId);
    res.status(200).json(result);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};

exports.updateIssue = async (req, res) => {
  try {
    const ownerId = req.user.ownerId;
    const updateData = {
      ...req.body,
      ownerId
    };
    
    const { error } = validateUpdateIssue(updateData);
    if (error) return res.status(400).json({ error: error.details[0].message });
    
    const result = await issueModel.updateIssue(req.params.id, req.body, ownerId);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteIssue = async (req, res) => {
  try {
    const ownerId = req.user.ownerId;
    const result = await issueModel.deleteIssue(req.params.id, ownerId);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
