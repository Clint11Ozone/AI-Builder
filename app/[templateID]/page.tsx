"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useEditor } from "@/context/EditorContext";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import GeneralSettings from "@/components/GeneralSettings";
import StyleSettings from "@/components/StyleSettings";
import InterfaceSettings from "@/components/InterfaceSettings";
import AdvancedSettings from "@/components/AdvancedSettings";
import Preview from "@/components/Preview";
import PublishModal from "@/components/PublishModal";

export default function TemplatePage() {
  const { templateID } = useParams();
  const editorContext = useEditor();
  const [isPublishModalOpen, setIsPublishModalOpen] = useState(false);
  const [publishedUrl, setPublishedUrl] = useState("");

  useEffect(() => {
    if (templateID) {
      // Fetch the template data based on the templateID
      fetch(`/api/publish?templateID=${templateID}`)
  .then((response) => {
    if (!response.ok) {
      throw new Error("Failed to fetch template");
    }
    return response.json();
  })
  .then((templateData) => {
          console.log('editorContext')
          // Populate all the context states
    editorContext.setAiName(templateData.aiName);
          editorContext.setAiPicture(templateData.aiPicture);
          editorContext.setAiPrefillMessage(templateData.aiPrefillMessage);
          editorContext.setAiFirstMessage(templateData.aiFirstMessage);
          editorContext.setSystemPrompt(templateData.systemPrompt);
          editorContext.setChatType(templateData.chatType);
          editorContext.setBackgroundShape(templateData.backgroundShape);
          editorContext.setAlignment(templateData.alignment);
          editorContext.setPosition(templateData.position);
          editorContext.setSendButtonColor(templateData.sendButtonColor);
          editorContext.setSendButtonIcon(templateData.sendButtonIcon);
          editorContext.setSendButtonIconDirection(templateData.sendButtonIconDirection);
          editorContext.setSendButtonIconColor(templateData.sendButtonIconColor);
          editorContext.setSendButtonShape(templateData.sendButtonShape);
          editorContext.setSendButtonAlignment(templateData.sendButtonAlignment);
          editorContext.setBackgroundType(templateData.backgroundType);
          editorContext.setBorderEnabled(templateData.borderEnabled);
          editorContext.setBorderType(templateData.borderType);
          editorContext.setBorderColor(templateData.borderColor);
          editorContext.setChatBackgroundColor(templateData.chatBackgroundColor);
          editorContext.setUserInputBackgroundColor(templateData.userInputBackgroundColor);
          editorContext.setUserInputTextColor(templateData.userInputTextColor);
          editorContext.setSystemResponseBackgroundColor(templateData.systemResponseBackgroundColor);
          editorContext.setSystemResponseTextColor(templateData.systemResponseTextColor);
          editorContext.setTagsPosition(templateData.tagsPosition);
          editorContext.setTagsType(templateData.tagsType);
          editorContext.setTagsBackgroundColor(templateData.tagsBackgroundColor);
          editorContext.setTagsTextColor(templateData.tagsTextColor);
          editorContext.setMagicTypingSuggestionsEnabled(templateData.magicTypingSuggestionsEnabled);
          editorContext.setPrefixTags(templateData.prefixTags);
          editorContext.setUploadsEnabled(templateData.uploadsEnabled);
          editorContext.setVoiceInputEnabled(templateData.voiceInputEnabled);
          editorContext.setUserSelectsModelEnabled(templateData.userSelectsModelEnabled);
          editorContext.setSelectedModel(templateData.SelectedModel);
          editorContext.setUserBackgroundEnabled(templateData.UserBackgroundEnabled);
  })
  .catch((error) => {
    console.error("Error fetching template:", error);
  });

    }
  }, [templateID]);

  const handlePublish = async () => {
    const contextData = {
      aiName: editorContext.aiName,
      aiPicture: editorContext.aiPicture,
      aiPrefillMessage: editorContext.aiPrefillMessage,
      aiFirstMessage: editorContext.aiFirstMessage,
      systemPrompt: editorContext.systemPrompt,
      chatType: editorContext.chatType,
      backgroundShape: editorContext.backgroundShape,
      alignment: editorContext.alignment,
      position: editorContext.position,
      sendButtonColor: editorContext.sendButtonColor,
      sendButtonIcon: editorContext.sendButtonIcon,
      sendButtonIconDirection: editorContext.sendButtonIconDirection,
      sendButtonIconColor: editorContext.sendButtonIconColor,
      sendButtonShape: editorContext.sendButtonShape,
      sendButtonAlignment: editorContext.sendButtonAlignment,
      backgroundType: editorContext.backgroundType,
      borderEnabled: editorContext.borderEnabled,
      borderType: editorContext.borderType,
      borderColor: editorContext.borderColor,
      chatBackgroundColor: editorContext.chatBackgroundColor,
      userInputBackgroundColor: editorContext.userInputBackgroundColor,
      userInputTextColor: editorContext.userInputTextColor,
      systemResponseBackgroundColor: editorContext.systemResponseBackgroundColor,
      systemResponseTextColor: editorContext.systemResponseTextColor,
      tagsPosition: editorContext.tagsPosition,
      tagsType: editorContext.tagsType,
      tagsBackgroundColor: editorContext.tagsBackgroundColor,
      tagsTextColor: editorContext.tagsTextColor,
      magicTypingSuggestionsEnabled: editorContext.magicTypingSuggestionsEnabled,
      prefixTags: editorContext.prefixTags,
      uploadsEnabled: editorContext.uploadsEnabled,
      voiceInputEnabled: editorContext.voiceInputEnabled,
      userSelectsModelEnabled: editorContext.userSelectsModelEnabled,
      SelectedModel: editorContext.SelectedModel,
      UserBackgroundEnabled: editorContext.UserBackgroundEnabled,
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

  if (!editorContext) {
    return <div>Loading...</div>;
  }
  

  return (
    <div className="flex w-screen flex-row h-screen bg-black text-white">
      <div className="w-full p- overflow-y-auto">
        <Preview />
      </div>
      {/* <div className="w-full bg-black p-6 border-l border-white">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Template Editor</h1>
          <button onClick={handlePublish} className="px-4 py-2 bg-white text-black rounded flex items-center">
            Publish
          </button>
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
      </div> */}
      <PublishModal isOpen={isPublishModalOpen} onClose={() => setIsPublishModalOpen(false)} url={publishedUrl} />
    </div>
  );
}
