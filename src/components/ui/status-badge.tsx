import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const statusBadgeVariants = cva(
  "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        success: "bg-gradient-success text-success-foreground shadow-security",
        warning: "bg-gradient-accent text-warning-foreground",
        danger: "bg-destructive text-destructive-foreground",
        info: "bg-gradient-primary text-primary-foreground shadow-elegant",
        secure: "bg-success text-success-foreground border border-success/20",
        offline: "bg-muted text-muted-foreground border border-border",
        verified: "bg-gradient-success text-success-foreground shadow-security animate-pulse"
      }
    },
    defaultVariants: {
      variant: "info"
    }
  }
)

export interface StatusBadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof statusBadgeVariants> {}

function StatusBadge({ className, variant, ...props }: StatusBadgeProps) {
  return (
    <div className={cn(statusBadgeVariants({ variant }), className)} {...props} />
  )
}

export { StatusBadge, statusBadgeVariants }