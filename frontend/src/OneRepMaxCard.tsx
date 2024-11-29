import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useCoreApiListLifts } from "./gen";
import { createOneRepMaxChartData } from "./lib/utils";

export default function Component() {
  const lifts = useCoreApiListLifts();
  if (lifts.isLoading) return "Loading...";
  if (
    lifts.error &&
    lifts.error.message === "Request failed with status code 401"
  ) {
    window.location.href = "/admin/login/?next=/";
    return null;
  }
  if (!lifts.data) return JSON.stringify(lifts.error);

  const oneRepMax = createOneRepMaxChartData(lifts.data);
  return (
    <Card className="max-w-[500px]">
      <CardHeader>
        <CardTitle>One Repetition Max</CardTitle>
        <CardDescription>
          Showing estimated one rep max for all exercises using Brzycki formula
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={oneRepMax.chartConfig}>
          <AreaChart
            accessibilityLayer
            data={oneRepMax.chartData}
            margin={{ left: 12, right: 12 }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <defs>
              {oneRepMax.exerciseList.map((e) => (
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

            {oneRepMax.exerciseList.map((e) => (
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
      </CardContent>
    </Card>
  );
}
