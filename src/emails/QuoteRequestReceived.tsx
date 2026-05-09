import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Section,
  Text,
} from "@react-email/components"

export type QuoteRequestReceivedProps = {
  customerName: string
  customerEmail: string
  customerPhone: string
  service: string
  address: string
  message: string
}

export default function QuoteRequestReceived({
  customerName = "Jane Smith",
  customerEmail = "jane@email.com",
  customerPhone = "+61 400 000 000",
  service = "Residential Cleaning",
  address = "Richmond, VIC",
  message = "3-bedroom townhouse, fortnightly clean preferred.",
}: QuoteRequestReceivedProps) {
  return (
    <Html>
      <Head />
      <Preview>We received your OzClean quote request</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={header}>
            <Heading style={logo}>OzClean</Heading>
            <Text style={headerSub}>Quote Request Received</Text>
          </Section>

          <Section style={content}>
            <Heading style={heading}>Thanks, {customerName}.</Heading>
            <Text style={text}>
              We have received your quote request and our team will email you a personalised price within 2 hours.
            </Text>

            <Section style={summaryBox}>
              <Text style={label}>Request Details</Text>
              <Text style={text}><strong>Service:</strong> {service}</Text>
              <Text style={text}><strong>Address/Suburb:</strong> {address}</Text>
              <Text style={text}><strong>Email:</strong> {customerEmail}</Text>
              <Text style={text}><strong>Phone:</strong> {customerPhone}</Text>
              <Text style={{ ...text, marginBottom: 0 }}><strong>Notes:</strong> {message}</Text>
            </Section>

            <Hr style={divider} />

            <Text style={muted}>
              Need to update something? Reply to this email and we will help.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  )
}

const main = {
  backgroundColor: "#F0F9FF",
  fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
}

const container = {
  maxWidth: "560px",
  margin: "0 auto",
  backgroundColor: "#ffffff",
  borderRadius: "18px",
  overflow: "hidden",
  boxShadow: "0 6px 28px rgba(14,165,233,0.10)",
}

const header = {
  backgroundColor: "#0EA5E9",
  padding: "30px 32px 26px",
  textAlign: "center" as const,
}

const logo = { color: "#ffffff", fontSize: "20px", fontWeight: "800", margin: "0" }
const headerSub = { color: "rgba(255,255,255,0.8)", fontSize: "12px", margin: "6px 0 0" }
const content = { padding: "30px 32px" }
const heading = { color: "#0C1A2E", fontSize: "22px", margin: "0 0 12px" }
const text = { color: "#334155", fontSize: "14px", lineHeight: "1.7", margin: "0 0 10px" }
const label = { color: "#0C1A2E", fontSize: "12px", fontWeight: "700", margin: "0 0 12px", textTransform: "uppercase" as const, letterSpacing: "0.8px" }
const muted = { color: "#64748B", fontSize: "12px", lineHeight: "1.7", margin: "0" }
const divider = { borderColor: "#BAE6FD", margin: "18px 0" }
const summaryBox = { backgroundColor: "#F8FAFC", borderRadius: "12px", padding: "14px 16px" }
