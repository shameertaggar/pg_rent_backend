# 📊 **Profit/Loss Analysis API Documentation**

## 🎯 **Overview**

The Profit/Loss Analysis API provides comprehensive financial insights by analyzing rent collection, expenses, and deposits across all properties. This feature helps property owners understand their financial performance, identify trends, and make informed business decisions.

---

## 📋 **API Endpoints**

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/profit-loss/analysis` | Get comprehensive profit/loss analysis |
| GET | `/api/profit-loss/summary` | Get profit/loss summary for dashboard |
| GET | `/api/profit-loss/property/:propertyId` | Get property-specific analysis |
| GET | `/api/profit-loss/trends/monthly` | Get monthly profit/loss trends |
| GET | `/api/profit-loss/expenses/categories` | Get expense category analysis |
| GET | `/api/profit-loss/recommendations` | Get financial recommendations |

---

## 🚀 **Curl Requests**

### **1. Comprehensive Profit/Loss Analysis**
```bash
curl -X GET "http://localhost:3000/api/profit-loss/analysis" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJvd25lcklkIjoiUXNQR2Nqa3B3WlRLQkNDS2Z6QmsiLCJuYW1lIjoiU2hhbWVlciIsImVtYWlsIjoic2hhbWVlcnRhZ2dhcnJAZ21haWwuY29tIiwiaWF0IjoxNzYxMTQ0NzYzLCJleHAiOjE3NjE3NDk1NjN9.mclsgekbHHd0UqedGH_BLo-YapwBobDD9yhh3S1XOdQ"
```

### **2. Analysis with Date Range**
```bash
curl -X GET "http://localhost:3000/api/profit-loss/analysis?startDate=2024-01-01&endDate=2024-12-31" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJvd25lcklkIjoiUXNQR2Nqa3B3WlRLQkNDS2Z6QmsiLCJuYW1lIjoiU2hhbWVlciIsImVtYWlsIjoic2hhbWVlcnRhZ2dhcnJAZ21haWwuY29tIiwiaWF0IjoxNzYxMTQ0NzYzLCJleHAiOjE3NjE3NDk1NjN9.mclsgekbHHd0UqedGH_BLo-YapwBobDD9yhh3S1XOdQ"
```

### **3. Dashboard Summary - Current Month**
```bash
curl -X GET "http://localhost:3000/api/profit-loss/summary?period=current_month" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJvd25lcklkIjoiUXNQR2Nqa3B3WlRLQkNDS2Z6QmsiLCJuYW1lIjoiU2hhbWVlciIsImVtYWlsIjoic2hhbWVlcnRhZ2dhcnJAZ21haWwuY29tIiwiaWF0IjoxNzYxMTQ0NzYzLCJleHAiOjE3NjE3NDk1NjN9.mclsgekbHHd0UqedGH_BLo-YapwBobDD9yhh3S1XOdQ"
```

### **4. Dashboard Summary - Last Year**
```bash
curl -X GET "http://localhost:3000/api/profit-loss/summary?period=last_year" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJvd25lcklkIjoiUXNQR2Nqa3B3WlRLQkNDS2Z6QmsiLCJuYW1lIjoiU2hhbWVlciIsImVtYWlsIjoic2hhbWVlcnRhZ2dhcnJAZ21haWwuY29tIiwiaWF0IjoxNzYxMTQ0NzYzLCJleHAiOjE3NjE3NDk1NjN9.mclsgekbHHd0UqedGH_BLo-YapwBobDD9yhh3S1XOdQ"
```

### **5. Property-Specific Analysis**
```bash
curl -X GET "http://localhost:3000/api/profit-loss/property/PROPERTY_ID_HERE" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJvd25lcklkIjoiUXNQR2Nqa3B3WlRLQkNDS2Z6QmsiLCJuYW1lIjoiU2hhbWVlciIsImVtYWlsIjoic2hhbWVlcnRhZ2dhcnJAZ21haWwuY29tIiwiaWF0IjoxNzYxMTQ0NzYzLCJleHAiOjE3NjE3NDk1NjN9.mclsgekbHHd0UqedGH_BLo-YapwBobDD9yhh3S1XOdQ"
```

### **6. Monthly Trends - Last 12 Months**
```bash
curl -X GET "http://localhost:3000/api/profit-loss/trends/monthly?months=12" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJvd25lcklkIjoiUXNQR2Nqa3B3WlRLQkNDS2Z6QmsiLCJuYW1lIjoiU2hhbWVlciIsImVtYWlsIjoic2hhbWVlcnRhZ2dhcnJAZ21haWwuY29tIiwiaWF0IjoxNzYxMTQ0NzYzLCJleHAiOjE3NjE3NDk1NjN9.mclsgekbHHd0UqedGH_BLo-YapwBobDD9yhh3S1XOdQ"
```

### **7. Monthly Trends - Last 6 Months**
```bash
curl -X GET "http://localhost:3000/api/profit-loss/trends/monthly?months=6" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJvd25lcklkIjoiUXNQR2Nqa3B3WlRLQkNDS2Z6QmsiLCJuYW1lIjoiU2hhbWVlciIsImVtYWlsIjoic2hhbWVlcnRhZ2dhcnJAZ21haWwuY29tIiwiaWF0IjoxNzYxMTQ0NzYzLCJleHAiOjE3NjE3NDk1NjN9.mclsgekbHHd0UqedGH_BLo-YapwBobDD9yhh3S1XOdQ"
```

### **8. Expense Category Analysis**
```bash
curl -X GET "http://localhost:3000/api/profit-loss/expenses/categories" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJvd25lcklkIjoiUXNQR2Nqa3B3WlRLQkNDS2Z6QmsiLCJuYW1lIjoiU2hhbWVlciIsImVtYWlsIjoic2hhbWVlcnRhZ2dhcnJAZ21haWwuY29tIiwiaWF0IjoxNzYxMTQ0NzYzLCJleHAiOjE3NjE3NDk1NjN9.mclsgekbHHd0UqedGH_BLo-YapwBobDD9yhh3S1XOdQ"
```

### **9. Expense Categories with Date Filter**
```bash
curl -X GET "http://localhost:3000/api/profit-loss/expenses/categories?startDate=2024-01-01&endDate=2024-12-31" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJvd25lcklkIjoiUXNQR2Nqa3B3WlRLQkNDS2Z6QmsiLCJuYW1lIjoiU2hhbWVlciIsImVtYWlsIjoic2hhbWVlcnRhZ2dhcnJAZ21haWwuY29tIiwiaWF0IjoxNzYxMTQ0NzYzLCJleHAiOjE3NjE3NDk1NjN9.mclsgekbHHd0UqedGH_BLo-YapwBobDD9yhh3S1XOdQ"
```

### **10. Financial Recommendations**
```bash
curl -X GET "http://localhost:3000/api/profit-loss/recommendations" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJvd25lcklkIjoiUXNQR2Nqa3B3WlRLQkNDS2Z6QmsiLCJuYW1lIjoiU2hhbWVlciIsImVtYWlsIjoic2hhbWVlcnRhZ2dhcnJAZ21haWwuY29tIiwiaWF0IjoxNzYxMTQ0NzYzLCJleHAiOjE3NjE3NDk1NjN9.mclsgekbHHd0UqedGH_BLo-YapwBobDD9yhh3S1XOdQ"
```

### **11. Recommendations with Date Filter**
```bash
curl -X GET "http://localhost:3000/api/profit-loss/recommendations?startDate=2024-01-01&endDate=2024-12-31" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJvd25lcklkIjoiUXNQR2Nqa3B3WlRLQkNDS2Z6QmsiLCJuYW1lIjoiU2hhbWVlciIsImVtYWlsIjoic2hhbWVlcnRhZ2dhcnJAZ21haWwuY29tIiwiaWF0IjoxNzYxMTQ0NzYzLCJleHAiOjE3NjE3NDk1NjN9.mclsgekbHHd0UqedGH_BLo-YapwBobDD9yhh3S1XOdQ"
```

---

## 🔍 **Query Parameters**

### **Available Filter Options**
| Parameter | Type | Description | Example |
|-----------|------|-------------|---------|
| `startDate` | date | Analysis start date | `2024-01-01` |
| `endDate` | date | Analysis end date | `2024-12-31` |
| `propertyId` | string | Specific property ID | `property_123` |
| `category` | string | Expense category filter | `maintenance` |
| `period` | string | Predefined period | `current_month`, `last_month`, `current_year`, `last_year` |
| `months` | number | Number of months for trends | `6`, `12`, `24` |

---

## 📊 **Response Formats**

### **1. Comprehensive Analysis Response**
```json
{
  "success": true,
  "data": {
    "summary": {
      "totalRevenue": 150000,
      "totalExpenses": 45000,
      "totalDeposits": 30000,
      "netProfit": 105000,
      "profitMargin": 70.0,
      "totalProperties": 3,
      "analysisPeriod": {
        "startDate": "2024-01-01",
        "endDate": "2024-12-31"
      }
    },
    "revenue": {
      "rentCollection": {
        "totalAmount": 120000,
        "totalRecords": 36,
        "averagePerRecord": 3333.33,
        "monthlyBreakdown": {
          "2024-01": 10000,
          "2024-02": 10000
        },
        "propertyBreakdown": {
          "property_1": 40000,
          "property_2": 40000,
          "property_3": 40000
        }
      },
      "deposits": {
        "totalAmount": 30000,
        "totalRecords": 10,
        "averagePerRecord": 3000,
        "propertyBreakdown": {
          "property_1": 10000,
          "property_2": 10000,
          "property_3": 10000
        }
      }
    },
    "expenses": {
      "totalAmount": 45000,
      "totalRecords": 25,
      "averagePerRecord": 1800,
      "categoryBreakdown": {
        "maintenance": 15000,
        "utilities": 10000,
        "staff": 20000
      },
      "propertyBreakdown": {
        "property_1": 15000,
        "property_2": 15000,
        "property_3": 15000
      },
      "monthlyBreakdown": {
        "2024-01": 3750,
        "2024-02": 3750
      }
    },
    "propertyAnalysis": {
      "property_1": {
        "propertyName": "Sunshine Apartments",
        "totalRevenue": 50000,
        "rentCollection": 40000,
        "deposits": 10000,
        "totalExpenses": 15000,
        "netProfit": 35000,
        "profitMargin": 70.0
      }
    },
    "monthlyAnalysis": {
      "2024-01": {
        "revenue": 10000,
        "expenses": 3750,
        "profit": 6250,
        "profitMargin": 62.5
      }
    },
    "categoryAnalysis": {
      "maintenance": {
        "totalAmount": 15000,
        "percentage": 33.33
      }
    },
    "trends": {
      "revenueTrend": "increasing",
      "expenseTrend": "stable",
      "profitTrend": "increasing"
    }
  },
  "filters": {
    "startDate": "2024-01-01",
    "endDate": "2024-12-31"
  },
  "generatedAt": "2024-01-15T10:30:00.000Z"
}
```

### **2. Dashboard Summary Response**
```json
{
  "success": true,
  "data": {
    "period": "current_month",
    "summary": {
      "totalRevenue": 12500,
      "totalExpenses": 3750,
      "totalDeposits": 2500,
      "netProfit": 8750,
      "profitMargin": 70.0,
      "totalProperties": 3
    },
    "topPerformingProperty": {
      "propertyName": "Sunshine Apartments",
      "totalRevenue": 5000,
      "netProfit": 3500,
      "profitMargin": 70.0
    },
    "topExpenseCategory": {
      "name": "maintenance",
      "totalAmount": 1500,
      "percentage": 40.0
    },
    "trends": {
      "revenueTrend": "increasing",
      "expenseTrend": "stable",
      "profitTrend": "increasing"
    }
  },
  "period": "current_month",
  "generatedAt": "2024-01-15T10:30:00.000Z"
}
```

### **3. Property-Specific Analysis Response**
```json
{
  "success": true,
  "data": {
    "property": {
      "id": "property_123",
      "name": "Sunshine Apartments",
      "address": "123 Main Street"
    },
    "summary": {
      "totalRevenue": 50000,
      "totalExpenses": 15000,
      "netProfit": 35000,
      "profitMargin": 70.0
    },
    "revenue": {
      "rentCollection": 40000,
      "deposits": 10000
    },
    "expenses": {
      "totalAmount": 15000,
      "categoryBreakdown": {
        "maintenance": 5000,
        "utilities": 3000,
        "staff": 7000
      }
    }
  },
  "filters": {},
  "generatedAt": "2024-01-15T10:30:00.000Z"
}
```

### **4. Monthly Trends Response**
```json
{
  "success": true,
  "data": {
    "trends": [
      {
        "month": "2024-01",
        "revenue": 10000,
        "expenses": 3750,
        "profit": 6250,
        "profitMargin": 62.5
      },
      {
        "month": "2024-02",
        "revenue": 10500,
        "expenses": 3800,
        "profit": 6700,
        "profitMargin": 63.8
      }
    ],
    "summary": {
      "averageMonthlyRevenue": 10250,
      "averageMonthlyExpenses": 3775,
      "averageMonthlyProfit": 6475,
      "totalMonths": 12
    },
    "overallTrends": {
      "revenueTrend": "increasing",
      "expenseTrend": "stable",
      "profitTrend": "increasing"
    }
  },
  "period": {
    "startDate": "2023-02-01",
    "endDate": "2024-01-31",
    "months": 12
  },
  "generatedAt": "2024-01-15T10:30:00.000Z"
}
```

### **5. Expense Category Analysis Response**
```json
{
  "success": true,
  "data": {
    "categories": [
      {
        "category": "maintenance",
        "totalAmount": 15000,
        "percentage": 33.33,
        "averagePerRecord": 1500
      },
      {
        "category": "staff",
        "totalAmount": 20000,
        "percentage": 44.44,
        "averagePerRecord": 2000
      },
      {
        "category": "utilities",
        "totalAmount": 10000,
        "percentage": 22.22,
        "averagePerRecord": 1000
      }
    ],
    "summary": {
      "totalCategories": 3,
      "topCategory": {
        "category": "staff",
        "totalAmount": 20000,
        "percentage": 44.44
      },
      "totalExpenses": 45000
    }
  },
  "filters": {},
  "generatedAt": "2024-01-15T10:30:00.000Z"
}
```

### **6. Financial Recommendations Response**
```json
{
  "success": true,
  "data": {
    "recommendations": [
      {
        "type": "profit_margin",
        "priority": "high",
        "title": "Low Profit Margin",
        "description": "Current profit margin is 15.50%. Consider increasing rent or reducing expenses.",
        "action": "Review rent pricing and expense optimization opportunities"
      },
      {
        "type": "expense_optimization",
        "priority": "medium",
        "title": "High Expense Category",
        "description": "maintenance expenses account for 45.00% of total expenses.",
        "action": "Review and optimize expenses in this category"
      }
    ],
    "analysis": {
      "profitMargin": 15.5,
      "totalRevenue": 100000,
      "totalExpenses": 84500,
      "netProfit": 15500
    }
  },
  "filters": {},
  "generatedAt": "2024-01-15T10:30:00.000Z"
}
```

---

## 🎯 **Testing Scenarios**

### **1. Complete Analysis Testing Sequence**

```bash
# Step 1: Get comprehensive analysis
curl -X GET "http://localhost:3000/api/profit-loss/analysis" \
  -H "Authorization: Bearer YOUR_TOKEN"

