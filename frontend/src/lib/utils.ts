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
  [exercise: number]: number | string;
};

export function createOneRepMaxChartData(data: LiftSchema[], category: string) {
  // Extract dates and group data by date and exercise
  const groupedByDate: { [key: string]: { [exercise: number]: number } } = {};
  const uniqueExercises: Set<number> = new Set();
  const exerciseIdToNameMap: Record<number, string> = {};

  data.forEach((entry) => {
    if (entry.date === undefined) return;
    if (entry.exercise__category__name !== category) return;
    uniqueExercises.add(entry.exercise);
    exerciseIdToNameMap[entry.exercise] = entry.exercise__name;
    const date = entry.date.split("T")[0]; // Extract only the date part
    if (!groupedByDate[date]) {
      groupedByDate[date] = {};
    }
    groupedByDate[date][entry.exercise] = Math.round(
      (entry.weight || 0) / (1.0278 - 0.0278 * (entry.repetitions || 0))
    );
  });

  // Find min and max dates
  const allDates = Object.keys(groupedByDate).map((date) => parseISO(date));
  const minDate = new Date(Math.min(...allDates.map((d) => d.getTime())));
  const maxDate = new Date(Math.max(...allDates.map((d) => d.getTime())));

  // Generate all dates in the range
  const dateRange = eachDayOfInterval({ start: minDate, end: maxDate });

  // Fill missing dates with the last known lift values
  const chartData: ChartData[] = [];
  const exerciseIds = Array.from(uniqueExercises);

  let lastKnownValues: { [exercise: string]: number } = {};
  exerciseIds.forEach((i) => (lastKnownValues[i] = 0));

  dateRange.forEach((date) => {
    const formattedDate = format(date, "yyyy-MM-dd");

    if (groupedByDate[formattedDate]) {
      // Update last known values with the current date's values
      lastKnownValues = { ...lastKnownValues, ...groupedByDate[formattedDate] };
    }

    // Add to the result, using last known values for missing lifts
    chartData.push({
      date: formattedDate,
      ...lastKnownValues,
    });
  });
  const chartConfig: ChartConfig = {};

  exerciseIds.forEach(
    (e, i) =>
      (chartConfig[e] = {
        label: exerciseIdToNameMap[e],
        color: `hsl(var(--chart-${(i % 5) + 1}))`,
      })
  );
  return { exerciseIds, exerciseIdToNameMap, chartConfig, chartData };
}
