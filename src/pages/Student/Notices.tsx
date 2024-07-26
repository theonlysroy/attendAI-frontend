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
    getAllNotices();
  }, []);

  return (
    <div className="max-w-full mx-auto py-10">
      <h1 className="text-3xl mb-10">All Notices</h1>
      <Table className="w-full text-xl">
        <TableHeader>
          <TableRow>
            <TableHead className="">NoticeId</TableHead>
            <TableHead>Title</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
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
