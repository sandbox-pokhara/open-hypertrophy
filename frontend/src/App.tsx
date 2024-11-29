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
        {/* This is a temporary solution // Add a frontend form to add a lift */}
        <a
          href="/admin/core/lift/add/"
          target="_blank"
          rel="noreferrer"
          className="font-medium underline underline-offset-4"
        >
          Add a Lift
        </a>
      </QueryClientProvider>
    </div>
  );
}
