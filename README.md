# Certificate Guide India

**Live site:** https://rudracodeshere.github.io/certificate-guide-india/
**Repo:** https://github.com/rudracodeshere/certificate-guide-india

A free static guide to Indian government certificates: which documents, what fee, the officer who issues it, the official time limit, and who to appeal to if the certificate is late. Every fact is copied from an official government page, PDF, Act or Rules, with the URL and the date it was checked. If the state does not publish something, the page says "Not published by the state" instead of guessing. No ads and no cookies (JavaScript only on the calculator page, plus the privacy-friendly GoatCounter visit counter).

Sister site: [Where to Complain](https://rudracodeshere.github.io/where-to-complain/) (consumer complaint escalation ladders).

## Pages (as of 2026-10-29)

| Page | URL |
|------|-----|
| Home | https://rudracodeshere.github.io/certificate-guide-india/ |
| Pillar: certificate time limits in India and what to do if late | https://rudracodeshere.github.io/certificate-guide-india/certificate-time-limits-india/ |
| Income certificate in Maharashtra | https://rudracodeshere.github.io/certificate-guide-india/income-certificate-maharashtra/ |
| Domicile certificate in Maharashtra | https://rudracodeshere.github.io/certificate-guide-india/domicile-certificate-maharashtra/ |
| Caste certificate in Maharashtra | https://rudracodeshere.github.io/certificate-guide-india/caste-certificate-maharashtra/ |
| Bihar caste, income and residence certificates (RTPS time limits and appeals) | https://rudracodeshere.github.io/certificate-guide-india/bihar-certificates-rtps/ |
| EWS certificate: Rs 8 lakh rule, who issues it, format | https://rudracodeshere.github.io/certificate-guide-india/ews-certificate-india/ |
| Income certificate in Uttar Pradesh (20 working days, appeals) | https://rudracodeshere.github.io/certificate-guide-india/income-certificate-uttar-pradesh/ |
| Is my certificate late? calculator (tool) | https://rudracodeshere.github.io/certificate-guide-india/is-my-certificate-late-calculator/ |
| Hubs: Maharashtra, Bihar, Uttar Pradesh, EWS certificate, Income certificate, Domicile certificate, Caste certificate | https://rudracodeshere.github.io/certificate-guide-india/maharashtra/, https://rudracodeshere.github.io/certificate-guide-india/bihar/, https://rudracodeshere.github.io/certificate-guide-india/uttar-pradesh/, https://rudracodeshere.github.io/certificate-guide-india/ews-certificate/, https://rudracodeshere.github.io/certificate-guide-india/income-certificate/, https://rudracodeshere.github.io/certificate-guide-india/domicile-certificate/, https://rudracodeshere.github.io/certificate-guide-india/caste-certificate/ |
| About and disclaimer | https://rudracodeshere.github.io/certificate-guide-india/about/ |
| How we check facts | https://rudracodeshere.github.io/certificate-guide-india/how-we-check-facts/ |
| Privacy | https://rudracodeshere.github.io/certificate-guide-india/privacy/ |
| Sitemap, robots, llms.txt | https://rudracodeshere.github.io/certificate-guide-india/sitemap.xml, https://rudracodeshere.github.io/certificate-guide-india/robots.txt, https://rudracodeshere.github.io/certificate-guide-india/llms.txt |

Planned pages and the standing rules are in [QUEUE.md](QUEUE.md). Release notes are in [CHANGELOG.md](CHANGELOG.md).

## Sitemap and robots.txt

The site has its own `docs/sitemap.xml` and `docs/robots.txt`, and robots.txt points to the sitemap. Note: this is a GitHub Pages project page, so robots.txt is served at https://rudracodeshere.github.io/certificate-guide-india/robots.txt. Crawlers only read robots.txt at the domain root (https://rudracodeshere.github.io/robots.txt), so a project-page robots.txt is not read by crawlers at the domain root. Its rules are effectively informational. The sitemap is submitted directly to Bing (Bing Webmaster API) and listed through IndexNow, so discovery does not depend on robots.txt.

## Analytics

GoatCounter (free, no cookies) is live since 2026-10-27. It reuses site #1's counter code, `https://where-to-complain.goatcounter.com/count`, so visits land in the same dashboard: https://where-to-complain.goatcounter.com (account email: Boss's; login needs Boss). Both sites are on rudracodeshere.github.io, so pages are told apart by path: filter the dashboard on `/certificate-guide-india/` for this site. The snippet is in the layout in build.py, so every new page gets it. The privacy page describes what GoatCounter records. Search data comes from Bing Webmaster Tools.

## How it is built

- `data/pages/*.json`: one file per page (facts, sources with checked dates, appeal template, FAQ).
- `site.json`: name, base URL, hubs, IndexNow key.
- `build.py`: stdlib only Python generator. Writes `docs/` (GitHub Pages serves main /docs).
- `assets/calculator.js`: date calculator, rules from the Maharashtra Right to Public Services Act, 2015.

```
python3 build.py --check                                  # build + all content, SEO and link checks
node tools/test_calculator.js                             # calculator unit cases
CHROME=/usr/bin/google-chrome python3 tools/test_site.py  # Playwright smoke test of every page
python3 tools/indexnow.py                                 # ping IndexNow with every sitemap URL
```

Design and page rules: [DESIGN.md](DESIGN.md). Nightly checklist: [BUILD-PLAYBOOK.md](BUILD-PLAYBOOK.md).

## Indexing

- IndexNow key file: https://rudracodeshere.github.io/certificate-guide-india/113fb50ddfa07bd6a7ae8f9ced4a6e4f.txt
- Bing Webmaster (API, 2026-10-26 21:22 IST): AddSite, then verified with `BingSiteAuth.xml` and the `msvalidate.01` meta tag (VerifySite returned true). SubmitFeed for sitemap.xml (status Pending), SubmitUrlBatch for all 11 sitemap URLs (daily quota now 89).
- IndexNow: HTTP 202 for all 11 sitemap URLs.

## License

Code: MIT (see LICENSE). Page content: CC BY 4.0. Official documents linked from the pages belong to their publishers.
