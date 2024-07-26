import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axios from "axios";
import React, { useState } from "react";

export default function AdminLogin() {
  const [adminID, setAdminID] = useState("");
  const [password, setPassword] = useState("");

  const handleAdminLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const baseURL = "http://localhost:8000";
    try {
      const response = await axios.post(
        "http://localhost:8000/auth/admin/login",
        { adminID, password }
      );
      const { redirectURL } = response.data.data;
      if (redirectURL) {
        window.location.href = `${baseURL}${redirectURL}`;
      } else {
        window.location.href = "/auth/admin";
      }
    } catch (error) {
      alert("Invalid credentials");
      setTimeout(() => {
        window.location.href = "/auth/admin";
      }, 500);
    }
  };
  return (
    <div className="w-full h-full flex justify-center items-center">
      <Card className="mx-auto max-w-xl">
        <CardHeader>
          <CardTitle className="text-2xl">Admin Login</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleAdminLogin}>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="adminID">Admin ID</Label>
                <Input
                  id="adminID"
                  type="text"
                  value={adminID}
                  onChange={(e) => setAdminID(e.target.value)}
                  required
                />
              </div>
              <div className="grid gap-2">
                <div className="grid gap-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
              </div>
              <Button type="submit" className="w-full">
                Login
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
