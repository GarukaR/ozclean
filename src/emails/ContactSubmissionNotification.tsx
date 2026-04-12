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

export type ContactSubmissionNotificationProps = {
  customerName: string
  customerEmail: string
  customerPhone?: string
  message: string
}

export default function ContactSubmissionNotification({
  customerName = "Jane Smith",
  customerEmail = "jane@email.com",
  customerPhone,
  message = "Hi team, I'd like to know your availability for weekly home cleaning.",
}: ContactSubmissionNotificationProps) {
  return (
    <Html>
      <Head />
      <Preview>New SparkClean contact form message from {customerName}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={header}>
            <Heading style={logo}>SparkClean Internal</Heading>
            <Text style={headerSub}>New Contact Form Submission</Text>
          </Section>

          <Section style={content}>
            <Text style={eyebrow}>Sender</Text>
            <Section style={summaryBox}>
              <Text style={text}><strong>Name:</strong> {customerName}</Text>
              <Text style={text}><strong>Email:</strong> {customerEmail}</Text>
              <Text style={{ ...text, marginBottom: 0 }}><strong>Phone:</strong> {customerPhone?.trim() ? customerPhone : "Not provided"}</Text>
            </Section>

            <Hr style={divider} />

            <Text style={eyebrow}>Message</Text>
            <Section style={summaryBox}>
              <Text style={{ ...text, marginBottom: 0 }}>{message}</Text>
            </Section>
          </Section>
        </Container>
      </Body>
    </Html>
  )
}

const main = {
  backgroundColor: "#F8FAFC",
  fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
}

const container = {
  maxWidth: "560px",
  margin: "0 auto",
  backgroundColor: "#ffffff",
  borderRadius: "18px",
  overflow: "hidden",
  boxShadow: "0 6px 28px rgba(12,26,46,0.10)",
}

const header = {
  backgroundColor: "#0C1A2E",
  padding: "30px 32px 26px",
  textAlign: "center" as const,
}

const logo = { color: "#ffffff", fontSize: "19px", fontWeight: "800", margin: "0" }
const headerSub = { color: "rgba(255,255,255,0.75)", fontSize: "12px", margin: "6px 0 0" }
const content = { padding: "30px 32px" }
const text = { color: "#334155", fontSize: "14px", lineHeight: "1.7", margin: "0 0 10px" }
const eyebrow = { color: "#0C1A2E", fontSize: "12px", fontWeight: "700", margin: "0 0 12px", textTransform: "uppercase" as const, letterSpacing: "0.8px" }
const divider = { borderColor: "#E2E8F0", margin: "18px 0" }
const summaryBox = { backgroundColor: "#F8FAFC", borderRadius: "12px", padding: "14px 16px" }
