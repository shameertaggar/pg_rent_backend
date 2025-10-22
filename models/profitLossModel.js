const { db } = require("../config/firebase");
const { Constants: C } = require("../utils/constants");

const PROFIT_LOSS_COLLECTION = "ProfitLossAnalysis";

const ProfitLossModel = {
  // Get comprehensive profit/loss analysis
  async getProfitLossAnalysis(ownerId, filters = {}) {
    try {
      // Get all properties owned by this owner
      const propertySnapshot = await db.collection(C.PROPERTY_COLLECTION)
        .where(C.OWNER_ID, "==", ownerId)
        .get();

      const propertyIds = propertySnapshot.docs.map(doc => doc.id);
      const properties = propertySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

      if (propertyIds.length === 0) {
        return this.getEmptyAnalysis();
      }

      // Get all rent records
      const rentSnapshot = await db.collection(C.RENT_COLLECTION)
        .where(C.PROPERTY_ID, "in", propertyIds)
        .get();

      // Get all expense records
      const expenseSnapshot = await db.collection(C.EXPENSE_COLLECTION)
        .where(C.PROPERTY_ID, "in", propertyIds)
        .get();

      // Get all booking records for deposit analysis
      const bookingSnapshot = await db.collection(C.BOOKING_COLLECTION)
        .where(C.PROPERTY_ID, "in", propertyIds)
        .get();

      const rentRecords = rentSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      const expenseRecords = expenseSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      const bookingRecords = bookingSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

      // Apply date filters if provided
      let filteredRent = rentRecords;
      let filteredExpenses = expenseRecords;
      let filteredBookings = bookingRecords;

      if (filters.startDate || filters.endDate) {
        const startDate = filters.startDate ? new Date(filters.startDate) : null;
        const endDate = filters.endDate ? new Date(filters.endDate) : null;

        filteredRent = rentRecords.filter(record => {
          const recordDate = new Date(record.payment_date || record.created_at);
          if (startDate && recordDate < startDate) return false;
          if (endDate && recordDate > endDate) return false;
          return true;
        });

        filteredExpenses = expenseRecords.filter(record => {
          const recordDate = new Date(record.expense_date || record.created_at);
          if (startDate && recordDate < startDate) return false;
          if (endDate && recordDate > endDate) return false;
          return true;
        });

        filteredBookings = bookingRecords.filter(record => {
          const recordDate = new Date(record.booking_date || record.created_at);
          if (startDate && recordDate < startDate) return false;
          if (endDate && recordDate > endDate) return false;
          return true;
        });
      }

      // Calculate comprehensive analysis
      const analysis = this.calculateProfitLossAnalysis(
        properties,
        filteredRent,
        filteredExpenses,
        filteredBookings,
        filters
      );

      return analysis;
    } catch (error) {
      throw new Error(`Failed to generate profit/loss analysis: ${error.message}`);
    }
  },

  // Calculate detailed profit/loss analysis
  calculateProfitLossAnalysis(properties, rentRecords, expenseRecords, bookingRecords, filters) {
    const analysis = {
      summary: {
        totalRevenue: 0,
        totalExpenses: 0,
        totalDeposits: 0,
        netProfit: 0,
        profitMargin: 0,
        totalProperties: properties.length,
        analysisPeriod: {
          startDate: filters.startDate || null,
          endDate: filters.endDate || null
        }
      },
      revenue: {
        rentCollection: {
          totalAmount: 0,
          totalRecords: 0,
          averagePerRecord: 0,
          monthlyBreakdown: {},
          propertyBreakdown: {}
        },
        deposits: {
          totalAmount: 0,
          totalRecords: 0,
          averagePerRecord: 0,
          propertyBreakdown: {}
        }
      },
      expenses: {
        totalAmount: 0,
        totalRecords: 0,
        averagePerRecord: 0,
        categoryBreakdown: {},
        propertyBreakdown: {},
        monthlyBreakdown: {}
      },
      propertyAnalysis: {},
      monthlyAnalysis: {},
      categoryAnalysis: {},
      trends: {
        revenueTrend: 'stable',
        expenseTrend: 'stable',
        profitTrend: 'stable'
      }
    };

    // Process rent records
    rentRecords.forEach(record => {
      const amount = record.amount || 0;
      const propertyId = record.propertyId;
      const paymentDate = new Date(record.payment_date || record.created_at);
      const monthKey = `${paymentDate.getFullYear()}-${String(paymentDate.getMonth() + 1).padStart(2, '0')}`;

      analysis.revenue.rentCollection.totalAmount += amount;
      analysis.revenue.rentCollection.totalRecords++;

      // Monthly breakdown
      if (!analysis.revenue.rentCollection.monthlyBreakdown[monthKey]) {
        analysis.revenue.rentCollection.monthlyBreakdown[monthKey] = 0;
      }
      analysis.revenue.rentCollection.monthlyBreakdown[monthKey] += amount;

      // Property breakdown
      if (!analysis.revenue.rentCollection.propertyBreakdown[propertyId]) {
        analysis.revenue.rentCollection.propertyBreakdown[propertyId] = 0;
      }
      analysis.revenue.rentCollection.propertyBreakdown[propertyId] += amount;
    });

    // Process booking deposits
    bookingRecords.forEach(record => {
      const depositAmount = record.deposit_amount || 0;
      const propertyId = record.propertyId;

      analysis.revenue.deposits.totalAmount += depositAmount;
      analysis.revenue.deposits.totalRecords++;

      // Property breakdown
      if (!analysis.revenue.deposits.propertyBreakdown[propertyId]) {
        analysis.revenue.deposits.propertyBreakdown[propertyId] = 0;
      }
      analysis.revenue.deposits.propertyBreakdown[propertyId] += depositAmount;
    });

    // Process expense records
    expenseRecords.forEach(record => {
      const amount = record.amount || 0;
      const category = record.category || 'uncategorized';
      const propertyId = record.propertyId;
      const expenseDate = new Date(record.expense_date || record.created_at);
      const monthKey = `${expenseDate.getFullYear()}-${String(expenseDate.getMonth() + 1).padStart(2, '0')}`;

      analysis.expenses.totalAmount += amount;
      analysis.expenses.totalRecords++;

      // Category breakdown
      if (!analysis.expenses.categoryBreakdown[category]) {
        analysis.expenses.categoryBreakdown[category] = 0;
      }
      analysis.expenses.categoryBreakdown[category] += amount;

      // Property breakdown
      if (!analysis.expenses.propertyBreakdown[propertyId]) {
        analysis.expenses.propertyBreakdown[propertyId] = 0;
      }
      analysis.expenses.propertyBreakdown[propertyId] += amount;

      // Monthly breakdown
      if (!analysis.expenses.monthlyBreakdown[monthKey]) {
        analysis.expenses.monthlyBreakdown[monthKey] = 0;
      }
      analysis.expenses.monthlyBreakdown[monthKey] += amount;
    });

    // Calculate totals
    analysis.summary.totalRevenue = analysis.revenue.rentCollection.totalAmount + analysis.revenue.deposits.totalAmount;
    analysis.summary.totalExpenses = analysis.expenses.totalAmount;
    analysis.summary.totalDeposits = analysis.revenue.deposits.totalAmount;
    analysis.summary.netProfit = analysis.summary.totalRevenue - analysis.summary.totalExpenses;
    analysis.summary.profitMargin = analysis.summary.totalRevenue > 0 
      ? (analysis.summary.netProfit / analysis.summary.totalRevenue) * 100 
      : 0;

    // Calculate averages
    analysis.revenue.rentCollection.averagePerRecord = analysis.revenue.rentCollection.totalRecords > 0 
      ? analysis.revenue.rentCollection.totalAmount / analysis.revenue.rentCollection.totalRecords 
      : 0;

    analysis.revenue.deposits.averagePerRecord = analysis.revenue.deposits.totalRecords > 0 
      ? analysis.revenue.deposits.totalAmount / analysis.revenue.deposits.totalRecords 
      : 0;

    analysis.expenses.averagePerRecord = analysis.expenses.totalRecords > 0 
      ? analysis.expenses.totalAmount / analysis.expenses.totalRecords 
      : 0;

    // Generate property-wise analysis
    properties.forEach(property => {
      const propertyId = property.id;
      const propertyRent = analysis.revenue.rentCollection.propertyBreakdown[propertyId] || 0;
      const propertyDeposits = analysis.revenue.deposits.propertyBreakdown[propertyId] || 0;
      const propertyExpenses = analysis.expenses.propertyBreakdown[propertyId] || 0;
      const propertyRevenue = propertyRent + propertyDeposits;
      const propertyProfit = propertyRevenue - propertyExpenses;

      analysis.propertyAnalysis[propertyId] = {
        propertyName: property.propertyName,
        totalRevenue: propertyRevenue,
        rentCollection: propertyRent,
        deposits: propertyDeposits,
        totalExpenses: propertyExpenses,
        netProfit: propertyProfit,
        profitMargin: propertyRevenue > 0 ? (propertyProfit / propertyRevenue) * 100 : 0
      };
    });

    // Generate monthly analysis
    const allMonths = new Set([
      ...Object.keys(analysis.revenue.rentCollection.monthlyBreakdown),
      ...Object.keys(analysis.expenses.monthlyBreakdown)
    ]);

    allMonths.forEach(month => {
      const monthlyRent = analysis.revenue.rentCollection.monthlyBreakdown[month] || 0;
      const monthlyExpenses = analysis.expenses.monthlyBreakdown[month] || 0;
      const monthlyProfit = monthlyRent - monthlyExpenses;

      analysis.monthlyAnalysis[month] = {
        revenue: monthlyRent,
        expenses: monthlyExpenses,
        profit: monthlyProfit,
        profitMargin: monthlyRent > 0 ? (monthlyProfit / monthlyRent) * 100 : 0
      };
    });

    // Generate category analysis
    Object.keys(analysis.expenses.categoryBreakdown).forEach(category => {
      const categoryAmount = analysis.expenses.categoryBreakdown[category];
      analysis.categoryAnalysis[category] = {
        totalAmount: categoryAmount,
        percentage: analysis.expenses.totalAmount > 0 
          ? (categoryAmount / analysis.expenses.totalAmount) * 100 
          : 0
      };
    });

    // Calculate trends (simplified)
    analysis.trends = this.calculateTrends(analysis.monthlyAnalysis);

    return analysis;
  },

  // Calculate trends based on monthly data
  calculateTrends(monthlyAnalysis) {
    const months = Object.keys(monthlyAnalysis).sort();
    if (months.length < 2) {
      return { revenueTrend: 'stable', expenseTrend: 'stable', profitTrend: 'stable' };
    }

    const recentMonths = months.slice(-3); // Last 3 months
    const olderMonths = months.slice(-6, -3); // Previous 3 months

    const recentAvgRevenue = recentMonths.reduce((sum, month) => sum + (monthlyAnalysis[month].revenue || 0), 0) / recentMonths.length;
    const olderAvgRevenue = olderMonths.length > 0 
      ? olderMonths.reduce((sum, month) => sum + (monthlyAnalysis[month].revenue || 0), 0) / olderMonths.length 
      : recentAvgRevenue;

    const recentAvgExpenses = recentMonths.reduce((sum, month) => sum + (monthlyAnalysis[month].expenses || 0), 0) / recentMonths.length;
    const olderAvgExpenses = olderMonths.length > 0 
      ? olderMonths.reduce((sum, month) => sum + (monthlyAnalysis[month].expenses || 0), 0) / olderMonths.length 
      : recentAvgExpenses;

    const recentAvgProfit = recentMonths.reduce((sum, month) => sum + (monthlyAnalysis[month].profit || 0), 0) / recentMonths.length;
    const olderAvgProfit = olderMonths.length > 0 
      ? olderMonths.reduce((sum, month) => sum + (monthlyAnalysis[month].profit || 0), 0) / olderMonths.length 
      : recentAvgProfit;

    const getTrend = (recent, older) => {
      const change = ((recent - older) / older) * 100;
      if (change > 5) return 'increasing';
      if (change < -5) return 'decreasing';
      return 'stable';
    };

    return {
      revenueTrend: getTrend(recentAvgRevenue, olderAvgRevenue),
      expenseTrend: getTrend(recentAvgExpenses, olderAvgExpenses),
      profitTrend: getTrend(recentAvgProfit, olderAvgProfit)
    };
  },

  // Get empty analysis structure
  getEmptyAnalysis() {
    return {
      summary: {
        totalRevenue: 0,
        totalExpenses: 0,
        totalDeposits: 0,
        netProfit: 0,
        profitMargin: 0,
        totalProperties: 0,
        analysisPeriod: {
          startDate: null,
          endDate: null
        }
      },
      revenue: {
        rentCollection: {
          totalAmount: 0,
          totalRecords: 0,
          averagePerRecord: 0,
          monthlyBreakdown: {},
          propertyBreakdown: {}
        },
        deposits: {
          totalAmount: 0,
          totalRecords: 0,
          averagePerRecord: 0,
          propertyBreakdown: {}
        }
      },
      expenses: {
        totalAmount: 0,
        totalRecords: 0,
        averagePerRecord: 0,
        categoryBreakdown: {},
        propertyBreakdown: {},
        monthlyBreakdown: {}
      },
      propertyAnalysis: {},
      monthlyAnalysis: {},
      categoryAnalysis: {},
      trends: {
        revenueTrend: 'stable',
        expenseTrend: 'stable',
        profitTrend: 'stable'
      }
    };
  },

  // Get profit/loss summary for dashboard
  async getProfitLossSummary(ownerId, period = 'current_month') {
    try {
      let startDate, endDate;
      const now = new Date();

      switch (period) {
        case 'current_month':
          startDate = new Date(now.getFullYear(), now.getMonth(), 1);
          endDate = new Date(now.getFullYear(), now.getMonth() + 1, 0);
          break;
        case 'last_month':
          startDate = new Date(now.getFullYear(), now.getMonth() - 1, 1);
          endDate = new Date(now.getFullYear(), now.getMonth(), 0);
          break;
        case 'current_year':
          startDate = new Date(now.getFullYear(), 0, 1);
          endDate = new Date(now.getFullYear(), 11, 31);
          break;
        case 'last_year':
          startDate = new Date(now.getFullYear() - 1, 0, 1);
          endDate = new Date(now.getFullYear() - 1, 11, 31);
          break;
        default:
          startDate = new Date(now.getFullYear(), now.getMonth(), 1);
          endDate = new Date(now.getFullYear(), now.getMonth() + 1, 0);
      }

      const analysis = await this.getProfitLossAnalysis(ownerId, {
        startDate: startDate.toISOString().split('T')[0],
        endDate: endDate.toISOString().split('T')[0]
      });

      return {
        period: period,
        summary: analysis.summary,
        topPerformingProperty: this.getTopPerformingProperty(analysis.propertyAnalysis),
        topExpenseCategory: this.getTopExpenseCategory(analysis.categoryAnalysis),
        trends: analysis.trends
      };
    } catch (error) {
      throw new Error(`Failed to generate profit/loss summary: ${error.message}`);
    }
  },

  // Get top performing property
  getTopPerformingProperty(propertyAnalysis) {
    const properties = Object.values(propertyAnalysis);
    if (properties.length === 0) return null;

    return properties.reduce((top, current) => 
      current.netProfit > top.netProfit ? current : top
    );
  },

  // Get top expense category
  getTopExpenseCategory(categoryAnalysis) {
    const categories = Object.entries(categoryAnalysis);
    if (categories.length === 0) return null;

    return categories.reduce((top, [name, data]) => 
      data.totalAmount > top.totalAmount ? { name, ...data } : top,
      { name: '', totalAmount: 0 }
    );
  }
};

module.exports = ProfitLossModel;
