# Statistics Components

This directory contains React components for displaying hunger and food waste statistics with real-time data from the Extrabite API.

## Components

### Core Components

- **SummaryCards** - Displays key metrics in card format
- **BarChart** - Shows hunger vs food waste comparison over time
- **LineChart** - Displays trends for hunger and food waste data
- **PieChart** - Shows food waste source breakdown
- **DailyComparisonCard** - Compares daily hunger vs potential food waste impact
- **DataTable** - Tabular data with sorting and export functionality
- **FilterPanel** - Controls for region, year range, and data type selection
- **StatisticsInsights** - Advanced analytics and strategic recommendations

### API Integration

All components now use real data from the Extrabite API endpoints:

- `/api/analytics/statistics/yearly` - Yearly data with filters
- `/api/analytics/statistics/growth-rate` - CAGR calculations
- `/api/analytics/statistics/daily-comparison` - Daily impact analysis
- `/api/analytics/statistics/food-waste-sources` - Waste source breakdown
- `/api/analytics/statistics/summary` - Dashboard summary data
- `/api/analytics/statistics/hunger-vs-foodwaste-bar` - Bar chart data

### Data Sources

The statistics are based on authoritative sources:

- **Hunger Data**: FAO SOFI Reports, Global Hunger Index
- **Food Waste Data**: UNEP Food Waste Index, MoFPI India
- **Time Period**: 2015-2025
- **Regions**: India, Global

### Key Features

1. **Real-time Data**: All data fetched from API endpoints
2. **Interactive Charts**: Responsive charts with tooltips and legends
3. **Advanced Analytics**: Trend analysis, efficiency ratios, and recommendations
4. **Export Functionality**: CSV export for data tables
5. **Responsive Design**: Works on desktop and mobile devices
6. **Loading States**: Proper loading and error handling
7. **Filter Controls**: Region, year range, and data type selection

### Usage Example

```jsx
import { useState, useEffect } from "react";
import {
  SummaryCards,
  BarChart,
  LineChart,
  StatisticsInsights,
} from "./statics_components";
import { getStatisticsSummary, getYearlyStatistics } from "../util/api";

const StatisticsPage = () => {
  const [summary, setSummary] = useState(null);
  const [yearlyData, setYearlyData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [summaryRes, yearlyRes] = await Promise.all([
          getStatisticsSummary({ region: "India", year: 2024 }),
          getYearlyStatistics({
            region: "India",
            startYear: 2020,
            endYear: 2024,
            dataType: "both",
          }),
        ]);
        setSummary(summaryRes);
        setYearlyData(yearlyRes);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <SummaryCards summary={summary} />
      <BarChart data={yearlyData} region="India" />
      <LineChart data={yearlyData} dataType="both" region="India" />
      <StatisticsInsights
        summary={summary}
        yearlyData={yearlyData}
        region="India"
      />
    </div>
  );
};
```

### Environment Variables

Make sure to set these environment variables:

```env
VITE_API_BASE_URL=https://your-api-domain.com/api
VITE_API_KEY=your-api-key
```

### Data Assumptions

- **Food Efficiency**: 0.5 kg of food per day feeds 1 person
- **Waste Distribution**: Households (61%), Food Services (26%), Retail (10%), Post-Harvest (3%)
- **CAGR Calculation**: Compound Annual Growth Rate from 2015-2025
- **Units**: Million people for hunger, Million/Billion tonnes for food waste

### Error Handling

Components include comprehensive error handling:

- Network errors
- Invalid data responses
- Missing required fields
- Loading states
- User-friendly error messages

### Performance

- Lazy loading of chart components
- Memoized calculations for expensive operations
- Efficient re-rendering with React hooks
- Optimized API calls with proper caching
