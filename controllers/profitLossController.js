const ProfitLossModel = require("../models/profitLossModel");
const { validateProfitLossFilters } = require("../utils/validators/profitLossValidator");

// Get comprehensive profit/loss analysis
exports.getProfitLossAnalysis = async (req, res) => {
  try {
    const ownerId = req.user.ownerId;
    const filters = req.query;

    // Validate filters
    const { error } = validateProfitLossFilters(filters);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    // Convert date strings to proper format
    if (filters.startDate) {
      filters.startDate = new Date(filters.startDate).toISOString().split('T')[0];
    }
    if (filters.endDate) {
      filters.endDate = new Date(filters.endDate).toISOString().split('T')[0];
    }

    const analysis = await ProfitLossModel.getProfitLossAnalysis(ownerId, filters);
    
    res.status(200).json({
      success: true,
      data: analysis,
      filters: filters,
      generatedAt: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({ 
      success: false,
      error: error.message 
    });
  }
};

// Get profit/loss summary for dashboard
exports.getProfitLossSummary = async (req, res) => {
  try {
    const ownerId = req.user.ownerId;
    const { period } = req.query;

    const validPeriods = ['current_month', 'last_month', 'current_year', 'last_year'];
    const analysisPeriod = validPeriods.includes(period) ? period : 'current_month';

    const summary = await ProfitLossModel.getProfitLossSummary(ownerId, analysisPeriod);
    
    res.status(200).json({
      success: true,
      data: summary,
      period: analysisPeriod,
      generatedAt: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({ 
      success: false,
      error: error.message 
    });
  }
};

// Get property-wise profit/loss analysis
exports.getPropertyProfitLoss = async (req, res) => {
  try {
    const ownerId = req.user.ownerId;
    const { propertyId } = req.params;
    const filters = req.query;

    // Validate property ownership
    const { db } = require("../config/firebase");
    const { Constants: C } = require("../utils/constants");
    
    const propertyDoc = await db.collection(C.PROPERTY_COLLECTION).doc(propertyId).get();
    if (!propertyDoc.exists) {
      return res.status(404).json({ 
        success: false,
        error: "Property not found" 
      });
    }

    const propertyData = propertyDoc.data();
    if (propertyData.ownerId !== ownerId) {
      return res.status(403).json({ 
        success: false,
        error: "Property does not belong to this owner" 
      });
    }

    // Get analysis for specific property
    const analysis = await ProfitLossModel.getProfitLossAnalysis(ownerId, {
      ...filters,
      propertyId: propertyId
    });

    // Filter analysis to show only this property
    const propertyAnalysis = {
      property: {
        id: propertyId,
        name: propertyData.propertyName,
        address: propertyData.address
      },
      summary: {
        totalRevenue: analysis.propertyAnalysis[propertyId]?.totalRevenue || 0,
        totalExpenses: analysis.propertyAnalysis[propertyId]?.totalExpenses || 0,
        netProfit: analysis.propertyAnalysis[propertyId]?.netProfit || 0,
        profitMargin: analysis.propertyAnalysis[propertyId]?.profitMargin || 0
      },
      revenue: {
        rentCollection: analysis.revenue.rentCollection.propertyBreakdown[propertyId] || 0,
        deposits: analysis.revenue.deposits.propertyBreakdown[propertyId] || 0
      },
      expenses: {
        totalAmount: analysis.expenses.propertyBreakdown[propertyId] || 0,
        categoryBreakdown: {}
      }
    };

    // Get expense categories for this property
    const expenseSnapshot = await db.collection(C.EXPENSE_COLLECTION)
      .where(C.PROPERTY_ID, "==", propertyId)
      .get();

    expenseSnapshot.docs.forEach(doc => {
      const expense = doc.data();
      const category = expense.category || 'uncategorized';
      const amount = expense.amount || 0;

      if (!propertyAnalysis.expenses.categoryBreakdown[category]) {
        propertyAnalysis.expenses.categoryBreakdown[category] = 0;
      }
      propertyAnalysis.expenses.categoryBreakdown[category] += amount;
    });

    res.status(200).json({
      success: true,
      data: propertyAnalysis,
      filters: filters,
      generatedAt: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({ 
      success: false,
      error: error.message 
    });
  }
};

// Get monthly profit/loss trends
exports.getMonthlyTrends = async (req, res) => {
  try {
    const ownerId = req.user.ownerId;
    const { months = 12 } = req.query;

    const monthsCount = parseInt(months);
    if (monthsCount < 1 || monthsCount > 24) {
      return res.status(400).json({ 
        success: false,
        error: "Months must be between 1 and 24" 
      });
    }

    // Calculate date range
    const endDate = new Date();
    const startDate = new Date();
    startDate.setMonth(endDate.getMonth() - monthsCount + 1);
    startDate.setDate(1);

    const analysis = await ProfitLossModel.getProfitLossAnalysis(ownerId, {
      startDate: startDate.toISOString().split('T')[0],
      endDate: endDate.toISOString().split('T')[0]
    });

    // Format monthly data for trends
    const monthlyTrends = Object.keys(analysis.monthlyAnalysis)
      .sort()
      .map(month => ({
        month: month,
        revenue: analysis.monthlyAnalysis[month].revenue,
        expenses: analysis.monthlyAnalysis[month].expenses,
        profit: analysis.monthlyAnalysis[month].profit,
        profitMargin: analysis.monthlyAnalysis[month].profitMargin
      }));

    res.status(200).json({
      success: true,
      data: {
        trends: monthlyTrends,
        summary: {
          averageMonthlyRevenue: monthlyTrends.reduce((sum, month) => sum + month.revenue, 0) / monthlyTrends.length,
          averageMonthlyExpenses: monthlyTrends.reduce((sum, month) => sum + month.expenses, 0) / monthlyTrends.length,
          averageMonthlyProfit: monthlyTrends.reduce((sum, month) => sum + month.profit, 0) / monthlyTrends.length,
          totalMonths: monthlyTrends.length
        },
        overallTrends: analysis.trends
      },
      period: {
        startDate: startDate.toISOString().split('T')[0],
        endDate: endDate.toISOString().split('T')[0],
        months: monthsCount
      },
      generatedAt: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({ 
      success: false,
      error: error.message 
    });
  }
};

// Get expense category analysis
exports.getExpenseCategoryAnalysis = async (req, res) => {
  try {
    const ownerId = req.user.ownerId;
    const filters = req.query;

    const analysis = await ProfitLossModel.getProfitLossAnalysis(ownerId, filters);

    // Format category analysis
    const categoryAnalysis = Object.entries(analysis.categoryAnalysis)
      .map(([category, data]) => ({
        category: category,
        totalAmount: data.totalAmount,
        percentage: data.percentage,
        averagePerRecord: data.totalAmount / (analysis.expenses.totalRecords || 1)
      }))
      .sort((a, b) => b.totalAmount - a.totalAmount);

    res.status(200).json({
      success: true,
      data: {
        categories: categoryAnalysis,
        summary: {
          totalCategories: categoryAnalysis.length,
          topCategory: categoryAnalysis[0] || null,
          totalExpenses: analysis.expenses.totalAmount
        }
      },
      filters: filters,
      generatedAt: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({ 
      success: false,
      error: error.message 
    });
  }
};

// Get financial recommendations
exports.getFinancialRecommendations = async (req, res) => {
  try {
    const ownerId = req.user.ownerId;
    const filters = req.query;

    const analysis = await ProfitLossModel.getProfitLossAnalysis(ownerId, filters);
    
    const recommendations = [];

    // Profit margin recommendations
    if (analysis.summary.profitMargin < 10) {
      recommendations.push({
        type: 'profit_margin',
        priority: 'high',
        title: 'Low Profit Margin',
        description: `Current profit margin is ${analysis.summary.profitMargin.toFixed(2)}%. Consider increasing rent or reducing expenses.`,
        action: 'Review rent pricing and expense optimization opportunities'
      });
    } else if (analysis.summary.profitMargin > 30) {
      recommendations.push({
        type: 'profit_margin',
        priority: 'low',
        title: 'High Profit Margin',
        description: `Excellent profit margin of ${analysis.summary.profitMargin.toFixed(2)}%. Consider reinvesting in property improvements.`,
        action: 'Consider property upgrades or expansion opportunities'
      });
    }

    // Expense category recommendations
    const topExpenseCategory = Object.entries(analysis.categoryAnalysis)
      .sort(([,a], [,b]) => b.totalAmount - a.totalAmount)[0];

    if (topExpenseCategory && topExpenseCategory[1].percentage > 40) {
      recommendations.push({
        type: 'expense_optimization',
        priority: 'medium',
        title: 'High Expense Category',
        description: `${topExpenseCategory[0]} expenses account for ${topExpenseCategory[1].percentage.toFixed(2)}% of total expenses.`,
        action: 'Review and optimize expenses in this category'
      });
    }

    // Trend recommendations
    if (analysis.trends.profitTrend === 'decreasing') {
      recommendations.push({
        type: 'trend_analysis',
        priority: 'high',
        title: 'Declining Profit Trend',
        description: 'Profit trend is decreasing. Immediate attention required.',
        action: 'Analyze recent changes and implement corrective measures'
      });
    }

    // Property performance recommendations
    const properties = Object.values(analysis.propertyAnalysis);
    const underperformingProperties = properties.filter(p => p.profitMargin < 5);
    
    if (underperformingProperties.length > 0) {
      recommendations.push({
        type: 'property_performance',
        priority: 'medium',
        title: 'Underperforming Properties',
        description: `${underperformingProperties.length} property(ies) have profit margins below 5%.`,
        action: 'Review underperforming properties for improvement opportunities'
      });
    }

    res.status(200).json({
      success: true,
      data: {
        recommendations: recommendations,
        analysis: {
          profitMargin: analysis.summary.profitMargin,
          totalRevenue: analysis.summary.totalRevenue,
          totalExpenses: analysis.summary.totalExpenses,
          netProfit: analysis.summary.netProfit
        }
      },
      filters: filters,
      generatedAt: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({ 
      success: false,
      error: error.message 
    });
  }
};
