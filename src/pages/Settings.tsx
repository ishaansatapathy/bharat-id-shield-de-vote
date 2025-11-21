import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { 
  ArrowLeft,
  Shield, 
  Bell, 
  Globe, 
  Eye, 
  Lock, 
  Fingerprint,
  Smartphone,
  Mail,
  Download,
  Trash2,
  AlertTriangle,
  User,
  Key,
  Database,
  Moon,
  Sun,
  Monitor,
  Wifi,
  HardDrive
} from "lucide-react"
import { useTranslations } from "@/lib/i18n"
import { useToast } from "@/hooks/use-toast"
import { useTheme } from "next-themes"

export default function Settings() {
  const t = useTranslations()
  const { toast } = useToast()
  const { theme, setTheme } = useTheme()
  
  // Settings state
  const [settings, setSettings] = useState({
    // Security Settings
    biometricAuth: true,
    pinProtection: true,
    twoFactorAuth: false,
    autoLock: true,
    autoLockTime: "5",
    
    // Privacy Settings
    dataSharing: false,
    analyticsOptIn: true,
    locationTracking: false,
    
    // Notification Settings
    pushNotifications: true,
    emailNotifications: true,
    smsNotifications: false,
    securityAlerts: true,
    documentUpdates: true,
    governmentUpdates: true,
    
    // Account Settings
    language: "en",
    theme: theme || "system",
    
    // Data Management
    autoBackup: true,
    backupFrequency: "daily",
    offlineStorage: "30",
    
    // Profile Information
    displayName: "Arjit Kumar",
    email: "arjit@example.com",
    phone: "+91 98765 43210",
    bio: "Digital identity enthusiast"
  })

  const handleSettingChange = (key: string, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }))
    toast({
      title: "Setting Updated",
      description: `${key} has been updated successfully.`
    })
  }

  const handleLanguageChange = (newLanguage: string) => {
    handleSettingChange('language', newLanguage)
    localStorage.setItem("app-language", newLanguage)
    document.documentElement.lang = newLanguage
    window.dispatchEvent(new Event('languagechange'))
  }

  const handleThemeChange = (newTheme: string) => {
    handleSettingChange('theme', newTheme)
    setTheme(newTheme)
  }

  const exportData = () => {
    toast({
      title: "Data Export Started",
      description: "Your data export will be ready shortly."
    })
  }

  const deleteAccount = () => {
    toast({
      title: "Account Deletion",
      description: "Please contact support to delete your account.",
      variant: "destructive"
    })
  }

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
              <h1 className="text-xl font-bold">Settings</h1>
              <p className="text-sm text-muted-foreground">Manage your account and preferences</p>
            </div>
          </div>
          <Badge variant="outline">Bharat-ID Shield</Badge>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8 max-w-4xl">
        <div className="space-y-8">
          
          {/* Profile Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <User className="h-5 w-5" />
                <span>Profile Information</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="displayName">Display Name</Label>
                  <Input
                    id="displayName"
                    value={settings.displayName}
                    onChange={(e) => handleSettingChange('displayName', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={settings.email}
                    onChange={(e) => handleSettingChange('email', e.target.value)}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  value={settings.phone}
                  onChange={(e) => handleSettingChange('phone', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  id="bio"
                  value={settings.bio}
                  onChange={(e) => handleSettingChange('bio', e.target.value)}
                  placeholder="Tell us about yourself..."
                />
              </div>
            </CardContent>
          </Card>

          {/* Security Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Shield className="h-5 w-5" />
                <span>Security & Authentication</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <div className="flex items-center space-x-2">
                    <Fingerprint className="h-4 w-4" />
                    <Label>Biometric Authentication</Label>
                  </div>
                  <p className="text-sm text-muted-foreground">Use fingerprint or face recognition</p>
                </div>
                <Switch
                  checked={settings.biometricAuth}
                  onCheckedChange={(checked) => handleSettingChange('biometricAuth', checked)}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <div className="flex items-center space-x-2">
                    <Lock className="h-4 w-4" />
                    <Label>PIN Protection</Label>
                  </div>
                  <p className="text-sm text-muted-foreground">Require PIN for app access</p>
                </div>
                <Switch
                  checked={settings.pinProtection}
                  onCheckedChange={(checked) => handleSettingChange('pinProtection', checked)}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <div className="flex items-center space-x-2">
                    <Key className="h-4 w-4" />
                    <Label>Two-Factor Authentication</Label>
                    <Badge variant="secondary" className="text-xs">Recommended</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">Add extra security with SMS/Email verification</p>
                </div>
                <Switch
                  checked={settings.twoFactorAuth}
                  onCheckedChange={(checked) => handleSettingChange('twoFactorAuth', checked)}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <div className="flex items-center space-x-2">
                    <Smartphone className="h-4 w-4" />
                    <Label>Auto Lock</Label>
                  </div>
                  <p className="text-sm text-muted-foreground">Automatically lock app when inactive</p>
                </div>
                <div className="flex items-center space-x-2">
                  <Select
                    value={settings.autoLockTime}
                    onValueChange={(value) => handleSettingChange('autoLockTime', value)}
                  >
                    <SelectTrigger className="w-24">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1 min</SelectItem>
                      <SelectItem value="5">5 min</SelectItem>
                      <SelectItem value="10">10 min</SelectItem>
                      <SelectItem value="30">30 min</SelectItem>
                    </SelectContent>
                  </Select>
                  <Switch
                    checked={settings.autoLock}
                    onCheckedChange={(checked) => handleSettingChange('autoLock', checked)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Privacy Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Eye className="h-5 w-5" />
                <span>Privacy & Data</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Data Sharing with Government</Label>
                  <p className="text-sm text-muted-foreground">Share anonymized data for policy improvement</p>
                </div>
                <Switch
                  checked={settings.dataSharing}
                  onCheckedChange={(checked) => handleSettingChange('dataSharing', checked)}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Analytics & Usage Data</Label>
                  <p className="text-sm text-muted-foreground">Help improve the app with usage analytics</p>
                </div>
                <Switch
                  checked={settings.analyticsOptIn}
                  onCheckedChange={(checked) => handleSettingChange('analyticsOptIn', checked)}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Location Tracking</Label>
                  <p className="text-sm text-muted-foreground">Use location for enhanced security verification</p>
                </div>
                <Switch
                  checked={settings.locationTracking}
                  onCheckedChange={(checked) => handleSettingChange('locationTracking', checked)}
                />
              </div>
            </CardContent>
          </Card>

          {/* Notification Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Bell className="h-5 w-5" />
                <span>Notifications</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Push Notifications</Label>
                  <p className="text-sm text-muted-foreground">Receive notifications on your device</p>
                </div>
                <Switch
                  checked={settings.pushNotifications}
                  onCheckedChange={(checked) => handleSettingChange('pushNotifications', checked)}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <div className="flex items-center space-x-2">
                    <Mail className="h-4 w-4" />
                    <Label>Email Notifications</Label>
                  </div>
                  <p className="text-sm text-muted-foreground">Receive updates via email</p>
                </div>
                <Switch
                  checked={settings.emailNotifications}
                  onCheckedChange={(checked) => handleSettingChange('emailNotifications', checked)}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Security Alerts</Label>
                  <p className="text-sm text-muted-foreground">Important security notifications</p>
                </div>
                <Switch
                  checked={settings.securityAlerts}
                  onCheckedChange={(checked) => handleSettingChange('securityAlerts', checked)}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Government Updates</Label>
                  <p className="text-sm text-muted-foreground">Official government notifications</p>
                </div>
                <Switch
                  checked={settings.governmentUpdates}
                  onCheckedChange={(checked) => handleSettingChange('governmentUpdates', checked)}
                />
              </div>
            </CardContent>
          </Card>

          {/* Appearance & Language */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Globe className="h-5 w-5" />
                <span>Appearance & Language</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Language</Label>
                  <p className="text-sm text-muted-foreground">Choose your preferred language</p>
                </div>
                <Select
                  value={settings.language}
                  onValueChange={handleLanguageChange}
                >
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="hi">हिन्दी</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Theme</Label>
                  <p className="text-sm text-muted-foreground">Choose your preferred theme</p>
                </div>
                <Select
                  value={settings.theme}
                  onValueChange={handleThemeChange}
                >
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="light">
                      <div className="flex items-center space-x-2">
                        <Sun className="h-4 w-4" />
                        <span>Light</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="dark">
                      <div className="flex items-center space-x-2">
                        <Moon className="h-4 w-4" />
                        <span>Dark</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="system">
                      <div className="flex items-center space-x-2">
                        <Monitor className="h-4 w-4" />
                        <span>System</span>
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Data Management */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Database className="h-5 w-5" />
                <span>Data Management</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <div className="flex items-center space-x-2">
                    <HardDrive className="h-4 w-4" />
                    <Label>Auto Backup</Label>
                  </div>
                  <p className="text-sm text-muted-foreground">Automatically backup your data</p>
                </div>
                <div className="flex items-center space-x-2">
                  <Select
                    value={settings.backupFrequency}
                    onValueChange={(value) => handleSettingChange('backupFrequency', value)}
                  >
                    <SelectTrigger className="w-24">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="daily">Daily</SelectItem>
                      <SelectItem value="weekly">Weekly</SelectItem>
                      <SelectItem value="monthly">Monthly</SelectItem>
                    </SelectContent>
                  </Select>
                  <Switch
                    checked={settings.autoBackup}
                    onCheckedChange={(checked) => handleSettingChange('autoBackup', checked)}
                  />
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <div className="flex items-center space-x-2">
                    <Wifi className="h-4 w-4" />
                    <Label>Offline Storage Duration</Label>
                  </div>
                  <p className="text-sm text-muted-foreground">How long to keep data offline</p>
                </div>
                <Select
                  value={settings.offlineStorage}
                  onValueChange={(value) => handleSettingChange('offlineStorage', value)}
                >
                  <SelectTrigger className="w-24">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="7">7 days</SelectItem>
                    <SelectItem value="30">30 days</SelectItem>
                    <SelectItem value="90">90 days</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <div className="flex items-center space-x-2">
                    <Download className="h-4 w-4" />
                    <Label>Export Data</Label>
                  </div>
                  <p className="text-sm text-muted-foreground">Download all your data</p>
                </div>
                <Button variant="outline" onClick={exportData}>
                  Export
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Danger Zone */}
          <Card className="border-destructive/20">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-destructive">
                <AlertTriangle className="h-5 w-5" />
                <span>Danger Zone</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-destructive">Delete Account</Label>
                  <p className="text-sm text-muted-foreground">Permanently delete your account and all data</p>
                </div>
                <Button variant="destructive" onClick={deleteAccount}>
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete Account
                </Button>
              </div>
            </CardContent>
          </Card>

        </div>
      </div>
    </div>
  )
}
