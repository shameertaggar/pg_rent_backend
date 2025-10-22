const foodModel = require("../models/foodRegisterModel");
const { validateCreateFood, validateUpdateFood } = require("../utils/validators/foodValidator");

exports.createFoodEntry = async (req, res) => {
  try {
    const ownerId = req.user.ownerId;
    const foodData = {
      ...req.body,
      ownerId
    };
    
    const { error } = validateCreateFood(foodData);
    if (error) return res.status(400).json({ error: error.details[0].message });
    
    const result = await foodModel.addEntry(foodData);
    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAllFoodEntries = async (req, res) => {
  try {
    const ownerId = req.user.ownerId;
    const result = await foodModel.getAllEntries(ownerId);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getFoodEntryByDate = async (req, res) => {
  try {
    const ownerId = req.user.ownerId;
    const { date } = req.query;
    const result = await foodModel.getEntryByDate(ownerId, date);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateFoodEntry = async (req, res) => {
  try {
    const ownerId = req.user.ownerId;
    const updateData = {
      ...req.body,
      ownerId
    };
    
    const { error } = validateUpdateFood(updateData);
    if (error) return res.status(400).json({ error: error.details[0].message });
    
    const result = await foodModel.updateEntry(req.params.id, req.body, ownerId);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteFoodEntry = async (req, res) => {
  try {
    const ownerId = req.user.ownerId;
    const result = await foodModel.deleteEntry(req.params.id, ownerId);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getFoodAnalytics = async (req, res) => {
  try {
    const ownerId = req.user.ownerId;
    const { startDate, endDate } = req.query;
    
    // Default to last 30 days if no dates provided
    const defaultEndDate = new Date();
    const defaultStartDate = new Date();
    defaultStartDate.setDate(defaultStartDate.getDate() - 30);
    
    const start = startDate || defaultStartDate.toISOString().split('T')[0];
    const end = endDate || defaultEndDate.toISOString().split('T')[0];
    
    const analytics = await foodModel.getFoodAnalytics(ownerId, start, end);
    res.status(200).json(analytics);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getKitchenOptimizationInsights = async (req, res) => {
  try {
    const ownerId = req.user.ownerId;
    const { startDate, endDate } = req.query;
    
    // Default to last 30 days if no dates provided
    const defaultEndDate = new Date();
    const defaultStartDate = new Date();
    defaultStartDate.setDate(defaultStartDate.getDate() - 30);
    
    const start = startDate || defaultStartDate.toISOString().split('T')[0];
    const end = endDate || defaultEndDate.toISOString().split('T')[0];
    
    const analytics = await foodModel.getFoodAnalytics(ownerId, start, end);
    
    // Generate optimization insights
    const insights = {
      summary: {
        totalWastage: analytics.totalWastage,
        averageUtilization: Math.round(analytics.averageUtilization * 100) / 100,
        costEfficiency: Math.round(analytics.costAnalysis.costPerPersonActual * 100) / 100
      },
      recommendations: [],
      trends: {
        mealTypePerformance: {},
        dailyPatterns: {}
      }
    };

    // Generate recommendations based on analytics
    if (analytics.averageUtilization < 70) {
      insights.recommendations.push({
        type: 'wastage_reduction',
        priority: 'high',
        message: `Your food utilization is ${Math.round(analytics.averageUtilization)}%. Consider reducing preparation quantities by ${Math.round((70 - analytics.averageUtilization) / 10)}% to minimize wastage.`,
        impact: 'cost_savings'
      });
    }

    if (analytics.averageUtilization > 95) {
      insights.recommendations.push({
        type: 'insufficient_food',
        priority: 'medium',
        message: `Your food utilization is ${Math.round(analytics.averageUtilization)}%. You might be under-preparing food. Consider increasing quantities slightly.`,
        impact: 'customer_satisfaction'
      });
    }

    // Analyze meal type performance
    Object.keys(analytics.mealTypeBreakdown).forEach(mealType => {
      const data = analytics.mealTypeBreakdown[mealType];
      insights.trends.mealTypePerformance[mealType] = {
        utilization: Math.round(data.utilization * 100) / 100,
        wastage: data.preparedFor - data.actuallyAte,
        recommendation: data.utilization < 70 ? 'reduce_quantity' : data.utilization > 95 ? 'increase_quantity' : 'maintain'
      };
    });

    // Analyze daily patterns
    Object.keys(analytics.dailyBreakdown).forEach(date => {
      const data = analytics.dailyBreakdown[date];
      insights.trends.dailyPatterns[date] = {
        utilization: Math.round(data.utilization * 100) / 100,
        preparedFor: data.preparedFor,
        actuallyAte: data.actuallyAte
      };
    });

    // Cost optimization insights
    if (analytics.costAnalysis.costPerPersonActual > analytics.costAnalysis.costPerPersonPrepared * 1.2) {
      insights.recommendations.push({
        type: 'cost_optimization',
        priority: 'medium',
        message: `Your actual cost per person (₹${Math.round(analytics.costAnalysis.costPerPersonActual)}) is significantly higher than prepared cost (₹${Math.round(analytics.costAnalysis.costPerPersonPrepared)}). Focus on reducing wastage.`,
        impact: 'cost_savings'
      });
    }

    res.status(200).json(insights);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
