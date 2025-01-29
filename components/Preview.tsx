"use client"

import { useEditor } from "../context/EditorContext"
import { motion } from "framer-motion"
import { Send, Mic, FileUp, MoveRight } from "lucide-react"
import { useState, useRef, useEffect } from "react"

export default function Preview() {
  const {
    aiName,
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

  const [messages, setMessages] = useState([
    { id: "1", role: "system", content: aiFirstMessage },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messageContainerRef = useRef<HTMLDivElement | null>(null);

  console.log(alignment)
  useEffect(() => {
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTop = messageContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = async () => {
    // if (!input.trim()) return;

    const userMessage = {
      id: crypto.randomUUID(),
      role: "user",
      content: input,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("ello Lisa");
    setIsLoading(true);
    setInput("")

    try {
      const response = await fetch(
        "https://n8n.abslm.nl/webhook/55b3c6ef-2ba5-4f83-9217-9d5f5c1ed4c8",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ query: input, sessionId: "none" }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to communicate with the chatbot.");
      }

      const data = await response.json();

      const assistantMessage = {
        id: crypto.randomUUID(),
        role: "system",
        content: data.output || "No response available.",
      };
      console.log(data.output)
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { id: crypto.randomUUID(), role: "system", content: "An error occurred. Please try again." },
      ]);
    } finally {
      setIsLoading(false);
    }
  };


  const chatContainerStyle = {
    backgroundColor: chatBackgroundColor,
    borderRadius: backgroundShape === "rounded" ? "1rem" : backgroundShape === "circle" ? "50%" : "0",
    border: borderEnabled ? `2px solid ${borderColor}` : "none",
    borderRadius: borderType === "rounded" ? "1rem" : borderType === "circle" ? "50%" : "0",
  }

  const messageStyle = {
    backgroundColor: systemResponseBackgroundColor,
    color: systemResponseTextColor,
    borderRadius: "0.5rem",
    padding: "0.5rem",
    marginBottom: "0.5rem",
  }

  const inputStyle = {
    backgroundColor: userInputBackgroundColor,
    color: userInputTextColor,
    borderRadius: "0.5rem",
    padding: "0.5rem",
  }

  const sendButtonStyle = {
    backgroundColor: sendButtonColor,
    borderRadius: sendButtonShape === "rounded" ? "0.5rem" : sendButtonShape === "circle" ? "50%" : "0",
    padding: "0.5rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }

  const tagStyle = {
    backgroundColor: tagsBackgroundColor,
    color: tagsTextColor,
    borderRadius: tagsType === "rounded" ? "0.5rem" : tagsType === "circle" ? "9999px" : "0",
    padding: "0.25rem 0.5rem",
    marginRight: "0.5rem",
    marginBottom: "0.5rem",
  }

  // console.log(JSON.stringify({ aiName, aiPicture, aiFirstMessage, chatType, backgroundShape, alignment, position, sendButtonColor, sendButtonIcon, sendButtonIconDirection, sendButtonIconColor, sendButtonShape, sendButtonAlignment, backgroundType, borderEnabled, borderType, borderColor, chatBackgroundColor, userInputBackgroundColor, userInputTextColor, systemResponseBackgroundColor, systemResponseTextColor, tagsPosition, tagsType, tagsBackgroundColor, userSelectsModelEnabled, tagsTextColor, prefixTags, uploadsEnabled, voiceInputEnabled, aiPrefillMessage }, null, 2));
  console.log('sendButtonIcon')
  console.log(messages)

  function getIconRotation(direction: String) {
    switch (direction) {
      case "up":
        return "rotate(-90deg)";
      case "down":
        return "rotate(90deg)";
      case "left":
        return "rotate(180deg)";
      case "right":
        return "rotate(0deg)";
      default:
        return "rotate(0deg)"; // Default to no rotation
    }
  }



  return (

    <div className="h-full flex flex-col bg-black text-white">
      <div className="flex-1 overflow-y-auto" style={chatContainerStyle}>
        {position === 'top' && (
          <div className="p-4">
            <div className="flex items-center mb-4">
              <h3 className="font-bold">{aiName}</h3>
            </div>

            {messages.map((message, index) => (
              <div key={index} className="p-4">
                <div
                  className={`flex items-center mt-4 ${alignment === 'right'
                    ? message.role === 'system'
                      ? 'flex-row-reverse justify-end text-right'
                      : 'flex-row justify-start text-left'
                    : alignment === 'left'
                      ? message.role === 'system'
                        ? 'flex-row justify-start text-left'
                        : 'flex-row-reverse justify-end text-right'
                      : 'w-full'
                    }`}
                  style={{
                    ...messageStyle,
                    width: alignment === 'center' ? '100%' : 'fit-content',
                    marginLeft: alignment === 'right'
                      ? message.role === 'system' ? 'auto' : ''
                      : alignment === 'left'
                        ? message.role === 'system' ? '' : 'auto'
                        : '',
                    marginRight: alignment === 'right'
                      ? message.role === 'system' ? '' : 'auto'
                      : alignment === 'left'
                        ? message.role === 'system' ? 'auto' : ''
                        : '',
                    borderRadius:
                      backgroundType === 'rectangles'
                        ? '0.25rem'
                        : backgroundType === 'bubbles'
                          ? '9999px'
                          : backgroundType === 'squares'
                            ? '0.5rem'
                            : '',
                    backgroundColor:
                      backgroundType === 'none'
                        ? 'transparent'
                        : messageStyle.backgroundColor,
                  }}
                >
                  {message.role === 'system' && (
                    <img
                      src={aiPicture || '/placeholder.svg'}
                      alt={aiName}
                      className={`w-8 h-8 rounded-full ${alignment === 'right' ? 'ml-2' : 'mr-2'
                        }`}
                    />
                  )}
                  <div>
                    &nbsp;&nbsp;{message.content}
                  </div>
                </div>

              </div>
            ))}

            {tagsPosition === "top" && (
              <div className="flex flex-wrap mb-4">
                {prefixTags.map((tag, index) => (
                  <span key={index} style={tagStyle}>{tag}</span>
                ))}
              </div>
            )}

            {sendButtonAlignment === "right" && (<div className="flex items-center">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                style={inputStyle}
                className="flex-1 mr-2"
                placeholder={aiPrefillMessage}
              />
              <button style={sendButtonStyle}>
                {sendButtonIcon === "arrow" && (
                  <div
                    style={{
                      transform: getIconRotation(sendButtonIconDirection),
                      display: "inline-block",
                    }}
                  >
                    <MoveRight color={sendButtonIconColor} size={20} />
                  </div>
                )}
                {sendButtonIcon === "triangle" && (
                  <div
                    style={{
                      transform: getIconRotation(sendButtonIconDirection),
                      display: "inline-block",
                    }}
                  >
                    <Send color={sendButtonIconColor} size={20} />
                  </div>
                )}
                {sendButtonIcon === "custom" && (
                  <div
                    style={{
                      transform: getIconRotation(sendButtonIconDirection),
                      display: "inline-block",
                    }}
                  >
                    <Send color={sendButtonIconColor} size={20} />
                  </div>
                )}
              </button>
              {voiceInputEnabled && (
                <button className="ml-2" style={sendButtonStyle}>
                  <Mic color={sendButtonIconColor} size={20} />
                </button>
              )}
              {uploadsEnabled && (
                <button className="ml-2" style={sendButtonStyle}>
                  <FileUp color={sendButtonIconColor} size={20} />
                </button>
              )}
            </div>)}
            {sendButtonAlignment === "left" && (<div className="flex items-center">
              <button style={sendButtonStyle}>
                {sendButtonIcon === "arrow" && (
                  <div
                    style={{
                      transform: getIconRotation(sendButtonIconDirection),
                      display: "inline-block",
                    }}
                  >
                    <MoveRight color={sendButtonIconColor} size={20} />
                  </div>
                )}
                {sendButtonIcon === "triangle" && (
                  <div
                    style={{
                      transform: getIconRotation(sendButtonIconDirection),
                      display: "inline-block",
                    }}
                  >
                    <Send color={sendButtonIconColor} size={20} />
                  </div>
                )}
                {sendButtonIcon === "custom" && (
                  <div
                    style={{
                      transform: getIconRotation(sendButtonIconDirection),
                      display: "inline-block",
                    }}
                  >
                    <Send color={sendButtonIconColor} size={20} />
                  </div>
                )}
              </button>
              {voiceInputEnabled && (
                <button className="mx-1" style={sendButtonStyle}>
                  <Mic color={sendButtonIconColor} size={20} />
                </button>
              )}
              {uploadsEnabled && (
                <button className="mx-1" style={sendButtonStyle}>
                  <FileUp color={sendButtonIconColor} size={20} />
                </button>
              )}
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                style={inputStyle}
                className="flex-1 mr-2"
                placeholder={aiPrefillMessage}
              />
            </div>)}
            {userSelectsModelEnabled && (
              <div className="mt-4">
                <select
                  id="chatModel"
                  name="chatModel"
                  className="mt-1 block w- rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                >
                  <option value="gpt-3">GPT-3</option>
                  <option value="gpt-4">GPT-4</option>
                  <option value="custom-model">DeepSeek</option>
                </select>
              </div>
            )}

            {tagsPosition === "bottom" && (
              <div className="flex flex-wrap mt-4">
                {prefixTags.map((tag, index) => (
                  <span key={index} style={tagStyle}>{tag}</span>
                ))}
              </div>
            )}

          </div>
        )}

        {position === 'bottom' && (
          <div className="h-full flex flex-col justify-between">
            <div className="p-4">
              <div className="flex items-center mb-4">
                <h3 className="font-bold">{aiName}</h3>
              </div>
              {messages.map((message, index) => (
                <div key={index} className="p-4">
                  <div
                    className={`flex items-center mt-4 ${alignment === 'right'
                      ? message.role === 'system'
                        ? 'flex-row-reverse justify-end text-right'
                        : 'flex-row justify-start text-left'
                      : alignment === 'left'
                        ? message.role === 'system'
                          ? 'flex-row justify-start text-left'
                          : 'flex-row-reverse justify-end text-right'
                        : 'w-full'
                      }`}
                    style={{
                      ...messageStyle,
                      width: alignment === 'center' ? '100%' : 'fit-content',
                      marginLeft: alignment === 'right'
                        ? message.role === 'system' ? 'auto' : ''
                        : alignment === 'left'
                          ? message.role === 'system' ? '' : 'auto'
                          : '',
                      marginRight: alignment === 'right'
                        ? message.role === 'system' ? '' : 'auto'
                        : alignment === 'left'
                          ? message.role === 'system' ? 'auto' : ''
                          : '',
                      borderRadius:
                        backgroundType === 'rectangles'
                          ? '0.25rem'
                          : backgroundType === 'bubbles'
                            ? '9999px'
                            : backgroundType === 'squares'
                              ? '0.5rem'
                              : '',
                      backgroundColor:
                        backgroundType === 'none'
                          ? 'transparent'
                          : messageStyle.backgroundColor,
                    }}
                  >
                    {message.role === 'system' && (
                      <img
                        src={aiPicture || '/placeholder.svg'}
                        alt={aiName}
                        className={`w-8 h-8 rounded-full ${alignment === 'right' ? 'ml-2' : 'mr-2'
                          }`}
                      />
                    )}
                    <div>
                      &nbsp;&nbsp;{message.content}
                    </div>
                  </div>

                </div>
              ))}
            </div>

            <div className="p-4 mt-auto">

              {tagsPosition === "top" && (
                <div className="flex flex-wrap mb-4">
                  {prefixTags.map((tag, index) => (
                    <span key={index} style={tagStyle}>{tag}</span>
                  ))}
                </div>
              )}

              {sendButtonAlignment === "right" && (<div className="flex items-center">
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  style={inputStyle}
                  className="flex-1 mr-2"
                  placeholder={aiPrefillMessage}
                />                <button onClick={handleSendMessage} style={sendButtonStyle}>
                  {sendButtonIcon === "arrow" && (
                    <div
                      style={{
                        transform: getIconRotation(sendButtonIconDirection),
                        display: "inline-block",
                      }}
                    >
                      <MoveRight color={sendButtonIconColor} size={20} />
                    </div>
                  )}
                  {sendButtonIcon === "triangle" && (
                    <div
                      style={{
                        transform: getIconRotation(sendButtonIconDirection),
                        display: "inline-block",
                      }}
                    >
                      <Send color={sendButtonIconColor} size={20} />
                    </div>
                  )}
                  {sendButtonIcon === "custom" && (
                    <div
                      style={{
                        transform: getIconRotation(sendButtonIconDirection),
                        display: "inline-block",
                      }}
                    >
                      <Send color={sendButtonIconColor} size={20} />
                    </div>
                  )}
                </button>
                {voiceInputEnabled && (
                  <button className="ml-2" style={sendButtonStyle}>
                    <Mic color={sendButtonIconColor} size={20} />
                  </button>
                )}
                {uploadsEnabled && (
                  <button className="ml-2" style={sendButtonStyle}>
                    <FileUp color={sendButtonIconColor} size={20} />
                  </button>
                )}
              </div>)}
              {sendButtonAlignment === "left" && (<div className="flex items-center">
                <button onClick={handleSendMessage} style={sendButtonStyle}>
                  {sendButtonIcon === "arrow" && (
                    <div
                      style={{
                        transform: getIconRotation(sendButtonIconDirection),
                        display: "inline-block",
                      }}
                    >
                      <MoveRight color={sendButtonIconColor} size={20} />
                    </div>
                  )}
                  {sendButtonIcon === "triangle" && (
                    <div
                      style={{
                        transform: getIconRotation(sendButtonIconDirection),
                        display: "inline-block",
                      }}
                    >
                      <Send color={sendButtonIconColor} size={20} />
                    </div>
                  )}
                  {sendButtonIcon === "custom" && (
                    <div
                      style={{
                        transform: getIconRotation(sendButtonIconDirection),
                        display: "inline-block",
                      }}
                    >
                      <Send color={sendButtonIconColor} size={20} />
                    </div>
                  )}
                </button>
                {voiceInputEnabled && (
                  <button className="mx-1" style={sendButtonStyle}>
                    <Mic color={sendButtonIconColor} size={20} />
                  </button>
                )}
                {uploadsEnabled && (
                  <button className="mx-1" style={sendButtonStyle}>
                    <FileUp color={sendButtonIconColor} size={20} />
                  </button>
                )}
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  style={inputStyle}
                  className="flex-1 mr-2"
                  placeholder={aiPrefillMessage}
                />
              </div>)}
              {userSelectsModelEnabled && (
                <div className="mt-4">
                  <select
                    id="chatModel"
                    name="chatModel"
                    className="mt-1 block w- rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  >
                    <option value="gpt-3">GPT-3</option>
                    <option value="gpt-4">GPT-4</option>
                    <option value="custom-model">DeepSeek</option>
                  </select>
                </div>
              )}

              {tagsPosition === "bottom" && (
                <div className="flex flex-wrap mt-4">
                  {prefixTags.map((tag, index) => (
                    <span key={index} style={tagStyle}>{tag}</span>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>


  )
}

