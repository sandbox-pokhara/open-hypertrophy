import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import OneRepMaxCard from "@/OneRepMaxCard";
const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: 2 } },
});

export default function App() {
  return (
    <div className="m-2">
      <QueryClientProvider client={queryClient}>
        <OneRepMaxCard />
      </QueryClientProvider>
    </div>
  );
}
