import { Link } from "react-router-dom";
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
import Webcam from "react-webcam";
import { useCallback, useRef, useState } from "react";

export function Login() {
  const webcamRef = useRef(null);
  const [imgSrc, setImgSrc] = useState(null);

  const capture = useCallback(() => {
    const img = webcamRef.current.getScreenshot();
    setImgSrc(img);
  }, [webcamRef]);

  const reset = () => {
    setImgSrc(null);
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
        <CardContent>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="collegeRollNo">College Roll No.</Label>
              <Input id="collegeRollNo" type="text" required />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Face-ID</Label>
              </div>
              {imgSrc ? (
                <img src={imgSrc} alt="webcam" />
              ) : (
                <Webcam height={480} width={640} ref={webcamRef} />
              )}
              <div className="grid grid-cols-2 gap-2">
                <Button
                  className="w-fit text-sm mx-auto mb-4 col-span-1"
                  onClick={capture}
                >
                  Capture Image
                </Button>
                <Button
                  className="w-fit text-sm mx-auto mb-4 col-span-1"
                  onClick={reset}
                >
                  Reset
                </Button>
              </div>
            </div>
            <Button type="submit" className="w-full">
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
      </Card>
    </div>
  );
}
