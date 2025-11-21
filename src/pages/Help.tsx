import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { 
  ArrowLeft,
  HelpCircle, 
  Search,
  Phone,
  Mail,
  MessageCircle,
  FileText,
  Shield,
  CreditCard,
  GraduationCap,
  Award,
  Download,
  Upload,
  Lock,
  Eye,
  AlertTriangle,
  CheckCircle,
  Clock,
  Users,
  Globe,
  Headphones
} from "lucide-react"
import { useTranslations } from "@/lib/i18n"
import { useToast } from "@/hooks/use-toast"

export default function Help() {
  const t = useTranslations()
  const { toast } = useToast()
  const [searchQuery, setSearchQuery] = useState("")
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    category: "",
    message: ""
  })

  const faqCategories = [
    {
      id: "getting-started",
      title: "Getting Started",
      icon: <HelpCircle className="h-5 w-5" />,
      questions: [
        {
          question: "How do I create my digital identity?",
          answer: "To create your digital identity: 1) Click 'Add Credential' on the dashboard, 2) Select your document type (Aadhaar, Education, etc.), 3) Upload clear photos of your documents, 4) Wait for verification (usually 2-5 minutes for Aadhaar). Your identity will be encrypted and stored securely."
        },
        {
          question: "What documents can I add to my wallet?",
          answer: "You can add: Aadhaar Card (UIDAI verified), Education Certificates (UGC institutions), Bank KYC documents, Professional Licenses (Bar Council, Medical Council, etc.), PAN Card, Driving License, and Passport. Each document type has specific verification processes."
        },
        {
          question: "Is my data safe and secure?",
          answer: "Yes, absolutely. We use AES-256-GCM encryption for all documents, biometric authentication, and blockchain technology for verification. Your data is never shared without your explicit consent. We comply with Indian data protection laws and RBI guidelines."
        }
      ]
    },
    {
      id: "document-verification",
      title: "Document Verification",
      icon: <Shield className="h-5 w-5" />,
      questions: [
        {
          question: "How long does document verification take?",
          answer: "Verification times vary: Aadhaar (2-5 minutes), Bank KYC (instant with supported banks), Education certificates (1-3 business days), Professional licenses (3-7 business days). You'll receive notifications when verification is complete."
        },
        {
          question: "Why was my document rejected?",
          answer: "Common reasons for rejection: Poor image quality, expired documents, unsupported format, missing information, or document from unrecognized institution. Re-upload with better quality images and ensure all details are visible."
        },
        {
          question: "Can I verify documents from other states?",
          answer: "Yes, we accept documents from all Indian states. Our system recognizes licenses and certificates from all state councils and national bodies. Interstate practice permissions are also supported."
        }
      ]
    },
    {
      id: "security-privacy",
      title: "Security & Privacy",
      icon: <Lock className="h-5 w-5" />,
      questions: [
        {
          question: "How do I enable Two-Factor Authentication?",
          answer: "Go to Settings → Security & Authentication → Enable Two-Factor Authentication. Choose SMS or Email verification. This adds an extra security layer and increases your security score to 100%."
        },
        {
          question: "What happens if I lose my phone?",
          answer: "Your data remains secure with biometric locks and encryption. Contact support immediately to temporarily disable your account. You can restore access using backup recovery codes or alternative verification methods."
        },
        {
          question: "Who can see my documents?",
          answer: "Only you can see your full documents. When sharing for verification, only the verification status is shared, not the actual document. You control what information is shared and with whom through selective disclosure."
        }
      ]
    },
    {
      id: "technical-issues",
      title: "Technical Issues",
      icon: <AlertTriangle className="h-5 w-5" />,
      questions: [
        {
          question: "The app is running slowly. What should I do?",
          answer: "Try these steps: 1) Clear browser cache and cookies, 2) Close other browser tabs, 3) Check your internet connection, 4) Restart the browser, 5) Update to the latest browser version. If issues persist, contact support."
        },
        {
          question: "I can't upload my document. What's wrong?",
          answer: "Check: File size (max 10MB), supported formats (PDF, JPG, PNG), internet connection, and browser permissions for file access. Try using a different browser or device if the problem continues."
        },
        {
          question: "How do I backup my data?",
          answer: "Go to Settings → Data Management → Export Data. Choose your preferred format (PDF, JSON, CSV, XML). Enable Auto Backup for regular backups. Your data is also automatically backed up on secure servers."
        }
      ]
    }
  ]

  const contactOptions = [
    {
      title: "Phone Support",
      description: "Speak with our support team",
      icon: <Phone className="h-6 w-6" />,
      contact: "1800-123-4567",
      availability: "Mon-Fri, 9 AM - 6 PM IST",
      action: "Call Now"
    },
    {
      title: "Email Support",
      description: "Get detailed help via email",
      icon: <Mail className="h-6 w-6" />,
      contact: "support@bharatid.gov.in",
      availability: "Response within 24 hours",
      action: "Send Email"
    },
    {
      title: "Live Chat",
      description: "Chat with our AI assistant",
      icon: <MessageCircle className="h-6 w-6" />,
      contact: "Available 24/7",
      availability: "Instant responses",
      action: "Start Chat"
    },
    {
      title: "Video Call",
      description: "Screen sharing support",
      icon: <Headphones className="h-6 w-6" />,
      contact: "Schedule appointment",
      availability: "Mon-Fri, 10 AM - 5 PM IST",
      action: "Book Call"
    }
  ]

  const quickLinks = [
    { title: "User Guide", icon: <FileText className="h-4 w-4" />, description: "Complete user manual" },
    { title: "Video Tutorials", icon: <Download className="h-4 w-4" />, description: "Step-by-step guides" },
    { title: "API Documentation", icon: <Globe className="h-4 w-4" />, description: "For developers" },
    { title: "System Status", icon: <CheckCircle className="h-4 w-4" />, description: "Service availability" },
    { title: "Release Notes", icon: <Clock className="h-4 w-4" />, description: "Latest updates" },
    { title: "Community Forum", icon: <Users className="h-4 w-4" />, description: "User discussions" }
  ]

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    toast({
      title: "Support Request Sent",
      description: "We'll respond to your query within 24 hours."
    })
    setContactForm({ name: "", email: "", category: "", message: "" })
  }

  const filteredFAQs = faqCategories.map(category => ({
    ...category,
    questions: category.questions.filter(q => 
      searchQuery === "" || 
      q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.answer.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(category => category.questions.length > 0)

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
        <div className="container flex h-16 items-center justify-between px-6">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" onClick={() => window.history.back()}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-xl font-bold">Help & Support</h1>
              <p className="text-sm text-muted-foreground">Get help with your digital identity</p>
            </div>
          </div>
          <Badge variant="outline">24/7 Support Available</Badge>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8 max-w-6xl">
        <div className="space-y-8">
          
          {/* Search */}
          <Card>
            <CardContent className="pt-6">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search for help topics, issues, or questions..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </CardContent>
          </Card>

          {/* Quick Links */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Links</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {quickLinks.map((link, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    className="h-auto p-4 flex flex-col items-center space-y-2"
                    onClick={() => toast({ title: link.title, description: "Opening " + link.title })}
                  >
                    {link.icon}
                    <div className="text-center">
                      <div className="text-xs font-medium">{link.title}</div>
                      <div className="text-xs text-muted-foreground">{link.description}</div>
                    </div>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-8 lg:grid-cols-3">
            {/* FAQ Section */}
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Frequently Asked Questions</CardTitle>
                </CardHeader>
                <CardContent>
                  {filteredFAQs.length === 0 ? (
                    <div className="text-center py-8">
                      <HelpCircle className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                      <p className="text-muted-foreground">No results found for "{searchQuery}"</p>
                      <Button variant="outline" className="mt-4" onClick={() => setSearchQuery("")}>
                        Clear Search
                      </Button>
                    </div>
                  ) : (
                    <Accordion type="single" collapsible className="space-y-4">
                      {filteredFAQs.map((category) => (
                        <div key={category.id} className="space-y-2">
                          <div className="flex items-center space-x-2 mb-3">
                            {category.icon}
                            <h3 className="font-semibold">{category.title}</h3>
                          </div>
                          {category.questions.map((faq, index) => (
                            <AccordionItem key={`${category.id}-${index}`} value={`${category.id}-${index}`}>
                              <AccordionTrigger className="text-left">
                                {faq.question}
                              </AccordionTrigger>
                              <AccordionContent className="text-muted-foreground">
                                {faq.answer}
                              </AccordionContent>
                            </AccordionItem>
                          ))}
                        </div>
                      ))}
                    </Accordion>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Contact Support */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Contact Support</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {contactOptions.map((option, index) => (
                    <div key={index} className="p-4 border rounded-lg">
                      <div className="flex items-start space-x-3">
                        <div className="text-primary">{option.icon}</div>
                        <div className="flex-1">
                          <h4 className="font-medium">{option.title}</h4>
                          <p className="text-sm text-muted-foreground mb-2">{option.description}</p>
                          <p className="text-sm font-medium">{option.contact}</p>
                          <p className="text-xs text-muted-foreground">{option.availability}</p>
                          <Button size="sm" className="mt-2 w-full">
                            {option.action}
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Contact Form */}
              <Card>
                <CardHeader>
                  <CardTitle>Send us a Message</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleContactSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Name</label>
                      <Input
                        value={contactForm.name}
                        onChange={(e) => setContactForm(prev => ({ ...prev, name: e.target.value }))}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Email</label>
                      <Input
                        type="email"
                        value={contactForm.email}
                        onChange={(e) => setContactForm(prev => ({ ...prev, email: e.target.value }))}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Category</label>
                      <select
                        className="w-full p-2 border rounded-md"
                        value={contactForm.category}
                        onChange={(e) => setContactForm(prev => ({ ...prev, category: e.target.value }))}
                        required
                      >
                        <option value="">Select category</option>
                        <option value="technical">Technical Issue</option>
                        <option value="verification">Document Verification</option>
                        <option value="security">Security Concern</option>
                        <option value="account">Account Management</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Message</label>
                      <Textarea
                        value={contactForm.message}
                        onChange={(e) => setContactForm(prev => ({ ...prev, message: e.target.value }))}
                        placeholder="Describe your issue or question..."
                        required
                      />
                    </div>
                    <Button type="submit" className="w-full">
                      Send Message
                    </Button>
                  </form>
                </CardContent>
              </Card>

              {/* Emergency Contact */}
              <Card className="border-destructive/20">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2 text-destructive">
                    <AlertTriangle className="h-5 w-5" />
                    <span>Emergency Support</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    For urgent security issues or account compromise
                  </p>
                  <Button variant="destructive" className="w-full">
                    <Phone className="h-4 w-4 mr-2" />
                    Emergency Hotline: 1800-URGENT
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
