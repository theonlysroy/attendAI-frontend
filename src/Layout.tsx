import { Outlet } from "react-router-dom";
import Navbar from "./pages/Navbar/Navbar";

export default function Layout() {
  return (
    <div className="grid h-screen w-full gap-10 sm:grid-rows-12">
      <div className="sm:row-span-1">
        <Navbar />
      </div>
      <div className="sm:row-span-11">
        <Outlet />
      </div>
    </div>
  );
}
