const express = require("express");
const router = express.Router();
const authenticateJWT = require("../middlewares/authMiddleware");
const issueController = require("../controllers/issueController");

router.post("/", authenticateJWT, issueController.reportIssue);
router.get("/", authenticateJWT, issueController.getAllIssues); // optional ?pg_id=xxx
router.get("/:id", authenticateJWT, issueController.getIssue);
router.put("/:id", authenticateJWT, issueController.updateIssue);
router.delete("/:id", authenticateJWT, issueController.deleteIssue);

module.exports = router;
