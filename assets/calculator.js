/* "Is my certificate late?" calculator. Runs only in the browser; nothing is sent anywhere.
   Every rule comes from an official source listed in SRC (checked VERIFIED).
   Days are counted as calendar days: the official RTS table says "days" and does not say working days. */
(function (root) {
  "use strict";
  var VERIFIED = "26 October 2026";
  var SRC = {
    rts: { label: "Aaple Sarkar: Right to Services, notified services and time limits", url: "https://aaplesarkar.mahaonline.gov.in/en/CommonForm/CitizenServices_RTS" },
    act: { label: "Maharashtra Right to Public Services Act, 2015 (sections 5, 9 and 18)", url: "https://cdnbbsr.s3waas.gov.in/s3b090409688550f3cc93f4ed88ec6cafb/uploads/2024/10/202410091639591852.pdf" }
  };
  // Time limit and officers as published in the Revenue Department rows of the Aaple Sarkar RTS table.
  var SERVICES = {
    "mh-income": { name: "Income certificate (Maharashtra)", days: 15, officer: "Nayab Tahsildar", first: "Tahsildar", second: "Sub-Divisional Officer" },
    "mh-domicile": { name: "Age, Nationality and Domicile certificate (Maharashtra)", days: 15, officer: "Tahsildar", first: "Sub-Divisional Officer", second: "Additional Collector" }
  };
  function parse(s) {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(s || "")) return null;
    var p = s.split("-").map(Number), d = new Date(Date.UTC(p[0], p[1] - 1, p[2]));
    return d.getUTCMonth() === p[1] - 1 ? d : null;
  }
  function iso(d) { return d.toISOString().slice(0, 10); }
  function addDays(d, n) { return new Date(d.getTime() + n * 86400000); }
  var MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  function fmt(d) { return d.getUTCDate() + " " + MONTHS[d.getUTCMonth()] + " " + d.getUTCFullYear(); }

  function calculate(service, applied, appealed, today) {
    var s = SERVICES[service];
    if (!s) return { error: "Choose a certificate." };
    var a = parse(applied);
    if (!a) return { error: "Enter the date your complete application was received." };
    var t = parse(today), f = appealed ? parse(appealed) : null;
    if (appealed && !f) return { error: "Enter a valid first appeal date, or leave it empty." };
    var due = addDays(a, s.days), from = addDays(due, 1), last = addDays(due, 30), outer = addDays(due, 90);
    if (f && f < from) return { error: "The first appeal date is before the time limit ended. For a rejection, the 30 days count from when you received the rejection order." };
    var rows = [], notes = [];
    rows.push({ label: "The " + s.officer + " should issue the certificate or reject it by", date: iso(due),
      rule: s.days + " days for this service, counted from the date the complete application is received (Act section 5(1)).", src: "rts" });
    rows.push({ label: "If nothing by then, you can file a first appeal to the " + s.first + " from", date: iso(from),
      rule: "Section 9(1): a person not provided the service within the stipulated time limit may appeal to the First Appellate Authority.", src: "act" });
    rows.push({ label: "Last date for the first appeal", date: iso(last),
      rule: "Section 9(1): within thirty days from the expiry of the stipulated time limit. The authority may admit a late appeal for sufficient cause, up to ninety days (" + fmt(outer) + ").", src: "act" });
    if (f) {
      rows.push({ label: "The " + s.first + " should decide your first appeal by", date: iso(addDays(f, 30)),
        rule: "Section 9(2): the First Appellate Authority may order the service or reject the appeal within thirty days from the date of filing.", src: "act" });
      rows.push({ label: "If there is no order, you can file a second appeal to the " + s.second + " from", date: iso(addDays(f, 45)),
        rule: "Section 9(3): a second appeal lies after forty-five days from the date of filing the first appeal when no order is received.", src: "act" });
    }
    notes.push("If your application was rejected instead, the first appeal is due within thirty days from when you received the rejection order (section 9(1)).");
    notes.push("If you get an order on the first appeal, a second appeal is due within thirty days of receiving it (section 9(3)). An appeal against the second appellate order goes to the Maharashtra State Commission for Right to Service within sixty days (section 18(1)).");
    notes.push("We count calendar days. The official table says days and does not say whether holidays are left out, so file early rather than on the last day.");
    if (t) {
      if (t <= due) notes.unshift("Your certificate is not late yet. The time limit ends on " + fmt(due) + ".");
      else if (t <= last) notes.unshift("Your certificate is late. You can file a first appeal today.");
      else if (t <= outer) notes.unshift("The normal thirty days for a first appeal have passed. The authority may still admit it for sufficient cause, up to " + fmt(outer) + ". Explain the reason for the delay.");
      else notes.unshift("More than ninety days have passed since the time limit ended, which is the outer limit for a first appeal under section 9(1). You can apply again, or call the Aaple Sarkar helpline on 1800 120 8040.");
    }
    return { rows: rows, notes: notes, due: iso(due), lastDate: iso(last) };
  }

  var api = { calculate: calculate, SERVICES: SERVICES, SRC: SRC, VERIFIED: VERIFIED };
  if (typeof module !== "undefined" && module.exports) { module.exports = api; return; }

  function el(tag, attrs, text) {
    var e = document.createElement(tag);
    for (var k in attrs) e.setAttribute(k, attrs[k]);
    if (text != null) e.textContent = text;
    return e;
  }
  function localToday() {
    var n = new Date();
    return n.getFullYear() + "-" + String(n.getMonth() + 1).padStart(2, "0") + "-" + String(n.getDate()).padStart(2, "0");
  }
  function init() {
    var form = document.getElementById("calc");
    if (!form) return;
    var out = document.getElementById("calc-result");
    form.hidden = false;
    form.applied.max = localToday();
    form.addEventListener("submit", function (ev) {
      ev.preventDefault();
      var res = calculate(form.service.value, form.applied.value, form.appealed.value, localToday());
      out.textContent = "";
      if (res.error) { out.appendChild(el("p", { "class": "notice", role: "alert" }, res.error)); out.focus(); return; }
      out.appendChild(el("h2", { id: "your-dates" }, "Your dates"));
      var ol = el("ol", { "class": "ladder" });
      res.rows.forEach(function (row) {
        var li = el("li"), dl = el("dl");
        li.appendChild(el("p", { "class": "rung-who" }, row.label));
        dl.appendChild(el("dt", {}, "Date"));
        dl.appendChild(el("dd", { "class": "deadline", "data-iso": row.date }, fmt(parse(row.date))));
        dl.appendChild(el("dt", {}, "Rule"));
        dl.appendChild(el("dd", {}, row.rule));
        dl.appendChild(el("dt", {}, "Source"));
        var dd = el("dd"), a = el("a", { href: SRC[row.src].url, rel: "noopener" }, SRC[row.src].label);
        dd.appendChild(a); dd.appendChild(document.createTextNode(". Last checked: " + VERIFIED + "."));
        dl.appendChild(dd);
        li.appendChild(dl); ol.appendChild(li);
      });
      out.appendChild(ol);
      var ul = el("ul");
      res.notes.forEach(function (n) { ul.appendChild(el("li", {}, n)); });
      var box = el("div", { "class": "notice" }); box.appendChild(el("h3", {}, "Good to know")); box.appendChild(ul);
      out.appendChild(box);
      out.appendChild(el("p", { "class": "meta" }, "This is a guide, not legal advice. Check the official sources linked above before you act."));
      out.focus();
    });
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init); else init();
})(this);
