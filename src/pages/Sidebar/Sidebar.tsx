import { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  BarChart4,
  CalendarCheck2,
  LayoutDashboard,
  LogOut,
  MessageSquareDot,
  NotepadText,
  PanelLeft,
  Settings,
  UserCheck2,
} from "lucide-react";

function Sidebar() {
  const navLinkIconActive =
    "flex items-center p-2 text-sm text-primary transition-all hover:text-primary";
  const navLinkIconInactive =
    "flex items-center p-2 text-sm text-muted-foreground transition-all hover:text-primary";
  const [isOpen, setIsOpen] = useState(true);
  const handleSidebarToggle = (e: any) => {
    e.preventDefault();
    setIsOpen(!isOpen);
  };
  return (
    <div
      className={`flex flex-col h-full border-r bg-muted/40 overflow-y-auto transition-all ease-in-out duration-500 ${isOpen ? "w-64" : "w-fit"}`}
    >
      <div className="flex flex-col flex-1 p-4 overflow-y-auto">
        <div className="flex items-center justify-between">
          <div className="text-2xl hover:text-muted-foreground">
            <PanelLeft
              size={28}
              strokeWidth={1.75}
              absoluteStrokeWidth
              onClick={handleSidebarToggle}
            />
          </div>
        </div>
        <div
          className={`mt-6 flex flex-col space-y-4 ${isOpen ? "" : "hidden"}`}
        >
          <NavLink
            to="/student"
            className="flex items-center p-2 text-sm text-foreground transition-all hover:text-primary"
          >
            <LayoutDashboard size={20} strokeWidth={1.75} absoluteStrokeWidth />
            <span className="ml-3">Dashboard</span>
          </NavLink>
          <NavLink
            to="/student/attendance"
            className={({ isActive }) =>
              isActive ? navLinkIconActive : navLinkIconInactive
            }
          >
            <UserCheck2 size={20} strokeWidth={1.75} absoluteStrokeWidth />
            <span className="ml-3">Attendance</span>
          </NavLink>
          <NavLink
            to="/student/routine"
            className={({ isActive }) =>
              isActive ? navLinkIconActive : navLinkIconInactive
            }
          >
            <CalendarCheck2 size={20} strokeWidth={1.75} absoluteStrokeWidth />
            <span className="ml-3">Routine</span>
          </NavLink>
          <NavLink
            to="/student/notices"
            className={({ isActive }) =>
              isActive ? navLinkIconActive : navLinkIconInactive
            }
          >
            <MessageSquareDot
              size={20}
              strokeWidth={1.75}
              absoluteStrokeWidth
            />
            <span className="ml-3">Notices</span>
          </NavLink>
          <NavLink
            to="/student/report"
            className={({ isActive }) =>
              isActive ? navLinkIconActive : navLinkIconInactive
            }
          >
            <BarChart4 size={20} strokeWidth={1.75} absoluteStrokeWidth />
            <span className="ml-3">Report</span>
          </NavLink>
        </div>
        <div
          className={`mt-20 flex flex-col space-y-4 ${isOpen ? "" : "hidden"}`}
        >
          <NavLink
            to="/student/profile"
            className={({ isActive }) =>
              isActive ? navLinkIconActive : navLinkIconInactive
            }
          >
            <Settings size={20} strokeWidth={1.75} absoluteStrokeWidth />
            <span className="ml-3">Profile</span>
          </NavLink>
          <NavLink
            to="/student/idcard"
            className={({ isActive }) =>
              isActive ? navLinkIconActive : navLinkIconInactive
            }
          >
            <NotepadText size={20} strokeWidth={1.75} absoluteStrokeWidth />
            <span className="ml-3">Download ID Card</span>
          </NavLink>
          <NavLink to="/student/logout" className={navLinkIconInactive}>
            <LogOut size={20} strokeWidth={1.75} absoluteStrokeWidth />
            <span className="ml-3">Logout</span>
          </NavLink>
        </div>
      </div>
    </div>
  );
}
export default Sidebar;
