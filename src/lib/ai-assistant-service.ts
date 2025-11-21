// AI Assistant service for document-related queries
export interface AIQuery {
  id: string
  question: string
  answer: string
  category: 'aadhaar' | 'education' | 'financial' | 'professional' | 'general'
  timestamp: string
}

export interface DocumentFAQ {
  question: string
  answer: string
  category: string
  keywords: string[]
}

export class AIAssistantService {
  private static readonly documentFAQs: DocumentFAQ[] = [
    // Aadhaar Related
    {
      question: "How do I verify my Aadhaar document?",
      answer: "Your Aadhaar document is automatically verified through UIDAI's secure API when you upload it. The verification process checks the QR code, validates the digital signature, and confirms the document authenticity. You'll see a 'Verified' status once the process is complete.",
      category: "aadhaar",
      keywords: ["verify", "aadhaar", "validation", "authentic"]
    },
    {
      question: "What if my Aadhaar shows as expired?",
      answer: "Aadhaar cards don't expire, but if you're seeing an expired status, it might be due to outdated biometric data. Visit your nearest Aadhaar center for biometric updates, or use the online update service through UIDAI portal.",
      category: "aadhaar",
      keywords: ["expired", "aadhaar", "biometric", "update"]
    },
    {
      question: "Can I use Aadhaar for international verification?",
      answer: "Aadhaar is primarily for domestic use within India. For international purposes, you'll need additional documents like passport. However, some Indian embassies accept Aadhaar for specific consular services.",
      category: "aadhaar",
      keywords: ["international", "aadhaar", "passport", "embassy"]
    },

    // Education Documents
    {
      question: "How do I add my degree certificate?",
      answer: "Click 'Add Credential' → Select 'Education Certificate' → Upload your degree certificate. Ensure it's from a UGC-recognized institution. The system will verify it through the National Academic Depository (NAD) if available.",
      category: "education",
      keywords: ["degree", "certificate", "education", "UGC", "NAD"]
    },
    {
      question: "My university isn't recognized. What should I do?",
      answer: "If your university isn't in our verification database, you can still add the certificate. It will be marked as 'Pending Verification' until manual review. Contact support with university accreditation details for faster processing.",
      category: "education",
      keywords: ["university", "recognized", "accreditation", "verification"]
    },
    {
      question: "Can I add multiple degrees?",
      answer: "Yes! You can add multiple education credentials - school certificates, diplomas, undergraduate degrees, postgraduate degrees, and professional certifications. Each will be verified independently.",
      category: "education",
      keywords: ["multiple", "degrees", "certificates", "diploma"]
    },

    // Financial Documents
    {
      question: "How secure is my bank KYC information?",
      answer: "Your financial documents are encrypted with AES-256 encryption and stored on secure servers. Only you can access them, and banks can only view verification status, not the actual documents. We comply with RBI data protection guidelines.",
      category: "financial",
      keywords: ["secure", "bank", "KYC", "encryption", "RBI"]
    },
    {
      question: "Which banks support direct KYC verification?",
      answer: "We support direct verification with major banks including SBI, HDFC, ICICI, Axis Bank, and 50+ other banks. If your bank isn't listed, you can upload KYC documents for manual verification.",
      category: "financial",
      keywords: ["banks", "KYC", "verification", "SBI", "HDFC"]
    },
    {
      question: "How often should I update my financial documents?",
      answer: "Update your KYC documents when they expire or when your bank requests updated information. Most KYC documents are valid for 2-10 years depending on the document type and bank policies.",
      category: "financial",
      keywords: ["update", "financial", "KYC", "expire", "validity"]
    },

    // Professional Documents
    {
      question: "How do I add professional licenses?",
      answer: "Go to Add Credential → Professional License → Select your profession (Doctor, Lawyer, Engineer, etc.) → Upload license document. We verify with respective professional councils like MCI, BCI, etc.",
      category: "professional",
      keywords: ["professional", "license", "doctor", "lawyer", "engineer"]
    },
    {
      question: "My professional license is from another state. Will it work?",
      answer: "Yes, professional licenses from any Indian state are accepted. Our system recognizes licenses from all state professional councils and national bodies. Interstate practice permissions are also supported.",
      category: "professional",
      keywords: ["state", "professional", "license", "interstate", "council"]
    },

    // General Questions
    {
      question: "How long does document verification take?",
      answer: "Automatic verification (Aadhaar, PAN) takes 2-5 minutes. Educational documents take 1-3 business days. Professional licenses take 3-7 business days. Financial KYC is usually instant with supported banks.",
      category: "general",
      keywords: ["verification", "time", "duration", "processing"]
    },
    {
      question: "Can I delete a document after uploading?",
      answer: "Yes, you can delete documents from your wallet anytime. However, if the document is linked to active verifications or services, you'll need to replace it with an alternative document first.",
      category: "general",
      keywords: ["delete", "remove", "document", "wallet"]
    },
    {
      question: "What happens if my document is rejected?",
      answer: "If a document is rejected, you'll receive a notification with the reason. Common reasons include poor image quality, expired documents, or unsupported formats. You can re-upload after addressing the issues.",
      category: "general",
      keywords: ["rejected", "document", "notification", "re-upload"]
    },
    {
      question: "Is my data shared with third parties?",
      answer: "No, your documents are never shared without your explicit consent. When you use services, only verification status is shared, not the actual documents. You control what information is shared and with whom.",
      category: "general",
      keywords: ["data", "privacy", "sharing", "third party", "consent"]
    },
    {
      question: "How do I backup my documents?",
      answer: "Use the Export feature to download your documents in various formats (PDF, JSON, etc.). We recommend regular backups. Your documents are also automatically backed up on our secure servers.",
      category: "general",
      keywords: ["backup", "export", "download", "PDF", "secure"]
    }
  ]

