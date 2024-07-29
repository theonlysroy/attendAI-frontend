import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import RoutineCard from "./RoutineCard";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

export interface Class {
  startTime: string;
  endTime: string;
  paperCode: string;
  teacher: string;
  _id: string;
}

const Routine: React.FC = () => {
  const [mondayClasses, setMondayClasses] = useState([]);
  const [tuesdayClasses, setTuesdayClasses] = useState<Class[]>([]);
  const [wednesdayClasses, setWednesdayclasses] = useState<Class[]>([]);
  const [thursdayClasses, setThursdayClasses] = useState<Class[]>([]);
  const [fridayClasses, setFridayClasses] = useState<Class[]>([]);
  const [saturdayClasses, setSaturdayClasses] = useState<Class[]>([]);
  const [semester, setSemester] = useState("");
  const navigate = useNavigate();

  const fetchClasses = async () => {
    try {
      const response = await axios.get("http://localhost:8000/routine");
      setSemester(response.data[0].semester);
      setMondayClasses(response.data[0].weekDays.Monday);
      setTuesdayClasses(response.data[0].weekDays.Tuesday);
      setWednesdayclasses(response.data[0].weekDays.Wednesday);
      setThursdayClasses(response.data[0].weekDays.Thursday);
      setFridayClasses(response.data[0].weekDays.Friday);
      setSaturdayClasses(response.data[0].weekDays.Saturday);
    } catch (error) {
      console.error("Error fetching classes:", error);
    }
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
        fetchClasses();
        navigate("/student/routine");
      }
    } else {
      navigate("/auth/login");
    }
  }, []);

  const allClasses: boolean =
    mondayClasses.length > 0 &&
    tuesdayClasses.length > 0 &&
    wednesdayClasses.length > 0 &&
    thursdayClasses.length > 0 &&
    fridayClasses.length > 0 &&
    saturdayClasses.length > 0;
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
      <div className="flex flex-col">
        <h1 className="text-5xl mb-10 text-center font-semibold">
          Routine - Semester {semester}
        </h1>
        {allClasses == true && <div className="text-xl">No classes found</div>}
        <div>
          <h1>Monday</h1>
          <hr />
          <div className="flex flex-wrap gap-2">
            {mondayClasses.length > 0 &&
              mondayClasses.map((cls) => (
                <RoutineCard key={cls._id} semClass={cls} />
              ))}
          </div>
        </div>
        <div>
          <h1>Tuesday</h1>
          <hr />
          <div className="flex flex-wrap gap-2">
            {tuesdayClasses.length > 0 &&
              tuesdayClasses.map((cls) => (
                <RoutineCard key={cls._id} semClass={cls} />
              ))}
          </div>
        </div>
        <div>
          <h1>Wednesday</h1>
          <hr />
          <div className="flex flex-wrap gap-2">
            {wednesdayClasses.length <= 0 ? (
              <div className="my-10">No classes found</div>
            ) : (
              wednesdayClasses.map((cls) => (
                <RoutineCard key={cls._id} semClass={cls} />
              ))
            )}
          </div>
        </div>
        <div>
          <h1>Thursday</h1>
          <hr />
          <div className="flex flex-wrap gap-2">
            {thursdayClasses.length > 0 &&
              thursdayClasses.map((cls) => (
                <RoutineCard key={cls._id} semClass={cls} />
              ))}
          </div>
        </div>
        <div>
          <h1>Friday</h1>
          <hr />
          <div className="flex flex-wrap gap-2">
            {fridayClasses.length > 0 &&
              fridayClasses.map((cls) => (
                <RoutineCard key={cls._id} semClass={cls} />
              ))}
          </div>
        </div>
        <div>
          <h1>Saturday</h1>
          <hr />
          <div className="flex flex-wrap gap-2">
            {saturdayClasses.length == 0 && (
              <div className="my-10">No classes found</div>
            )}
            {saturdayClasses.map((cls) => (
              <RoutineCard key={cls._id} semClass={cls} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Routine;
