import { Button } from "@/components/ui/button";
import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="flex flex-col gap-8 max-w-md mx-auto">
      <Button>
        <Link to="/admin">Admin Login</Link>
      </Button>
      <Button>
        <Link to="/auth/register">Student Register</Link>
      </Button>
      <Button>
        <Link to="/auth/login">Student Login</Link>
      </Button>
      <Button>
        <Link to="/student">Student Dashboard</Link>
      </Button>
    </div>
  );
}