# Step 2: Get dashboard summary
curl -X GET "http://localhost:3000/api/profit-loss/summary?period=current_month" \
  -H "Authorization: Bearer YOUR_TOKEN"

# Step 3: Get monthly trends
curl -X GET "http://localhost:3000/api/profit-loss/trends/monthly?months=12" \
  -H "Authorization: Bearer YOUR_TOKEN"

# Step 4: Get expense categories
curl -X GET "http://localhost:3000/api/profit-loss/expenses/categories" \
  -H "Authorization: Bearer YOUR_TOKEN"

# Step 5: Get recommendations
curl -X GET "http://localhost:3000/api/profit-loss/recommendations" \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### **2. Date Range Analysis**

```bash
# Current year analysis
curl -X GET "http://localhost:3000/api/profit-loss/analysis?startDate=2024-01-01&endDate=2024-12-31" \
  -H "Authorization: Bearer YOUR_TOKEN"

# Last quarter analysis
curl -X GET "http://localhost:3000/api/profit-loss/analysis?startDate=2024-10-01&endDate=2024-12-31" \
  -H "Authorization: Bearer YOUR_TOKEN"

# Specific month analysis
curl -X GET "http://localhost:3000/api/profit-loss/analysis?startDate=2024-01-01&endDate=2024-01-31" \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### **3. Property-Specific Analysis**

```bash
# Get analysis for specific property
curl -X GET "http://localhost:3000/api/profit-loss/property/PROPERTY_ID" \
  -H "Authorization: Bearer YOUR_TOKEN"

