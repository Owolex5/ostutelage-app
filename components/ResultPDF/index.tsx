"use client";
import { useRef } from "react";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";

export default function ResultPDF({ data }: { data: any }) {
  const ref = useRef<HTMLDivElement>(null);

  const download = async () => {
    const el = ref.current;
    if (!el) return;
    const canvas = await html2canvas(el);
    const img = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");
    const w = 190;
    const h = (canvas.height * w) / canvas.width;
    pdf.addImage(img, "PNG", 10, 10, w, h);
    pdf.save(`OsTutelage_${data.name.replace(" ", "_")}.pdf`);
  };

  return (
    <>
      <div style={{ display: "none" }}>
        <div ref={ref} className="p-8 bg-white">
          <h1 className="text-3xl font-bold text-center mb-6">OsTutelage Result</h1>
          <p><strong>Name:</strong> {data.name}</p>
          <p><strong>Score:</strong> {data.score}%</p>
          <p><strong>Scholarship:</strong> {data.scholarship}</p>
          {data.shortAnswers.map((sa: any, i: number) => (
            <div key={i} className="mt-4 p-3 border rounded">
              <p><strong>Q{i + 1}:</strong> {sa.question}</p>
              <p><em>Answer:</em> {sa.userAnswer || "—"}</p>
              <p className="text-sm"><strong>AI: {sa.aiScore}/10</strong> — {sa.feedback}</p>
            </div>
          ))}
        </div>
      </div>
      <button
        onClick={download}
        className="mt-6 w-full py-3 border-2 border-primary text-primary rounded-xl font-semibold hover:bg-primary hover:text-white transition-all"
      >
        Download PDF
      </button>
    </>
  );
}