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
  paidAmount: string;
  serviceAmount: string;
  serviceCount: number;
  serviceCountUnit: string;
  addonsTotal: string;
  totalAmount: string;
  addons: { name: string; quantity: number; unitPrice: string; lineTotal: string }[];
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
  paidAmount = "$160.00",
  serviceAmount = "$120.00",
  serviceCount = 1,
  serviceCountUnit = "service",
  addonsTotal = "$40.00",
  totalAmount = "$160.00",
  addons = [{ name: "Inside oven", quantity: 1, unitPrice: "$40.00", lineTotal: "$40.00" }],
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
            <Heading style={logo}>✦ OzClean — New Booking</Heading>
            <Text style={headerSub}>Payment received · Booking confirmed</Text>
          </Section>

          {/* Alert banner */}
          <Section style={alertBanner}>
            <Text style={alertText}>
              🎉 A new booking has been confirmed and full payment has been collected via Square.
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

          {/* Scope and pricing */}
          <Section style={detailsSection}>
            <Heading style={sectionHeading}>Scope & Pricing</Heading>
            <Row style={detailRow}>
              <Column style={detailLabel}>Service Count</Column>
              <Column style={detailValue}>{serviceCount} {serviceCountUnit}</Column>
            </Row>
            <Row style={detailRow}>
              <Column style={detailLabel}>Base Service</Column>
              <Column style={detailValue}>{serviceAmount}</Column>
            </Row>
            <Row style={detailRow}>
              <Column style={detailLabel}>Add-ons</Column>
              <Column style={detailValue}>{addonsTotal}</Column>
            </Row>
            {addons.length > 0 ? (
              <Section style={addonListBox}>
                {addons.map((addon) => (
                  <Row key={addon.name} style={detailRow}>
                    <Column style={detailLabel}>+ {addon.name} ({addon.quantity} x {addon.unitPrice})</Column>
                    <Column style={detailValue}>{addon.lineTotal}</Column>
                  </Row>
                ))}
              </Section>
            ) : (
              <Text style={subtleNote}>No optional add-ons selected for this job.</Text>
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
              <Column style={detailLabel}>Amount Paid Today</Column>
              <Column style={{ ...detailValue, color: "#16a34a" }}>{paidAmount} ✓</Column>
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
              "Assign cleaner and confirm availability for the exact time window",
              "Review customer instructions and map any add-ons to cleaner checklist",
              "Send day-before confirmation with arrival ETA and access instructions",
              "No further payment collection needed (already fully paid)",
            ].map((item, i) => (
              <Row key={i} style={detailRow}>
                <Column style={checkCol}>☐</Column>
                <Column style={actionText}>{item}</Column>
              </Row>
            ))}
          </Section>

          {/* Footer */}
          <Section style={footer}>
            <Text style={footerText}>OzClean Internal Notification · Do not reply</Text>
            <Text style={footerMuted}>Booking ID: {bookingId} · Square: {squarePaymentId}</Text>
          </Section>

        </Container>
      </Body>
    </Html>
  );
}

const main = { backgroundColor: "#F0F9FF", fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" };
const container = { maxWidth: "560px", margin: "0 auto", backgroundColor: "#ffffff", borderRadius: "18px", overflow: "hidden", boxShadow: "0 6px 28px rgba(12,26,46,0.10)" };
const header = { backgroundColor: "#0C1A2E", padding: "28px 32px 24px", textAlign: "center" as const };
const logo = { color: "#ffffff", fontSize: "18px", fontWeight: "800", margin: "0" };
const headerSub = { color: "rgba(255,255,255,0.5)", fontSize: "12px", margin: "4px 0 0" };
const alertBanner = { backgroundColor: "#f0fdf4", borderLeft: "4px solid #16a34a", padding: "16px 32px" };
const alertText = { color: "#15803d", fontSize: "13px", lineHeight: "1.7", margin: "0" };
const detailsSection = { padding: "28px 32px" };
const sectionHeading = { color: "#0C1A2E", fontSize: "11px", fontWeight: "700", textTransform: "uppercase" as const, letterSpacing: "1px", margin: "0 0 14px" };
const detailRow = { marginBottom: "10px" };
const detailLabel = { color: "#64748B", fontSize: "13px", width: "42%" };
const detailValue = { color: "#0C1A2E", fontSize: "13px", fontWeight: "600" };
const divider = { borderColor: "#BAE6FD", margin: "0 32px" };
const addonListBox = { backgroundColor: "#F8FAFC", borderRadius: "12px", padding: "14px 16px", marginTop: "14px" };
const subtleNote = { color: "#64748B", fontSize: "12px", lineHeight: "1.7", margin: "10px 0 0" };
const actionSection = { padding: "28px 32px", backgroundColor: "#FFFBEB" };
const checkCol = { width: "20px", color: "#D97706", fontSize: "14px", verticalAlign: "top" };
const actionText = { color: "#92400E", fontSize: "13px", lineHeight: "1.7", paddingLeft: "8px" };
const footer = { backgroundColor: "#F8FAFC", padding: "24px 32px 28px", textAlign: "center" as const, borderTop: "1px solid #BAE6FD" };
const footerText = { color: "#94A3B8", fontSize: "12px", margin: "0 0 4px" };
const footerMuted = { color: "#CBD5E1", fontSize: "11px", margin: "10px 0 0" };