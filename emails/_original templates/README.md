# Clutch Certified — Original Iterable Email Templates

23 source HTML files pulled from Iterable. These are the **untouched originals** for the active templates that match the Clutch Certified Email Figma file.

## Mapping

| File | Iterable Template ID | Iterable Template Name |
|---|---|---|
| `onboarding-1-why-buy-clutch.html` | 10612233 | Onboarding Email #1 (Why Buy Clutch) - v3 |
| `onboarding-2-syc.html` | 6730038 | Onboarding Email (SYC) - v3 |
| `onboarding-3-financing.html` | 6730117 | Onboarding Email (Financing/PreApproval) - v3 |
| `browse-abandonment-1.html` | 20156986 | Browse Abandonment - Email 1 (AUG 2025) |
| `browse-abandonment-2.html` | 20157073 | Browse Abandonment - Email 2 (AUG 2025) |
| `browse-abandonment-3.html` | 20157097 | Browse Abandonment - Email 3 (AUG 2025) |
| `browse-abandonment-4.html` | 20157115 | Browse Abandonment - Email 4 (AUG 2025) |
| `price-drop-v2.html` | 21444260 | Price-drop v2 |
| `checkout-1.html` | 18827663 | Weekly 1 Checkout Abandonment - Email 1 |
| `checkout-2.html` | 18827715 | Weekly 2 Checkout Abandonment - Email 2 |
| `checkout-3.html` | 18827733 | Weekly 3 Checkout Abandonment - Email 3 |
| `checkout-4.html` | 11055426 | Checkout Abandonment - Email 4 - Not Signed in |
| `coming-soon-v3.html` | 21467051 | Coming soon to Available v3 |
| `sale-pending-v2.html` | 13326277 | Coming soon to Available v2 |
| `sale-pending-v3.html` | 21445349 | Coming soon to Available v3 (Sale Pending) |
| `coming-soon-expansion.html` | 19585045 | Coming Soon -> Available Expansion |
| `stc-offer-increase-v2.html` | 16081451 | March 2024 - Offer Refresh: Increase v2 |
| `stc-offer-decrease-v2.html` | 15867879 | March 2024 - Offer Refresh: Decrease v2 |
| `stc-sell-trade-1.html` | 17996622 | March 2024 - Sell #1 |
| `stc-sell-3.html` | 13327229 | March 2024 - Sell #3 |
| `clutch-alert-1.html` | 22551508 | Saved Search Alert 1 |
| `new-arrivals-4u.html` | 22530100 | New Arrivals For You - ON |
| `winback-new-arrivals.html` | 22551905 | New Arrivals For You - NS |

## Notes for Rav

- These are the live HTML templates as they exist in Iterable today. They contain a mix of inline styles and table-based layout (Iterable's drag-and-drop editor output).
- Iterable Handlebars logic (e.g. `{{LatestVDPview_make}}`, `{{#catalogCollection}}...{{/catalogCollection}}`) drives dynamic content and **must be preserved verbatim** in any redesign. Anything in `{{...}}` is a merge field or template helper that the platform fills in at send time.
- Open any file directly in a browser to preview the desktop layout. Some dynamic content will appear as raw `{{...}}` placeholders — that's expected.
- The annotated Figma file remains the source of truth for the redesign direction:
  https://www.figma.com/design/LSqr9COweEFc3rKPvG7XNm/Clutch-Certified-Email
