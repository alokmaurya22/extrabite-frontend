import * as React from "react";
import { BarChart } from "@mui/x-charts/BarChart";

const data = [
    { year: "2020", hungry: 800, wastage: 950 },
    { year: "2021", hungry: 820, wastage: 970 },
    { year: "2022", hungry: 850, wastage: 1000 },
    { year: "2023", hungry: 880, wastage: 1020 },
    { year: "2024", hungry: 910, wastage: 1050 },
  ];
export default function BasicBars() {
  return (

    


    <div className="flex flex-col items-center bg-[#0A0D14] p-5">
      {/* Custom Legend */}
     

     



<BarChart
      series={[
        { data: data.map((d) => d.hungry), label: "Hungry People (M)", color: "#ff7401" },
        { data: data.map((d) => d.wastage), label: "Food Wastage (M Tons)", color: "#fff" },
      ]}
      xAxis={[{ scaleType: "band", data: data.map((d) => d.year) }]}
      sx={{
        "& .MuiChartsAxis-root line": { stroke: "white" },
        "& .MuiChartsAxis-tickLabel": { fill: "white !important" },
        "& .MuiChartsBar-root text": { fill: "white !important" },
      }}
      width={600}
      height={400}
      legend={{ hidden: true }}
    />





      <div className="flex items-center space-x-5 mb-4">
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-orange-500"></div>
          <span className="text-white text-sm">Meal Waste</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-white"></div>
          <span className="text-white text-sm">Hungry People</span>
        </div>
      </div>
    </div>
  );
}