# Get property analysis with date filter
curl -X GET "http://localhost:3000/api/profit-loss/property/PROPERTY_ID?startDate=2024-01-01&endDate=2024-12-31" \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### **4. Different Period Summaries**

```bash
# Current month
curl -X GET "http://localhost:3000/api/profit-loss/summary?period=current_month" \
  -H "Authorization: Bearer YOUR_TOKEN"

# Last month
curl -X GET "http://localhost:3000/api/profit-loss/summary?period=last_month" \
  -H "Authorization: Bearer YOUR_TOKEN"

# Current year
curl -X GET "http://localhost:3000/api/profit-loss/summary?period=current_year" \
  -H "Authorization: Bearer YOUR_TOKEN"

# Last year
curl -X GET "http://localhost:3000/api/profit-loss/summary?period=last_year" \
  -H "Authorization: Bearer YOUR_TOKEN"
```

---

## 🚨 **Error Testing**

### **1. Invalid Date Format**
```bash
curl -X GET "http://localhost:3000/api/profit-loss/analysis?startDate=invalid-date" \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### **2. End Date Before Start Date**
```bash
curl -X GET "http://localhost:3000/api/profit-loss/analysis?startDate=2024-12-31&endDate=2024-01-01" \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### **3. Invalid Period**
```bash
curl -X GET "http://localhost:3000/api/profit-loss/summary?period=invalid_period" \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### **4. Invalid Months Parameter**
```bash
curl -X GET "http://localhost:3000/api/profit-loss/trends/monthly?months=50" \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### **5. Non-existent Property**
```bash
curl -X GET "http://localhost:3000/api/profit-loss/property/non_existent_property" \
  -H "Authorization: Bearer YOUR_TOKEN"
```

