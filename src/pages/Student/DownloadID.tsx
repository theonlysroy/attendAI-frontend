import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { useRef } from "react";

export default function DownloadID() {
  const printRef = useRef<HTMLDivElement>(null);
  const handleDownload = async () => {
    if (printRef.current) {
      const images = printRef.current.querySelectorAll("img");
      await Promise.all(
        Array.from(images).map((img) => {
          return new Promise((resolve) => {
            if (img.complete) {
              resolve(true);
            } else {
              img.onload = () => resolve(true);
              img.onerror = () => resolve(true);
            }
          });
        })
      );
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
    pdf.save("test.pdf");
  };
  return (
    <div className="w-full h-screen flex flex-col gap-8 justify-center items-center">
      <h1 className="text-3xl font-bold">Download ID</h1>
      <div
        ref={printRef}
        className="max-w-2xl rounded-xl bg-yellow-200/30 p-8 flex flex-col gap-4"
      >
        <div className="w-full flex gap-10">
          {/* image */}
          <div className="flex items-center justify-center">
            <img
              src="/messi.png"
              alt="download-id-card"
              className="w-36 rounded-full shadow-lg"
            />
          </div>
          {/* details */}
          <div className="flex flex-col gap-2">
            <div className="text-xl font-bold text-muted-foreground">
              <span className="">Name: </span>
              <span className="">Swagatam Roy</span>
            </div>
          </div>
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
