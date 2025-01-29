import type React from "react"
import { createContext, useContext, useState } from "react"

type EditorContextType = {
  aiName: string
  setAiName: (name: string) => void
  aiPicture: string
  setAiPicture: (url: string) => void
  aiPrefillMessage: string
  setAiPrefillMessage: (message: string) => void
  aiFirstMessage: string
  setAiFirstMessage: (message: string) => void
  systemPrompt: string
  setSystemPrompt: (prompt: string) => void
  chatType: "floating" | "sticky" | "full"
  setChatType: (type: "floating" | "sticky" | "full") => void
  backgroundShape: "rounded" | "square" | "circle"
  setBackgroundShape: (shape: "rounded" | "square" | "circle") => void
  alignment: "left" | "right" | "center"
  setAlignment: (alignment: "left" | "right" | "center") => void
  position: "top" | "bottom"
  setPosition: (position: "top" | "bottom") => void
  sendButtonColor: string
  setSendButtonColor: (color: string) => void
  sendButtonIcon: "triangle" | "arrow" | "custom"
  setSendButtonIcon: (icon: "triangle" | "arrow" | "custom") => void
  sendButtonIconDirection: "up" | "right" | "down" | "left"
  setSendButtonIconDirection: (direction: "up" | "right" | "down" | "left") => void
  sendButtonIconColor: string
  setSendButtonIconColor: (color: string) => void
  sendButtonShape: "rounded" | "square" | "circle" | "triangle"
  setSendButtonShape: (shape: "rounded" | "square" | "circle" | "triangle") => void
  sendButtonAlignment: "left" | "right"
  setSendButtonAlignment: (alignment: "left" | "right") => void
  backgroundType: "bubbles" | "squares" | "rectangles" | "none"
  setBackgroundType: (type: "bubbles" | "squares" | "rectangles" | "none") => void
  borderEnabled: boolean
  setBorderEnabled: (enabled: boolean) => void
  borderType: "rounded" | "square" | "circle"
  setBorderType: (type: "rounded" | "square" | "circle") => void
  borderColor: string
  setBorderColor: (color: string) => void
  chatBackgroundColor: string
  setChatBackgroundColor: (color: string) => void
  userInputBackgroundColor: string
  setUserInputBackgroundColor: (color: string) => void
  userInputTextColor: string
  setUserInputTextColor: (color: string) => void
  systemResponseBackgroundColor: string
  setSystemResponseBackgroundColor: (color: string) => void
  systemResponseTextColor: string
  setSystemResponseTextColor: (color: string) => void
  tagsPosition: "top" | "bottom"
  setTagsPosition: (position: "top" | "bottom") => void
  tagsType: "rounded" | "square" | "circle"
  setTagsType: (type: "rounded" | "square" | "circle") => void
  tagsBackgroundColor: string
  setTagsBackgroundColor: (color: string) => void
  tagsTextColor: string
  setTagsTextColor: (color: string) => void
  magicTypingSuggestionsEnabled: boolean
  setMagicTypingSuggestionsEnabled: (enabled: boolean) => void
  prefixTags: string[]
  SelectedModel: string
  setSelectedModel: (tags: string) => void
  setPrefixTags: (tags: string[]) => void
  uploadsEnabled: boolean
  setUploadsEnabled: (enabled: boolean) => void
  voiceInputEnabled: boolean
  setVoiceInputEnabled: (enabled: boolean) => void
  userSelectsModelEnabled: boolean
  setUserSelectsModelEnabled: (enabled: boolean) => void
  UserBackgroundEnabled : boolean
  setUserBackgroundEnabled: (enabled: boolean) => void
}

const EditorContext = createContext<EditorContextType | undefined>(undefined)

