import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TableRow, TableCell } from "@/components/ui/table";
import { differenceInMinutes, parse, set } from "date-fns";
import { useEffect, useState } from "react";
import AttendancePopup from "./AttendancePopup";

export interface ClassData {
  id: number;
  time: string;
  paper: string;
  teacher: string;
}

interface ClassItemProps {
  classData: ClassData;
}

const ClassItem: React.FC<ClassItemProps> = ({ classData }) => {
  // const [timeLeft, setTimeLeft] = useState<number | null>(null);
  // const [isOngoing, setIsOngoing] = useState<boolean>(false);
  // const [canLeave, setCanLeave] = useState<boolean>(false);

  // useEffect(() => {
  //   const classTime = parse(classData.time, "HH:mm", new Date());
  //   const now = Date.now();

  //   const diff = differenceInMinutes(classTime, now);
  //   if (diff <= 0) {
  //     setIsOngoing(true);
  //   }
  //   if (isOngoing && diff <= -25) {
  //     setCanLeave(true);
  //   }

  //   const interval = setInterval(() => {
  //     const now = new Date();
  //     const diff = differenceInMinutes(classTime, now);
  //     setTimeLeft(diff);

  //     if (diff <= -25) {
  //       setCanLeave(true);
  //     }
  //   }, 1000);

  //   return () => clearInterval(interval);
  // }, [isOngoing, classData.time]);

  // const handleStartClass = () => {
  //   setIsOngoing(true);
  // };

  // const handleLeaveClass = () => {
  //   alert("Attendance recorded");
  // };

  // const startDisabled = timeLeft !== null && (timeLeft > 5 || isOngoing);
  // const leaveDisabled = !canLeave;
  const [isLeaveDisabled, setIsLeaveDisabled] = useState(true);
  const [isStartDisabled, setIsStartDisabled] = useState(false);
  const [isClassOngoing, setIsClassOngoing] = useState(false);
  const [isClassFinished, setIsClassFinished] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [finishedClasses, setFinishedClasses] = useState([]);

  useEffect(() => {
    const savedFinishedClasses = JSON.parse(
      localStorage.getItem("finishedClasses") || "[]"
    );
    if (finishedClasses.includes(classData["paperCode"])) {
      setIsClassFinished(true);
    }
  }, [finishedClasses, setFinishedClasses]);
  const handleStartClass = () => {
    setIsStartDisabled(true);
    setIsClassOngoing(true);
    setTimeout(() => {
      setIsLeaveDisabled(false);
      alert("class started");
    }, 2000);
  };

  const handleLeaveClass = () => {
    setShowModal(true);
  };

  return (
    <TableRow>
      <TableCell className="font-medium">
        {`${classData["startTime"].substring(0, 5)} - ${classData["endTime"].substring(0, 5)}`}
      </TableCell>
      <TableCell>{classData["paperCode"]}</TableCell>
      <TableCell>
        <Badge variant="outline">{classData.teacher}</Badge>
      </TableCell>
      <TableCell className="hidden md:table-cell">
        <Badge variant="outline">
          {isClassOngoing || isClassFinished ? "Ongoing" : "Not started"}
        </Badge>
      </TableCell>
      <TableCell className="hidden md:table-cell">
        <Badge variant="outline">
          {isClassFinished ? "Finished" : "Not started"}
        </Badge>
      </TableCell>
      <TableCell className="w-fit grid grid-cols-2 gap-4">
        <Button
          onClick={handleStartClass}
          disabled={isStartDisabled || isClassFinished}
        >
          Start class
        </Button>
        <Button
          onClick={handleLeaveClass}
          disabled={isLeaveDisabled || isClassFinished}
        >
          Leave class
        </Button>
        {showModal && (
          <AttendancePopup
            onClose={() => setShowModal(false)}
            paperCode={classData["paperCode"]}
            finishedClasses={setFinishedClasses}
          />
        )}
      </TableCell>
    </TableRow>
  );
};

export default ClassItem;
