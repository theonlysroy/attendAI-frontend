import axios from "axios";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { jwtDecode } from "jwt-decode";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function DownloadID() {
  const [studentData, setStudentData] = useState({});
  const [collegeRollNo, setCollegeRollNo] = useState("");
  const navigate = useNavigate();

  async function getStudentData(collegeRollNo: string) {
    const response = await axios.get(
      `http://localhost:8000/auth/studentData/?collegeRollNo=${collegeRollNo}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }
    );
    setStudentData(response.data.data);
    setCollegeRollNo(response.data.data.collegeRollNo);
  }
  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      const student = jwtDecode(accessToken);
      const collegeRollNo = student["collegeRollNo"];
      if (!student) {
        localStorage.removeItem("accessToken");
        navigate("/auth/login");
      } else {
        getStudentData(collegeRollNo);
        navigate("/student/idcard");
      }
    } else {
      navigate("/auth/login");
    }
  }, []);
  const printRef = useRef<HTMLDivElement>(null);
  const handleDownload = async () => {
    if (printRef.current) {
      // const images = printRef.current.querySelectorAll("img");
      // await Promise.all(
      //   Array.from(images).map((img) => {
      //     return new Promise((resolve) => {
      //       if (img.complete) {
      //         resolve(true);
      //       } else {
      //         img.onload = () => resolve(true);
      //         img.onerror = () => resolve(true);
      //       }
      //     });
      //   })
      // );
    }
    const el: any = printRef.current;
    const canvas = await html2canvas(el, {
      scale: 5,
    });
    const data = canvas.toDataURL("image/png");

    const pdf = new jsPDF("portrait", "mm", "a4");

    const pdfWidth = 210;
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

    pdf.addImage(data, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save(`${collegeRollNo}.pdf`);
  };
  return (
    <div className="w-full h-screen flex flex-col gap-8 justify-center items-center">
      <h1 className="text-3xl font-bold">Download ID</h1>
      <div
        ref={printRef}
        className="max-w-2xl rounded-xl bg-yellow-200/30 p-8 flex flex-col gap-4"
      >
        {/* image */}
        {/* <div className="flex items-center justify-center">
            <img
              src="/messi.png"
              alt="download-id-card"
              className="w-36 rounded-full shadow-lg"
            />
          </div> */}
        {/* details */}
        <div className="flex flex-col gap-4 flex-wrap max-w-2xl">
          {Object.keys(studentData).map((key) => (
            <div key={key} className="text-xl font-bold flex gap-10">
              <span className="text-muted-foreground">
                {key.toUpperCase()}:
              </span>
              <span className="px-10">{studentData[key]}</span>
            </div>
          ))}
        </div>
      </div>
      <button
        className="bg-primary/80 text-xl font-bold max-w-fit rounded-lg p-2 shadow-lg hover:bg-primary"
        onClick={handleDownload}
      >
        Download
      </button>
    </div>
  );
}
