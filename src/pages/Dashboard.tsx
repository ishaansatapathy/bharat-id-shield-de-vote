import { useState } from "react"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { StatsOverview } from "@/components/dashboard/stats-overview"
import { CredentialCard } from "@/components/dashboard/credential-card"
import { SecurityPanel } from "@/components/dashboard/security-panel"
import { OfflinePanel } from "@/components/dashboard/offline-panel"
import { AddCredentialModal } from "@/components/dashboard/add-credential-modal"
import { ExportModal } from "@/components/dashboard/export-modal"
import { Button } from "@/components/ui/button"
import { Plus, Download } from "lucide-react"
import { useTranslations } from "@/lib/i18n"

const sampleCredentials = [
  {
    title: "Aadhaar Identity",
    issuer: "UIDAI",
    type: "Government ID",
    status: "verified" as const,
    issueDate: "15 Jan 2024",
    credentialId: "did:bharat:a1b2c3d4"
  },
  {
    title: "Digital University Degree",
    issuer: "IIT Delhi",
    type: "Education",
    status: "verified" as const,
    issueDate: "22 May 2023",
    expiryDate: "Never",
    credentialId: "did:bharat:e5f6g7h8"
  },
  {
    title: "Bank KYC Certificate",
    issuer: "State Bank of India",
    type: "Financial",
    status: "verified" as const,
    issueDate: "10 Mar 2024",
    expiryDate: "10 Mar 2025",
    credentialId: "did:bharat:i9j0k1l2"
  },
  {
    title: "Professional License",
    issuer: "Bar Council of India",
    type: "Professional",
    status: "pending" as const,
    issueDate: "28 Feb 2024",
    expiryDate: "28 Feb 2027",
    credentialId: "did:bharat:m3n4o5p6"
  }
]

export default function Dashboard() {
  const [isAddCredentialModalOpen, setIsAddCredentialModalOpen] = useState(false)
  const [isExportModalOpen, setIsExportModalOpen] = useState(false)
  const t = useTranslations()

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />
      
      <div className="container mx-auto px-6 py-8 space-y-8">
        {/* Stats Overview */}
        <StatsOverview />
        
        {/* Main Content Grid */}
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Left Column - Credentials */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold">{t.myCredentials}</h2>
                <p className="text-muted-foreground">{t.manageCredentials}</p>
              </div>
              <div className="flex space-x-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setIsExportModalOpen(true)}
                >
                  <Download className="h-4 w-4 mr-2" />
                  {t.export}
                </Button>
                <Button 
                  variant="hero" 
                  size="sm"
                  onClick={() => setIsAddCredentialModalOpen(true)}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  {t.addCredential}
                </Button>
              </div>
            </div>
            
            <div className="grid gap-4 md:grid-cols-2">
              {sampleCredentials.map((credential, index) => (
                <CredentialCard key={index} {...credential} />
              ))}
            </div>
          </div>
          
          {/* Right Column - Security & Offline */}
          <div className="space-y-6">
            <SecurityPanel />
            <OfflinePanel />
          </div>
        </div>
      </div>

      <AddCredentialModal 
        open={isAddCredentialModalOpen}
        onOpenChange={setIsAddCredentialModalOpen}
      />

      <ExportModal 
        open={isExportModalOpen}
        onOpenChange={setIsExportModalOpen}
        credentials={sampleCredentials}
      />
    </div>
  )
}