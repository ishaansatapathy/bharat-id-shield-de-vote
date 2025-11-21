import { useEffect, useMemo, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp"
import { toast } from "@/components/ui/sonner"
import { useForm } from "react-hook-form"
import { saveUser, saveDocument, downloadJson, type UserProfile, savePinHash, hashPin, getPinHash } from "@/lib/db"
import { sendOtp, verifyOtp } from "@/lib/otp-service"

type AuthState = {
  isAuthenticated: boolean
  phone?: string
}

const AUTH_KEY = "auth-state"

function getAuthState(): AuthState {
  try {
    const raw = localStorage.getItem(AUTH_KEY)
    return raw ? JSON.parse(raw) : { isAuthenticated: false }
  } catch {
    return { isAuthenticated: false }
  }
}

function setAuthState(state: AuthState) {
  localStorage.setItem(AUTH_KEY, JSON.stringify(state))
}

export default function Auth() {
  const navigate = useNavigate()
  const [auth, setAuth] = useState<AuthState>(() => getAuthState())

  useEffect(() => {
    if (auth.isAuthenticated) navigate("/", { replace: true })
  }, [auth.isAuthenticated, navigate])

  return (
    <div className="min-h-screen bg-[hsl(var(--background))] relative">
      <div className="absolute inset-0 bg-gradient-hero opacity-10" />
      <div className="container mx-auto px-6 py-12 relative">
        <div className="mx-auto max-w-xl">
          <Card className="backdrop-blur-md border-primary/20 shadow-glow">
            <CardHeader>
              <CardTitle className="text-3xl">Bharat-ID Shield</CardTitle>
              <CardDescription>Secure access to your decentralized identity</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="login" className="w-full">
                <TabsList className="w-full grid grid-cols-2">
                  <TabsTrigger value="login">Login</TabsTrigger>
                  <TabsTrigger value="signup">Sign Up</TabsTrigger>
                </TabsList>

                <TabsContent value="login" className="mt-6">
                  <LoginFlow onAuthenticated={(phone) => {
                    setAuthState({ isAuthenticated: true, phone })
                    setAuth({ isAuthenticated: true, phone })
                    toast.success("Logged in successfully")
                  }} />
                </TabsContent>

                <TabsContent value="signup" className="mt-6">
                  <SignupFlow onRegistered={(phone) => {
                    setAuthState({ isAuthenticated: true, phone })
                    setAuth({ isAuthenticated: true, phone })
                    toast.success("Account created and logged in")
                  }} />
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

type LoginFlowProps = { onAuthenticated: (phone: string) => void }

function LoginFlow({ onAuthenticated }: LoginFlowProps) {
  const [step, setStep] = useState<"phone" | "otp" | "pin">("phone")
  const [phone, setPhone] = useState("")
  const [isSending, setIsSending] = useState(false)
  const [otp, setOtp] = useState("")
  const [pin, setPin] = useState("")
  const [sessionId, setSessionId] = useState<string | null>(null)

  const form = useForm<{ phone: string }>({
    defaultValues: { phone: "" },
    mode: "onBlur",
  })

  async function onSendOtp(values: { phone: string }) {
    const clean = values.phone.replace(/\D/g, "")
    if (clean.length !== 10) {
      toast.error("Enter a valid 10-digit mobile number")
      return
    }
    setIsSending(true)
    try {
      const res = await sendOtp(`+91${clean}`)
      setSessionId(res.sessionId)
      setPhone(clean)
      setStep("otp")
      toast.success("OTP sent to +91 " + clean)
    } catch (e: any) {
      toast.error(e?.message || "Failed to send OTP")
    } finally {
      setIsSending(false)
    }
  }

  function onVerifyOtp() {
    if (otp.length !== 6) {
      toast.error("Enter the 6-digit OTP")
      return
    }
    setStep("pin")
    toast("OTP verified")
  }

  async function onVerifyPin() {
    if (pin.length !== 4) {
      toast.error("Enter your 4-digit Safe PIN")
      return
    }
    try {
      const stored = await getPinHash(phone)
      const candidate = await hashPin(pin)
      if (stored && stored === candidate) {
        onAuthenticated(phone)
      } else {
        toast.error("Incorrect PIN")
      }
    } catch {
      toast.error("PIN verification failed")
    }
  }

  return (
    <div className="space-y-6">
      {step === "phone" && (
        <Form {...form}>
          <form
            className="space-y-4"
            onSubmit={form.handleSubmit(onSendOtp)}
          >
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mobile Number</FormLabel>
                  <FormControl>
                    <Input inputMode="numeric" maxLength={14} placeholder="e.g. 9876543210" {...field} />
                  </FormControl>
                  <FormDescription>We will send a 6-digit OTP to this number</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full" disabled={isSending} variant="hero">
              {isSending ? "Sending OTP..." : "Send OTP"}
            </Button>
          </form>
        </Form>
      )}

      {step === "otp" && (
        <div className="space-y-4">
          <div>
            <Label>Enter OTP</Label>
            <div className="mt-2">
              <InputOTP maxLength={6} value={otp} onChange={setOtp}>
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
              </InputOTP>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Button variant="outline" onClick={() => setStep("phone")}>Back</Button>
            <Button variant="security" onClick={async () => {
              if (!sessionId) { toast.error("Session expired. Please resend OTP"); return }
              if (otp.length !== 6) { toast.error("Enter the 6-digit OTP"); return }
              try {
                await verifyOtp(sessionId, otp)
                setStep("pin")
                toast("OTP verified")
              } catch (e: any) {
                toast.error(e?.message || "Invalid OTP")
              }
            }}>Verify OTP</Button>
          </div>
        </div>
      )}

      {step === "pin" && (
        <div className="space-y-4">
          <div>
            <Label>Safe PIN</Label>
            <div className="mt-2">
              <InputOTP maxLength={4} value={pin} onChange={setPin}>
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                  <InputOTPSlot index={3} />
                </InputOTPGroup>
              </InputOTP>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Button variant="outline" onClick={() => setStep("otp")}>Back</Button>
            <Button variant="hero" onClick={onVerifyPin}>Login</Button>
          </div>
        </div>
      )}
    </div>
  )
}

type SignupFlowProps = { onRegistered: (phone: string) => void }

function SignupFlow({ onRegistered }: SignupFlowProps) {
  const form = useForm<{
    firstName: string
    lastName: string
    email: string
    phone: string
    password: string
    pin: string
  }>({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      password: "",
      pin: "",
    },
    mode: "onBlur",
  })

  async function onSubmit(values: any) {
    const phone = String(values.phone || "").replace(/\D/g, "")
    if (phone.length !== 10) {
      toast.error("Enter a valid 10-digit mobile number")
      return
    }
    if (!values.password || values.password.length < 6) {
      toast.error("Password must be at least 6 characters")
      return
    }
    if (!values.pin || String(values.pin).length !== 4) {
      toast.error("Safe PIN must be 4 digits")
      return
    }

    const profile: UserProfile = {
      id: `user:${phone}`,
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
      phone,
      createdAt: Date.now(),
    }
    try {
      await saveUser(profile)
      await saveDocument('documents/profile.json', profile)
      localStorage.setItem('profile-data', JSON.stringify(profile))
      downloadJson('profile.json', profile)
      const pinHash = await hashPin(String(values.pin))
      await savePinHash(phone, pinHash)
      toast.success("Welcome, " + (values.firstName || "User"))
      onRegistered(phone)
    } catch (e) {
      toast.error("Could not save your profile locally")
    }
  }

  return (
    <Form {...form}>
      <form className="grid gap-4" onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField control={form.control} name="firstName" render={({ field }) => (
            <FormItem>
              <FormLabel>First Name</FormLabel>
              <FormControl>
                <Input placeholder="Amit" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )} />
          <FormField control={form.control} name="lastName" render={({ field }) => (
            <FormItem>
              <FormLabel>Last Name</FormLabel>
              <FormControl>
                <Input placeholder="Kumar" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )} />
        </div>

        <FormField control={form.control} name="email" render={({ field }) => (
          <FormItem>
            <FormLabel>Email</FormLabel>
            <FormControl>
              <Input type="email" placeholder="you@example.com" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )} />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField control={form.control} name="phone" render={({ field }) => (
            <FormItem>
              <FormLabel>Mobile Number</FormLabel>
              <FormControl>
                <Input inputMode="numeric" placeholder="9876543210" {...field} />
              </FormControl>
              <FormDescription>We’ll verify this with an OTP</FormDescription>
              <FormMessage />
            </FormItem>
          )} />
          <FormField control={form.control} name="password" render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="Create a strong password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )} />
        </div>

        <FormField control={form.control} name="pin" render={({ field }) => (
          <FormItem>
            <FormLabel>Safe PIN (4 digits)</FormLabel>
            <FormControl>
              <Input inputMode="numeric" maxLength={4} placeholder="••••" {...field} />
            </FormControl>
            <FormDescription>Used for quick approvals and unlocking credentials</FormDescription>
            <FormMessage />
          </FormItem>
        )} />

        <Button type="submit" className="w-full" variant="hero">Create Account</Button>
      </form>
    </Form>
  )
}


