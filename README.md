# MULTIPLAN AGRO CULTURE FARMS LTD

Official corporate website for MULTIPLAN AGRO CULTURE FARMS LTD.

## Vision

To pioneer sustainable agricultural solutions that ensure environmental preservation, economic growth, and food security for present and future generations.

## Mission

- Foster sustainable farming practices.
- Support farmers through technology, finance, and education.
- Deliver innovative solutions to climate and agricultural challenges.

## Technology Stack

- HTML5
- CSS3
- JavaScript
- Git
- GitHub Pages
- Node.js and Nodemailer for contact and export inquiry email delivery

## Development Workflow

- `main` → Production
- `develop` → Active development

## Project Status

🚧 Version 2.0 — In Active Development

## Email Forms

The contact and export inquiry forms submit to the Node.js endpoint at
`/api/send-email`. SMTP credentials stay on the server in environment
variables and are never included in browser code.

1. Install dependencies with `npm install`.
2. Copy `.env.example` to `.env` and set `SMTP_USER`, `SMTP_PASS`, and `MAIL_TO`.
3. In GoDaddy or Microsoft 365, enable Authenticated SMTP for the mailbox.
4. Start the site with `npm start` and open `http://localhost:3000`.

The frontend and Node server must be deployed under the same origin, or the
browser request must be configured with the server's public API URL. GitHub
Pages alone cannot run the SMTP backend.