// Security analysis service for calculating security scores and recommendations
export interface SecurityFactor {
  id: string
  name: string
  description: string
  currentStatus: 'enabled' | 'disabled' | 'partial'
  impact: number // Points out of 100
  category: 'authentication' | 'encryption' | 'network' | 'monitoring' | 'backup'
  recommendation?: string
  actionRequired?: string
}

export interface SecurityAnalysis {
  currentScore: number
  maxScore: number
  factors: SecurityFactor[]
  recommendations: string[]
  criticalIssues: SecurityFactor[]
  improvements: SecurityFactor[]
}

export class SecurityAnalysisService {
  private static readonly securityFactors: SecurityFactor[] = [
    {
      id: 'biometric-auth',
      name: 'Biometric Authentication',
      description: 'Fingerprint and face recognition enabled',
      currentStatus: 'enabled',
      impact: 25,
      category: 'authentication'
    },
    {
      id: 'pin-protection',
      name: 'PIN Protection',
      description: '6-digit PIN for app access',
      currentStatus: 'enabled',
      impact: 15,
      category: 'authentication'
    },
    {
      id: 'two-factor-auth',
      name: 'Two-Factor Authentication',
      description: 'SMS/Email verification for sensitive operations',
      currentStatus: 'partial',
      impact: 10,
      category: 'authentication',
      recommendation: 'Enable 2FA for all credential operations',
      actionRequired: 'Go to Security Settings → Enable 2FA'
    },
    {
      id: 'end-to-end-encryption',
      name: 'End-to-End Encryption',
      description: 'AES-256 encryption for all stored documents',
      currentStatus: 'enabled',
      impact: 20,
      category: 'encryption'
    },
    {
      id: 'blockchain-backup',
      name: 'Blockchain Backup',
      description: 'Document hashes stored on blockchain',
      currentStatus: 'enabled',
      impact: 15,
      category: 'backup'
    },
    {
      id: 'secure-connection',
      name: 'Secure Connection',
      description: 'TLS 1.3 for all network communications',
      currentStatus: 'enabled',
      impact: 10,
      category: 'network'
    },
    {
      id: 'anomaly-detection',
      name: 'AI Anomaly Detection',
      description: 'Machine learning-based threat detection',
      currentStatus: 'enabled',
      impact: 5,
      category: 'monitoring'
    }
  ]

  static getSecurityAnalysis(): SecurityAnalysis {
    const enabledFactors = this.securityFactors.filter(f => f.currentStatus === 'enabled')
    const partialFactors = this.securityFactors.filter(f => f.currentStatus === 'partial')
    const disabledFactors = this.securityFactors.filter(f => f.currentStatus === 'disabled')

    // Calculate current score
    const enabledScore = enabledFactors.reduce((sum, factor) => sum + factor.impact, 0)
    const partialScore = partialFactors.reduce((sum, factor) => sum + (factor.impact * 0.5), 0)
    const currentScore = enabledScore + partialScore

    // Calculate max possible score
    const maxScore = this.securityFactors.reduce((sum, factor) => sum + factor.impact, 0)

    // Generate recommendations
    const recommendations = [
      ...partialFactors.map(f => f.recommendation).filter(Boolean),
      ...disabledFactors.map(f => f.recommendation).filter(Boolean)
    ] as string[]

    // Add general recommendations if score is not 100%
    if (currentScore < maxScore) {
      if (partialFactors.some(f => f.id === 'two-factor-auth')) {
        recommendations.push('Complete 2FA setup to add an extra layer of security')
      }
      if (disabledFactors.length > 0) {
        recommendations.push('Enable all available security features for maximum protection')
      }
    }

    return {
      currentScore: Math.round(currentScore),
      maxScore,
      factors: this.securityFactors,
      recommendations,
      criticalIssues: disabledFactors.filter(f => f.impact >= 15),
      improvements: [...partialFactors, ...disabledFactors]
    }
  }

  static getScoreBreakdown(): { enabled: number; partial: number; disabled: number; missing: number } {
    const analysis = this.getSecurityAnalysis()
    const enabled = analysis.factors
      .filter(f => f.currentStatus === 'enabled')
      .reduce((sum, f) => sum + f.impact, 0)
    
    const partial = analysis.factors
      .filter(f => f.currentStatus === 'partial')
      .reduce((sum, f) => sum + (f.impact * 0.5), 0)
    
    const disabled = analysis.factors
      .filter(f => f.currentStatus === 'disabled')
      .reduce((sum, f) => sum + f.impact, 0)
    
    const missing = analysis.maxScore - enabled - (partial * 2)

    return { enabled, partial, disabled, missing }
  }

  static getRecommendationsForScore100(): string[] {
    const analysis = this.getSecurityAnalysis()
    
    if (analysis.currentScore === 100) {
      return ['🎉 Perfect! Your security score is already at 100%']
    }

    const recommendations = []
    
    // Check for partial implementations
    const partialFactors = analysis.factors.filter(f => f.currentStatus === 'partial')
    for (const factor of partialFactors) {
      if (factor.actionRequired) {
        recommendations.push(`${factor.name}: ${factor.actionRequired}`)
      }
    }

    // Check for disabled features
    const disabledFactors = analysis.factors.filter(f => f.currentStatus === 'disabled')
    for (const factor of disabledFactors) {
      if (factor.actionRequired) {
        recommendations.push(`${factor.name}: ${factor.actionRequired}`)
      }
    }

    // Add general improvement tips
    if (recommendations.length === 0 && analysis.currentScore < 100) {
      recommendations.push('Review all security settings and ensure they are properly configured')
    }

    return recommendations
  }

  static getSecurityTips(): string[] {
    return [
      '🔐 Use strong, unique passwords for all accounts',
      '📱 Keep your device updated with latest security patches',
      '🚫 Never share your credentials via email or SMS',
      '🔍 Regularly review your security settings and activity logs',
      '💾 Enable automatic backups for your important documents',
      '🌐 Only use secure networks for sensitive operations',
      '⚠️ Report any suspicious activity immediately'
    ]
  }
}
