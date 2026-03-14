import {
  Body, Container, Head, Heading, Hr, Html,
  Preview, Section, Text, Row, Column,
} from "@react-email/components";

export type BookingConfirmationProps = {
  customerName: string;
  service: string;
  date: string;
  time: string;
  address: string;
  depositAmount: string;
  totalAmount: string;
  balanceDue: string;
  bookingId: string;
};

export default function BookingConfirmation({
  customerName = "Jane Smith",
  service = "Residential Cleaning",
  date = "Monday, 20 January 2025",
  time = "10:00 AM – 12:00 PM",
  address = "Richmond, VIC",
  depositAmount = "$16.00",
  totalAmount = "$160.00",
  balanceDue = "$144.00",
  bookingId = "SC-00123",
}: BookingConfirmationProps) {
  return (
    <Html>
      <Head />
      <Preview>Your SparkClean booking is confirmed — {service} on {date}</Preview>
      <Body style={main}>
        <Container style={container}>

          {/* Header */}
          <Section style={header}>
            <Heading style={logo}>✦ SparkClean</Heading>
            <Text style={headerSub}>Professional Cleaning Services</Text>
          </Section>

          {/* Hero */}
          <Section style={heroSection}>
            <Text style={heroEmoji}>✅</Text>
            <Heading style={heroHeading}>Booking Confirmed!</Heading>
            <Text style={heroText}>
              Hi {customerName}, your booking is confirmed. We&apos;re looking forward to making your space sparkle.
            </Text>
          </Section>

          <Hr style={divider} />

          {/* Booking details */}
          <Section style={detailsSection}>
            <Heading style={sectionHeading}>Booking Details</Heading>
            {[
              { label: "Booking ID", value: bookingId },
              { label: "Service", value: service },
              { label: "Date", value: date },
              { label: "Time", value: time },
              { label: "Address", value: address },
            ].map(({ label, value }) => (
              <Row key={label} style={detailRow}>
                <Column style={detailLabel}>{label}</Column>
                <Column style={detailValue}>{value}</Column>
              </Row>
            ))}
          </Section>

          <Hr style={divider} />

          {/* Payment summary */}
          <Section style={detailsSection}>
            <Heading style={sectionHeading}>Payment Summary</Heading>
            <Row style={detailRow}>
              <Column style={detailLabel}>Total Clean</Column>
              <Column style={detailValue}>{totalAmount}</Column>
            </Row>
            <Row style={detailRow}>
              <Column style={detailLabel}>Deposit Paid</Column>
              <Column style={{ ...detailValue, color: "#16a34a" }}>{depositAmount} ✓</Column>
            </Row>
            <Row style={{ ...detailRow, borderTop: "1px solid #BAE6FD", paddingTop: "12px" }}>
              <Column style={{ ...detailLabel, fontWeight: "700", color: "#0C1A2E" }}>Balance Due</Column>
              <Column style={{ ...detailValue, fontWeight: "700", color: "#0EA5E9" }}>{balanceDue}</Column>
            </Row>
            <Section style={balanceNotice}>
              <Text style={balanceNoticeText}>
                💳 A payment link for the remaining balance will be sent <strong>24 hours before your clean</strong>. Please complete this to secure your slot.
              </Text>
            </Section>
          </Section>

          <Hr style={divider} />

          {/* What happens next */}
          <Section style={detailsSection}>
            <Heading style={sectionHeading}>What Happens Next</Heading>
            {[
              { step: "1", text: "We'll assign your dedicated cleaner and send their details closer to the date." },
              { step: "2", text: "A payment link for the remaining balance arrives 24hrs before your clean." },
              { step: "3", text: "Your cleaner arrives on time with all equipment and eco-friendly products." },
            ].map(({ step, text }) => (
              <Row key={step} style={stepRow}>
                <Column style={stepBadge}>{step}</Column>
                <Column style={stepText}>{text}</Column>
              </Row>
            ))}
          </Section>

          <Hr style={divider} />

          {/* Cancellation policy */}
          <Section style={detailsSection}>
            <Text style={policyText}>
              <strong>Cancellation Policy:</strong> Cancel for free up to 48 hours before your clean for a full refund. Cancellations within 48 hours may forfeit the deposit.
            </Text>
          </Section>

          {/* Footer */}
          <Section style={footer}>
            <Text style={footerText}>
              Questions? Reply to this email or call{" "}
              <a href="tel:+61391234567" style={link}>+61 3 9123 4567</a>
            </Text>
            <Text style={footerText}>
              <a href="https://sparkclean.com.au" style={link}>sparkclean.com.au</a>
              {" · "}
              <a href="https://sparkclean.com.au/privacy" style={link}>Privacy</a>
              {" · "}
              <a href="https://sparkclean.com.au/terms" style={link}>Terms</a>
            </Text>
            <Text style={footerMuted}>© {new Date().getFullYear()} SparkClean. All rights reserved.</Text>
          </Section>

        </Container>
      </Body>
    </Html>
  );
}

