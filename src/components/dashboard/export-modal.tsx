import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Card, CardContent } from "@/components/ui/card"
import { Download, FileText, Table, FileImage, Code } from "lucide-react"
import { ExportService, ExportFormat, Credential } from "@/lib/export-service"
import { useTranslations } from "@/lib/i18n"
import { useToast } from "@/hooks/use-toast"

interface ExportModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  credentials: Credential[]
}

export function ExportModal({ open, onOpenChange, credentials }: ExportModalProps) {
  const [selectedFormat, setSelectedFormat] = useState<ExportFormat>('json')
  const [isExporting, setIsExporting] = useState(false)
  const t = useTranslations()
  const { toast } = useToast()

  const exportFormats = ExportService.getExportFormats()

  const getFormatIcon = (format: ExportFormat) => {
    switch (format) {
      case 'json': return Code
      case 'csv': return Table
      case 'pdf': return FileImage
      case 'xml': return FileText
      default: return FileText
    }
  }

  const handleExport = async () => {
    if (credentials.length === 0) {
      toast({
        title: "No Credentials",
        description: "No credentials available to export",
        variant: "destructive"
      })
      return
    }

    setIsExporting(true)
    
    try {
      ExportService.exportCredentials(credentials, selectedFormat)
      
      toast({
        title: "Export Successful",
        description: `${credentials.length} credentials exported as ${selectedFormat.toUpperCase()}`,
      })
      
      onOpenChange(false)
    } catch (error) {
      console.error('Export failed:', error)
      toast({
        title: "Export Failed",
        description: "Failed to export credentials. Please try again.",
        variant: "destructive"
      })
    } finally {
      setIsExporting(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Download className="h-5 w-5" />
            <span>Export Credentials</span>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <p className="text-sm text-muted-foreground mb-4">
              Export {credentials.length} credential{credentials.length !== 1 ? 's' : ''} in your preferred format
            </p>
          </div>

          <div className="space-y-3">
            <Label className="text-sm font-medium">Select Export Format</Label>
            <RadioGroup value={selectedFormat} onValueChange={(value) => setSelectedFormat(value as ExportFormat)}>
              {exportFormats.map((format) => {
                const IconComponent = getFormatIcon(format.value)
                return (
                  <Card key={format.value} className="cursor-pointer hover:bg-accent transition-colors">
                    <CardContent className="p-3">
                      <div className="flex items-center space-x-3">
                        <RadioGroupItem value={format.value} id={format.value} />
                        <IconComponent className="h-4 w-4 text-primary" />
                        <div className="flex-1">
                          <Label htmlFor={format.value} className="cursor-pointer font-medium">
                            {format.label}
                          </Label>
                          <p className="text-xs text-muted-foreground mt-1">
                            {format.description}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </RadioGroup>
          </div>

          <div className="bg-muted/50 p-3 rounded-lg">
            <div className="flex items-center space-x-2 text-sm">
              <FileText className="h-4 w-4 text-muted-foreground" />
              <span className="text-muted-foreground">
                File will be downloaded to your default downloads folder
              </span>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button 
            onClick={handleExport}
            disabled={isExporting || credentials.length === 0}
          >
            {isExporting ? (
              <>
                <Download className="h-4 w-4 mr-2 animate-spin" />
                Exporting...
              </>
            ) : (
              <>
                <Download className="h-4 w-4 mr-2" />
                Export {selectedFormat.toUpperCase()}
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
