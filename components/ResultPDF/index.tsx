"use client";

export default function ResultPDF({ data }: { data: any }) {
  if (!data) return null;

  return (
    <div className="p-8 bg-white rounded-3xl shadow-lg max-w-3xl mx-auto my-6">
      <h1 className="text-3xl font-bold text-center mb-6">OsTutelage Result</h1>
      <p><strong>Name:</strong> {data.name}</p>
      <p><strong>Score:</strong> {data.score}%</p>
      <p><strong>Scholarship:</strong> {data.scholarship}</p>

      <div className="mt-6 space-y-4">
        {data.shortAnswers?.map((sa: any, i: number) => (
          <div key={i} className="p-4 border rounded-lg bg-gray-50">
            <p><strong>Q{i + 1}:</strong> {sa.question}</p>
            <p><em>Answer:</em> {sa.userAnswer || "—"}</p>
            <p className="text-sm text-gray-700">
              <strong>AI Score:</strong> {sa.aiScore}/10 — {sa.feedback}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
