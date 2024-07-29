import { Link, useNavigate } from "react-router-dom";
import {
  Activity,
  ArrowUpRight,
  BarChart,
  Book,
  BookA,
  CircleUser,
  CreditCard,
  DollarSign,
  Menu,
  Package2,
  Search,
  User2,
  Users,
  Users2,
} from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useEffect, useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

export default function Dashboard() {
  const navigate = useNavigate();
  const [students, setStudents] = useState("");
  const [teachers, setTeachers] = useState("");
  const [notices, setNotices] = useState([]);
  const [totalClasses, setTotalClasses] = useState(0);
  const [totalAttendances, setTotalAttendances] = useState(0);

  async function getDashboard() {
    const accessToken = localStorage.getItem("accessToken");
    const response = await axios.get("http://localhost:8000/auth/dashboard", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });
    // console.log(await response.data);
    setStudents(response.data.data.student);
    setTeachers(response.data.data.teacher);
    setNotices(response.data.data.notices);
    setTotalClasses(response.data.data.totalClasses);
    setTotalAttendances(response.data.data.attendances);
  }

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      const student = jwtDecode(token);
      if (!student) {
        localStorage.removeItem("accessToken");
        navigate("/auth/login");
      } else {
        getDashboard();
        navigate("/student");
      }
    } else {
      navigate("/auth/login");
    }
  }, []);
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
      <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
        <Card x-chunk="dashboard-01-chunk-0">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Registerd Students
            </CardTitle>
            <Users2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{students}</div>
            <p className="text-xs text-muted-foreground"></p>
          </CardContent>
        </Card>
        <Card x-chunk="dashboard-01-chunk-0">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Faculty Members
            </CardTitle>
            <Users2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{teachers}</div>
            <p className="text-xs text-muted-foreground"></p>
          </CardContent>
        </Card>
        <Card x-chunk="dashboard-01-chunk-2">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Your Attendances
            </CardTitle>
            <BarChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {totalAttendances === 0 ? "0" : totalAttendances}
            </div>
            <p className="text-xs text-muted-foreground"></p>
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
        <Card className="xl:col-span-2" x-chunk="dashboard-01-chunk-4">
          <CardHeader className="flex flex-row items-center">
            <div className="grid gap-2">
              <CardTitle>Notices</CardTitle>
              <CardDescription>
                Recent notices from the department.
              </CardDescription>
            </div>
            <Button asChild size="sm" className="ml-auto gap-1">
              <Link to="/student/notices">
                View All
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Notice</TableHead>
                  <TableHead className="text-right">Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {notices.map((notice: any) => (
                  <TableRow key={notice._id}>
                    <TableCell>
                      <div className="font-medium">{notice.title}</div>
                    </TableCell>
                    <TableCell className="text-right">
                      {new Date(notice.createdAt).toISOString().split("T")[0]}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        {/* <Card x-chunk="dashboard-01-chunk-5">
          <CardHeader>
            <CardTitle>Recent Classes</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-8">
            <div className="flex items-center gap-4">
              <div className="grid gap-1">
                <p className="text-sm font-medium leading-none">
                  Advanced-Java 11:45
                </p>
              </div>
              <Link to="/student/routine" className="ml-auto font-medium">
                <Button variant="link">View</Button>
              </Link>
            </div>
          </CardContent>
        </Card> */}
      </div>
    </main>
  );
}
