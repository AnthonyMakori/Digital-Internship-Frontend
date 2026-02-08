import { useState } from 'react';
import { DashboardLayout } from '@/components/layouts/DashboardLayout';
import { mockAttachments, mockEvaluations } from '@/utils/mockData';
import { Star, Send, CheckCircle } from 'lucide-react';

export default function LecturerEvaluations() {
  const students = mockAttachments;
  const [evals, setEvals] = useState(mockEvaluations);
  const [form, setForm] = useState({ studentId: '', score: '', remarks: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const stu = students.find((s) => s.studentId === form.studentId);
    if (!stu) return;
    const newEval = {
      id: `eval-lec-${Date.now()}`, studentId: form.studentId, studentName: stu.studentName,
      evaluatorId: 'lec-1', evaluatorName: 'Dr. Sarah Njeri', type: 'lecturer' as const,
      score: Number(form.score), maxScore: 100, remarks: form.remarks,
      submittedAt: new Date().toISOString().slice(0, 10),
    };
    setEvals([...evals, newEval]);
    setSubmitted(true);
    setTimeout(() => { setSubmitted(false); setForm({ studentId: '', score: '', remarks: '' }); }, 2000);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Assessment Module</h1>
          <p className="text-muted-foreground">Grade students and approve completion</p>
        </div>

        <div className="rounded-xl border bg-card p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2"><Star className="h-5 w-5 text-warning" /> Submit Assessment</h3>
          {submitted ? (
            <div className="py-8 text-center">
              <CheckCircle className="mx-auto h-12 w-12 text-success mb-3" />
              <p className="font-semibold">Assessment Submitted!</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="mb-1.5 block text-sm font-medium">Select Student</label>
                <select required value={form.studentId} onChange={(e) => setForm({ ...form, studentId: e.target.value })}
                  className="w-full rounded-lg border bg-card px-3 py-2.5 text-sm outline-none focus:border-primary">
                  <option value="">Choose student</option>
                  {students.map((s) => <option key={s.studentId} value={s.studentId}>{s.studentName} ({s.company})</option>)}
                </select>
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium">Final Score (out of 100)</label>
                <input type="number" min="0" max="100" required value={form.score} onChange={(e) => setForm({ ...form, score: e.target.value })}
                  className="w-full rounded-lg border bg-card px-4 py-2.5 text-sm outline-none focus:border-primary" />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium">Remarks & Feedback</label>
                <textarea rows={3} required value={form.remarks} onChange={(e) => setForm({ ...form, remarks: e.target.value })}
                  placeholder="Provide comprehensive assessment..." className="w-full rounded-lg border bg-card px-4 py-2.5 text-sm outline-none focus:border-primary" />
              </div>
              <button type="submit" className="flex items-center gap-2 rounded-lg bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground hover:opacity-90">
                <Send className="h-4 w-4" /> Submit Assessment
              </button>
            </form>
          )}
        </div>

        <div className="rounded-xl border bg-card p-6">
          <h3 className="text-lg font-semibold mb-4">All Evaluations</h3>
          <div className="space-y-3">
            {evals.map((ev) => (
              <div key={ev.id} className="rounded-lg border p-4 table-row-hover">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <p className="font-semibold text-sm">{ev.studentName}</p>
                    <p className="text-xs text-muted-foreground">By {ev.evaluatorName} ({ev.type}) — {ev.submittedAt}</p>
                  </div>
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                    <span className="text-sm font-bold text-primary">{ev.score}%</span>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">{ev.remarks}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
