const { db } = require("../config/firebase");

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

  async getAllExpenses() {
    const snapshot = await db.collection(EXPENSE_COLLECTION).get();
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  },

  async getExpenseById(id) {
    const doc = await db.collection(EXPENSE_COLLECTION).doc(id).get();
    if (!doc.exists) return null;
    return { id: doc.id, ...doc.data() };
  },

  async updateExpense(id, data) {
    await db.collection(EXPENSE_COLLECTION).doc(id).update({
      ...data,
      updated_at: new Date(),
    });
  },

  async deleteExpense(id) {
    await db.collection(EXPENSE_COLLECTION).doc(id).delete();
  }
};

module.exports = ExpenseModel;
