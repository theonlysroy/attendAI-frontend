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

export default function Navbar() {
  return (
    <div className="flex justify-between items-center border px-2 py-1 rounded-lg">
      <div>
        <Link to="/">attendAI</Link>
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
              to="/admin"
              className={({ isActive }) =>
                isActive ? "text-orange-400 mx-4" : "mx-4"
              }
            >
              Admin
            </NavLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
      <ModeToggle />
    </div>
  );
}
