import React, { useState } from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import ClassItem, { ClassData } from "./ClassItem";

const allClasses = [
  { id: 1, time: "11:00 am", paper: "Advanced Java", teacher: "MP" },
  { id: 2, time: "11:45 am", paper: "Theory of Computation", teacher: "PS" },
  { id: 3, time: "1:45 pm", paper: "Multimedia PR", teacher: "AKG" },
];

const Attendance: React.FC = () => {
  const [classes, setClasses] = useState<ClassData[]>(allClasses);
  const [date, setDate] = useState<Date>();
  return (
    <div className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={cn(
              "w-[240px] justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date ? format(date, "PPP") : <span>Pick a date</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            initialFocus
          />
        </PopoverContent>
      </Popover>
      <div className="border w-fit px-4 py-2 rounded-lg">
        Timing:{" "}
        <span className="text-primary font-semibold">11:00 am - 6:30 pm</span>
      </div>
      {/* list of classes for attendance */}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Time</TableHead>
            <TableHead>Paper Name</TableHead>
            <TableHead>Alloted Teacher</TableHead>
            <TableHead className="hidden md:table-cell">Is ongoing</TableHead>
            <TableHead className="hidden md:table-cell">Is finished</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {classes.map((cls) => (
            <ClassItem key={cls.id} classData={cls} />
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default Attendance;
