import { ModeToggle } from "@/components/mode-toggle";
import { aai_logo_1 } from "../../assets/index.js";
import { Link, Outlet } from "react-router-dom";
import Sidebar from "../Sidebar/Sidebar";

export default function StudentLayout() {
  return (
    <div className="w-full min-h-screen flex flex-col">
      {/* navbar */}
      <div className="sticky top-0 w-full flex justify-between border-b p-2 mt-4 bg-gradient-to-r from-primary to-secondary z-30">
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
      {/* <div className="flex"> */}
      {/* sidebar */}
      {/* <div className="w-64 fixed left-0 h-full"> */}
      {/* <Sidebar /> */}
      {/* </div> */}
      {/* main con */}
      {/* <div */}
      {/* className={`flex flex-1 min-h-screen flex-col gap-4 sm:gap-6 sm:pl-64`} */}
      {/* > */}
      {/* <Outlet /> */}
      {/* </div> */}
      {/* </div> */}
      <div className="w-full p-4 grid sm:grid-cols-12 h-screen">
        {/* sidebar */}
        <div className="relative h-full w-full sm:col-span-2">
          <div className="w-1/6 h-full fixed bg-transparent border-r">
            <Sidebar />
          </div>
        </div>
        {/* main content */}
        <div className="sm:col-span-10 flex-1">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
