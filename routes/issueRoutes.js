const express = require("express");
const router = express.Router();
const issueController = require("../controllers/issueController");

router.post("/", issueController.reportIssue);
router.get("/", issueController.getAllIssues); // optional ?pg_id=xxx
router.get("/:id", issueController.getIssue);
router.put("/:id", issueController.updateIssue);
router.delete("/:id", issueController.deleteIssue);

module.exports = router;
