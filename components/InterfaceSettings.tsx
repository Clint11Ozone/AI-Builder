"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { useEditor } from "../context/EditorContext"
import { ArrowDown, ArrowUp, Circle, Square, Palette, Sparkles, Squircle } from "lucide-react"
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd"

export default function InterfaceSettings() {
  const {
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
  } = useEditor()

  const onDragEnd = (result: any) => {
    if (!result.destination) {
      return
    }

    const items = Array.from(prefixTags)
    const [reorderedItem] = items.splice(result.source.index, 1)
    items.splice(result.destination.index, 0, reorderedItem)

    setPrefixTags(items)
  }

  return (
    <Tabs defaultValue="tags">
      <TabsList>
        <TabsTrigger value="tags">Tags</TabsTrigger>
        {/* <TabsTrigger value="magic-typing">Magic Typing Suggestions</TabsTrigger> */}
      </TabsList>
      <TabsContent value="tags">
        <div className="space-y-4">
          <div>
            <Label htmlFor="tags-position">Position</Label>
            <Select value={tagsPosition} onValueChange={(value: "top" | "bottom") => setTagsPosition(value)}>
              <SelectTrigger id="tags-position">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="top">
                  <ArrowUp className="w-4 h-4 mr-2" />
                  On Top
                </SelectItem>
                <SelectItem value="bottom">
                  <ArrowDown className="w-4 h-4 mr-2" />
                  On Bottom
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="tags-type">Type</Label>
            <Select value={tagsType} onValueChange={(value: "rounded" | "square" | "circle") => setTagsType(value)}>
              <SelectTrigger id="tags-type">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="rounded">
                  <Squircle className="w-4 h-4 mr-2" />
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
            <Label htmlFor="tags-background-color">Background Color</Label>
            <div className="flex items-center space-x-2">
              <Input
                id="tags-background-color"
                type="color"
                value={tagsBackgroundColor}
                onChange={(e) => setTagsBackgroundColor(e.target.value)}
              />
              <Palette className="w-4 h-4" />
            </div>
          </div>
          <div>
            <Label htmlFor="tags-text-color">Text Color</Label>
            <div className="flex items-center space-x-2">
              <Input
                id="tags-text-color"
                type="color"
                value={tagsTextColor}
                onChange={(e) => setTagsTextColor(e.target.value)}
              />
              <Palette className="w-4 h-4" />
            </div>
          </div>
          <div>
              <Label>Prefix Tags</Label>
              <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="prefix-tags">
                  {(provided:any) => (
                    <ul {...provided.droppableProps} ref={provided.innerRef}>
                      {prefixTags.map((tag, index) => (
                        <Draggable key={tag} draggableId={tag} index={index}>
                          {(provided:any) => (
                            <li
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className="flex items-center space-x-2 mb-2"
                            >
                              <Input
                                value={tag}
                                onChange={(e) => {
                                  const newTags = [...prefixTags]
                                  newTags[index] = e.target.value
                                  setPrefixTags(newTags)
                                }}
                              />
                              <button
                                onClick={() => {
                                  const newTags = prefixTags.filter((_, i) => i !== index)
                                  setPrefixTags(newTags)
                                }}
                                className="text-red-500"
                              >
                                Remove
                              </button>
                            </li>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </ul>
                  )}
                </Droppable>
              </DragDropContext>
              <button
                onClick={() => setPrefixTags([...prefixTags, "New Tag"])}
                className="mt-2 bg-blue-500 text-white px-4 py-2 rounded"
              >
                Add Tag
              </button>
            </div>
        </div>
      </TabsContent>
      {/* <TabsContent value="magic-typing">
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Switch
              id="magic-typing-enabled"
              checked={magicTypingSuggestionsEnabled}
              onCheckedChange={setMagicTypingSuggestionsEnabled}
            />
            <Label htmlFor="magic-typing-enabled">Enable Magic Typing Suggestions</Label>
            <Sparkles className="w-4 h-4" />
          </div>
          {magicTypingSuggestionsEnabled && (
            <div>
              <Label>Prefix Tags</Label>
              <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="prefix-tags">
                  {(provided) => (
                    <ul {...provided.droppableProps} ref={provided.innerRef}>
                      {prefixTags.map((tag, index) => (
                        <Draggable key={tag} draggableId={tag} index={index}>
                          {(provided) => (
                            <li
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className="flex items-center space-x-2 mb-2"
                            >
                              <Input
                                value={tag}
                                onChange={(e) => {
                                  const newTags = [...prefixTags]
                                  newTags[index] = e.target.value
                                  setPrefixTags(newTags)
                                }}
                              />
                              <button
                                onClick={() => {
                                  const newTags = prefixTags.filter((_, i) => i !== index)
                                  setPrefixTags(newTags)
                                }}
                                className="text-red-500"
                              >
                                Remove
                              </button>
                            </li>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </ul>
                  )}
                </Droppable>
              </DragDropContext>
              <button
                onClick={() => setPrefixTags([...prefixTags, "New Tag"])}
                className="mt-2 bg-blue-500 text-white px-4 py-2 rounded"
              >
                Add Tag
              </button>
            </div>
          )}
        </div>
      </TabsContent> */}
    </Tabs>
  )
}

