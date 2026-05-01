# Security Policy

## Security Contact

If you've discovered a security vulnerability, please report it privately to the security contact below.

- Email: garukar9895@gmail.com

## Supported Reporting

If you believe you found a security issue, report it privately to the repository owner before opening a public issue.

Provide:

- A short description of the issue
- The affected route, page, or environment
- Reproduction steps if available
- Any logs or screenshots that help explain the problem

## Secret Handling

Treat any secret that appears in chat, logs, screenshots, or issue text as exposed.

Rotate secrets if they have been shared publicly or outside your control.

Common examples include:

- Payment provider tokens
- Webhook signing secrets
- Email service API keys
- Database connection strings

## Rotation Workflow

1. Create replacement secrets in the provider console.
2. Update deployment environment variables.
3. Update local development files only if needed.
4. Redeploy and verify the booking, webhook, and email flows.
5. Revoke the old secrets after the new deployment is stable.

## Safe Practices

- Keep `.env`, `.env.local`, and similar files out of git.
- Avoid posting live credentials in issues, chats, or screenshots.
- Use test or preview credentials when validating non-production changes.

## Verification Checklist

After any secret rotation, confirm:

- Booking creation still succeeds
- Webhook events are received and verified
- Email delivery still works from the verified sender
- Database migrations still connect successfully