import { Shield, Bell, Settings, User, Bot, LogOut, HelpCircle, Globe, Sun, Moon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { StatusBadge } from "@/components/ui/status-badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { NotificationsDropdown } from "./notifications-dropdown"
import { AIAssistantSidebar } from "./ai-assistant-sidebar"
import { useToast } from "@/hooks/use-toast"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import { useTranslations } from "@/lib/i18n"

export function DashboardHeader() {
  const { toast } = useToast()
  const { theme, setTheme } = useTheme()
  const [language, setLanguage] = useState<string>(() => localStorage.getItem("app-language") || "en")
  const t = useTranslations()

  useEffect(() => {
    localStorage.setItem("app-language", language)
    document.documentElement.lang = language
    // Force re-render when language changes
    window.dispatchEvent(new Event('languagechange'))
  }, [language])
  
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-6">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Shield className="h-8 w-8 text-primary" />
            <div>
              <h1 className="text-xl font-bold bg-gradient-hero bg-clip-text text-transparent">
                {t.appTitle}
              </h1>
              <p className="text-xs text-muted-foreground">{t.appSubtitle}</p>
            </div>
          </div>
          <StatusBadge variant="verified" className="ml-4">
            {t.verifiedIdentity}
          </StatusBadge>
        </div>
        
        <div className="flex items-center space-x-3">
          <StatusBadge variant="success" className="hidden sm:flex">
            {t.online}
          </StatusBadge>
          
          <NotificationsDropdown />
          
          <AIAssistantSidebar>
            <Button variant="ghost" size="icon" className="relative">
              <div className="flex items-center justify-center w-5 h-5 bg-gradient-to-br from-blue-500 to-purple-600 rounded-md">
                <Bot className="h-3 w-3 text-white" />
              </div>
            </Button>
          </AIAssistantSidebar>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <Globe className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>{t.preferences}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuLabel className="opacity-70">{t.language}</DropdownMenuLabel>
              <DropdownMenuItem onClick={() => { setLanguage("en"); toast({ title: t.languageChanged, description: t.switchedToEnglish }) }}>
                <span>English</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => { setLanguage("hi"); toast({ title: t.languageChanged, description: t.switchedToHindi }) }}>
                <span>हिन्दी (Hindi)</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuLabel className="opacity-70">{t.theme}</DropdownMenuLabel>
              <DropdownMenuItem onClick={() => { setTheme("light"); toast({ title: t.themeChanged, description: t.lightMode }) }}>
                <Sun className="mr-2 h-4 w-4" />
                <span>{t.light}</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => { setTheme("dark"); toast({ title: t.themeChanged, description: t.darkMode }) }}>
                <Moon className="mr-2 h-4 w-4" />
                <span>{t.dark}</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => { setTheme("system"); toast({ title: t.themeChanged, description: t.systemDefault }) }}>
                <Settings className="mr-2 h-4 w-4" />
                <span>{t.system}</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <User className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>{t.myAccount}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => toast({ title: t.profile, description: t.profileOpening })}>
                <User className="mr-2 h-4 w-4" />
                <span>{t.profile}</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => window.location.href = '/settings'}>
                <Settings className="mr-2 h-4 w-4" />
                <span>{t.settings}</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => toast({ title: t.security, description: t.securityOpening })}>
                <Shield className="mr-2 h-4 w-4" />
                <span>{t.security}</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => window.location.href = '/help'}>
                <HelpCircle className="mr-2 h-4 w-4" />
                <span>{t.helpSupport}</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => { localStorage.removeItem("auth-state"); toast({ title: t.signedOut, description: t.signedOutDesc }); window.location.href = '/auth' }}>
                <LogOut className="mr-2 h-4 w-4" />
                <span>{t.signOut}</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}