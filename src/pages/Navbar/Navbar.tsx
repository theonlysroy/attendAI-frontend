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
import { Link, NavLink } from "react-router-dom";
import { aai_logo_1 } from "../../assets/index.js";

export default function Navbar() {
  return (
    <div className="fixed w-full bg-background border-b-2 flex justify-between items-center p-2">
      <div>
        <Link to="/">
          <img src={aai_logo_1} className="h-12 mx-4" alt="aai_logo" />
        </Link>
      </div>
      <NavigationMenu>
        <NavigationMenuList>
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
              Register
            </NavLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavLink
              to="/auth/admin"
              className={({ isActive }) =>
                isActive ? "text-orange-400 mx-4" : "mx-4"
              }
            >
              Admin
            </NavLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
      <div className="mr-4">
        <ModeToggle />
      </div>
    </div>
  );
}
