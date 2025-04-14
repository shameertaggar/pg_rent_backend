const { db } = require("../config/firebase");
const ISSUE_COLLECTION = "Issues";

const issueModel = {
  async reportIssue(data) {
    const timestamp = new Date();
    const issue = {
      ...data,
      status: "pending",
      reported_at: timestamp,
      created_at: timestamp,
      updated_at: timestamp,
      resolved_at: null,
    };
    const docRef = await db.collection(ISSUE_COLLECTION).add(issue);
    return { id: docRef.id };
  },

  async getAllIssues(pg_id) {
    let query = db.collection(ISSUE_COLLECTION);
    if (pg_id) query = query.where("pg_id", "==", pg_id);
    const snapshot = await query.get();
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  },

  async getIssueById(id) {
    const doc = await db.collection(ISSUE_COLLECTION).doc(id).get();
    if (!doc.exists) throw new Error("Issue not found");
    return { id: doc.id, ...doc.data() };
  },

  async updateIssue(id, data) {
    data.updated_at = new Date();

    // If marking as resolved, add resolved_at timestamp
    if (data.status === "resolved") {
      data.resolved_at = new Date();
    }

    await db.collection(ISSUE_COLLECTION).doc(id).update(data);
    return { message: "Issue updated successfully" };
  },

  async deleteIssue(id) {
    await db.collection(ISSUE_COLLECTION).doc(id).delete();
    return { message: "Issue deleted successfully" };
  }
};

module.exports = issueModel;
