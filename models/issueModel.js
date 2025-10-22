const { db } = require("../config/firebase");
const { Constants: C } = require("../utils/constants");

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

  async getAllIssues(ownerId) {
    // Get all properties owned by this owner
    const propertySnapshot = await db.collection(C.PROPERTY_COLLECTION)
      .where(C.OWNER_ID, "==", ownerId)
      .get();

    const propertyIds = propertySnapshot.docs.map(doc => doc.id);

    // Get issues associated with these property IDs
    const issueSnapshot = await db.collection(ISSUE_COLLECTION)
      .where(C.PROPERTY_ID, "in", propertyIds.length > 0 ? propertyIds : ["none"])
      .get();

    return issueSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  },

  async getIssueById(id, ownerId) {
    const doc = await db.collection(ISSUE_COLLECTION).doc(id).get();
    if (!doc.exists) throw new Error("Issue not found");
    
    const issueData = doc.data();
    
    // Check if the property belongs to the owner
    const propertyDoc = await db.collection(C.PROPERTY_COLLECTION).doc(issueData.propertyId).get();
    if (!propertyDoc.exists || propertyDoc.data().ownerId !== ownerId) {
      throw new Error("Unauthorized");
    }

    return { id: doc.id, ...issueData };
  },

  async updateIssue(id, data, ownerId) {
    const issueRef = db.collection(ISSUE_COLLECTION).doc(id);
    const issueDoc = await issueRef.get();

    if (!issueDoc.exists) {
      throw new Error("Issue not found");
    }

    const issueData = issueDoc.data();
    
    // Check if the property belongs to the owner
    const propertyDoc = await db.collection(C.PROPERTY_COLLECTION).doc(issueData.propertyId).get();
    if (!propertyDoc.exists || propertyDoc.data().ownerId !== ownerId) {
      throw new Error("Unauthorized");
    }

    data.updated_at = new Date();

    // If marking as resolved, add resolved_at timestamp
    if (data.status === "resolved") {
      data.resolved_at = new Date();
    }

    await issueRef.update(data);
    return { message: "Issue updated successfully" };
  },

  async deleteIssue(id, ownerId) {
    const issueRef = db.collection(ISSUE_COLLECTION).doc(id);
    const issueDoc = await issueRef.get();

    if (!issueDoc.exists) {
      throw new Error("Issue not found");
    }

    const issueData = issueDoc.data();
    
    // Check if the property belongs to the owner
    const propertyDoc = await db.collection(C.PROPERTY_COLLECTION).doc(issueData.propertyId).get();
    if (!propertyDoc.exists || propertyDoc.data().ownerId !== ownerId) {
      throw new Error("Unauthorized");
    }

    await issueRef.delete();
    return { message: "Issue deleted successfully" };
  }
};

module.exports = issueModel;
