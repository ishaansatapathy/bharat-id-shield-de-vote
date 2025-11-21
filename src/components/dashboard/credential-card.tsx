import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { StatusBadge } from "@/components/ui/status-badge"
import { Badge } from "@/components/ui/badge"
import { DocumentViewer } from "./document-viewer"
import { 
  CreditCard, 
  QrCode, 
  Share2, 
  MoreHorizontal,
  Shield,
  Verified,
  Calendar,
  Eye
} from "lucide-react"
import { useTranslations } from "@/lib/i18n"

interface CredentialCardProps {
  title: string
  issuer: string
  type: string
  status: "verified" | "pending" | "expired"
  issueDate: string
  expiryDate?: string
  credentialId: string
}

export function CredentialCard({ 
  title, 
  issuer, 
  type, 
  status, 
  issueDate, 
  expiryDate,
  credentialId 
}: CredentialCardProps) {
  const [showViewer, setShowViewer] = useState(false)
  const t = useTranslations()
  
  const getStatusVariant = (status: string) => {
    switch (status) {
      case "verified": return "verified"
      case "pending": return "warning"
      case "expired": return "danger"
      default: return "info"
    }
  }

  return (
    <>
      <Card 
        className="hover:shadow-elegant transition-all duration-300 border-primary/10 cursor-pointer group" 
        onClick={() => setShowViewer(true)}
      >
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-primary rounded-lg group-hover:shadow-glow transition-all duration-300">
                <CreditCard className="h-5 w-5 text-primary-foreground" />
              </div>
              <div>
                <CardTitle className="text-lg group-hover:text-primary transition-colors">
                  {title}
                </CardTitle>
                <p className="text-sm text-muted-foreground">Issued by {issuer}</p>
              </div>
            </div>
            <StatusBadge variant={getStatusVariant(status)}>
              {status === "verified" && <Verified className="h-3 w-3 mr-1" />}
              {status === "verified" ? t.verified : status === "pending" ? t.pending : t.expired}
            </StatusBadge>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Type:</span>
            <Badge variant="outline">{type}</Badge>
          </div>
          
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Issue Date:</span>
            <span className="flex items-center">
              <Calendar className="h-3 w-3 mr-1" />
              {issueDate}
            </span>
          </div>
          
          {expiryDate && (
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Expires:</span>
              <span>{expiryDate}</span>
            </div>
          )}
          
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">ID:</span>
            <span className="font-mono text-xs">{credentialId}</span>
          </div>
          
          <div className="flex space-x-2 pt-2">
            <Button 
              variant="outline" 
              size="sm" 
              className="flex-1"
              onClick={(e) => {
                e.stopPropagation()
                setShowViewer(true)
              }}
            >
              <Eye className="h-4 w-4 mr-2" />
              View Document
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              className="flex-1"
              onClick={(e) => e.stopPropagation()}
            >
              <QrCode className="h-4 w-4 mr-2" />
              QR
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              className="flex-1"
              onClick={(e) => e.stopPropagation()}
            >
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              className="shrink-0"
              onClick={(e) => e.stopPropagation()}
            >
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
      
      <DocumentViewer 
        open={showViewer}
        onOpenChange={setShowViewer}
        credential={{ title, issuer, type, status, issueDate, expiryDate, credentialId }}
      />
    </>
  )
}