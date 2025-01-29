import React from 'react';
import { FaRocket } from "react-icons/fa"; // Adjust the icon import based on your library
import { useEditor } from "@/context/EditorContext"
import { Dispatch, SetStateAction } from "react";



interface DynamicButtonProps {
    onClick?: () => void;
    text?: string;
    Icon?: React.ComponentType<{ size?: number; className?: string }>;
    className?: string;
    isDisabled?: boolean;
    setPublishedUrl: Dispatch<SetStateAction<string>>;
    setIsPublishModalOpen: Dispatch<SetStateAction<boolean>>;
}

const DynamicButton: React.FC<DynamicButtonProps> = ({ 
    onClick, 
    text = "Publish", 
    Icon = FaRocket, 
    className = "", 
    isDisabled = false,
    setPublishedUrl ,
    setIsPublishModalOpen 
}) => {

    const {
        aiName,
        systemPrompt,
        SelectedModel,
          UserBackgroundEnabled,
        magicTypingSuggestionsEnabled,
        aiPicture,
        aiFirstMessage,
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
        userSelectsModelEnabled,
        tagsTextColor,
        prefixTags,
        uploadsEnabled,
        voiceInputEnabled,
        aiPrefillMessage,
      } = useEditor()

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

      console.log(aiName)
    return (
        <button 
            onClick={handlePublish} 
            className={`px-4 py-2 bg-white text-black rounded flex items-center ${className} ${isDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={isDisabled}
        >
            {Icon && <Icon size={16} className="mr-2" />}
            {text}
        </button>
    );
};

export default DynamicButton;