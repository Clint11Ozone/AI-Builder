"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { useEditor } from "../context/EditorContext"
import {
  Layout,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  Palette,
  X,
  RectangleHorizontal,
  Triangle,
  ArrowRight,
  FileUp,
  Circle,
  Square,
  AlignLeft,
  AlignRight,
  MessageCircle,
  MessageSquare,
  RectangleVerticalIcon as Rectangle,
} from "lucide-react"

export default function StyleSettings() {
  const {
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
    setUserBackgroundEnabled,
    UserBackgroundEnabled,
  } = useEditor()

  return (
    <Tabs defaultValue="chat-layout">
      <TabsList>
        <TabsTrigger value="chat-layout">Chat Layout</TabsTrigger>
        <TabsTrigger value="send-button">Send Button</TabsTrigger>
        <TabsTrigger value="background">Background</TabsTrigger>
      </TabsList>
      <TabsContent value="chat-layout">
        <div className="space-y-4">
          {/* fix later */}
          {/* <div>
            <Label htmlFor="chat-type">Chat Type</Label>
            <Select value={chatType} onValueChange={(value: "floating" | "sticky" | "full") => setChatType(value)}>
              <SelectTrigger id="chat-type">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="floating">
                  <Layout className="w-4 h-4 mr-2" />
                  Floating
                </SelectItem>
                <SelectItem value="sticky">
                  <Layout className="w-4 h-4 mr-2" />
                  Sticky
                </SelectItem>
                <SelectItem value="full">
                  <Layout className="w-4 h-4 mr-2" />
                  Full
                </SelectItem>
              </SelectContent>
            </Select>
          </div> */}

          <div>
            <Label htmlFor="alignment">Alignment</Label>
            <Select value={alignment} onValueChange={(value: "left" | "right" | "center") => setAlignment(value)}>
              <SelectTrigger id="alignment">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="left">
                  <AlignLeft className="w-4 h-4 mr-2" />
                  Left
                </SelectItem>
                <SelectItem value="right">
                  <AlignRight className="w-4 h-4 mr-2" />
                  Right
                </SelectItem>
                <SelectItem value="center">
                  <ArrowUpDown className="w-4 h-4 mr-2" />
                  Centered
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="position">Position</Label>
            <Select value={position} onValueChange={(value: "top" | "bottom") => setPosition(value)}>
              <SelectTrigger id="position">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="top">
                  <ArrowUp className="w-4 h-4 mr-2" />
                  On-Top
                </SelectItem>
                <SelectItem value="bottom">
                  <ArrowDown className="w-4 h-4 mr-2" />
                  On-Bottom
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </TabsContent>

      <TabsContent value="send-button">
        <div className="space-y-4">
          <div>
            <Label htmlFor="send-button-color">Send Button Color</Label>
            <div className="flex items-center space-x-2">
              <Input
                id="send-button-color"
                type="color"
                value={sendButtonColor}
                onChange={(e) => setSendButtonColor(e.target.value)}
              />
              <Palette className="w-4 h-4" />
            </div>
          </div>
          <div>
            <Label htmlFor="send-button-icon">Send Button Icon</Label>
            <Select
              value={sendButtonIcon}
              onValueChange={(value: "triangle" | "arrow" | "custom") => setSendButtonIcon(value)}
            >
              <SelectTrigger id="send-button-icon">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="triangle">
                  <Triangle className="w-4 h-4 mr-2" />
                  Triangle
                </SelectItem>
                <SelectItem value="arrow">
                  <ArrowRight className="w-4 h-4 mr-2" />
                  Arrow
                </SelectItem>

              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="send-button-icon-direction">Icon Direction</Label>
            <Select
              value={sendButtonIconDirection}
              onValueChange={(value: "up" | "right" | "down" | "left") => setSendButtonIconDirection(value)}
            >
              <SelectTrigger id="send-button-icon-direction">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="up">
                  <ArrowUp className="w-4 h-4 mr-2" />
                  Up
                </SelectItem>
                <SelectItem value="right">
                  <ArrowRight className="w-4 h-4 mr-2" />
                  Right
                </SelectItem>
                <SelectItem value="down">
                  <ArrowDown className="w-4 h-4 mr-2" />
                  Down
                </SelectItem>
                <SelectItem value="left">
                  <ArrowRight className="w-4 h-4 mr-2 transform rotate-180" />
                  Left
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="send-button-icon-color">Icon Color</Label>
            <div className="flex items-center space-x-2">
              <Input
                id="send-button-icon-color"
                type="color"
                value={sendButtonIconColor}
                onChange={(e) => setSendButtonIconColor(e.target.value)}
              />
              <Palette className="w-4 h-4" />
            </div>
          </div>
          <div>
            <Label htmlFor="send-button-shape">Shape</Label>
            <Select
              value={sendButtonShape}
              onValueChange={(value: "rounded" | "square" | "circle" | "triangle") => setSendButtonShape(value)}
            >
              <SelectTrigger id="send-button-shape">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="rounded">
                  <Circle className="w-4 h-4 mr-2" />
                  Rounded
                </SelectItem>
                <SelectItem value="square">
                  <Square className="w-4 h-4 mr-2" />
                  Square
                </SelectItem>
                <SelectItem value="circle">
                  <Circle className="w-4 h-4 mr-2" />
                  Circle
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="send-button-alignment">Alignment</Label>
            <Select
              value={sendButtonAlignment}
              onValueChange={(value: "left" | "right") => setSendButtonAlignment(value)}
            >
              <SelectTrigger id="send-button-alignment">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="left">
                  <AlignLeft className="w-4 h-4 mr-2" />
                  Left
                </SelectItem>
                <SelectItem value="right">
                  <AlignRight className="w-4 h-4 mr-2" />
                  Right
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </TabsContent>

      <TabsContent value="background">
        <div className="space-y-4">
          <div>
            <Label htmlFor="background-type">Chat Box Shape</Label>
            <Select
              value={backgroundType}
              onValueChange={(value: "bubbles" | "squares" | "rectangles" | "none") => setBackgroundType(value)}
            >
              <SelectTrigger id="background-type">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="bubbles">
                  <Circle className="w-4 h-4 mr-2" />
                  Circle
                </SelectItem>
                <SelectItem value="rectangles">
                  <RectangleHorizontal className="w-4 h-4 mr-2" />
                  Rectangular
                </SelectItem>
                <SelectItem value="squares">
                  <Square className="w-4 h-4 mr-2" />
                  Rounded
                </SelectItem>
                <SelectItem value="none">
                  <X className="w-4 h-4 mr-2" />
                  none
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center space-x-2">
            <Switch id="border-enabled" checked={borderEnabled} onCheckedChange={setBorderEnabled} />
            <Label htmlFor="border-enabled">Enable Border</Label>
          </div>
          {borderEnabled && (
            <>
              <div>
                <Label htmlFor="border-type">Border Type</Label>
                <Select
                  value={borderType}
                  onValueChange={(value: "rounded" | "square" | "circle") => setBorderType(value)}
                >
                  <SelectTrigger id="border-type">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="rounded">
                      <Circle className="w-4 h-4 mr-2" />
                      Rounded
                    </SelectItem>
                    <SelectItem value="square">
                      <Square className="w-4 h-4 mr-2" />
                      Square
                    </SelectItem>
                   
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="border-color">Border Color</Label>
                <div className="flex items-center space-x-2">
                  <Input
                    id="border-color"
                    type="color"
                    value={borderColor}
                    onChange={(e) => setBorderColor(e.target.value)}
                  />
                  <Palette className="w-4 h-4" />
                </div>
              </div>
            </>
          )}
          <div className="flex items-center space-x-2">
        <Switch
          id="border-enabled"
          checked={UserBackgroundEnabled}
          onCheckedChange={(checked) => {
            setUserBackgroundEnabled(checked);
            if (!checked) setChatBackgroundColor("transparent"); // Reset to transparent when disabled
          }}
        />
        <Label htmlFor="border-enabled">Enable Background</Label>
      </div>

      {UserBackgroundEnabled && (
        <div>
          <Label htmlFor="chat-background-color">Chat Background Color</Label>
          <div className="flex items-center space-x-2">
            <Input
              id="chat-background-color"
              type="color"
              value={chatBackgroundColor}
              onChange={(e) => setChatBackgroundColor(e.target.value)}
            />
            <Palette className="w-4 h-4" />
          </div>
        </div>
      )}

          <div>
            <Label htmlFor="user-input-background-color">User Input Background Color</Label>
            <div className="flex items-center space-x-2">
              <Input
                id="user-input-background-color"
                type="color"
                value={userInputBackgroundColor}
                onChange={(e) => setUserInputBackgroundColor(e.target.value)}
              />
              <Palette className="w-4 h-4" />
            </div>
          </div>
          <div>
            <Label htmlFor="user-input-text-color">User Input Text Color</Label>
            <div className="flex items-center space-x-2">
              <Input
                id="user-input-text-color"
                type="color"
                value={userInputTextColor}
                onChange={(e) => setUserInputTextColor(e.target.value)}
              />
              <Palette className="w-4 h-4" />
            </div>
          </div>
          <div>
            <Label htmlFor="system-response-background-color">System Response Background Color</Label>
            <div className="flex items-center space-x-2">
              <Input
                id="system-response-background-color"
                type="color"
                value={systemResponseBackgroundColor}
                onChange={(e) => setSystemResponseBackgroundColor(e.target.value)}
              />
              <Palette className="w-4 h-4" />
            </div>
          </div>
          <div>
            <Label htmlFor="system-response-text-color">System Response Text Color</Label>
            <div className="flex items-center space-x-2">
              <Input
                id="system-response-text-color"
                type="color"
                value={systemResponseTextColor}
                onChange={(e) => setSystemResponseTextColor(e.target.value)}
              />
              <Palette className="w-4 h-4" />
            </div>
          </div>
        </div>
      </TabsContent>
    </Tabs>
  )
}

