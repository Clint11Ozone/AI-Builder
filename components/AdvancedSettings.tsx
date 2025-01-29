"use client"

import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { useEditor } from "../context/EditorContext"
import { FileUp, Mic, Settings, Sparkles } from "lucide-react"

export default function AdvancedSettings() {
  const {
    uploadsEnabled,
    setUploadsEnabled,
    voiceInputEnabled,
    setVoiceInputEnabled,
    userSelectsModelEnabled,
    setUserSelectsModelEnabled,
    magicTypingSuggestionsEnabled,
    setMagicTypingSuggestionsEnabled,
  } = useEditor()

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <Switch id="uploads-enabled" checked={uploadsEnabled} onCheckedChange={setUploadsEnabled} />
        <Label htmlFor="uploads-enabled">Enable Uploads</Label>
        <FileUp className="w-4 h-4" />
      </div>
      <div className="flex items-center space-x-2">
        <Switch id="voice-input-enabled" checked={voiceInputEnabled} onCheckedChange={setVoiceInputEnabled} />
        <Label htmlFor="voice-input-enabled">Enable Voice Input</Label>
        <Mic className="w-4 h-4" />
      </div>
      <div className="flex items-center space-x-2">
        <Switch
          id="user-selects-model-enabled"
          checked={userSelectsModelEnabled}
          onCheckedChange={setUserSelectsModelEnabled}
        />
        <Label htmlFor="user-selects-model-enabled">Enable User Selects Model</Label>
        <Settings className="w-4 h-4" />
      </div>
      <div className="flex items-center space-x-2">
        <Switch
          id="magic-typing-suggestions-enabled"
          checked={magicTypingSuggestionsEnabled}
          onCheckedChange={setMagicTypingSuggestionsEnabled}
        />
        <Label htmlFor="magic-typing-suggestions-enabled">Enable Magic Typing Suggestions</Label>
        <Sparkles className="w-4 h-4" />
      </div>
    </div>
  )
}

