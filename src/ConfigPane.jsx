import { useState } from "react";

const S = {
  pane: { width: 340, flexShrink: 0, background: "#fff", borderRight: "1px solid #d0d0d0", overflowY: "auto", height: "100vh", padding: "16px 14px", boxSizing: "border-box" },
  section: { marginBottom: 20 },
  sectionTitle: { fontSize: 13, fontWeight: 700, color: "#1c3148", marginBottom: 10, paddingBottom: 4, borderBottom: "2px solid #5b9bd5", textTransform: "uppercase", letterSpacing: 0.5 },
  row: { marginBottom: 8 },
  label: { display: "block", fontSize: 11.5, color: "#555", marginBottom: 2, fontWeight: 600 },
  input: { width: "100%", boxSizing: "border-box", border: "1px solid #ccc", borderRadius: 3, padding: "4px 7px", fontSize: 12.5, color: "#212121", outline: "none" },
  subSection: { background: "#f8f9fa", border: "1px solid #e5e5e5", borderRadius: 4, padding: "8px 10px", marginBottom: 8 },
  subTitle: { fontSize: 12, fontWeight: 700, color: "#333", marginBottom: 6, display: "flex", alignItems: "center", justifyContent: "space-between" },
  addBtn: { background: "#1c5fa8", color: "#fff", border: "none", borderRadius: 3, padding: "3px 8px", fontSize: 11.5, cursor: "pointer" },
  removeBtn: { background: "none", border: "1px solid #cc0000", color: "#cc0000", borderRadius: 3, padding: "2px 6px", fontSize: 11, cursor: "pointer" },
  grid2: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6 },
  grid3: { display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 6 },
};

function Field({ label, value, onChange, style }) {
  return (
    <div style={S.row}>
      <label style={S.label}>{label}</label>
      <input style={{ ...S.input, ...style }} value={value} onChange={(e) => onChange(e.target.value)} />
    </div>
  );
}

function SectionCard({ title, onRemove, children }) {
  const [open, setOpen] = useState(true);
  return (
    <div style={S.subSection}>
      <div style={S.subTitle}>
        <span style={{ cursor: "pointer" }} onClick={() => setOpen((o) => !o)}>{open ? "▾" : "▸"} {title}</span>
        {onRemove && <button style={S.removeBtn} onClick={onRemove}>✕ Remove</button>}
      </div>
      {open && children}
    </div>
  );
}

