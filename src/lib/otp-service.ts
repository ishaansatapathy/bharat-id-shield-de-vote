const API_BASE = import.meta.env.VITE_API_BASE_URL || ""

export type SendOtpResponse = {
  sessionId: string
}

function useMock(): boolean {
  return !API_BASE
}

function mockDelay(ms: number) {
  return new Promise((r) => setTimeout(r, ms))
}

function saveMockOtp(sessionId: string, otp: string) {
  const key = `mock-otp:${sessionId}`
  sessionStorage.setItem(key, otp)
}

function readMockOtp(sessionId: string): string | null {
  const key = `mock-otp:${sessionId}`
  return sessionStorage.getItem(key)
}

export async function sendOtp(phone: string): Promise<SendOtpResponse> {
  if (useMock()) {
    await mockDelay(500)
    const sessionId = `mock_${Date.now()}`
    const otp = '123456'
    saveMockOtp(sessionId, otp)
    return { sessionId }
  }
  try {
    const res = await fetch(`${API_BASE}/otp/send`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ phone, channel: 'sms' }),
    })
    if (!res.ok) {
      const text = await res.text().catch(() => '')
      throw new Error(text || `Failed to send OTP (${res.status})`)
    }
    return res.json()
  } catch (e: any) {
    // Fallback to mock if network/API fails
    await mockDelay(300)
    const sessionId = `mock_${Date.now()}`
    const otp = '123456'
    saveMockOtp(sessionId, otp)
    return { sessionId }
  }
}

export async function verifyOtp(sessionId: string, otp: string): Promise<void> {
  if (useMock()) {
    await mockDelay(300)
    const expected = readMockOtp(sessionId)
    if (expected && otp === expected) return
    throw new Error('Invalid OTP')
  }
  const res = await fetch(`${API_BASE}/otp/verify`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ sessionId, otp }),
  })
  if (!res.ok) {
    const text = await res.text().catch(() => '')
    throw new Error(text || 'Invalid OTP')
  }
}


