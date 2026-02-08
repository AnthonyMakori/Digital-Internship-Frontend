import { useState } from 'react';
import { DashboardLayout } from '@/components/layouts/DashboardLayout';
import { mockVacancies, mockApplications } from '@/utils/mockData';
import { StatusBadge } from '@/components/StatusBadge';
import { Search, MapPin, Clock, Building2, Filter, X, Briefcase, Upload } from 'lucide-react';
import { DEPARTMENTS, LOCATIONS, DURATIONS } from '@/utils/constants';

export default function StudentInternships() {
  const [search, setSearch] = useState('');
  const [deptFilter, setDeptFilter] = useState('');
  const [locFilter, setLocFilter] = useState('');
  const [durFilter, setDurFilter] = useState('');
  const [selectedVacancy, setSelectedVacancy] = useState<typeof mockVacancies[0] | null>(null);
  const [showApplyModal, setShowApplyModal] = useState(false);
  const [applySuccess, setApplySuccess] = useState(false);

  const alreadyApplied = mockApplications.filter((a) => a.studentId === 'stu-1').map((a) => a.vacancyId);

  const filtered = mockVacancies.filter((v) => {
    if (v.status !== 'open') return false;
    if (search && !v.title.toLowerCase().includes(search.toLowerCase()) && !v.company.toLowerCase().includes(search.toLowerCase())) return false;
    if (deptFilter && v.department !== deptFilter) return false;
    if (locFilter && v.location !== locFilter) return false;
    if (durFilter && v.duration !== durFilter) return false;
    return true;
  });

  const clearFilters = () => { setDeptFilter(''); setLocFilter(''); setDurFilter(''); setSearch(''); };
  const hasFilters = deptFilter || locFilter || durFilter || search;

  const handleApply = () => {
    // TODO: API call to submit application
    setApplySuccess(true);
    setTimeout(() => { setShowApplyModal(false); setApplySuccess(false); }, 1500);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Internship Marketplace</h1>
          <p className="text-muted-foreground">Discover and apply to available internship opportunities</p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-3 items-end">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search internships..."
              className="w-full rounded-lg border bg-card py-2 pl-9 pr-4 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary" />
          </div>
          <select value={deptFilter} onChange={(e) => setDeptFilter(e.target.value)} className="rounded-lg border bg-card px-3 py-2 text-sm outline-none focus:border-primary">
            <option value="">All Departments</option>
            {DEPARTMENTS.map((d) => <option key={d} value={d}>{d}</option>)}
          </select>
          <select value={locFilter} onChange={(e) => setLocFilter(e.target.value)} className="rounded-lg border bg-card px-3 py-2 text-sm outline-none focus:border-primary">
            <option value="">All Locations</option>
            {LOCATIONS.map((l) => <option key={l} value={l}>{l}</option>)}
          </select>
          <select value={durFilter} onChange={(e) => setDurFilter(e.target.value)} className="rounded-lg border bg-card px-3 py-2 text-sm outline-none focus:border-primary">
            <option value="">All Durations</option>
            {DURATIONS.map((d) => <option key={d} value={d}>{d}</option>)}
          </select>
          {hasFilters && (
            <button onClick={clearFilters} className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
              <X className="h-4 w-4" /> Clear
            </button>
          )}
        </div>

        {/* Vacancy Grid */}
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {filtered.map((vac) => (
            <div key={vac.id} className="stat-card cursor-pointer space-y-3" onClick={() => setSelectedVacancy(vac)}>
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-semibold">{vac.title}</h3>
                  <p className="text-sm text-muted-foreground">{vac.company}</p>
                </div>
                <StatusBadge status={vac.status} />
              </div>
              <p className="text-sm text-muted-foreground line-clamp-2">{vac.description}</p>
              <div className="flex flex-wrap gap-3 text-xs text-muted-foreground">
                <span className="flex items-center gap-1"><MapPin className="h-3 w-3" />{vac.location}</span>
                <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{vac.duration}</span>
                <span className="flex items-center gap-1"><Building2 className="h-3 w-3" />{vac.department}</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {vac.requirements.slice(0, 3).map((r) => (
                  <span key={r} className="rounded-md bg-secondary px-2 py-0.5 text-xs font-medium text-secondary-foreground">{r}</span>
                ))}
              </div>
            </div>
          ))}
          {filtered.length === 0 && (
            <div className="col-span-full py-16 text-center text-muted-foreground">
              <Briefcase className="mx-auto h-10 w-10 mb-3 opacity-40" />
              <p>No internships match your criteria</p>
            </div>
          )}
        </div>

        {/* Detail Modal */}
        {selectedVacancy && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/20 backdrop-blur-sm" onClick={() => setSelectedVacancy(null)}>
            <div className="mx-4 max-h-[80vh] w-full max-w-lg overflow-y-auto rounded-2xl border bg-card p-6 shadow-xl animate-slide-up" onClick={(e) => e.stopPropagation()}>
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-xl font-bold">{selectedVacancy.title}</h2>
                  <p className="text-muted-foreground">{selectedVacancy.company}</p>
                </div>
                <button onClick={() => setSelectedVacancy(null)} className="rounded-md p-1.5 hover:bg-secondary"><X className="h-5 w-5" /></button>
              </div>
              <div className="space-y-4">
                <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1"><MapPin className="h-4 w-4" />{selectedVacancy.location}</span>
                  <span className="flex items-center gap-1"><Clock className="h-4 w-4" />{selectedVacancy.duration}</span>
                  <span className="flex items-center gap-1"><Building2 className="h-4 w-4" />{selectedVacancy.department}</span>
                </div>
                <div>
                  <h4 className="font-semibold text-sm mb-1">Description</h4>
                  <p className="text-sm text-muted-foreground">{selectedVacancy.description}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-sm mb-2">Requirements</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedVacancy.requirements.map((r) => (
                      <span key={r} className="rounded-md bg-secondary px-2.5 py-1 text-xs font-medium">{r}</span>
                    ))}
                  </div>
                </div>
                {alreadyApplied.includes(selectedVacancy.id) ? (
                  <div className="rounded-lg bg-muted p-3 text-center text-sm text-muted-foreground">
                    You have already applied to this position
                  </div>
                ) : (
                  <button
                    onClick={() => setShowApplyModal(true)}
                    className="w-full rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition-all hover:opacity-90"
                  >
                    Apply Now
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Apply Modal */}
        {showApplyModal && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center bg-foreground/20 backdrop-blur-sm">
            <div className="mx-4 w-full max-w-md rounded-2xl border bg-card p-6 shadow-xl animate-slide-up">
              {applySuccess ? (
                <div className="py-8 text-center">
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-success/10">
                    <Briefcase className="h-8 w-8 text-success" />
                  </div>
                  <h3 className="text-lg font-bold">Application Submitted!</h3>
                  <p className="mt-1 text-sm text-muted-foreground">You'll be notified when there's an update.</p>
                </div>
              ) : (
                <>
                  <h3 className="text-lg font-bold mb-4">Submit Application</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="mb-1.5 block text-sm font-medium">Upload CV</label>
                      <div className="flex items-center gap-3 rounded-lg border border-dashed p-4 text-center">
                        <Upload className="h-5 w-5 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">Click to upload or drag and drop</span>
                      </div>
                    </div>
                    <div>
                      <label className="mb-1.5 block text-sm font-medium">Cover Letter</label>
                      <textarea rows={4} placeholder="Write your cover letter..."
                        className="w-full rounded-lg border bg-card px-4 py-2.5 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary" />
                    </div>
                    <div className="flex gap-3">
                      <button onClick={() => setShowApplyModal(false)} className="flex-1 rounded-lg border px-4 py-2.5 text-sm font-medium hover:bg-secondary">Cancel</button>
                      <button onClick={handleApply} className="flex-1 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground hover:opacity-90">Submit</button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