  private static chatHistory: AIQuery[] = []

  static findAnswer(question: string): string {
    const normalizedQuestion = question.toLowerCase()
    
    // Find the best matching FAQ
    let bestMatch: DocumentFAQ | null = null
    let bestScore = 0

    for (const faq of this.documentFAQs) {
      let score = 0
      
      // Check if question contains FAQ keywords
      for (const keyword of faq.keywords) {
        if (normalizedQuestion.includes(keyword.toLowerCase())) {
          score += 2
        }
      }
      
      // Check if question is similar to FAQ question
      if (normalizedQuestion.includes(faq.question.toLowerCase().substring(0, 10))) {
        score += 3
      }
      
      if (score > bestScore) {
        bestScore = score
        bestMatch = faq
      }
    }

    if (bestMatch && bestScore > 1) {
      return bestMatch.answer
    }

    // Default response for unmatched questions
    return "I'm here to help with your document questions! While I don't have a specific answer for that query, here are some helpful tips:\n\n🔍 **Document Upload Guidelines:**\n• Ensure documents are clear, well-lit, and readable\n• Use supported formats: PDF, JPG, PNG (max 10MB)\n• Make sure documents are not expired or damaged\n• Avoid blurry or cropped images\n\n📋 **Common Solutions:**\n• For Aadhaar issues: Check UIDAI official website\n• For education certificates: Verify with issuing institution\n• For bank KYC: Contact your bank's customer service\n• For technical problems: Try refreshing and re-uploading\n\n💡 **Quick Help:** Try asking about specific document types like \"Aadhaar verification\", \"education certificates\", \"bank KYC\", or \"professional licenses\" for more targeted assistance.\n\nIs there a specific document type or process you'd like help with?"
  }

  static addToHistory(question: string, answer: string, category: AIQuery['category'] = 'general'): void {
    const query: AIQuery = {
      id: Date.now().toString(),
      question,
      answer,
      category,
      timestamp: new Date().toISOString()
    }
    
    this.chatHistory.unshift(query)
    
    // Keep only last 50 queries
    if (this.chatHistory.length > 50) {
      this.chatHistory = this.chatHistory.slice(0, 50)
    }
  }

  static getHistory(): AIQuery[] {
    return this.chatHistory
  }

  static clearHistory(): void {
    this.chatHistory = []
  }

  static getQuickQuestions(): string[] {
    return [
      "How do I verify my Aadhaar document?",
      "How to add my degree certificate?",
      "How secure is my bank KYC information?",
      "How long does document verification take?",
      "Can I delete documents after uploading?",
      "How do I export and backup my documents?",
      "What if my document is rejected?",
      "Which banks support direct KYC verification?"
    ]
  }

  static getCategoryQuestions(category: string): DocumentFAQ[] {
    return this.documentFAQs.filter(faq => faq.category === category)
  }
}
