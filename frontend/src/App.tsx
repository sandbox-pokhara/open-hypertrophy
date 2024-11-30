import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";

const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: 2 } },
});

export default function App() {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <div className="m-2">
          <Routes>
            <Route path="/login/" element={<Login />} />
            <Route path="/" element={<Home />}></Route>
          </Routes>
        </div>
      </QueryClientProvider>
    </BrowserRouter>
  );
}
