import { ModeToggle } from "@/components/mode-toggle";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { aai_logo_1 } from "../../assets/index.js";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

export default function Navbar() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      const student = jwtDecode(accessToken);
      if (!student) {
        localStorage.removeItem("accessToken");
      } else {
        setIsLoggedIn(true);
      }
    }
  }, []);
  return (
    <div className="fixed w-full bg-neutral-300 z-30 backdrop-blur-md dark:bg-neutral-950 flex justify-between items-center p-2">
      <div>
        <Link to="/">
          <img src={aai_logo_1} className="h-12 mx-4" alt="aai_logo" />
        </Link>
      </div>
      <NavigationMenu>
        <NavigationMenuList className="text-xl">
          <NavigationMenuItem>
            <NavLink
              to="/auth/login"
              className={({ isActive }) =>
                isActive ? "text-orange-400 mx-4" : "mx-4"
              }
            >
              Login
            </NavLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavLink
              to="/auth/register"
              className={({ isActive }) =>
                isActive ? "text-orange-400 mx-4" : "mx-4"
              }
            >
              Signup
            </NavLink>
          </NavigationMenuItem>
          {isLoggedIn && (
            <NavigationMenuItem>
              <NavLink
                to="/student"
                className="text-primary font-semibold ml-10"
              >
                Dashboard
              </NavLink>
            </NavigationMenuItem>
          )}
        </NavigationMenuList>
      </NavigationMenu>
      <div className="mr-4">
        <ModeToggle />
      </div>
    </div>
  );
}