---

## 📊 **Expected Status Codes**

| Status Code | Description |
|-------------|-------------|
| 200 | Success - Analysis generated successfully |
| 400 | Bad Request - Invalid parameters or filters |
| 401 | Unauthorized - Invalid or missing JWT token |
| 403 | Forbidden - Property does not belong to owner |
| 404 | Not Found - Property not found |
| 500 | Internal Server Error - Server-side error |

---

## 🔧 **Key Features**

### **Financial Analysis**
- ✅ **Revenue Tracking**: Rent collection and deposit analysis
- ✅ **Expense Analysis**: Category-wise and property-wise breakdown
- ✅ **Profit Calculation**: Net profit and margin calculations
- ✅ **Trend Analysis**: Monthly and yearly trend identification

### **Property Management**
- ✅ **Property-wise Analysis**: Individual property performance
- ✅ **Multi-property Support**: Analysis across all properties
- ✅ **Performance Comparison**: Compare property performance

### **Business Intelligence**
- ✅ **Dashboard Summary**: Quick overview for decision making
- ✅ **Financial Recommendations**: AI-powered business suggestions
- ✅ **Category Analysis**: Expense optimization insights
- ✅ **Trend Forecasting**: Future performance predictions

### **Security Features**
- ✅ **JWT Authentication**: Secure access control
- ✅ **Owner Validation**: Data isolation by owner
- ✅ **Property Ownership**: Verify property ownership
- ✅ **Input Validation**: Comprehensive parameter validation

