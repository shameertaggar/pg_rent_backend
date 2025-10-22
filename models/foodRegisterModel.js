const { db } = require("../config/firebase");
const { Constants: C } = require("../utils/constants");

const FOOD_COLLECTION = "FoodRegister";

const foodModel = {
  async addEntry(data) {
    const timestamp = new Date();
    const entry = {
      ...data,
      created_at: timestamp,
      updated_at: timestamp,
    };
    const docRef = await db.collection(FOOD_COLLECTION).add(entry);
    return { id: docRef.id };
  },

  async getFoodAnalytics(ownerId, startDate, endDate) {
    // Get all properties owned by this owner
    const propertySnapshot = await db.collection(C.PROPERTY_COLLECTION)
      .where(C.OWNER_ID, "==", ownerId)
      .get();

    const propertyIds = propertySnapshot.docs.map(doc => doc.id);

    // Get food entries within date range
    const foodSnapshot = await db.collection(FOOD_COLLECTION)
      .where(C.PROPERTY_ID, "in", propertyIds.length > 0 ? propertyIds : ["none"])
      .where("date", ">=", startDate)
      .where("date", "<=", endDate)
      .get();

    const entries = foodSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    
    // Calculate analytics
    const analytics = {
      totalEntries: entries.length,
      totalPreparedFor: entries.reduce((sum, entry) => sum + (entry.people_prepared_for || 0), 0),
      totalActuallyAte: entries.reduce((sum, entry) => sum + (entry.people_actually_ate || 0), 0),
      totalWastage: 0,
      averageUtilization: 0,
      mealTypeBreakdown: {},
      dailyBreakdown: {},
      costAnalysis: {
        totalCost: entries.reduce((sum, entry) => sum + (entry.total_cost || 0), 0),
        costPerPersonPrepared: 0,
        costPerPersonActual: 0
      }
    };

    // Calculate wastage and utilization
    analytics.totalWastage = analytics.totalPreparedFor - analytics.totalActuallyAte;
    analytics.averageUtilization = analytics.totalPreparedFor > 0 
      ? (analytics.totalActuallyAte / analytics.totalPreparedFor) * 100 
      : 0;

    // Meal type breakdown
    entries.forEach(entry => {
      const mealType = entry.meal_type || 'unknown';
      if (!analytics.mealTypeBreakdown[mealType]) {
        analytics.mealTypeBreakdown[mealType] = {
          entries: 0,
          preparedFor: 0,
          actuallyAte: 0,
          utilization: 0
        };
      }
      analytics.mealTypeBreakdown[mealType].entries++;
      analytics.mealTypeBreakdown[mealType].preparedFor += entry.people_prepared_for || 0;
      analytics.mealTypeBreakdown[mealType].actuallyAte += entry.people_actually_ate || 0;
    });

    // Calculate utilization for each meal type
    Object.keys(analytics.mealTypeBreakdown).forEach(mealType => {
      const data = analytics.mealTypeBreakdown[mealType];
      data.utilization = data.preparedFor > 0 ? (data.actuallyAte / data.preparedFor) * 100 : 0;
    });

    // Daily breakdown
    entries.forEach(entry => {
      const date = entry.date;
      if (!analytics.dailyBreakdown[date]) {
        analytics.dailyBreakdown[date] = {
          preparedFor: 0,
          actuallyAte: 0,
          utilization: 0,
          entries: 0
        };
      }
      analytics.dailyBreakdown[date].preparedFor += entry.people_prepared_for || 0;
      analytics.dailyBreakdown[date].actuallyAte += entry.people_actually_ate || 0;
      analytics.dailyBreakdown[date].entries++;
    });

    // Calculate daily utilization
    Object.keys(analytics.dailyBreakdown).forEach(date => {
      const data = analytics.dailyBreakdown[date];
      data.utilization = data.preparedFor > 0 ? (data.actuallyAte / data.preparedFor) * 100 : 0;
    });

    // Cost analysis
    analytics.costAnalysis.costPerPersonPrepared = analytics.totalPreparedFor > 0 
      ? analytics.costAnalysis.totalCost / analytics.totalPreparedFor 
      : 0;
    analytics.costAnalysis.costPerPersonActual = analytics.totalActuallyAte > 0 
      ? analytics.costAnalysis.totalCost / analytics.totalActuallyAte 
      : 0;

    return analytics;
  },

  async getAllEntries(ownerId) {
    // Get all properties owned by this owner
    const propertySnapshot = await db.collection(C.PROPERTY_COLLECTION)
      .where(C.OWNER_ID, "==", ownerId)
      .get();

    const propertyIds = propertySnapshot.docs.map(doc => doc.id);

    // Get food entries associated with these property IDs
    const foodSnapshot = await db.collection(FOOD_COLLECTION)
      .where(C.PROPERTY_ID, "in", propertyIds.length > 0 ? propertyIds : ["none"])
      .get();

    return foodSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  },

  async getEntryByDate(ownerId, date) {
    // Get all properties owned by this owner
    const propertySnapshot = await db.collection(C.PROPERTY_COLLECTION)
      .where(C.OWNER_ID, "==", ownerId)
      .get();

    const propertyIds = propertySnapshot.docs.map(doc => doc.id);

    // Get food entries for specific date and properties
    const foodSnapshot = await db.collection(FOOD_COLLECTION)
      .where(C.PROPERTY_ID, "in", propertyIds.length > 0 ? propertyIds : ["none"])
      .where("date", "==", date)
      .get();

    return foodSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  },

  async updateEntry(id, data, ownerId) {
    const foodRef = db.collection(FOOD_COLLECTION).doc(id);
    const foodDoc = await foodRef.get();

    if (!foodDoc.exists) {
      throw new Error("Food entry not found");
    }

    const foodData = foodDoc.data();
    
    // Check if the property belongs to the owner
    const propertyDoc = await db.collection(C.PROPERTY_COLLECTION).doc(foodData.propertyId).get();
    if (!propertyDoc.exists || propertyDoc.data().ownerId !== ownerId) {
      throw new Error("Unauthorized");
    }

    data.updated_at = new Date();
    await foodRef.update(data);
    return { message: "Entry updated successfully" };
  },

  async deleteEntry(id, ownerId) {
    const foodRef = db.collection(FOOD_COLLECTION).doc(id);
    const foodDoc = await foodRef.get();

    if (!foodDoc.exists) {
      throw new Error("Food entry not found");
    }

    const foodData = foodDoc.data();
    
    // Check if the property belongs to the owner
    const propertyDoc = await db.collection(C.PROPERTY_COLLECTION).doc(foodData.propertyId).get();
    if (!propertyDoc.exists || propertyDoc.data().ownerId !== ownerId) {
      throw new Error("Unauthorized");
    }

    await foodRef.delete();
    return { message: "Entry deleted successfully" };
  }
};

module.exports = foodModel;
