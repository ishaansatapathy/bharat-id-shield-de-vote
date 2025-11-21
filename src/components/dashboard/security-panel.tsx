import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { StatusBadge } from "@/components/ui/status-badge"
import { Progress } from "@/components/ui/progress"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { 
  Shield, 
  AlertTriangle, 
  Lock, 
  Eye, 
  Fingerprint,
  Wifi,
  WifiOff,
  Brain,
  TrendingUp,
  Info,
  CheckCircle,
  AlertCircle
} from "lucide-react"
import { useTranslations } from "@/lib/i18n"
import { SecurityAnalysisService } from "@/lib/security-analysis"

export function SecurityPanel() {
  const t = useTranslations()
  const securityAnalysis = SecurityAnalysisService.getSecurityAnalysis()
  const recommendations = SecurityAnalysisService.getRecommendationsForScore100()
  
  return (
    <TooltipProvider>
      <div className="space-y-6">
        {/* AI Security Status */}
        <Card className="border-success/20 bg-gradient-to-br from-success/5 to-transparent">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center space-x-2">
                <Brain className="h-5 w-5 text-success" />
                <span>AI Guardian</span>
              </CardTitle>
              <StatusBadge variant="success">Active</StatusBadge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>{t.securityScore}</span>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="flex items-center space-x-1 cursor-help">
                      <span className="font-semibold">{securityAnalysis.currentScore}/100</span>
                      <Info className="h-3 w-3 text-muted-foreground" />
                    </div>
                  </TooltipTrigger>
                  <TooltipContent side="left" className="max-w-80">
                    <div className="space-y-3">
                      <div className="font-semibold text-sm">Security Score Breakdown</div>
                      
                      <div className="space-y-2">
                        <div className="text-xs text-muted-foreground">
                          Why you have {securityAnalysis.currentScore}% instead of 100%:
                        </div>
                        
                        {securityAnalysis.factors.map((factor) => (
                          <div key={factor.id} className="flex items-center justify-between text-xs">
                            <div className="flex items-center space-x-1">
                              {factor.currentStatus === 'enabled' ? (
                                <CheckCircle className="h-3 w-3 text-green-500" />
                              ) : factor.currentStatus === 'partial' ? (
                                <AlertCircle className="h-3 w-3 text-yellow-500" />
                              ) : (
                                <AlertCircle className="h-3 w-3 text-red-500" />
                              )}
                              <span>{factor.name}</span>
                            </div>
                            <span className="text-muted-foreground">
                              {factor.currentStatus === 'enabled' ? factor.impact : 
                               factor.currentStatus === 'partial' ? `${factor.impact/2}/${factor.impact}` : 
                               `0/${factor.impact}`}
                            </span>
                          </div>
                        ))}
                      </div>
                      
                      {recommendations.length > 0 && (
                        <div className="space-y-2 pt-2 border-t">
                          <div className="font-medium text-xs">To reach 100%:</div>
                          {recommendations.slice(0, 2).map((rec, index) => (
                            <div key={index} className="text-xs text-muted-foreground">
                              • {rec}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </TooltipContent>
                </Tooltip>
              </div>
              <Progress value={securityAnalysis.currentScore} className="h-2" />
            </div>
          
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="flex items-center space-x-2">
                <TrendingUp className="h-4 w-4 text-success" />
                <span>No anomalies detected</span>
              </div>
              <div className="flex items-center space-x-2">
                <Shield className="h-4 w-4 text-success" />
                <span>Identity protected</span>
              </div>
            </div>
          </CardContent>
        </Card>

      {/* Authentication Status */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center space-x-2">
            <Lock className="h-5 w-5 text-primary" />
            <span>{t.biometricAuth}</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Fingerprint className="h-4 w-4 text-success" />
              <span className="text-sm">{t.biometricAuth}</span>
            </div>
            <StatusBadge variant="success">{t.enabled}</StatusBadge>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Eye className="h-4 w-4 text-primary" />
              <span className="text-sm">PIN Protection</span>
            </div>
            <StatusBadge variant="success">Active</StatusBadge>
          </div>
          
          <Button variant="outline" size="sm" className="w-full mt-3">
            Manage Security Settings
          </Button>
        </CardContent>
      </Card>

      {/* Connection Status */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center space-x-2">
            <Wifi className="h-5 w-5 text-primary" />
            <span>{t.offlineMode}</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm">Blockchain Sync</span>
            <StatusBadge variant="success">Connected</StatusBadge>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-sm">Offline Mode</span>
            <StatusBadge variant="info">Ready</StatusBadge>
          </div>
          
          <div className="text-xs text-muted-foreground">
            {t.lastSync}: 2 minutes ago
          </div>
        </CardContent>
      </Card>

      {/* Recent Alerts */}
      <Card className="border-warning/20">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center space-x-2">
            <AlertTriangle className="h-5 w-5 text-warning" />
            <span>Security Alerts</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-sm text-muted-foreground">
            No security alerts in the last 24 hours.
          </div>
          <Button variant="ghost" size="sm" className="w-full mt-3 text-xs">
            View Alert History
          </Button>
        </CardContent>
      </Card>
      </div>
    </TooltipProvider>
  )
}