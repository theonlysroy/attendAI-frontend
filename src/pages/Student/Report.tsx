const chartData = [
  { month: "January", totalClass: 186, attendedClass: 80 },
  { month: "February", totalClass: 305, attendedClass: 200 },
  { month: "March", totalClass: 237, attendedClass: 120 },
  { month: "April", totalClass: 73, attendedClass: 190 },
  { month: "May", totalClass: 209, attendedClass: 130 },
  { month: "June", totalClass: 214, attendedClass: 140 },
];

import {
  ChartContainer,
  ChartConfig,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";
import { jwtDecode } from "jwt-decode";
import { useEffect } from "react";
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
  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    console.log(accessToken);
    if (accessToken) {
      const student = jwtDecode(accessToken);
      if (!student) {
        localStorage.removeItem("accessToken");
        navigate("/auth/login");
      } else {
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
        <BarChart accessibilityLayer data={chartData}>
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
