import {
  Body, Container, Head, Heading, Hr, Html,
  Preview, Section, Text, Row, Column,
} from "@react-email/components";

export type BookingNotificationProps = {
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  service: string;
  date: string;
  time: string;
  address: string;
  instructions?: string;
  depositAmount: string;
  totalAmount: string;
  balanceDue: string;
  bookingId: string;
  squarePaymentId: string;
};

export default function BookingNotification({
  customerName = "Jane Smith",
  customerEmail = "jane@email.com",
  customerPhone = "+61 400 000 000",
  service = "Residential Cleaning",
  date = "Monday, 20 January 2025",
  time = "10:00 AM – 12:00 PM",
  address = "Richmond, VIC",
  instructions = "Pet in the house, focus on kitchen",
  depositAmount = "$16.00",
  totalAmount = "$160.00",
  balanceDue = "$144.00",
  bookingId = "SC-00123",
  squarePaymentId = "sq_abc123",
}: BookingNotificationProps) {
  return (
    <Html>
      <Head />
      <Preview>New booking — {customerName} · {service} · {date}</Preview>
      <Body style={main}>
        <Container style={container}>

          {/* Header */}
          <Section style={header}>
            <Heading style={logo}>✦ SparkClean — New Booking</Heading>
            <Text style={headerSub}>Deposit collected · Action may be required</Text>
          </Section>

          {/* Alert banner */}
          <Section style={alertBanner}>
            <Text style={alertText}>
              🎉 A new booking has been confirmed and the 10% deposit has been collected via Square.
            </Text>
          </Section>

          {/* Customer details */}
          <Section style={detailsSection}>
            <Heading style={sectionHeading}>Customer</Heading>
            {[
              { label: "Name", value: customerName },
              { label: "Email", value: customerEmail },
              { label: "Phone", value: customerPhone },
            ].map(({ label, value }) => (
              <Row key={label} style={detailRow}>
                <Column style={detailLabel}>{label}</Column>
                <Column style={detailValue}>{value}</Column>
              </Row>
            ))}
          </Section>

          <Hr style={divider} />

          {/* Booking details */}
          <Section style={detailsSection}>
            <Heading style={sectionHeading}>Booking</Heading>
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
            {instructions && (
              <Row style={detailRow}>
                <Column style={detailLabel}>Instructions</Column>
                <Column style={{ ...detailValue, color: "#64748B" }}>{instructions}</Column>
              </Row>
            )}
          </Section>

          <Hr style={divider} />

          {/* Payment */}
          <Section style={detailsSection}>
            <Heading style={sectionHeading}>Payment</Heading>
            <Row style={detailRow}>
              <Column style={detailLabel}>Total</Column>
              <Column style={detailValue}>{totalAmount}</Column>
            </Row>
            <Row style={detailRow}>
              <Column style={detailLabel}>Deposit Collected</Column>
              <Column style={{ ...detailValue, color: "#16a34a" }}>{depositAmount} ✓</Column>
            </Row>
            <Row style={detailRow}>
              <Column style={{ ...detailLabel, fontWeight: "700", color: "#0C1A2E" }}>Balance to Collect</Column>
              <Column style={{ ...detailValue, fontWeight: "700", color: "#0EA5E9" }}>{balanceDue}</Column>
            </Row>
            <Row style={detailRow}>
              <Column style={detailLabel}>Square Payment ID</Column>
              <Column style={{ ...detailValue, fontFamily: "monospace", fontSize: "12px", color: "#64748B" }}>{squarePaymentId}</Column>
            </Row>
          </Section>

          <Hr style={divider} />

          {/* Action required */}
          <Section style={actionSection}>
            <Heading style={sectionHeading}>Action Required</Heading>
            {[
              "Assign a cleaner to this booking",
              `Send balance payment link 24hrs before (${date})`,
              "Confirm cleaner details with customer day before",
            ].map((item, i) => (
              <Row key={i} style={detailRow}>
                <Column style={checkCol}>☐</Column>
                <Column style={actionText}>{item}</Column>
              </Row>
            ))}
          </Section>

          {/* Footer */}
          <Section style={footer}>
            <Text style={footerText}>SparkClean Internal Notification · Do not reply</Text>
            <Text style={footerMuted}>Booking ID: {bookingId} · Square: {squarePaymentId}</Text>
          </Section>

        </Container>
      </Body>
    </Html>
  );
}

const main = { backgroundColor: "#F0F9FF", fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" };
const container = { maxWidth: "560px", margin: "0 auto", backgroundColor: "#ffffff", borderRadius: "16px", overflow: "hidden" };
const header = { backgroundColor: "#0C1A2E", padding: "24px 40px", textAlign: "center" as const };
const logo = { color: "#ffffff", fontSize: "18px", fontWeight: "800", margin: "0" };
const headerSub = { color: "rgba(255,255,255,0.5)", fontSize: "12px", margin: "4px 0 0" };
const alertBanner = { backgroundColor: "#f0fdf4", borderLeft: "4px solid #16a34a", padding: "14px 40px" };
const alertText = { color: "#15803d", fontSize: "13px", lineHeight: "1.6", margin: "0" };
const detailsSection = { padding: "24px 40px" };
const sectionHeading = { color: "#0C1A2E", fontSize: "11px", fontWeight: "700", textTransform: "uppercase" as const, letterSpacing: "1px", margin: "0 0 14px" };
const detailRow = { marginBottom: "8px" };
const detailLabel = { color: "#64748B", fontSize: "13px", width: "40%" };
const detailValue = { color: "#0C1A2E", fontSize: "13px", fontWeight: "600" };
const divider = { borderColor: "#BAE6FD", margin: "0 40px" };
const actionSection = { padding: "24px 40px", backgroundColor: "#FFFBEB" };
const checkCol = { width: "20px", color: "#D97706", fontSize: "14px", verticalAlign: "top" };
const actionText = { color: "#92400E", fontSize: "13px", lineHeight: "1.6", paddingLeft: "8px" };
const footer = { backgroundColor: "#F8FAFC", padding: "20px 40px", textAlign: "center" as const, borderTop: "1px solid #BAE6FD" };
const footerText = { color: "#94A3B8", fontSize: "12px", margin: "0 0 4px" };
const footerMuted = { color: "#CBD5E1", fontSize: "11px", margin: "0" };