import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TableRow, TableCell } from "@/components/ui/table";
import { differenceInMinutes, parse } from "date-fns";
import { useEffect, useState } from "react";

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
  const [timeLeft, setTimeLeft] = useState<number | null>(null);
  const [isOngoing, setIsOngoing] = useState<boolean>(false);
  const [canLeave, setCanLeave] = useState<boolean>(false);

  useEffect(() => {
    const classTime = parse(classData.time, "HH:mm", new Date());
    const now = Date.now();

    const diff = differenceInMinutes(classTime, now);
    if (diff <= 0) {
      setIsOngoing(true);
    }
    if (isOngoing && diff <= -25) {
      setCanLeave(true);
    }

    const interval = setInterval(() => {
      const now = new Date();
      const diff = differenceInMinutes(classTime, now);
      setTimeLeft(diff);

      if (diff <= -25) {
        setCanLeave(true);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [isOngoing, classData.time]);

  const handleStartClass = () => {
    setIsOngoing(true);
  };

  const handleLeaveClass = () => {
    alert("Attendance recorded");
  };

  const startDisabled = timeLeft !== null && (timeLeft > 5 || isOngoing);
  const leaveDisabled = !canLeave;
  return (
    <TableRow>
      <TableCell className="font-medium">{classData.time}</TableCell>
      <TableCell>{classData.paper}</TableCell>
      <TableCell>
        <Badge variant="outline">{classData.teacher}</Badge>
      </TableCell>
      <TableCell className="hidden md:table-cell">
        <Badge variant="outline">{isOngoing ? "Ongoing" : "Not started"}</Badge>
      </TableCell>
      <TableCell className="hidden md:table-cell">
        <Badge variant="outline">{canLeave ? "Finished" : "Not started"}</Badge>
      </TableCell>
      <TableCell className="w-fit grid grid-cols-2 gap-4">
        <Button onClick={handleStartClass} disabled={startDisabled}>
          Start class
        </Button>
        <Button onClick={handleLeaveClass} disabled={leaveDisabled}>
          Leave class
        </Button>
      </TableCell>
    </TableRow>
  );
};

export default ClassItem;
