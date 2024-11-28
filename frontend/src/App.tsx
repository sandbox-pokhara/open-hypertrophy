import { useCoreApiListLifts } from "./gen";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

function OneRepMaxCard() {
  const lifts = useCoreApiListLifts();

  return lifts.isLoading ? "Loading..." : JSON.stringify(lifts.data);
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <OneRepMaxCard />
    </QueryClientProvider>
  );
}
