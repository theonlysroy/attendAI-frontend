let chartData = [
  { month: "January", totalClass: 0, attendedClass: 0 },
  { month: "February", totalClass: 0, attendedClass: 0 },
  { month: "March", totalClass: 0, attendedClass: 0 },
  { month: "April", totalClass: 0, attendedClass: 0 },
  { month: "May", totalClass: 0, attendedClass: 0 },
  { month: "June", totalClass: 0, attendedClass: 0 },
  { month: "July", totalClass: 0, attendedClass: 0 },
  { month: "August", totalClass: 0, attendedClass: 0 },
  { month: "September", totalClass: 0, attendedClass: 0 },
  { month: "October", totalClass: 0, attendedClass: 0 },
  { month: "November", totalClass: 0, attendedClass: 0 },
  { month: "December", totalClass: 0, attendedClass: 0 },
];

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

import {
  ChartContainer,
  ChartConfig,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
const chartConfig = {
  totalClass: {
    label: "Total Classes",
    color: "hsl(var(--primary))",
  },
  attendedClass: {
    label: "Classes Attended",
    color: "hsl(var(--muted-foreground))",
  },
} satisfies ChartConfig;

export default function Report() {
  const navigate = useNavigate();
  const [reportData, setReportData] = useState([chartData]);
  async function getReport() {
    const response = await axios.get("http://localhost:8000/auth/dashboard", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });
    const attendances = response.data.data.attendances;
    const currentMonth = monthNames[new Date().getMonth()];
    const currentReportData = [];

    monthNames.map((month) => {
      if (month === currentMonth) {
        currentReportData.push({
          month: month,
          totalClass: 15,
          attendedClass: attendances,
        });
      } else {
        currentReportData.push({
          month: month,
          totalClass: 15,
          attendedClass: 0,
        });
      }
    });
    setReportData(currentReportData);
  }
  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      const student = jwtDecode(accessToken);
      if (!student) {
        localStorage.removeItem("accessToken");
        navigate("/auth/login");
      } else {
        getReport();
        navigate("/student/report");
      }
    } else {
      navigate("/auth/login");
    }
  }, []);
  return (
    <main className="flex flex-col gap-10 justify-center items-center m-auto h-full">
      <ChartContainer
        config={chartConfig}
        className="max-w-2xl min-h-[25vw] text-xl"
      >
        <BarChart accessibilityLayer data={reportData}>
          <CartesianGrid color="hsl(var(--border))" vertical={true} />
          <XAxis
            dataKey="month"
            tickLine={false}
            tickMargin={10}
            axisLine={false}
            tickFormatter={(value) => value.slice(0, 3)}
          />
          <ChartTooltip content={<ChartTooltipContent />} />
          <ChartLegend content={<ChartLegendContent />} />
          <Bar dataKey="totalClass" fill="var(--color-totalClass)" radius={4} />
          <Bar
            dataKey="attendedClass"
            fill="var(--color-attendedClass)"
            radius={4}
          />
        </BarChart>
      </ChartContainer>
    </main>
  );
}
