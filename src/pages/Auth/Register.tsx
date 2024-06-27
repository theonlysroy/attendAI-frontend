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
import Webcam from "react-webcam";
export function Register() {
  return (
    <div className="w-full my-4 flex justify-center items-center">
      <Card className="max-w-xl">
        <CardHeader>
          <CardTitle className="text-2xl">Register</CardTitle>
          <CardDescription>
            Enter your details and create account in few simple steps.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="fullName">Full name</Label>
              <Input
                id="fullName"
                type="text"
                placeholder="Alex Topo"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                <Link
                  to="/auth/resetpass"
                  className="ml-auto inline-block text-sm underline"
                >
                  Forgot your password?
                </Link>
              </div>
              <Input
                id="password"
                type="password"
                placeholder="******"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="address">Address</Label>
              <Input
                id="address"
                type="text"
                placeholder="24 B.A. Street"
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="contactNo">Contact No.</Label>
                <Input id="contactNo" placeholder="+91 8902371877" required />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="collegeRollNo">College Roll No.</Label>
                <Input id="CollegeRollNo" placeholder="C/028" required />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="department">Department</Label>
                <Input id="department" placeholder="CS(H)" required />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="session">Session</Label>
                <Input id="session" placeholder="2021-24" required />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="uniRollNo">University Roll No.</Label>
                <Input id="uniRollNo" placeholder="213135-21-0113" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="session">University Regd. No.</Label>
                <Input id="uniRegdNo" placeholder="135-1111-0631-21" />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="photo">Photo</Label>
              <Input id="photo" type="file" />
            </div>
            <Button type="submit" className="w-full">
              Create an account
            </Button>
          </div>
          <div className="mt-4 text-center text-sm">
            Already have an account?{" "}
            <Link to="/auth/login" className="underline">
              Sign in
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
