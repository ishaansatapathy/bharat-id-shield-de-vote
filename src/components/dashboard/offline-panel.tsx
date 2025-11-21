import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { StatusBadge } from "@/components/ui/status-badge"
import { Badge } from "@/components/ui/badge"
import { 
  QrCode, 
  Download, 
  Clock, 
  WifiOff,
  RefreshCw,
  CheckCircle,
  Timer
} from "lucide-react"
import { useTranslations } from "@/lib/i18n"

export function OfflinePanel() {
  const t = useTranslations()
  
  return (
    <Card className="border-accent/20 bg-gradient-to-br from-accent/5 to-transparent">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center space-x-2">
            <WifiOff className="h-5 w-5 text-accent" />
            <span>{t.offlineMode}</span>
          </CardTitle>
          <StatusBadge variant="info">Ready</StatusBadge>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Offline QR Tokens */}
        <div className="space-y-3">
          <h4 className="font-medium flex items-center space-x-2">
            <QrCode className="h-4 w-4" />
            <span>QR Tokens</span>
          </h4>
          
          <div className="grid gap-3">
            <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
              <div className="space-y-1">
                <p className="text-sm font-medium">Identity Verification Token</p>
                <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                  <Timer className="h-3 w-3" />
                  <span>Valid for 6 days, 14 hours</span>
                </div>
              </div>
              <Badge variant="outline" className="bg-success/10 text-success border-success/20">
                Active
              </Badge>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
              <div className="space-y-1">
                <p className="text-sm font-medium">KYC Proof Token</p>
                <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                  <Timer className="h-3 w-3" />
                  <span>Valid for 4 days, 8 hours</span>
                </div>
              </div>
              <Badge variant="outline" className="bg-success/10 text-success border-success/20">
                Active
              </Badge>
            </div>
          </div>
          
          <Button variant="accent" size="sm" className="w-full">
            <QrCode className="h-4 w-4 mr-2" />
            Generate New Token
          </Button>
        </div>

        {/* Local Storage Status */}
        <div className="space-y-3">
          <h4 className="font-medium flex items-center space-x-2">
            <Download className="h-4 w-4" />
            <span>Local Storage</span>
          </h4>
          
          <div className="space-y-2 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">{t.credentialsCached}:</span>
              <span className="font-medium">4 of 5</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">{t.lastBackup}:</span>
              <span className="font-medium">2 hours ago</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Storage used:</span>
              <span className="font-medium">2.3 MB</span>
            </div>
          </div>
        </div>

        {/* Sync Status */}
        <div className="space-y-3">
          <h4 className="font-medium flex items-center space-x-2">
            <RefreshCw className="h-4 w-4" />
            <span>Sync Status</span>
          </h4>
          
          <div className="flex items-center space-x-2 text-sm">
            <CheckCircle className="h-4 w-4 text-success" />
            <span>All changes synchronized</span>
          </div>
          
          <Button variant="outline" size="sm" className="w-full">
            <RefreshCw className="h-4 w-4 mr-2" />
            {t.syncNow}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}