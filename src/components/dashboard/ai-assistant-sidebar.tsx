import { useState, useRef, useEffect } from "react"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Bot, Send, Sparkles, FileText, GraduationCap, CreditCard, Award, HelpCircle, Trash2 } from "lucide-react"
import { AIAssistantService, AIQuery } from "@/lib/ai-assistant-service"
import { useTranslations } from "@/lib/i18n"
import { cn } from "@/lib/utils"

interface AIAssistantSidebarProps {
  children: React.ReactNode
}

export function AIAssistantSidebar({ children }: AIAssistantSidebarProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [question, setQuestion] = useState("")
  const [chatHistory, setChatHistory] = useState<AIQuery[]>([])
  const [isTyping, setIsTyping] = useState(false)
  const scrollAreaRef = useRef<HTMLDivElement>(null)
  const t = useTranslations()

  useEffect(() => {
    setChatHistory(AIAssistantService.getHistory())
  }, [])

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight
    }
  }, [chatHistory])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!question.trim()) return

    const userQuestion = question.trim()
    setQuestion("")
    setIsTyping(true)

    // Add user question to history
    const userQuery: AIQuery = {
      id: Date.now().toString(),
      question: userQuestion,
      answer: "",
      category: 'general',
      timestamp: new Date().toISOString()
    }

    setChatHistory(prev => [...prev, userQuery])

    // Simulate AI thinking delay
    setTimeout(() => {
      const answer = AIAssistantService.findAnswer(userQuestion)
      AIAssistantService.addToHistory(userQuestion, answer)
      
      const aiResponse: AIQuery = {
        id: (Date.now() + 1).toString(),
        question: "",
        answer: answer,
        category: 'general',
        timestamp: new Date().toISOString()
      }

      setChatHistory(prev => [...prev, aiResponse])
      setIsTyping(false)
    }, 1000)
  }

  const handleQuickQuestion = (quickQuestion: string) => {
    setQuestion(quickQuestion)
  }

  const clearHistory = () => {
    setChatHistory([])
    AIAssistantService.clearHistory()
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'aadhaar': return <FileText className="h-4 w-4" />
      case 'education': return <GraduationCap className="h-4 w-4" />
      case 'financial': return <CreditCard className="h-4 w-4" />
      case 'professional': return <Award className="h-4 w-4" />
      default: return <HelpCircle className="h-4 w-4" />
    }
  }

  const quickQuestions = AIAssistantService.getQuickQuestions()

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        {children}
      </SheetTrigger>
      <SheetContent side="right" className="w-96 sm:w-[480px]">
        <SheetHeader>
          <SheetTitle className="flex items-center space-x-2">
            <div className="flex items-center justify-center w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg">
              <Bot className="h-5 w-5 text-white" />
            </div>
            <span>AI Document Assistant</span>
            <Sparkles className="h-4 w-4 text-yellow-500" />
          </SheetTitle>
        </SheetHeader>

        <div className="flex flex-col h-full mt-6">
          {/* Chat History */}
          <ScrollArea className="flex-1 pr-4 mb-4" ref={scrollAreaRef}>
            <div className="space-y-4">
              {chatHistory.length === 0 ? (
                <div className="text-center py-8">
                  <Bot className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                  <h3 className="font-semibold mb-2">Welcome to AI Document Assistant!</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    I'm here to help you with questions about your documents, verification processes, and digital identity management.
                  </p>
                  <div className="space-y-2">
                    <p className="text-xs font-medium text-muted-foreground">Popular Questions:</p>
                    {quickQuestions.slice(0, 4).map((q, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        size="sm"
                        className="w-full text-left justify-start h-auto p-3 text-xs hover:bg-accent/50"
                        onClick={() => handleQuickQuestion(q)}
                      >
                        <div className="flex items-center space-x-2">
                          <div className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
                          <span>{q}</span>
                        </div>
                      </Button>
                    ))}
                  </div>
                </div>
              ) : (
                <>
                  {chatHistory.map((query) => (
                    <div key={query.id} className="space-y-2">
                      {query.question && (
                        <div className="flex justify-end">
                          <Card className="max-w-[80%] bg-primary text-primary-foreground">
                            <CardContent className="p-3">
                              <p className="text-sm">{query.question}</p>
                            </CardContent>
                          </Card>
                        </div>
                      )}
                      {query.answer && (
                        <div className="flex justify-start">
                          <Card className="max-w-[80%]">
                            <CardContent className="p-3">
                              <div className="flex items-start space-x-2">
                                <Bot className="h-4 w-4 mt-0.5 text-blue-500 flex-shrink-0" />
                                <div className="space-y-2">
                                  <p className="text-sm whitespace-pre-line">{query.answer}</p>
                                  <div className="flex items-center space-x-2">
                                    {getCategoryIcon(query.category)}
                                    <Badge variant="secondary" className="text-xs">
                                      {query.category}
                                    </Badge>
                                  </div>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        </div>
                      )}
                    </div>
                  ))}
                  {isTyping && (
                    <div className="flex justify-start">
                      <Card className="max-w-[80%]">
                        <CardContent className="p-3">
                          <div className="flex items-center space-x-2">
                            <Bot className="h-4 w-4 text-blue-500" />
                            <div className="flex space-x-1">
                              <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" />
                              <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                              <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  )}
                </>
              )}
            </div>
          </ScrollArea>

          {/* Quick Actions */}
          {chatHistory.length > 0 && (
            <div className="py-3 border-t mb-3">
              <div className="flex items-center justify-between mb-2">
                <p className="text-xs font-medium text-muted-foreground">More Questions</p>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearHistory}
                  className="h-6 px-2 text-xs"
                >
                  <Trash2 className="h-3 w-3 mr-1" />
                  Clear
                </Button>
              </div>
              <div className="grid grid-cols-1 gap-1">
                {quickQuestions.slice(4, 6).map((q, index) => (
                  <Button
                    key={index}
                    variant="ghost"
                    size="sm"
                    className="justify-start h-auto p-2 text-xs text-left hover:bg-accent/30"
                    onClick={() => handleQuickQuestion(q)}
                  >
                    <div className="flex items-center space-x-2">
                      <div className="w-1 h-1 bg-muted-foreground rounded-full" />
                      <span className="truncate">{q}</span>
                    </div>
                  </Button>
                ))}
              </div>
            </div>
          )}

          {/* Input Form */}
          <div className="border-t pt-3">
            <form onSubmit={handleSubmit} className="flex space-x-2">
              <Input
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="Ask about documents, verification, KYC..."
                className="flex-1"
                disabled={isTyping}
              />
              <Button type="submit" size="icon" disabled={!question.trim() || isTyping}>
                <Send className="h-4 w-4" />
              </Button>
            </form>
            <p className="text-xs text-muted-foreground mt-2 px-1">
              💡 Try: "How to verify Aadhaar?", "Bank KYC process", "Document formats"
            </p>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