export default function ConfigPane({ data, onChange }) {
  const set = (path, val) => {
    const keys = path.split(".");
    const next = JSON.parse(JSON.stringify(data));
    let obj = next;
    for (let i = 0; i < keys.length - 1; i++) obj = obj[keys[i]];
    obj[keys[keys.length - 1]] = val;
    onChange(next);
  };

  const setStudent = (key, val) => set(`student.${key}`, val);

  const setSemester = (si, key, val) => {
    const next = JSON.parse(JSON.stringify(data));
    next.semesters[si][key] = val;
    onChange(next);
  };

  const setCourse = (si, ci, key, val) => {
    const next = JSON.parse(JSON.stringify(data));
    next.semesters[si].courses[ci][key] = val;
    onChange(next);
  };

  const setSection = (si, ci, xi, key, val) => {
    const next = JSON.parse(JSON.stringify(data));
    next.semesters[si].courses[ci].sections[xi][key] = val;
    onChange(next);
  };

  const addSemester = () => {
    const next = JSON.parse(JSON.stringify(data));
    next.semesters.push({ id: `sem_${Date.now()}`, label: "New Semester", courses: [] });
    onChange(next);
  };

  const removeSemester = (si) => {
    const next = JSON.parse(JSON.stringify(data));
    next.semesters.splice(si, 1);
    onChange(next);
  };

  const addCourse = (si) => {
    const next = JSON.parse(JSON.stringify(data));
    next.semesters[si].courses.push({ id: `c_${Date.now()}`, code: "NEW 101", title: "Course Title", sections: [], units: "3.0", grade: "GRD" });
    onChange(next);
  };

  const removeCourse = (si, ci) => {
    const next = JSON.parse(JSON.stringify(data));
    next.semesters[si].courses.splice(ci, 1);
    onChange(next);
  };

  const addSection = (si, ci) => {
    const next = JSON.parse(JSON.stringify(data));
    next.semesters[si].courses[ci].sections.push({ type: "LEC", days: "MWF", time: "10:00A–10:59A" });
    onChange(next);
  };

  const removeSection = (si, ci, xi) => {
    const next = JSON.parse(JSON.stringify(data));
    next.semesters[si].courses[ci].sections.splice(xi, 1);
    onChange(next);
  };

  const setPhase = (i, key, val) => {
    const next = JSON.parse(JSON.stringify(data));
    next.enrollment.phases[i][key] = val;
    onChange(next);
  };

  const setDeadline = (i, key, val) => {
    const next = JSON.parse(JSON.stringify(data));
    next.enrollment.deadlines[i][key] = val;
    onChange(next);
  };

  const addPhase = () => {
    const next = JSON.parse(JSON.stringify(data));
    next.enrollment.phases.push({ label: "New Phase", start: "Jan 1", startTime: "8:00am", end: "Jan 31", endTime: "11:59pm" });
    onChange(next);
  };

  const removePhase = (i) => {
    const next = JSON.parse(JSON.stringify(data));
    next.enrollment.phases.splice(i, 1);
    onChange(next);
  };

  const addDeadline = () => {
    const next = JSON.parse(JSON.stringify(data));
    next.enrollment.deadlines.push({ label: "New Deadline", date: "Jan 31", time: "11:59pm" });
    onChange(next);
  };

  const removeDeadline = (i) => {
    const next = JSON.parse(JSON.stringify(data));
    next.enrollment.deadlines.splice(i, 1);
    onChange(next);
  };

  const { student, semesters, enrollment } = data;

  return (
    <div style={S.pane}>
      <div style={{ fontSize: 14, fontWeight: 700, color: "#1c3148", marginBottom: 16 }}>Configuration</div>

      {/* Student */}
      <div style={S.section}>
        <div style={S.sectionTitle}>Student Profile</div>
        <Field label="Full Name" value={student.name} onChange={(v) => setStudent("name", v)} />
        <Field label="Avatar Initial" value={student.initial} onChange={(v) => setStudent("initial", v)} />
        <Field label="Major" value={student.major} onChange={(v) => setStudent("major", v)} />
        <Field label="Major / Degree" value={student.majorDegree} onChange={(v) => setStudent("majorDegree", v)} />
        <div style={{ ...S.grid2, ...S.row }}>
          <div>
            <label style={S.label}>Career</label>
            <input style={S.input} value={student.career} onChange={(e) => setStudent("career", e.target.value)} />
          </div>
          <div>
            <label style={S.label}>Level</label>
            <input style={S.input} value={student.level} onChange={(e) => setStudent("level", e.target.value)} />
          </div>
        </div>
        <div style={{ ...S.grid2, ...S.row }}>
          <div>
            <label style={S.label}>Terms in Attendance</label>
            <input style={S.input} type="number" value={student.termsInAttendance} onChange={(e) => setStudent("termsInAttendance", e.target.value)} />
          </div>
          <div>
            <label style={S.label}>Expected Graduation</label>
            <input style={S.input} value={student.expectedGraduation} onChange={(e) => setStudent("expectedGraduation", e.target.value)} />
          </div>
        </div>
        <div style={{ ...S.grid2, ...S.row }}>
          <div>
            <label style={S.label}>Total Units</label>
            <input style={S.input} value={student.totalUnits} onChange={(e) => setStudent("totalUnits", e.target.value)} />
          </div>
          <div>
            <label style={S.label}>Transfer Units</label>
            <input style={S.input} value={student.transferUnits} onChange={(e) => setStudent("transferUnits", e.target.value)} />
          </div>
        </div>
        <div style={{ ...S.grid2, ...S.row }}>
          <div>
            <label style={S.label}>P/NP Total</label>
            <input style={S.input} value={student.pnpTotal} onChange={(e) => setStudent("pnpTotal", e.target.value)} />
          </div>
          <div>
            <label style={S.label}>P/NP Passed</label>
            <input style={S.input} value={student.pnpPassed} onChange={(e) => setStudent("pnpPassed", e.target.value)} />
          </div>
        </div>
      </div>

      {/* Semesters */}
      <div style={S.section}>
        <div style={{ ...S.sectionTitle, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span>Semesters</span>
          <button style={S.addBtn} onClick={addSemester}>+ Add Semester</button>
        </div>

        {semesters.map((sem, si) => (
          <SectionCard key={sem.id} title={sem.label || "Semester"} onRemove={semesters.length > 1 ? () => removeSemester(si) : null}>
            <Field label="Semester Label" value={sem.label} onChange={(v) => setSemester(si, "label", v)} />

            <div style={{ marginTop: 6, marginBottom: 4, fontSize: 11.5, fontWeight: 700, color: "#555", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span>Courses</span>
              <button style={S.addBtn} onClick={() => addCourse(si)}>+ Add</button>
            </div>

            {sem.courses.map((course, ci) => (
              <SectionCard key={course.id} title={`${course.code?.split("\n")[0]} — ${course.title?.slice(0, 20)}`} onRemove={() => removeCourse(si, ci)}>
                <Field label="Course Code" value={course.code} onChange={(v) => setCourse(si, ci, "code", v)} />
                <Field label="Course Title" value={course.title} onChange={(v) => setCourse(si, ci, "title", v)} />
                <div style={{ ...S.grid2, ...S.row }}>
                  <div>
                    <label style={S.label}>Units</label>
                    <input style={S.input} value={course.units} onChange={(e) => setCourse(si, ci, "units", e.target.value)} />
                  </div>
                  <div>
                    <label style={S.label}>Grade Type</label>
                    <input style={S.input} value={course.grade} onChange={(e) => setCourse(si, ci, "grade", e.target.value)} />
                  </div>
                </div>

                <div style={{ marginTop: 4, marginBottom: 4, fontSize: 11.5, fontWeight: 700, color: "#555", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span>Sections</span>
                  <button style={{ ...S.addBtn, fontSize: 10.5, padding: "2px 6px" }} onClick={() => addSection(si, ci)}>+ Add</button>
                </div>

                {course.sections.map((sec, xi) => (
                  <div key={xi} style={{ background: "#fff", border: "1px solid #e0e0e0", borderRadius: 3, padding: "5px 7px", marginBottom: 4 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
                      <span style={{ fontSize: 11, fontWeight: 600, color: "#555" }}>Section {xi + 1}</span>
                      <button style={{ ...S.removeBtn, padding: "1px 5px", fontSize: 10 }} onClick={() => removeSection(si, ci, xi)}>✕</button>
                    </div>
                    <div style={S.grid3}>
                      <div>
                        <label style={S.label}>Type</label>
                        <input style={S.input} value={sec.type} onChange={(e) => setSection(si, ci, xi, "type", e.target.value)} />
                      </div>
                      <div>
                        <label style={S.label}>Days</label>
                        <input style={S.input} value={sec.days} onChange={(e) => setSection(si, ci, xi, "days", e.target.value)} />
                      </div>
                      <div>
                        <label style={S.label}>Time</label>
                        <input style={S.input} value={sec.time} onChange={(e) => setSection(si, ci, xi, "time", e.target.value)} />
                      </div>
                    </div>
                  </div>
                ))}
              </SectionCard>
            ))}
          </SectionCard>
        ))}
      </div>

      {/* Enrollment */}
      <div style={S.section}>
        <div style={S.sectionTitle}>Class Enrollment Panel</div>
        <Field label="Active Semester Tab" value={enrollment.semester} onChange={(v) => set("enrollment.semester", v)} />

        <div style={{ marginTop: 6, marginBottom: 4, fontSize: 11.5, fontWeight: 700, color: "#555", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span>Enrollment Phases</span>
          <button style={S.addBtn} onClick={addPhase}>+ Add</button>
        </div>
        {enrollment.phases.map((p, i) => (
          <SectionCard key={i} title={p.label} onRemove={() => removePhase(i)}>
            <Field label="Label" value={p.label} onChange={(v) => setPhase(i, "label", v)} />
            <div style={S.grid2}>
              <div>
                <label style={S.label}>Start Date</label>
                <input style={S.input} value={p.start} onChange={(e) => setPhase(i, "start", e.target.value)} />
              </div>
              <div>
                <label style={S.label}>Start Time</label>
                <input style={S.input} value={p.startTime} onChange={(e) => setPhase(i, "startTime", e.target.value)} />
              </div>
            </div>
            <div style={{ ...S.grid2, marginTop: 4 }}>
              <div>
                <label style={S.label}>End Date</label>
                <input style={S.input} value={p.end} onChange={(e) => setPhase(i, "end", e.target.value)} />
              </div>
              <div>
                <label style={S.label}>End Time</label>
                <input style={S.input} value={p.endTime} onChange={(e) => setPhase(i, "endTime", e.target.value)} />
              </div>
            </div>
          </SectionCard>
        ))}

        <div style={{ marginTop: 6, marginBottom: 4, fontSize: 11.5, fontWeight: 700, color: "#555", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span>Deadlines</span>
          <button style={S.addBtn} onClick={addDeadline}>+ Add</button>
        </div>
        {enrollment.deadlines.map((d, i) => (
          <SectionCard key={i} title={d.label} onRemove={() => removeDeadline(i)}>
            <div style={S.grid3}>
              <div style={{ gridColumn: "1 / 3" }}>
                <label style={S.label}>Label</label>
                <input style={S.input} value={d.label} onChange={(e) => setDeadline(i, "label", e.target.value)} />
              </div>
              <div>
                <label style={S.label}>Date</label>
                <input style={S.input} value={d.date} onChange={(e) => setDeadline(i, "date", e.target.value)} />
              </div>
            </div>
            <div style={{ marginTop: 4 }}>
              <label style={S.label}>Time</label>
              <input style={S.input} value={d.time} onChange={(e) => setDeadline(i, "time", e.target.value)} />
            </div>
          </SectionCard>
        ))}
      </div>
    </div>
  );
}