const main = { backgroundColor: "#F0F9FF", fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" };
const container = { maxWidth: "560px", margin: "0 auto", backgroundColor: "#ffffff", borderRadius: "16px", overflow: "hidden", boxShadow: "0 4px 24px rgba(14,165,233,0.08)" };
const header = { backgroundColor: "#0EA5E9", padding: "28px 40px 24px", textAlign: "center" as const };
const logo = { color: "#ffffff", fontSize: "22px", fontWeight: "800", margin: "0" };
const headerSub = { color: "rgba(255,255,255,0.75)", fontSize: "12px", margin: "4px 0 0" };
const heroSection = { padding: "36px 40px 28px", textAlign: "center" as const };
const heroEmoji = { fontSize: "40px", margin: "0 0 12px" };
const heroHeading = { color: "#0C1A2E", fontSize: "26px", fontWeight: "800", margin: "0 0 12px" };
const heroText = { color: "#64748B", fontSize: "15px", lineHeight: "1.6", margin: "0" };
const divider = { borderColor: "#BAE6FD", margin: "0 40px" };
const detailsSection = { padding: "28px 40px" };
const sectionHeading = { color: "#0C1A2E", fontSize: "13px", fontWeight: "700", textTransform: "uppercase" as const, letterSpacing: "0.8px", margin: "0 0 16px" };
const detailRow = { marginBottom: "10px" };
const detailLabel = { color: "#64748B", fontSize: "13px", width: "40%" };
const detailValue = { color: "#0C1A2E", fontSize: "13px", fontWeight: "600" };
const balanceNotice = { backgroundColor: "#F0F9FF", borderRadius: "10px", padding: "12px 16px", marginTop: "16px" };
const balanceNoticeText = { color: "#0369A1", fontSize: "12px", lineHeight: "1.6", margin: "0" };
const stepRow = { marginBottom: "14px" };
const stepBadge = { width: "24px", backgroundColor: "#F0F9FF", borderRadius: "50%", color: "#0EA5E9", fontSize: "11px", fontWeight: "800", textAlign: "center" as const, verticalAlign: "top", paddingTop: "4px" };
const stepText = { color: "#64748B", fontSize: "13px", lineHeight: "1.6", paddingLeft: "12px" };
const policyText = { color: "#64748B", fontSize: "12px", lineHeight: "1.6", backgroundColor: "#FFF7ED", borderRadius: "10px", padding: "12px 16px", margin: "0" };
const footer = { backgroundColor: "#F8FAFC", padding: "24px 40px", textAlign: "center" as const, borderTop: "1px solid #BAE6FD" };
const footerText = { color: "#94A3B8", fontSize: "12px", margin: "0 0 4px" };
const link = { color: "#0EA5E9", textDecoration: "none" };
const footerMuted = { color: "#CBD5E1", fontSize: "11px", margin: "8px 0 0" };