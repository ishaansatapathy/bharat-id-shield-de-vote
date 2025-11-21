import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { StatusBadge } from "@/components/ui/status-badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { 
  Download, 
  Share2, 
  QrCode, 
  Shield, 
  Verified,
  FileText,
  Calendar,
  MapPin,
  Phone,
  Mail,
  User,
  CreditCard,
  Building
} from "lucide-react"

interface DocumentViewerProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  credential: {
    title: string
    issuer: string
    type: string
    status: string
    issueDate: string
    expiryDate?: string
    credentialId: string
  }
}

const getDocumentData = (credentialType: string) => {
  switch (credentialType) {
    case "Aadhaar Identity":
      return {
        documentNumber: "1234 5678 9012",
        personalInfo: {
          name: "Rahul Kumar Sharma",
          fatherName: "Suresh Kumar Sharma",
          dateOfBirth: "15/08/1995",
          gender: "Male",
          address: "123, MG Road, Sector 14, Gurgaon, Haryana - 122001",
          phone: "+91 98765 43210",
          email: "rahul.sharma@email.com"
        },
        verificationDetails: {
          biometricMatch: "99.7%",
          lastVerified: "2024-01-15 10:30 AM",
          verificationCount: "23 times"
        }
      }
    case "Digital University Degree":
      return {
        documentNumber: "DEG/2023/CSE/1247",
        personalInfo: {
          name: "Rahul Kumar Sharma",
          studentId: "2019CSE1247",
          course: "Bachelor of Technology",
          specialization: "Computer Science and Engineering",
          university: "Indian Institute of Technology Delhi",
          cgpa: "8.9/10.0",
          yearOfPassing: "2023"
        },
        verificationDetails: {
          digitalSignature: "Verified",
          lastVerified: "2023-05-22 02:15 PM",
          verificationCount: "5 times"
        }
      }
    case "Bank KYC Certificate":
      return {
        documentNumber: "KYC/SBI/2024/789456",
        personalInfo: {
          name: "Rahul Kumar Sharma",
          accountNumber: "****1234",
          panNumber: "ABCDE****F",
          bankBranch: "MG Road, Gurgaon",
          ifscCode: "SBIN0001234",
          accountType: "Savings Account",
          kycLevel: "Full KYC Compliant"
        },
        verificationDetails: {
          riskProfile: "Low Risk",
          lastVerified: "2024-03-10 09:45 AM",
          verificationCount: "12 times"
        }
      }
    default:
      return {
        documentNumber: "DOC/2024/PROF/456",
        personalInfo: {
          name: "Rahul Kumar Sharma",
          licenseNumber: "BAR/2024/DEL/1234",
          profession: "Advocate",
          registrationDate: "28/02/2024",
          validUntil: "28/02/2027",
          authority: "Bar Council of India"
        },
        verificationDetails: {
          status: "Pending Verification",
          lastVerified: "Processing...",
          verificationCount: "0 times"
        }
      }
  }
}

export function DocumentViewer({ open, onOpenChange, credential }: DocumentViewerProps) {
  const documentData = getDocumentData(credential.title)
  
  const getStatusVariant = (status: string) => {
    switch (status) {
      case "verified": return "verified"
      case "pending": return "warning"
      case "expired": return "danger"
      default: return "info"
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="flex items-center space-x-3">
              <FileText className="h-6 w-6 text-primary" />
              <span>{credential.title}</span>
            </DialogTitle>
            <StatusBadge variant={getStatusVariant(credential.status)}>
              {credential.status === "verified" && <Verified className="h-3 w-3 mr-1" />}
              {credential.status.toUpperCase()}
            </StatusBadge>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* Document Header */}
          <Card className="border-primary/20 bg-gradient-to-r from-primary/5 to-transparent">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg">{credential.title}</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Issued by {credential.issuer} • {credential.type}
                  </p>
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">
                    <QrCode className="h-4 w-4 mr-2" />
                    QR
                  </Button>
                  <Button variant="outline" size="sm">
                    <Share2 className="h-4 w-4 mr-2" />
                    Share
                  </Button>
                  <Button variant="default" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                </div>
              </div>
            </CardHeader>
          </Card>

          {/* Document Details */}
          <div className="grid gap-6 md:grid-cols-2">
            {/* Personal Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <User className="h-5 w-5 text-primary" />
                  <span>Personal Information</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {Object.entries(documentData.personalInfo).map(([key, value]) => (
                  <div key={key} className="flex justify-between">
                    <span className="text-sm text-muted-foreground capitalize">
                      {key.replace(/([A-Z])/g, ' $1').trim()}:
                    </span>
                    <span className="text-sm font-medium text-right">{value}</span>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Verification Details */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Shield className="h-5 w-5 text-success" />
                  <span>Verification Details</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {Object.entries(documentData.verificationDetails).map(([key, value]) => (
                  <div key={key} className="flex justify-between">
                    <span className="text-sm text-muted-foreground capitalize">
                      {key.replace(/([A-Z])/g, ' $1').trim()}:
                    </span>
                    <span className="text-sm font-medium text-right">{value}</span>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Document Metadata */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <CreditCard className="h-5 w-5 text-accent" />
                <span>Document Information</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-3">
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Document ID</p>
                  <p className="text-sm font-mono bg-muted px-2 py-1 rounded">
                    {documentData.documentNumber}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Issue Date</p>
                  <p className="text-sm font-medium">{credential.issueDate}</p>
                </div>
                {credential.expiryDate && (
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Expires On</p>
                    <p className="text-sm font-medium">{credential.expiryDate}</p>
                  </div>
                )}
              </div>
              
              <Separator className="my-4" />
              
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Blockchain ID</p>
                <p className="text-xs font-mono bg-muted px-2 py-1 rounded break-all">
                  {credential.credentialId}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Security Notice */}
          <Card className="border-success/20 bg-success/5">
            <CardContent className="pt-6">
              <div className="flex items-start space-x-3">
                <Shield className="h-5 w-5 text-success mt-0.5" />
                <div className="text-sm">
                  <p className="font-medium text-success">Cryptographically Secured</p>
                  <p className="text-muted-foreground mt-1">
                    This document is secured with blockchain technology and zero-knowledge proofs. 
                    All verifications are logged on the Polygon network for transparency and security.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  )
}