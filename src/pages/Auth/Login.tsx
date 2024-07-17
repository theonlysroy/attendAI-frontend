import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axios from "axios";
import React, { useCallback, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Webcam from "react-webcam";

const Login: React.FC = () => {
  const webcamRef = useRef(null);
  const [avatar, setAvatar] = useState(null);
  const [collegeRollNo, setCollegeRollNo] = useState<string>("");
  const [captureDisable, setCaptureDisable] = useState<boolean>(false);
  const navigate = useNavigate();

  const isSubmitDisabled = !collegeRollNo || !captureDisable;
  const capture = useCallback(() => {
    const img = webcamRef.current?.getScreenshot();
    setAvatar(img);
    setCaptureDisable(true);
    // console.log(img);
  }, [webcamRef]);

  const reset = () => {
    setCaptureDisable(false);
    setAvatar(null);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8000/auth/login", {
        collegeRollNo,
        avatar,
      });
      console.log(response);
      if (response.data.success) {
        navigate("/student");
      } else {
        console.log("error response");
      }
    } catch (error) {
      console.error("Error loggin in: ", error);
    }
  };
  return (
    <div className="w-full h-full flex justify-center items-center">
      <Card className="mx-auto max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Login with your college roll no. and face-id
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleLogin}>
          <CardContent>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="collegeRollNo">College Roll No.</Label>
                <Input
                  name="collegeRollNo"
                  type="text"
                  value={collegeRollNo}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setCollegeRollNo(e.target.value)
                  }
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Face-ID</Label>
                </div>
                {avatar ? (
                  <img src={avatar} alt="webcam" />
                ) : (
                  <Webcam
                    audio={false}
                    height={480}
                    width={640}
                    ref={webcamRef}
                    screenshotFormat="image/png"
                    videoConstraints={{ facingMode: "user" }}
                  />
                )}
                <div className="grid grid-cols-2 gap-2">
                  <Button
                    className="w-fit text-sm mx-auto mb-4 col-span-1"
                    onClick={capture}
                    type="button"
                    disabled={captureDisable}
                  >
                    Capture Image
                  </Button>
                  <Button
                    className="w-fit text-sm mx-auto mb-4 col-span-1"
                    onClick={reset}
                    type="button"
                  >
                    Reset
                  </Button>
                </div>
              </div>
              <Button
                type="submit"
                className="w-full"
                disabled={isSubmitDisabled}
              >
                Login
              </Button>
            </div>
            <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?{" "}
              <Link to="/auth/register" className="underline">
                Sign up
              </Link>
            </div>
          </CardContent>
        </form>
      </Card>
    </div>
  );
};

export default Login;
