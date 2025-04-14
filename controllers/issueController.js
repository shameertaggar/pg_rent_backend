const issueModel = require("../models/issueModel");

exports.reportIssue = async (req, res) => {
  try {
    const result = await issueModel.reportIssue(req.body);
    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAllIssues = async (req, res) => {
  try {
    const pg_id = req.query.pg_id;
    const result = await issueModel.getAllIssues(pg_id);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getIssue = async (req, res) => {
  try {
    const result = await issueModel.getIssueById(req.params.id);
    res.status(200).json(result);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};

exports.updateIssue = async (req, res) => {
  try {
    const result = await issueModel.updateIssue(req.params.id, req.body);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteIssue = async (req, res) => {
  try {
    const result = await issueModel.deleteIssue(req.params.id);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
