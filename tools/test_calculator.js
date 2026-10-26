// node tools/test_calculator.js : checks the certificate calculator against hand-worked dates.
const c = require("../assets/calculator.js");
const cases = [
  // [service, applied, firstAppeal, today, expected row dates]
  ["mh-income", "2026-10-01", "", "2026-10-26", ["2026-10-16", "2026-10-17", "2026-11-15"]], // +15, +1, +30
  ["mh-domicile", "2026-12-20", "", "2026-12-21", ["2027-01-04", "2027-01-05", "2027-02-03"]], // across year end
  ["mh-income", "2026-10-01", "2026-10-20", "2026-10-26", ["2026-10-16", "2026-10-17", "2026-11-15", "2026-11-19", "2026-12-04"]], // FA +30, +45
  ["mh-domicile", "2028-02-20", "", "2028-02-21", ["2028-03-06", "2028-03-07", "2028-04-05"]], // leap year
];
let fail = 0;
for (const [s, a, f, t, want] of cases) {
  const r = c.calculate(s, a, f, t);
  const got = r.error ? [r.error] : r.rows.map(x => x.date);
  const ok = JSON.stringify(got) === JSON.stringify(want);
  if (!ok) fail++;
  console.log(ok ? "ok  " : "FAIL", s, a, f || "-", "->", got.join(", "), ok ? "" : `(want ${want.join(", ")})`);
}
const bad = c.calculate("mh-income", "2026-10-01", "2026-10-10", "2026-10-26");
if (!bad.error) { fail++; console.log("FAIL early first appeal should be refused"); } else console.log("ok   early first appeal refused");
if (fail) { console.log(fail + " failed"); process.exit(1); }
console.log("All calculator cases pass");
