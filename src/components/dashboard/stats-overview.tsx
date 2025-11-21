import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { 
  CreditCard, 
  Shield, 
  CheckCircle, 
  TrendingUp,
  Users,
  Clock,
  Zap
} from "lucide-react"
import { useTranslations } from "@/lib/i18n"

export function StatsOverview() {
  const t = useTranslations()
  
  const stats = [
    {
      title: t.totalCredentials,
      value: "4",
      description: t.verifiedCredentials,
      icon: CreditCard,
      color: "text-primary"
    },
    {
      title: t.securityScore,
      value: "97%",
      description: t.active,
      icon: Shield,
      color: "text-success"
    },
    {
      title: "Verifications",
      value: "23",
      description: "This month",
      icon: CheckCircle,
      color: "text-accent"
    },
    {
      title: "Trust Score",
      value: "A+",
      description: "Based on activity",
      icon: TrendingUp,
      color: "text-success"
    }
  ]

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, index) => (
        <Card key={index} className="hover:shadow-elegant transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {stat.title}
            </CardTitle>
            <stat.icon className={`h-4 w-4 ${stat.color}`} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <p className="text-xs text-muted-foreground">
              {stat.description}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}