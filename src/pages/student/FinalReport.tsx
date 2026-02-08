import { useState } from 'react';
import { DashboardLayout } from '@/components/layouts/DashboardLayout';
import { mockEvaluations, mockAttachments } from '@/utils/mockData';
import { Upload, FileText, CheckCircle, AlertCircle } from 'lucide-react';

export default function StudentFinalReport() {
  const attachment = mockAttachments.find((a) => a.studentId === 'stu-1');
  const evaluation = mockEvaluations.find((e) => e.studentId === 'stu-1');
  const [uploaded, setUploaded] = useState(false);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Final Report</h1>
          <p className="text-muted-foreground">Submit your final attachment report and view evaluations</p>
        </div>

        {/* Upload Section */}
        <div className="rounded-xl border bg-card p-6">
          <h3 className="text-lg font-semibold mb-4">Upload Report</h3>
          {uploaded ? (
            <div className="flex items-center gap-3 rounded-lg bg-success/10 p-4">
              <CheckCircle className="h-5 w-5 text-success" />
              <div>
                <p className="font-medium text-sm">Report Uploaded Successfully</p>
                <p className="text-xs text-muted-foreground">final_attachment_report_alice.pdf • Uploaded just now</p>
              </div>
            </div>
          ) : (
            <div>
              <div
                onClick={() => setUploaded(true)}
                className="flex cursor-pointer flex-col items-center gap-3 rounded-xl border-2 border-dashed border-border p-10 text-center transition-colors hover:border-primary/30 hover:bg-primary/5"
              >
                <Upload className="h-10 w-10 text-muted-foreground" />
                <div>
                  <p className="font-medium">Click to upload your final report</p>
                  <p className="text-sm text-muted-foreground">PDF, DOC, DOCX up to 10MB</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Evaluation Results */}
        <div className="rounded-xl border bg-card p-6">
          <h3 className="text-lg font-semibold mb-4">Evaluation Results</h3>
          {evaluation ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between rounded-lg bg-muted p-4">
                <div>
                  <p className="text-sm text-muted-foreground">Supervisor Evaluation</p>
                  <p className="text-lg font-bold">{evaluation.score} / {evaluation.maxScore}</p>
                </div>
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                  <span className="text-xl font-bold text-primary">{Math.round((evaluation.score / evaluation.maxScore) * 100)}%</span>
                </div>
              </div>
              <div>
                <p className="text-sm font-semibold mb-1">Remarks</p>
                <p className="text-sm text-muted-foreground">{evaluation.remarks}</p>
              </div>
              <p className="text-xs text-muted-foreground">Evaluated by {evaluation.evaluatorName} on {evaluation.submittedAt}</p>
            </div>
          ) : (
            <div className="flex items-center gap-3 rounded-lg bg-muted p-4">
              <AlertCircle className="h-5 w-5 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">No evaluations submitted yet</p>
            </div>
          )}
        </div>

        {/* Completion Status */}
        <div className="rounded-xl border bg-card p-6">
          <h3 className="text-lg font-semibold mb-4">Completion Status</h3>
          <div className="space-y-3">
            {[
              { label: 'Attachment Completed', done: attachment?.status === 'completed' || attachment?.status === 'in_progress' },
              { label: 'Final Report Submitted', done: uploaded },
              { label: 'Supervisor Evaluation', done: !!evaluation },
              { label: 'Lecturer Assessment', done: false },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-3">
                <div className={`flex h-6 w-6 items-center justify-center rounded-full ${item.done ? 'bg-success/10' : 'bg-muted'}`}>
                  {item.done ? <CheckCircle className="h-4 w-4 text-success" /> : <div className="h-2 w-2 rounded-full bg-muted-foreground/30" />}
                </div>
                <span className={`text-sm ${item.done ? 'font-medium' : 'text-muted-foreground'}`}>{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
