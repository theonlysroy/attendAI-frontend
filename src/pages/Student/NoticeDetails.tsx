import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Notice } from "./Notices";
import axios from "axios";

export default function NoticeDetails() {
  const { noticeId } = useParams();
  const [notice, setNotice] = useState<Notice>();
  useEffect(() => {
    const getNotice = async () => {
      const response = await axios.get(
        `http://localhost:8000/notice/${noticeId}`
      );
      const noticeData = await response.data.data[0];
      setNotice(noticeData);
    };
    getNotice();
  }, [noticeId]);
  return (
    <div className="max-w-2xl mx-auto py-10 flex flex-col gap-y-5">
      <h1>{noticeId}</h1>
      <p className="text-3xl text-primary">{notice?.title.toUpperCase()}</p>
      <p>{notice?.content}</p>
    </div>
  );
}
