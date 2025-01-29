"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Cpu } from "lucide-react";
import { useEditor } from "../context/EditorContext"
import { Edit, Camera, MessageSquare, Send, Sparkles, Settings } from "lucide-react"

export default function GeneralSettings() {
  const {
    aiName,
    setAiName,
    aiPicture,
    setAiPicture,
    aiPrefillMessage,
    setAiPrefillMessage,
    aiFirstMessage,
    setAiFirstMessage,
    systemPrompt,
    setSystemPrompt,
    setSelectedModel,
    SelectedModel,
    setUserSelectsModelEnabled,
  } = useEditor()

  return (
    <Tabs defaultValue="basic-info">
      <TabsList>
        <TabsTrigger value="basic-info">Basic Info</TabsTrigger>
        <TabsTrigger value="system-prompt">System Prompt</TabsTrigger>
      </TabsList>
      <TabsContent value="basic-info">
        <div className="space-y-4">
          <div>
            <Label htmlFor="ai-name">AI Name</Label>
            <div className="flex items-center space-x-2">
              <Input id="ai-name" value={aiName} onChange={(e) => setAiName(e.target.value)} />
              <Edit className="w-4 h-4" />
            </div>
          </div>
          <div>
            <Label htmlFor="ai-picture">AI Agent Picture</Label>
            <div className="flex items-center space-x-2">
              <Input
                id="ai-picture"
                type="file"
                onChange={(e) => {
                  const file = e.target.files?.[0]
                  if (file) {
                    const reader = new FileReader()
                    reader.onloadend = () => {
                      setAiPicture(reader.result as string)
                    }
                    reader.readAsDataURL(file)
                  }
                }}
              />
              <Camera className="w-4 h-4" />
            </div>
          </div>
          <div>
            <Label htmlFor="ai-prefill">AI Prefill Message</Label>
            <div className="flex items-center space-x-2">
              <Input id="ai-prefill" value={aiPrefillMessage} onChange={(e) => setAiPrefillMessage(e.target.value)} />
              <MessageSquare className="w-4 h-4" />
            </div>
          </div>
          <div>
            <Label htmlFor="ai-first-message">AI First Message</Label>
            <div className="flex items-center space-x-2">
              <Input id="ai-first-message" value={aiFirstMessage} onChange={(e) => setAiFirstMessage(e.target.value)} />
              <Send className="w-4 h-4" />
            </div>
          </div>
        </div>
      </TabsContent>
      <TabsContent value="system-prompt">
        <div className="space-y-4">
          <div>
            <Label htmlFor="system-prompt">System Prompt</Label>
            <div className="flex items-center space-x-2">
              <Textarea
                id="system-prompt"
                value={systemPrompt}
                onChange={(e) => setSystemPrompt(e.target.value)}
                rows={6}
              />
              <Edit className="w-4 h-4" />
            </div>
          </div>
          <Button onClick={() => {setSystemPrompt("This can be a newly enhanced prompt")}} className="mr-2">
            <Sparkles className="w-4 h-4 mr-2" />
            Enhance System Prompt AI (Pro)
          </Button>
          <div>
            <Label htmlFor="ai-model">AI Model</Label>
            <Select
              value={SelectedModel}
              onValueChange={(value: "model1" | "model2" | "model3") => setSelectedModel(value)}
            >
              <SelectTrigger id="ai-model" className="flex items-center">
                <SelectValue placeholder="Select AI Model (Pro)" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="model1">Model 1</SelectItem>
                <SelectItem value="model2">Model 2</SelectItem>
                <SelectItem value="model3">Model 3</SelectItem>
              </SelectContent>
            </Select>
          </div>

        </div>
      </TabsContent>
    </Tabs>
  )
}

