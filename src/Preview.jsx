export default function Preview({ data }) {
  const { student, semesters, enrollment } = data;

  return (
    <div style={{ fontFamily: "Arial, sans-serif", fontSize: 13, background: "#f4f4f4", minHeight: "100%" }}>
      {/* Topbar */}
      <div style={{ background: "#1c3148", display: "flex", alignItems: "center", height: 46, padding: "0 12px", gap: 0 }}>
        <div style={{ fontSize: 17, fontWeight: 700, color: "#fff", letterSpacing: "-0.3px", marginRight: 20 }}>
          <b style={{ fontWeight: 900 }}>CAL</b><span style={{ fontWeight: 300 }}>CENTRAL</span>
        </div>
        {["My Dashboard", "My Academics", "$ My Finances", "My Campus"].map((t) => (
          <div key={t} style={{
            color: t === "My Academics" ? "#fff" : "#b0bec5",
            fontSize: 12.5, padding: "0 13px", height: 46, display: "flex", alignItems: "center",
            borderBottom: t === "My Academics" ? "3px solid #5b9bd5" : "3px solid transparent",
            background: t === "My Academics" ? "rgba(255,255,255,0.08)" : undefined,
          }}>{t}</div>
        ))}
        <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 10, color: "#cfd8dc", fontSize: 12 }}>
          <span style={{ background: "#d93025", color: "#fff", fontSize: 10, fontWeight: 700, padding: "2px 5px", borderRadius: 3 }}>✉ 6854</span>
          <span style={{ background: "#1565c0", color: "#fff", fontSize: 10, fontWeight: 700, padding: "2px 6px", borderRadius: 3 }}>31</span>
          <div style={{ width: 28, height: 28, borderRadius: "50%", background: "#8bc34a", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 11, fontWeight: 700 }}>
            {student.initial || student.name.charAt(0)}
          </div>
          <span style={{ color: "#cfd8dc", fontSize: 12 }}>{student.name.split(" ")[0]} ▾</span>
        </div>
      </div>

      {/* Alert bar */}
      <div style={{ background: "#fff9c4", borderBottom: "2px solid #f9a825", padding: "7px 14px", fontSize: 12.5, display: "flex", alignItems: "center", gap: 7, color: "#3e2900" }}>
        <span style={{ display: "inline-block", width: 0, height: 0, borderLeft: "7px solid transparent", borderRight: "7px solid transparent", borderBottom: "13px solid #f9a825", flexShrink: 0 }} />
        <b>CalCentral Update</b>
        &nbsp;CalCentral will be unavailable Wednesday morning, April 22, 2026, for scheduled maintenance
        <a href="#" style={{ color: "#1565c0", fontSize: 12.5, marginLeft: "auto", fontWeight: 700 }}>Learn More</a>
      </div>

      <div style={{ padding: "14px 16px 6px", fontSize: 20, fontWeight: 400, color: "#212121", background: "#f4f4f4" }}>My Academics</div>

      <div style={{ display: "flex", padding: "0 16px 20px", background: "#f4f4f4", gap: 0 }}>

        {/* Left column */}
        <div style={{ width: 265, flexShrink: 0, background: "#fff", border: "1px solid #c8c8c8", padding: 14 }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: "#212121", marginBottom: 12 }}>Academic Profile</div>
          <div style={{ display: "flex", gap: 10, alignItems: "flex-start", marginBottom: 10 }}>
            <div style={{ width: 68, height: 72, borderRadius: 3, background: "#c4a882", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", color: "#7a5c3a", fontSize: 22, fontWeight: 700 }}>
              {student.initial || student.name.charAt(0)}
            </div>
            <div style={{ fontSize: 15, fontWeight: 700, color: "#212121", paddingTop: 4 }}>{student.name}</div>
          </div>

          {[
            ["Major", <>{student.major}<br /><small style={{ display: "block", fontSize: 11.5, color: "#555" }}>{student.majorDegree}</small></>],
            ["Academic Career", student.career],
            ["Level", student.level],
          ].map(([label, val]) => (
            <div key={label} style={{ display: "grid", gridTemplateColumns: "105px 1fr", gap: 3, marginBottom: 7, fontSize: 12.5, alignItems: "start" }}>
              <span style={{ color: "#555", fontSize: 12.5 }}>{label}</span>
              <span style={{ color: "#212121", fontSize: 12.5, lineHeight: 1.45 }}>{val}</span>
            </div>
          ))}

          <div style={{ display: "grid", gridTemplateColumns: "105px 1fr", gap: 3, marginBottom: 7, fontSize: 12.5, alignItems: "start" }}>
            <span style={{ color: "#555", fontSize: 12.5 }}>Terms<br />Information</span>
            <span style={{ color: "#212121", fontSize: 12.5, lineHeight: 1.45 }}>
              Terms in Attendance<br />
              <small style={{ display: "block", fontSize: 11.5, color: "#555" }}>{student.termsInAttendance}</small>
              <br />
              Expected Graduation<br />
              <strong>{student.expectedGraduation}</strong><br />
              <small style={{ display: "block", fontSize: 11.5, color: "#555" }}>Consult your college advisor with questions or concerns.</small>
            </span>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "105px 1fr", gap: 3, marginBottom: 7, fontSize: 12.5, alignItems: "start", marginTop: 8 }}>
            <span style={{ color: "#555", fontSize: 12.5 }}>Cumulative Units</span>
            <span>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12.5 }}>
                <tbody>
                  <tr><td><strong>Total Units</strong></td><td style={{ textAlign: "right" }}><strong>{student.totalUnits}</strong></td></tr>
                  <tr><td>Transfer Units</td><td style={{ textAlign: "right" }}>{student.transferUnits}</td></tr>
                  <tr><td>P/NP Total</td><td style={{ textAlign: "right" }}>{student.pnpTotal}</td></tr>
                  <tr><td>P/NP Passed</td><td style={{ textAlign: "right" }}>{student.pnpPassed}</td></tr>
                </tbody>
              </table>
            </span>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "105px 1fr", gap: 3, marginBottom: 7, fontSize: 12.5, marginTop: 8 }}>
            <span style={{ color: "#555" }}>GPA</span>
            <a href="#" style={{ color: "#1971c2" }}>Show GPA</a>
          </div>
        </div>

        {/* Middle column */}
        <div style={{ flex: 1, background: "#fff", border: "1px solid #c8c8c8", borderLeft: "none", borderRight: "none", padding: "10px 16px" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
            <span style={{ fontSize: 14.5, fontWeight: 700, color: "#212121" }}>Semesters</span>
            <a href="#" style={{ fontSize: 12.5, color: "#1971c2" }}>View Academic Summary →</a>
          </div>

          {semesters.map((sem, si) => (
            <div key={sem.id}>
              {si > 0 && <hr style={{ border: "none", borderTop: "1px solid #ddd", margin: "12px 0" }} />}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", margin: "14px 0 8px" }}>
                <span style={{ fontSize: 14.5, fontWeight: 700, color: "#1971c2" }}>
                  <a href="#" style={{ color: "#1971c2", fontSize: 14.5, fontWeight: 700 }}>{sem.label} →</a>
                </span>
                <a href="#" style={{ fontSize: 12, color: "#1971c2" }}>Textbooks</a>
              </div>

              {sem.courses.map((course) => (
                <div key={course.id} style={{ display: "grid", gridTemplateColumns: "100px 1fr 36px 44px", gap: 5, fontSize: 12.5, marginBottom: 10, alignItems: "start" }}>
                  <div>
                    <a href="#" style={{ color: "#1971c2", fontSize: 12.5, lineHeight: 1.5, whiteSpace: "pre-wrap" }}>{course.code}</a>
                  </div>
                  <div>
                    <div style={{ fontSize: 12.5, color: "#212121" }}>{course.title}</div>
                    <div style={{ color: "#555", fontSize: 11.5, lineHeight: 1.55 }}>
                      {course.sections.map((s, i) => (
                        <span key={i}>{i > 0 && <br />}{s.type} &nbsp;{s.days} {s.time}</span>
                      ))}
                    </div>
                  </div>
                  <div style={{ textAlign: "right", fontSize: 12.5 }}>{course.units}</div>
                  <div style={{ textAlign: "right", fontSize: 12.5, color: "#555" }}>{course.grade}</div>
                </div>
              ))}

              {si === 0 && (
                <div style={{ textAlign: "right", fontSize: 12, color: "#555", marginTop: 8, paddingTop: 8, borderTop: "1px solid #e5e5e5" }}>
                  My Enrolled Units: <strong>{sem.courses.reduce((s, c) => s + parseFloat(c.units || 0), 0)}</strong>
                  &nbsp;&nbsp; My Waitlisted Units: <strong>0</strong>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Right column */}
        <div style={{ width: 295, flexShrink: 0, background: "#fff", border: "1px solid #c8c8c8", padding: "12px 14px" }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: "#212121", marginBottom: 12, display: "flex", alignItems: "baseline", gap: 7 }}>
            Class Enrollment
            <span style={{ fontSize: 10.5, fontWeight: 400, color: "#555", textTransform: "uppercase", letterSpacing: 0.3 }}>UNDERGRADUATE</span>
          </div>

          <div style={{ display: "flex", borderBottom: "1px solid #ccc", marginBottom: 10 }}>
            {["Fall 2026", "Summer 2026", enrollment.semester].map((t) => (
              <div key={t} style={{
                fontSize: 12, padding: "5px 11px", cursor: "pointer", whiteSpace: "nowrap",
                color: t === enrollment.semester ? "#1971c2" : "#555",
                borderBottom: t === enrollment.semester ? "3px solid #1971c2" : "3px solid transparent",
                fontWeight: t === enrollment.semester ? 700 : 400,
              }}>{t}</div>
            ))}
          </div>

          <div style={{ fontSize: 12.5, fontWeight: 700, color: "#212121", marginBottom: 7 }}>
            {enrollment.semester} Dates <span style={{ fontSize: 11, fontWeight: 400, color: "#555" }}>(Pacific Time)</span>
          </div>

          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12, marginBottom: 10 }}>
            <thead>
              <tr>
                {["Period", "Start", "", "End"].map((h, i) => (
                  <th key={i} style={{ color: "#555", fontWeight: 700, textAlign: "left", paddingBottom: 4, fontSize: 11.5, borderBottom: "1px solid #e0e0e0" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {enrollment.phases.map((p, i) => (
                <tr key={i}>
                  <td style={{ padding: "3px 0", color: "#212121" }}>{p.label}</td>
                  <td style={{ padding: "3px 0", color: "#212121" }}>{p.start}</td>
                  <td style={{ padding: "3px 0 3px 3px", color: "#666", fontSize: 11 }}>{p.startTime}</td>
                  <td style={{ padding: "3px 0", color: "#212121" }}>{p.end} <span style={{ color: "#666", fontSize: 11 }}>{p.endTime}</span></td>
                </tr>
              ))}
            </tbody>
          </table>

          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12, marginBottom: 12 }}>
            <thead>
              <tr>
                <th style={{ color: "#555", fontWeight: 700, textAlign: "left", paddingBottom: 4, fontSize: 11.5, borderBottom: "1px solid #e0e0e0" }}>Deadline</th>
                <th style={{ color: "#555", fontWeight: 700, textAlign: "right", paddingBottom: 4, fontSize: 11.5, borderBottom: "1px solid #e0e0e0" }}>Deadline Date</th>
              </tr>
            </thead>
            <tbody>
              {enrollment.deadlines.map((d, i) => (
                <tr key={i}>
                  <td style={{ padding: "3px 0", color: "#212121" }}>{d.label}</td>
                  <td style={{ padding: "3px 0", textAlign: "right", color: "#555" }}>{d.date} <span style={{ fontSize: 11 }}>{d.time}</span></td>
                </tr>
              ))}
            </tbody>
          </table>

          <div style={{ display: "flex", alignItems: "center", gap: 8, margin: "10px 0 12px" }}>
            <button style={{ background: "#1c5fa8", color: "#fff", border: "none", borderRadius: 3, padding: "6px 13px", fontSize: 12.5, cursor: "pointer" }}>Enrollment Center</button>
            <button style={{ background: "#fff", color: "#1c5fa8", border: "1px solid #1c5fa8", borderRadius: 3, padding: "6px 11px", fontSize: 12.5, cursor: "pointer" }}>Schedule Planner</button>
          </div>

          <div style={{ fontSize: 12, lineHeight: 2.1 }}>
            {["How to Change Grading Basis", "How to Add, Drop or Swap a Class", "How to Use the Schedule Planner"].map((l) => (
              <div key={l} style={{ display: "flex", alignItems: "center", gap: 5 }}>
                <span style={{ width: 9, height: 9, background: "#5b9bd5", display: "inline-block", flexShrink: 0 }} />
                <a href="#" style={{ color: "#1971c2" }}>{l} ↗</a>
              </div>
            ))}
          </div>
          <a href="#" style={{ color: "#1971c2", fontSize: 12, display: "block", marginTop: 4 }}>Learn More About Enrollment ∨</a>

          <div style={{ fontSize: 14, fontWeight: 700, color: "#212121", margin: "14px 0 5px" }}>Final Exam Schedule</div>
          <div style={{ fontSize: 12, color: "#555", marginBottom: 6 }}>Exam information is subject to change. <a href="#" style={{ color: "#1971c2" }}>Learn more</a></div>
          <div style={{ fontSize: 13, fontWeight: 700, color: "#212121" }}>{enrollment.semester} Final Exams</div>
        </div>

      </div>
    </div>
  );
}
