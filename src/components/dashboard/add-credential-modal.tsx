import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText, Upload, Calendar, User, Building, GraduationCap, CreditCard, Award, Shield, Briefcase } from "lucide-react"
import { useTranslations } from "@/lib/i18n"

interface AddCredentialModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

const documentTypes = [
  {
    id: "government",
    name: "Government ID",
    icon: Shield,
    description: "Official government-issued identification documents",
    examples: ["Aadhaar Card", "Passport", "Voter ID", "Driving License", "PAN Card"],
    requiredFields: ["Document Number", "Issue Date", "Expiry Date", "Issuing Authority"]
  },
  {
    id: "education",
    name: "Education Certificate",
    icon: GraduationCap,
    description: "Academic credentials and educational qualifications",
    examples: ["Degree Certificate", "Diploma", "Marksheet", "Course Completion", "Professional Certification"],
    requiredFields: ["Institution Name", "Course/Degree", "Year of Completion", "Grade/Percentage"]
  },
  {
    id: "financial",
    name: "Financial Document",
    icon: CreditCard,
    description: "Banking and financial service credentials",
    examples: ["Bank KYC", "Credit Report", "Investment Certificate", "Insurance Policy", "Tax Document"],
    requiredFields: ["Institution Name", "Account/Policy Number", "Issue Date", "Expiry Date"]
  },
  {
    id: "professional",
    name: "Professional License",
    icon: Briefcase,
    description: "Professional certifications and work-related credentials",
    examples: ["Professional License", "Work Permit", "Trade Certificate", "Industry Certification"],
    requiredFields: ["Licensing Body", "License Number", "Issue Date", "Expiry Date", "Profession"]
  },
  {
    id: "medical",
    name: "Medical Record",
    icon: Award,
    description: "Healthcare and medical documentation",
    examples: ["Medical Certificate", "Vaccination Record", "Health Insurance", "Medical License"],
    requiredFields: ["Healthcare Provider", "Document Type", "Issue Date", "Validity Period"]
  }
]

export function AddCredentialModal({ open, onOpenChange }: AddCredentialModalProps) {
  const [selectedType, setSelectedType] = useState<string>("")
  const [step, setStep] = useState<"select" | "details">("select")
  const [formData, setFormData] = useState({
    title: "",
    issuer: "",
    documentNumber: "",
    issueDate: "",
    expiryDate: "",
    additionalDetails: ""
  })
  const t = useTranslations()

  const selectedDocType = documentTypes.find(type => type.id === selectedType)

  const handleTypeSelect = (typeId: string) => {
    setSelectedType(typeId)
    setStep("details")
  }

  const handleBack = () => {
    setStep("select")
    setSelectedType("")
  }

  const handleSubmit = () => {
    // Here you would typically save the credential
    console.log("Saving credential:", { type: selectedType, ...formData })
    onOpenChange(false)
    // Reset form
    setStep("select")
    setSelectedType("")
    setFormData({
      title: "",
      issuer: "",
      documentNumber: "",
      issueDate: "",
      expiryDate: "",
      additionalDetails: ""
    })
  }

  const renderTypeSelection = () => (
    <div className="space-y-4">
      <div className="text-center">
        <h3 className="text-lg font-semibold mb-2">{t.selectDocumentType}</h3>
        <p className="text-sm text-muted-foreground">{t.chooseCredentialType}</p>
      </div>
      
      <div className="grid gap-3 max-h-96 overflow-y-auto">
        {documentTypes.map((type) => {
          const IconComponent = type.icon
          return (
            <Card 
              key={type.id} 
              className="cursor-pointer hover:bg-accent transition-colors"
              onClick={() => handleTypeSelect(type.id)}
            >
              <CardContent className="p-4">
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0">
                    <IconComponent className="h-6 w-6 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-sm">{type.name}</h4>
                    <p className="text-xs text-muted-foreground mt-1">{type.description}</p>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {type.examples.slice(0, 3).map((example) => (
                        <Badge key={example} variant="secondary" className="text-xs">
                          {example}
                        </Badge>
                      ))}
                      {type.examples.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{type.examples.length - 3} more
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )

  const renderDetailsForm = () => (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <Button variant="ghost" size="sm" onClick={handleBack}>
          ← {t.back}
        </Button>
        <div>
          <h3 className="text-lg font-semibold">{selectedDocType?.name}</h3>
          <p className="text-sm text-muted-foreground">{selectedDocType?.description}</p>
        </div>
      </div>

      <div className="space-y-4 max-h-96 overflow-y-auto">
        <div className="grid gap-4">
          <div className="space-y-2">
            <Label htmlFor="title">{t.documentTitle} *</Label>
            <Input
              id="title"
              placeholder="e.g., Bachelor's Degree in Computer Science"
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="issuer">{t.issuingAuthority} *</Label>
            <Input
              id="issuer"
              placeholder="e.g., University of Delhi"
              value={formData.issuer}
              onChange={(e) => setFormData(prev => ({ ...prev, issuer: e.target.value }))}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="documentNumber">{t.documentNumber}</Label>
              <Input
                id="documentNumber"
                placeholder="Document ID/Number"
                value={formData.documentNumber}
                onChange={(e) => setFormData(prev => ({ ...prev, documentNumber: e.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="issueDate">{t.issueDate}</Label>
              <Input
                id="issueDate"
                type="date"
                value={formData.issueDate}
                onChange={(e) => setFormData(prev => ({ ...prev, issueDate: e.target.value }))}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="expiryDate">{t.expiryDate} (if applicable)</Label>
            <Input
              id="expiryDate"
              type="date"
              value={formData.expiryDate}
              onChange={(e) => setFormData(prev => ({ ...prev, expiryDate: e.target.value }))}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="additionalDetails">{t.additionalDetails}</Label>
            <Textarea
              id="additionalDetails"
              placeholder="Add any additional information about this credential..."
              className="min-h-20"
              value={formData.additionalDetails}
              onChange={(e) => setFormData(prev => ({ ...prev, additionalDetails: e.target.value }))}
            />
          </div>
        </div>

        {selectedDocType && (
          <Card className="bg-muted/50">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm flex items-center space-x-2">
                <FileText className="h-4 w-4" />
                <span>{t.documentInfoGuide}</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="prose prose-sm max-w-none text-xs text-muted-foreground">
                <div className="space-y-3">
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">📋 {t.requiredFields}</h4>
                    <ul className="list-disc list-inside space-y-1 ml-2">
                      {selectedDocType.requiredFields.map((field) => (
                        <li key={field}>{field}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">📄 {t.commonExamples}</h4>
                    <div className="flex flex-wrap gap-1">
                      {selectedDocType.examples.map((example) => (
                        <Badge key={example} variant="outline" className="text-xs">
                          {example}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">ℹ️ {t.about} {selectedDocType.name}</h4>
                    <p className="text-xs leading-relaxed">{selectedDocType.description}</p>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">🔒 {t.securityNote}</h4>
                    <p className="text-xs leading-relaxed">
                      {t.securityNoteText}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Upload className="h-5 w-5" />
            <span>Add New Credential</span>
          </DialogTitle>
        </DialogHeader>

        {step === "select" ? renderTypeSelection() : renderDetailsForm()}

        {step === "details" && (
          <DialogFooter>
            <Button variant="outline" onClick={handleBack}>
              {t.back}
            </Button>
            <Button 
              onClick={handleSubmit}
              disabled={!formData.title || !formData.issuer}
            >
              {t.addCredential}
            </Button>
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  )
}
