import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useCoreApiListCategories, useCoreApiListLifts } from "../../gen";
import { createOneRepMaxChartData } from "../../lib/utils";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Component() {
  const navigate = useNavigate();
  const lifts = useCoreApiListLifts();
  const categories = useCoreApiListCategories();
  const [selectedCategoryIndex, setSelectedCategoryIndex] =
    useState<string>("0");

  if (lifts.error && lifts.error.detail === "Unauthorized.") {
    navigate("/login/");
  }
  if (categories.error && categories.error.detail === "Unauthorized.") {
    navigate("/login/");
  }
  if (lifts.error) return lifts.error.detail;
  if (lifts.data && lifts.data.length === 0) return "No lifts found.";
  if (categories.data && categories.data.length === 0)
    return "No exercise categories found.";
  if (
    lifts.isLoading ||
    categories.isLoading ||
    !lifts.data ||
    !categories.data
  )
    return "Loading...";

  const chart = createOneRepMaxChartData(
    lifts.data,
    categories.data[parseInt(selectedCategoryIndex)].name
  );

  return (
    <>
      <div className="grid flex-1 gap-1 text-center sm:text-left">
        <Select
          value={selectedCategoryIndex}
          onValueChange={setSelectedCategoryIndex}
        >
          <SelectTrigger
            className="w-[160px] rounded-lg sm:ml-auto"
            aria-label="Select a value"
          >
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="rounded-xl">
            {categories.data.map((c, i) => (
              <SelectItem key={i} value={i.toString()} className="rounded-lg">
                {c.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <ChartContainer
        config={chart.chartConfig}
        className="aspect-auto h-[250px] w-full"
      >
        <AreaChart
          accessibilityLayer
          data={chart.chartData}
          margin={{ left: 12, right: 12 }}
        >
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="date"
            tickLine={false}
            axisLine={false}
            tickMargin={8}
          />
          <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
          <defs>
            {chart.exerciseIds.map((e) => (
              <linearGradient
                key={e}
                id={`fillChart${e}`}
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop
                  offset="5%"
                  stopColor={`var(--color-${e}`}
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor={`var(--color-${e}`}
                  stopOpacity={0.1}
                />
              </linearGradient>
            ))}
          </defs>

          {chart.exerciseIds.map((e) => (
            <Area
              key={e}
              dataKey={e}
              type="linear"
              fill={`url(#fillChart${e})`}
              fillOpacity={0.4}
              stroke={`var(--color-${e}`}
            />
          ))}
          <ChartLegend content={<ChartLegendContent />} />
        </AreaChart>
      </ChartContainer>
    </>
  );
}
