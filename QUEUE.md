# Page queue

Order matters: the nightly job takes the first `todo` row. After publishing, change it to `done` and add the live URL.
Source of the list: `/workspace/boring-realty/picks/03-state-certificate-guide.md` (first 10 pages).

## Standing rules for every page

- Open with a 40 to 60 word answer (`direct_answer`) that stands alone when quoted.
- Every guide gets 3 or more inbound internal links (hub, pillar, sibling guides, calculator).
- No em or en dashes anywhere in the copy.
- `title` is 60 characters or fewer.
- Every fact is copied from an official government page, PDF, Act or Rules, with its URL and the date checked. If the state does not publish it, write "Not published by the state". Never guess.
- Run `python3 build.py --check`, `node tools/test_calculator.js` and `CHROME=/usr/bin/google-chrome python3 tools/test_site.py` before pushing. Then ping IndexNow and Bing.

## First 10

| # | Status | Page | Slug | Notes |
|---|--------|------|------|-------|
| 1 | done 2026-10-26 https://rudracodeshere.github.io/certificate-guide-india/certificate-time-limits-india/ | Pillar: certificates in India, time limits, what to do if late | `certificate-time-limits-india` | Maharashtra only so far. Add each new state to its time limits table. |
| 2 | done 2026-10-26 https://rudracodeshere.github.io/certificate-guide-india/income-certificate-maharashtra/ | Income certificate in Maharashtra | `income-certificate-maharashtra` | Checklist PDF + RTS table + Act + Rules. Validity not published. |
| 3 | done 2026-10-26 https://rudracodeshere.github.io/certificate-guide-india/domicile-certificate-maharashtra/ | Domicile certificate in Maharashtra | `domicile-certificate-maharashtra` | Years of residence required: not published on the checklist or RTS page. Add only from an official GR. |
| 10 | done 2026-10-26 https://rudracodeshere.github.io/certificate-guide-india/is-my-certificate-late-calculator/ | Free tool: is my certificate late? | `is-my-certificate-late-calculator` | Maharashtra income + domicile only. Add a service to `assets/calculator.js` only after its time limit is verified. Calendar days (the Act does not say working days). |
| 4 | done 2026-10-27 https://rudracodeshere.github.io/certificate-guide-india/caste-certificate-maharashtra/ | Caste certificate in Maharashtra | `caste-certificate-maharashtra` | Conflict shown on page: 21 days (Aaple Sarkar RTS table, caste checklist PDF, Ahilyanagar) vs 45 days (Aaple Sarkar caste service page ServiceId=1289, Jalgaon, Chandrapur, Caste Certificate Rules 2012 rule 5(10)-(11)). No official order found that settles it. Not added to the calculator until one time limit is confirmed. ST rules, the Act s5 Appellate Authority notification and certificate validity period not verified; left as "not published"/not checked. Caste hub now live. |
| 5 | done 2026-10-28 | Income, caste and residence certificates in Bihar | `bihar-certificates-rtps` | Live: https://rudracodeshere.github.io/certificate-guide-india/bihar-certificates-rtps/ . Time limits (10 working days, tatkal 2), appeal officers and 15 day appeal limits from the GAD services PDF on serviceonline.bihar.gov.in; appeal windows, penalty and no-fee rule from the RTPS Act and Rules PDFs on rtps.bihar.gov.in (checked 2026-10-28). Fee and full documents list not published, so left out. rtpsappeal.bihar.gov.in did not open from the box. Not added to the calculator: Bihar counts working days without public holidays, and the calculator is built for Maharashtra calendar days. |
| 6 | todo | Domicile / residence certificate in Karnataka | `residence-certificate-karnataka` | Nadakacheri / Seva Sindhu. Sakala time limit from an official Sakala list only. Skipped 2026-10-28: nadakacheri.karnataka.gov.in, sevasindhu.karnataka.gov.in and sakala.kar.nic.in all fail TLS from the box (curl "unexpected eof"), and WebFetch gets 500/504, so no official Sakala time limit could be checked. The serviceonline.gov.in "Domicile/Residence Certificate" listing (7 days) mentions "Proof of Stay in Island" and is not clearly Karnataka, so it was not used. Retry next run. |
| 7 | todo | Caste certificate in Karnataka | `caste-certificate-karnataka` | Same sources as #6. |
| 8 | todo | EWS certificate: who qualifies and how to apply | `ews-certificate-india` | Central rule from DoPT official memorandum; per state links only where verified. |
| 9 | todo | Income certificate in Uttar Pradesh (e-District) | `income-certificate-uttar-pradesh` | edistrict.up.gov.in and the UP Janhit Guarantee Act time limit list only. |
