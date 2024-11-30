import { format, parseISO, eachDayOfInterval } from "date-fns";

import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { LiftSchema } from "@/gen";
import { ChartConfig } from "@/components/ui/chart";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

type ChartData = {
  date: string;
  value: number;
};

export function createOneRepMaxChartData(
  data: LiftSchema[],
  exerciseId: number
) {
  // Extract dates and group data by date and exercise
  const groupedByDate: Record<string, number> = {};
  const uniqueExercises: Set<number> = new Set();
  const exerciseIdToNameMap: Record<number, string> = {};

  data.forEach((entry) => {
    if (entry.date === undefined) return;
    uniqueExercises.add(entry.exercise);
    exerciseIdToNameMap[entry.exercise] = entry.exercise__name;
    if (entry.exercise !== exerciseId) return;
    const date = entry.date.split("T")[0]; // Extract only the date part
    groupedByDate[date] = Math.round(
      (entry.weight || 0) / (1.0278 - 0.0278 * (entry.repitions || 0))
    );
  });

  const exerciseIds = Array.from(uniqueExercises);

  // Find min and max dates
  const allDates = Object.keys(groupedByDate).map((date) => parseISO(date));
  const minDate = new Date(Math.min(...allDates.map((d) => d.getTime())));
  const maxDate = new Date(Math.max(...allDates.map((d) => d.getTime())));

  // Generate all dates in the range
  const dateRange = eachDayOfInterval({ start: minDate, end: maxDate });

  // Fill missing dates with the last known lift values
  const chartData: ChartData[] = [];

  let lastKnownValue = 0;

  dateRange.forEach((date) => {
    const formattedDate = format(date, "yyyy-MM-dd");

    if (groupedByDate[formattedDate]) {
      // Update last known values with the current date's values
      lastKnownValue = groupedByDate[formattedDate];
    }

    // Add to the result, using last known values for missing lifts
    chartData.push({
      date: formattedDate,
      value: lastKnownValue,
    });
  });

  const chartConfig: ChartConfig = {
    value: {
      label: exerciseIdToNameMap[exerciseId],
      color: "hsl(var(--chart-1))",
    },
  };
  return { exerciseIds, exerciseIdToNameMap, chartConfig, chartData };
}
