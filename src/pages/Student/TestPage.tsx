import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { useRef } from "react";

export default function TestPage() {
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
      <div className="" ref={printRef}>
        <h1 className="text-3xl font-bold ">Test Page</h1>
        <img
          src="/messi.png"
          alt="download-id-card"
          className="w-36 rounded-full shadow-lg"
        />
        <p className="text-xl font-bold text-muted-foreground max-w-lg ">
          This is a test page for testing the download ID card feature Lorem
          ipsum dolor sit amet consectetur adipisicing elit. Quasi dolorum nulla
          eligendi iure eaque laboriosam, error quia reiciendis dicta! Ea velit
          nam possimus adipisci aspernatur dolor minima veniam eveniet sit.
        </p>
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
