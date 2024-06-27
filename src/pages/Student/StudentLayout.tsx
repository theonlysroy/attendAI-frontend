import { ModeToggle } from "@/components/mode-toggle";
import { aai_logo_1 } from "../../assets/index.js";
import { Link, Outlet } from "react-router-dom";
import Sidebar from "../Sidebar/Sidebar";

export default function StudentLayout() {
  return (
    <div className="w-full min-h-screen flex flex-col">
      {/* navbar */}
      <div className="sticky top-0 w-full flex justify-between border-b p-2 mt-2 bg-background">
        <Link to="/">
          <img
            src={aai_logo_1}
            alt="aai logo"
            className="h-12 mx-4 hover:cursor-pointer hover:scale-110 transition-all"
          />
        </Link>
        <div className="mr-4 mt-1">
          <ModeToggle />
        </div>
      </div>

      {/* content */}
      <div className="flex">
        <div className="w-64 fixed left-0 h-full">
          <Sidebar />
        </div>
        <div
          className={`flex flex-1 min-h-screen flex-col gap-4 sm:gap-6 sm:pl-64`}
        >
          <Outlet />
        </div>
      </div>
    </div>
  );
}
