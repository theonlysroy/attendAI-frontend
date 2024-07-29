import { Button } from "@/components/ui/button";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Logout() {
  const navigate = useNavigate();
  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    console.log(accessToken);
    if (accessToken) {
      const student = jwtDecode(accessToken);
      if (!student) {
        localStorage.removeItem("accessToken");
        navigate("/auth/login");
      } else {
        navigate("/student/logout");
      }
    } else {
      navigate("/auth/login");
    }
  }, []);
  const handleLogout = async () => {
    try {
      await axios.post(
        "http://localhost:8000/auth/logout",
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );

      localStorage.removeItem("accessToken");
      localStorage.removeItem("finishedClasses");
      navigate("/");
    } catch (error) {
      console.log(error);
      window.location.reload();
      alert("Logout Failed");
    }
  };
  return (
    <div className="max-w-xl m-auto flex flex-col items-center justify-center">
      <Button onClick={handleLogout}>Confirm Logout</Button>
    </div>
  );
}