export const EditorProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [aiName, setAiName] = useState("AI Assistant")
  const [aiPicture, setAiPicture] = useState("/placeholder.svg")
  const [aiPrefillMessage, setAiPrefillMessage] = useState("How can I help you today?")
  const [aiFirstMessage, setAiFirstMessage] = useState("Hello! I'm here to assist you.")
  const [systemPrompt, setSystemPrompt] = useState("You are a helpful AI assistant.")
  const [chatType, setChatType] = useState<"floating" | "sticky" | "full">("floating")
  const [backgroundShape, setBackgroundShape] = useState<"rounded" | "square" | "circle">("rounded")
  const [alignment, setAlignment] = useState<"left" | "right" | "center">("right")
  const [position, setPosition] = useState<"top" | "bottom">("bottom")
  const [sendButtonColor, setSendButtonColor] = useState("#ff6600")
  const [sendButtonIcon, setSendButtonIcon] = useState<"triangle" | "arrow" | "custom">("arrow")
  const [sendButtonIconDirection, setSendButtonIconDirection] = useState<"up" | "right" | "down" | "left">("right")
  const [sendButtonIconColor, setSendButtonIconColor] = useState("#ffffff")
  const [sendButtonShape, setSendButtonShape] = useState<"rounded" | "square" | "circle" | "triangle">("circle")
  const [sendButtonAlignment, setSendButtonAlignment] = useState<"left" | "right">("right")
  const [backgroundType, setBackgroundType] = useState<"bubbles" | "squares" | "rectangles" | "none">("bubbles")
  const [borderEnabled, setBorderEnabled] = useState(true)
  const [borderType, setBorderType] = useState<"rounded" | "square" | "circle">("rounded")
  const [borderColor, setBorderColor] = useState("#333333")
  const [chatBackgroundColor, setChatBackgroundColor] = useState("#1a1a1a")
  const [userInputBackgroundColor, setUserInputBackgroundColor] = useState("#2a2a2a")
  const [userInputTextColor, setUserInputTextColor] = useState("#ffffff")
  const [systemResponseBackgroundColor, setSystemResponseBackgroundColor] = useState("#333333")
  const [systemResponseTextColor, setSystemResponseTextColor] = useState("#ffffff")
  const [tagsPosition, setTagsPosition] = useState<"top" | "bottom">("bottom")
  const [tagsType, setTagsType] = useState<"rounded" | "square" | "circle">("rounded")
  const [tagsBackgroundColor, setTagsBackgroundColor] = useState("#444444")
  const [tagsTextColor, setTagsTextColor] = useState("#ffffff")
  const [magicTypingSuggestionsEnabled, setMagicTypingSuggestionsEnabled] = useState(false)
  const [prefixTags, setPrefixTags] = useState<string[]>(["Hello", "Thank you", "Please"])
  const [uploadsEnabled, setUploadsEnabled] = useState(false)
  const [voiceInputEnabled, setVoiceInputEnabled] = useState(false)
  const [userSelectsModelEnabled, setUserSelectsModelEnabled] = useState(false)
  const [SelectedModel, setSelectedModel] = useState("gpt-3.5-turbo")
  const [UserBackgroundEnabled, setUserBackgroundEnabled] = useState(false)


  

  return (
    <EditorContext.Provider
      value={{
        aiName,
        setSelectedModel,
        setUserBackgroundEnabled,
        UserBackgroundEnabled,
        SelectedModel,
        setAiName,
        aiPicture,
        setAiPicture,
        aiPrefillMessage,
        setAiPrefillMessage,
        aiFirstMessage,
        setAiFirstMessage,
        systemPrompt,
        setSystemPrompt,
        chatType,
        setChatType,
        backgroundShape,
        setBackgroundShape,
        alignment,
        setAlignment,
        position,
        setPosition,
        sendButtonColor,
        setSendButtonColor,
        sendButtonIcon,
        setSendButtonIcon,
        sendButtonIconDirection,
        setSendButtonIconDirection,
        sendButtonIconColor,
        setSendButtonIconColor,
        sendButtonShape,
        setSendButtonShape,
        sendButtonAlignment,
        setSendButtonAlignment,
        backgroundType,
        setBackgroundType,
        borderEnabled,
        setBorderEnabled,
        borderType,
        setBorderType,
        borderColor,
        setBorderColor,
        chatBackgroundColor,
        setChatBackgroundColor,
        userInputBackgroundColor,
        setUserInputBackgroundColor,
        userInputTextColor,
        setUserInputTextColor,
        systemResponseBackgroundColor,
        setSystemResponseBackgroundColor,
        systemResponseTextColor,
        setSystemResponseTextColor,
        tagsPosition,
        setTagsPosition,
        tagsType,
        setTagsType,
        tagsBackgroundColor,
        setTagsBackgroundColor,
        tagsTextColor,
        setTagsTextColor,
        magicTypingSuggestionsEnabled,
        setMagicTypingSuggestionsEnabled,
        prefixTags,
        setPrefixTags,
        uploadsEnabled,
        setUploadsEnabled,
        voiceInputEnabled,
        setVoiceInputEnabled,
        userSelectsModelEnabled,
        setUserSelectsModelEnabled,
      }}
    >
      {children}
    </EditorContext.Provider>
  )
}

export const useEditor = () => {
  const context = useContext(EditorContext)
  if (context === undefined) {
    throw new Error("useEditor must be used within an EditorProvider")
  }
  return context
}

