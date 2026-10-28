# Changelog

## 2026-10-29 (IST)

- New guide: EWS certificate (`/ews-certificate-india/`). Income below Rs 8 lakh, the land, flat and plot limits, the family definition, how DoPT says to measure property, who issued it under the 2019 memorandum and how the 15 March 2024 memorandum moved that choice to States and UTs, the Annexure-I format, which financial year and validity year it must show, and a template asking the issuing officer to correct a certificate. Sources: DoPT memoranda of 31 January 2019 and 15 March 2024 and the FAQ of 19 September 2022 (full-text copies on dcmsme.gov.in and csir.res.in, because the dopt.gov.in PDF is gone), plus the PIB Lok Sabha reply of 5 August 2026.
- New guide: income certificate in Uttar Pradesh (`/income-certificate-uttar-pradesh/`). Tehsildar, 20 working days, first appeal to the SDM within 30 days, second appeal to the DM within 60 days, no court fee, penalty up to Rs 5,000, and why some reports say 15 days (that limit is for grievances about the certificate). First appeal template. Sources: CMO Janhit Guarantee list of 14 December 2022, Revenue notification of 15 January 2011, notification of 21 October 2022, the 2011 Act and Rules.
- New hubs: Uttar Pradesh and EWS certificate. UP income row and a UP and EWS paragraph added to the pillar. Links added from the pillar and the Maharashtra and Bihar guides.
- tools/check_pages.py now reads hub slugs from site.json, so a new sector hub is not checked as a guide.
- Karnataka (#6, #7) skipped again: the Karnataka portals still fail TLS from the build box.
- Left out: fee, documents and validity for UP (edistrict.up.gov.in did not open), and the EWS fee and time limit (set by each state, not DoPT).
- Facts checked 29 October 2026.

## 2026-10-28 (IST)

- New guide: Bihar caste, income and residence certificates under the RTPS Act (`/bihar-certificates-rtps/`). It covers the time limits (10 working days at CO, SDO or DM level; tatkal 2 working days at CO level), the application form numbers, validity, the first and second appeal officers and limits, the no-fee appeal, the hearing notice, and the officer penalty (Rs 250 a day up to Rs 5,000). It includes a first appeal template and 5 FAQs.
- Bihar hub is live. Three Bihar rows were added to the pillar time limits table, and the other-states section was retitled "Bihar and other states". Linked from the pillar, the three Maharashtra guides and the calculator.
- Left out: the fee and a full documents list (the state does not publish them in the sources checked). The RTPS appeal site did not open. Bihar was not added to the calculator because it counts working days without public holidays.
- Karnataka residence certificate (queue #6) was not started: the Karnataka portals fail TLS from the build box, so the Sakala time limit could not be checked.
- Facts checked 28 October 2026.

## 2026-10-27 (IST), evening

- Income, domicile and caste certificate (Maharashtra) pages: added a note below the documents table that a Government of Maharashtra order of 1 July 2004 (Revenue and Forests Department, section 9 of the Bombay Stamp Act, 1958) remits the stamp duty on affidavits or declarations made for obtaining caste, income, domicile and nationality certificates. Linked to the IGR Maharashtra copy of the order (checked 27 October 2026) and added to each page's sources.
- br mogul's Maharashtra certificate checklist PDF was reviewed and not published yet: it says you can apply "at your Tahsil office", which no site page or official checklist supports, and it still has two "[UNCHECKED: ...]" draft notes in the reader-facing text.

## 2026-10-27 (IST)

- Visit counting added: the same GoatCounter snippet as Where to Complain (`https://where-to-complain.goatcounter.com/count`, script `gc.zgo.at/count.js`) is in the layout, so every page has it. No new account; pages are told apart by the `/certificate-guide-india/` path.
- Privacy page rewritten to say what GoatCounter counts, from its privacy policy checked 27 October 2026 (no cookies, no IP storage). Removed every "no analytics" claim from the home, about, privacy, calculator FAQ, llms.txt, README, DESIGN.md and BUILD-PLAYBOOK.md.
- New guide: caste certificate in Maharashtra (fee INR 40, documents and affidavits, SDO or Deputy Collector, appeal ladder, rejection appeal under the Caste Certificate Act, validity certificate, Form II template).
- Official pages disagree on the time limit (21 vs 45 days). The page shows every source and the first appeal dates (day 46 to 51) that fit both readings.
- Caste certificate hub is live. Caste row added to the pillar time limits table and annotated on the Maharashtra hub. Linked from the income, domicile and calculator pages. Caste not added to the calculator until the time limit is settled.
- Facts checked 27 October 2026.

## 2026-10-26 (IST)

- Launched Certificate Guide India (site #2), built from the Where to Complain generator.
- Pages: home, pillar (certificate time limits in India), income certificate in Maharashtra, domicile certificate in Maharashtra, is my certificate late calculator, hubs (Maharashtra, income certificate, domicile certificate), about, how we check facts, privacy.
- Facts checked 26 October 2026 against Aaple Sarkar checklists and RTS table, the Maharashtra Right to Public Services Act, 2015 and the 2016 Rules.
- No analytics. Own sitemap.xml and robots.txt in /docs. IndexNow key file at the site root.
