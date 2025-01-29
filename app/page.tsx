"use client"

import { useState, useEffect } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import GeneralSettings from "../components/GeneralSettings"
import StyleSettings from "../components/StyleSettings"
import InterfaceSettings from "../components/InterfaceSettings"
import AdvancedSettings from "../components/AdvancedSettings"
import Preview from "../components/Preview"
import PublishModal from "../components/PublishModal"
import { EditorProvider } from "../context/EditorContext"
import { Rocket } from "lucide-react"
import { useEditor } from "../context/EditorContext";
import Publish from "@/components/ui/publishBTN"




export default function Home() {
  const [isPublishModalOpen, setIsPublishModalOpen] = useState(false)
  const [publishedUrl, setPublishedUrl] = useState("")
  const context = useEditor(); // Access the context here
  const {
    aiName,
    aiPicture,
    aiPrefillMessage,
    aiFirstMessage,
    systemPrompt,
    chatType,
    backgroundShape,
    alignment,
    position,
    sendButtonColor,
    sendButtonIcon,
    sendButtonIconDirection,
    sendButtonIconColor,
    sendButtonShape,
    sendButtonAlignment,
    backgroundType,
    borderEnabled,
    borderType,
    borderColor,
    chatBackgroundColor,
    userInputBackgroundColor,
    userInputTextColor,
    systemResponseBackgroundColor,
    systemResponseTextColor,
    tagsPosition,
    tagsType,
    tagsBackgroundColor,
    tagsTextColor,
    magicTypingSuggestionsEnabled,
    prefixTags,
    uploadsEnabled,
    voiceInputEnabled,
    userSelectsModelEnabled,
    SelectedModel,
    UserBackgroundEnabled,
  } = useEditor();

  
  console.log(JSON.stringify({ aiName, aiPicture, aiFirstMessage, chatType, backgroundShape, alignment, position, sendButtonColor, sendButtonIcon, sendButtonIconDirection, sendButtonIconColor, sendButtonShape, sendButtonAlignment, backgroundType, borderEnabled, borderType, borderColor, chatBackgroundColor, userInputBackgroundColor, userInputTextColor, systemResponseBackgroundColor, systemResponseTextColor, tagsPosition, tagsType, tagsBackgroundColor, userSelectsModelEnabled, tagsTextColor, prefixTags, uploadsEnabled, voiceInputEnabled, aiPrefillMessage }, null, 2));


  const handlePublish = async () => {
  
    const contextData = {
      aiName,
      aiPicture,
      aiPrefillMessage,
      aiFirstMessage,
      systemPrompt,
      chatType,
      backgroundShape,
      alignment,
      position,
      sendButtonColor,
      sendButtonIcon,
      sendButtonIconDirection,
      sendButtonIconColor,
      sendButtonShape,
      sendButtonAlignment,
      backgroundType,
      borderEnabled,
      borderType,
      borderColor,
      chatBackgroundColor,
      userInputBackgroundColor,
      userInputTextColor,
      systemResponseBackgroundColor,
      systemResponseTextColor,
      tagsPosition,
      tagsType,
      tagsBackgroundColor,
      tagsTextColor,
      magicTypingSuggestionsEnabled,
      prefixTags,
      uploadsEnabled,
      voiceInputEnabled,
      userSelectsModelEnabled,
      SelectedModel,
      UserBackgroundEnabled,
    };
  
    const response = await fetch("/api/publish", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(contextData),
    });
  
    const data = await response.json();
    setPublishedUrl(data.url);
    setIsPublishModalOpen(true);
  };
  


  return (
    <EditorProvider>
      <div className="flex w-screen flex-row h-screen bg-black text-white">
        <div className="w-full p- overflow-y-auto">
          <Preview />
        </div>
        <div className="w-full bg-black p-6 border-l border-white">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold">Minimal Prompt UI Editor</h1>
            {/* <button onClick={handlePublish} className="px-4 py-2 bg-white text-black rounded flex items-center">
              <Rocket size={16} className="mr-2" />
              Publish
            </button> */}
            <Publish setIsPublishModalOpen={setIsPublishModalOpen} setPublishedUrl={setPublishedUrl} onClick={handlePublish}></Publish>
          </div>
          <Tabs defaultValue="general" className="w-full">
            <TabsList>
              <TabsTrigger value="general">General</TabsTrigger>
              <TabsTrigger value="style">Style</TabsTrigger>
              <TabsTrigger value="interface">Interface</TabsTrigger>
              <TabsTrigger value="advanced">Advanced</TabsTrigger>
            </TabsList>
            <TabsContent value="general">
              <GeneralSettings />
            </TabsContent>
            <TabsContent value="style">
              <StyleSettings />
            </TabsContent>
            <TabsContent value="interface">
              <InterfaceSettings />
            </TabsContent>
            <TabsContent value="advanced">
              <AdvancedSettings />
            </TabsContent>
          </Tabs>
        </div>
      </div>
      <PublishModal isOpen={isPublishModalOpen} onClose={() => setIsPublishModalOpen(false)} url={publishedUrl} />
    </EditorProvider>
  )
}

