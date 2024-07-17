import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import RoutineCard from "./RoutineCard";
import axios from "axios";
import { useEffect, useState } from "react";

// const routines = [
//   {
//     paperCode: "CC-6-13-TH",
//     startTime: "11:00 AM",
//     endTime: "11:45 AM",
//   },
//   {
//     paperCode: "CC-6-14-TH",
//     startTime: "1:00 PM",
//     endTime: "2:00 PM",
//   },
// ];
interface Class {
  _id: string;
  startTime: string;
  endTime: string;
  date: string;
  subject: string;
  paperCode: string;
  teacher: string;
}

const Routine: React.FC = () => {
  const [classes, setClasses] = useState<Class[]>([]);
  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const response = await axios.get<Class[]>(
          "http://localhost:8000/routine"
        );
        setClasses(response.data);
      } catch (error) {
        console.error("Error fetching classes:", error);
      }
    };
    fetchClasses();
  }, [classes]);
  return (
    <div className="flex flex-1 flex-col gap-4 p-2 md:gap-8 md:p-8">
      <form className="ml-auto flex-1 sm:flex-initial">
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search semester..."
            className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"
          />
        </div>
      </form>
      <div className="flex flex-wrap gap-2">
        {classes.map((cls) => (
          <RoutineCard key={cls._id} routine={cls} />
        ))}
      </div>
    </div>
  );
};
export default Routine;
