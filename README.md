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
3. Set `FRONTEND_ORIGIN` to the exact browser origin when the frontend and API
	use different hosts.
4. In GoDaddy or Microsoft 365, enable Authenticated SMTP for the mailbox.
5. Start the site with `npm start` and open `http://localhost:3000`.

### Render deployment

Render does not read the local `.env` file. Add these environment variables in
the Render web service settings, using the real mailbox values only in Render's
secret fields:

```env
SMTP_HOST=smtpout.secureserver.net
SMTP_PORT=465
SMTP_SECURE=true
SMTP_USER=your-mailbox@example.com
SMTP_PASS=your-mailbox-password
MAIL_TO=recipient@example.com
PORT=10000
```

Save the variables and redeploy the service. `FRONTEND_ORIGIN` is only needed
when the frontend is hosted on a different origin; for a site served directly
from `https://multiplan.onrender.com`, leave `emailApiUrl` empty in
`js/config.js`.

The frontend and Node server must be deployed under the same origin, or the
browser request must be configured with the server's public API URL. For a
GitHub Pages deployment, set `emailApiUrl` in `js/config.js` to the deployed
Node.js endpoint, for example `https://api.example.com/api/send-email`.
GitHub Pages alone cannot run the SMTP backend.