import axios from "axios";
import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { SquareArrowOutUpRightIcon } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

export interface Notice {
  noticeId: number;
  title: string;
  content: string;
}

export default function Notices() {
  const [allNotices, setAllNotices] = useState<Notice[]>([]);
  const navigate = useNavigate();
  const getAllNotices = async () => {
    const response = await axios.get("http://localhost:8000/notice");
    const noticeData = await response.data.data;
    setAllNotices(noticeData);
  };
  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    console.log(accessToken);
    if (accessToken) {
      const student = jwtDecode(accessToken);
      if (!student) {
        localStorage.removeItem("accessToken");
        navigate("/auth/login");
      } else {
        getAllNotices();
        navigate("/student/notices");
      }
    } else {
      navigate("/auth/login");
    }
  }, []);

  return (
    <div className="max-w-full mx-auto py-10">
      <h1 className="text-5xl mb-10 text-center font-semibold">All Notices</h1>
      <Table className="max-w-[80%] m-auto text-xl">
        <TableHeader>
          <TableRow>
            <TableHead className="">NoticeId</TableHead>
            <TableHead>Title</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {allNotices.length === 0 && (
            <TableRow className="text-xl mt-10">
              <TableCell>No notices found</TableCell>
            </TableRow>
          )}
          {allNotices.map((notice) => (
            <TableRow key={notice.noticeId}>
              <TableCell className="font-medium">{notice.noticeId}</TableCell>
              <TableCell>{notice.title}</TableCell>
              <TableCell>
                {/* <Link to={`/student/notice/${notice.noticeId}`}> */}
                <SquareArrowOutUpRightIcon
                  className="cursor-pointer hover:text-primary"
                  size={24}
                  absoluteStrokeWidth
                  onClick={() =>
                    navigate(`/student/notices/${notice.noticeId}`)
                  }
                />
                {/* </Link> */}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
