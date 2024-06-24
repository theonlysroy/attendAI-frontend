import { Link, Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import { ModeToggle } from "@/components/mode-toggle";

export default function StudentLayout() {
  return (
    <div className="w-full min-h-screen sm:grid-rows-12">
      <div className="border flex justify-between items-center p-4 row-span-1">
        <Link to="/">attendAI</Link>
        <ModeToggle />
      </div>
      <div className="row-span-11 flex min-h-screen w-full flex-col">
        <Sidebar />
        <Outlet />
      </div>
    </div>
  );
}
