import { Button } from "@/components/ui/button";
import OneRepMaxCard from "./OneRepMaxCard";
import { useCoreApiLogout } from "@/gen";
import { useNavigate } from "react-router-dom";

export default function Home() {
  let navigate = useNavigate();
  const logout = useCoreApiLogout({
    mutation: {
      onSuccess: () => {
        navigate("/login/");
      },
    },
  });
  return (
    <div>
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
      <Button onClick={() => logout.mutate()} disabled={logout.isPending}>
        {logout.isPending ? "Loading..." : "Logout"}
      </Button>
    </div>
  );
}
