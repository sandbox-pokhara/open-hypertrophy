import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home/home";
import Login from "./pages/login/login";
import SignUp from "./pages/sign-up/sign-up";
import { SidebarProvider } from "./components/ui/sidebar";

const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: 0 } },
});

export default function App() {
  return (
    <SidebarProvider>
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <Routes>
            <Route path="/login/" element={<Login />} />
            <Route path="/sign-up/" element={<SignUp />} />
            <Route path="/" element={<Home />}></Route>
          </Routes>
        </QueryClientProvider>
      </BrowserRouter>
    </SidebarProvider>
  );
}