---

## 🎯 **Quick Test Commands**

```bash
# Quick analysis
curl -X GET "http://localhost:3000/api/profit-loss/analysis" -H "Authorization: Bearer YOUR_TOKEN"

# Dashboard summary
curl -X GET "http://localhost:3000/api/profit-loss/summary" -H "Authorization: Bearer YOUR_TOKEN"

# Monthly trends
curl -X GET "http://localhost:3000/api/profit-loss/trends/monthly" -H "Authorization: Bearer YOUR_TOKEN"

# Recommendations
curl -X GET "http://localhost:3000/api/profit-loss/recommendations" -H "Authorization: Bearer YOUR_TOKEN"
```

---

## 📈 **Business Value**

### **For Property Owners**
- **Financial Visibility**: Clear understanding of profit/loss
- **Performance Tracking**: Monitor property performance over time
- **Expense Optimization**: Identify areas for cost reduction
- **Revenue Optimization**: Understand revenue patterns and opportunities

### **For Business Growth**
- **Data-Driven Decisions**: Make informed business decisions
- **Trend Analysis**: Understand market and business trends
- **Resource Allocation**: Optimize resource distribution
- **Performance Benchmarking**: Compare performance across properties

### **For Financial Planning**
- **Budget Planning**: Plan budgets based on historical data
- **Investment Decisions**: Make informed investment choices
- **Risk Management**: Identify and mitigate financial risks
- **Growth Strategy**: Plan for business expansion

---

## 🚀 **Ready for Production**

The Profit/Loss Analysis API is fully functional and ready for production use with:
- **Comprehensive financial analysis** across all properties
- **Real-time data processing** from rent and expense records
- **Advanced business intelligence** with recommendations
- **Secure multi-tenant architecture** with proper data isolation
- **Complete API documentation** for easy integration
- **Robust error handling** and validation

This feature provides property owners with powerful financial insights to optimize their business performance and make data-driven decisions!
