import OneRepMaxCard from "./OneRepMaxCard";

export default function Home() {
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
    </div>
  );
}
