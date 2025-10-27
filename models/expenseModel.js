const { db } = require("../config/firebase");
const { Constants: C } = require("../utils/constants");

const EXPENSE_COLLECTION = "Expenses";

const ExpenseModel = {
  async createExpense(data) {
    const docRef = await db.collection(EXPENSE_COLLECTION).add({
      ...data,
      expense_date: data.expense_date || new Date(),
      created_at: new Date(),
      updated_at: new Date(),
    });
    return docRef.id;
  },

  
  async getAllExpenses(ownerId) {
    // Get all properties owned by this owner
    const propertySnapshot = await db.collection(C.PROPERTY_COLLECTION)
      .where(C.OWNER_ID, "==", ownerId)
      .get();

    const propertyIds = propertySnapshot.docs.map(doc => doc.id);

    // Get expenses associated with these property IDs
    const expenseSnapshot = await db.collection(EXPENSE_COLLECTION)
      .where(C.PROPERTY_ID, "in", propertyIds.length > 0 ? propertyIds : ["none"])
      .get();

    return expenseSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  },

  async getExpenseById(id, ownerId) {
    const doc = await db.collection(EXPENSE_COLLECTION).doc(id).get();
    if (!doc.exists) return null;
    
    const expenseData = doc.data();
    
    // Check if the property belongs to the owner
    const propertyDoc = await db.collection(C.PROPERTY_COLLECTION).doc(expenseData.propertyId).get();
    if (!propertyDoc.exists || propertyDoc.data().ownerId !== ownerId) return null;

    return { id: doc.id, ...expenseData };
  },

  async updateExpense(id, data, ownerId) {
    const expenseRef = db.collection(EXPENSE_COLLECTION).doc(id);
    const expenseDoc = await expenseRef.get();

    if (!expenseDoc.exists) {
      throw new Error("Expense not found");
    }

    const expenseData = expenseDoc.data();
    
    // Check if the property belongs to the owner
    const propertyDoc = await db.collection(C.PROPERTY_COLLECTION).doc(expenseData.propertyId).get();
    if (!propertyDoc.exists || propertyDoc.data().ownerId !== ownerId) {
      throw new Error("Unauthorized");
    }

    await expenseRef.update({
      ...data,
      updated_at: new Date(),
    });
  },

  async deleteExpense(id, ownerId) {
    const expenseRef = db.collection(EXPENSE_COLLECTION).doc(id);
    const expenseDoc = await expenseRef.get();

    if (!expenseDoc.exists) {
      throw new Error("Expense not found");
    }

    const expenseData = expenseDoc.data();
    
    // Check if the property belongs to the owner
    const propertyDoc = await db.collection(C.PROPERTY_COLLECTION).doc(expenseData.propertyId).get();
    if (!propertyDoc.exists || propertyDoc.data().ownerId !== ownerId) {
      throw new Error("Unauthorized");
    }

    await expenseRef.delete();
  }
};

module.exports = ExpenseModel;
