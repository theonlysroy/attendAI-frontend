import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";

export default function AttendancePopup({
  onClose,
  paperCode,
  finishedClasses,
}) {
  const modelRef = useRef();
  const modalClose = (e: any) => {
    if (modelRef.current === e.target) {
      onClose;
    }
  };
  const [collegeRollNo, setCollegeRollNo] = useState("");
  const [disabledSubmit, setDisabledSubmit] = useState(true);

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8000/attendance", {
        collegeRollNo,
      });
      if (response.data?.data) {
        alert("Attendance taken successfully");
        // classFinished(true);
        const updatedClasses = JSON.parse(
          localStorage.getItem("finishedClasses")
        );
        updatedClasses.push(paperCode);
        finishedClasses((prevClasses: any) => [...prevClasses, paperCode]);
        localStorage.setItem("finishedClasses", JSON.stringify(updatedClasses));
      }
    } catch (error) {
      alert(`${error.response.data.message}`);
    }
    setDisabledSubmit(true);
  };

  return (
    <div
      ref={modelRef}
      onClick={modalClose}
      className="fixed inset-0 bg-black/40 flex justify-center items-center"
    >
      <div className="mt-10 flex flex-col gap-5 text-white">
        <button className="place-self-end">
          <X size={30} onClick={onClose} />
        </button>
        <div className="max-w-lg bg-zinc-800 rounded-xl px-20 py-10 flex flex-col gap-5 items-center mx-4 ">
          <h1 className="text-3xl font-extrabold">Give Attendance</h1>
          <form action="">
            <input
              type="text"
              placeholder="College Roll No"
              className="w-full text-sm mx-auto mb-4 col-span-1 bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded"
              value={collegeRollNo}
              onChange={(e) => {
                setCollegeRollNo(e.target.value);
                setDisabledSubmit(false);
              }}
            />
            <button
              type="submit"
              className="w-fit text-sm mx-auto mb-4 col-span-1 bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded"
              onClick={handleSubmit}
              disabled={!collegeRollNo || disabledSubmit}
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
