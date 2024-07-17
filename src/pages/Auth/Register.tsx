import { Link, useNavigate } from "react-router-dom";
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
import { useState } from "react";
import axios from "axios";

// types
interface Student {
  fullName: string;
  email: string;
  password: string;
  address: string;
  contactNo: string;
  collegeRollNo: string;
  department: string;
  uniRollNo: string;
  uniRegdNo: string;
  avatar: File | null;
}

const Register: React.FC = () => {
  const [student, setStudent] = useState<Student>({
    fullName: "",
    email: "",
    password: "",
    address: "",
    contactNo: "",
    collegeRollNo: "",
    department: "",
    uniRollNo: "",
    uniRegdNo: "",
    avatar: null,
  });
  const [message, setMessage] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setStudent((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files === null) return;
    const files = e.target.files;
    setStudent((prev) => ({ ...prev, avatar: files[0] }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    const formData = new FormData();
    formData.append("fullName", student.fullName);
    formData.append("email", student.email);
    formData.append("password", student.password);
    formData.append("address", student.address);
    formData.append("contactNo", student.contactNo);
    formData.append("collegeRollNo", student.collegeRollNo);
    formData.append("department", student.department);
    formData.append("uniRollNo", student.uniRollNo);
    formData.append("uniRegdNo", student.uniRegdNo);
    if (student.avatar) {
      formData.append("avatar", student.avatar);
    }

    try {
      const response = await axios.post(
        "http://localhost:8000/auth/register",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setIsSubmitting(false);
      console.log(response.data.data);
      setMessage("Student registered successfully");
      setStudent({
        fullName: "",
        email: "",
        password: "",
        address: "",
        contactNo: "",
        collegeRollNo: "",
        department: "",
        uniRollNo: "",
        uniRegdNo: "",
        avatar: null,
      });
      setTimeout(() => {
        navigate("/auth/login");
      }, 2000);
    } catch (error) {
      console.error("register error", error);
      setIsSubmitting(false);
      setMessage("Something went wrong");
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    }
  };
  return (
    <div className="w-full flex justify-center items-center">
      <Card className="max-w-xl my-8">
        <CardHeader>
          <CardTitle className="text-2xl">Register</CardTitle>
          <CardDescription>
            Enter your details and create account in few simple steps.
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="fullName">Full name</Label>
                <Input
                  name="fullName"
                  type="text"
                  value={student.fullName}
                  onChange={handleInputChange}
                  placeholder="Alex Topo"
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  name="email"
                  type="email"
                  value={student.email}
                  onChange={handleInputChange}
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
                  name="password"
                  type="password"
                  value={student.password}
                  onChange={handleInputChange}
                  placeholder="******"
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="address">Address</Label>
                <Input
                  name="address"
                  type="text"
                  value={student.address}
                  onChange={handleInputChange}
                  placeholder="24 B.A. Street"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="contactNo">Contact No.</Label>
                  <Input
                    name="contactNo"
                    value={student.contactNo}
                    onChange={handleInputChange}
                    placeholder="+91 8902371877"
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="collegeRollNo">College Roll No.</Label>
                  <Input
                    name="collegeRollNo"
                    value={student.collegeRollNo}
                    onChange={handleInputChange}
                    placeholder="C/028"
                    required
                  />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="department">Department</Label>
                <Input
                  name="department"
                  value={student.department}
                  onChange={handleInputChange}
                  placeholder="CS(H)"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="uniRollNo">University Roll No.</Label>
                  <Input
                    name="uniRollNo"
                    value={student.uniRollNo}
                    onChange={handleInputChange}
                    placeholder="213135-21-0113"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="session">University Regd. No.</Label>
                  <Input
                    name="uniRegdNo"
                    value={student.uniRegdNo}
                    onChange={handleInputChange}
                    placeholder="135-1111-0631-21"
                  />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="avatar">Photo</Label>
                <Input name="avatar" onChange={handleFileChange} type="file" />
              </div>
              <Button type="submit" disabled={isSubmitting} className="w-full">
                Create an account
              </Button>
            </div>
            <div className="mt-4 text-center text-sm">
              Already have an account?{" "}
              <Link to="/auth/login" className="underline">
                Sign in
              </Link>
            </div>
            {isSubmitting && (
              <span className="text-lg text-foreground">Submitting...</span>
            )}
            {message && (
              <span className="text-sm text-green-500">{message}</span>
            )}
          </CardContent>
        </form>
      </Card>
    </div>
  );
};

export default Register;
