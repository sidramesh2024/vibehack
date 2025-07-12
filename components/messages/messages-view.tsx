
"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Send, Search, MoreHorizontal } from "lucide-react"
import { motion } from "framer-motion"

// Mock data - in real app, this would come from API
const mockConversations = [
  {
    id: "1",
    name: "Maya Rodriguez",
    avatar: "https://i.pinimg.com/736x/f3/94/d4/f394d4b9fc7ca65c5b61326d0a6ea950.jpg",
    lastMessage: "Thanks for considering my proposal! I'm excited to work on your mural project.",
    timestamp: "2 hours ago",
    unread: 2,
    project: "Coffee Shop Mural"
  },
  {
    id: "2", 
    name: "James Chen",
    avatar: "https://i.pinimg.com/originals/07/33/ba/0733ba760b29378474dea0fdbcb97107.png",
    lastMessage: "I've uploaded the initial logo concepts to the project folder.",
    timestamp: "1 day ago", 
    unread: 0,
    project: "Brand Identity Package"
  },
  {
    id: "3",
    name: "Brooklyn Roasters",
    avatar: "https://i.pinimg.com/originals/27/bf/50/27bf50cbf2458ca7c3bd82f2985a059c.jpg",
    lastMessage: "When can we schedule the site visit for the mural?",
    timestamp: "2 days ago",
    unread: 1,
    project: "Coffee Shop Mural"
  }
]

const mockMessages = [
  {
    id: "1",
    senderId: "maya",
    content: "Hi! I saw your coffee shop mural project and I'm really interested. I've done several food & beverage themed murals in Brooklyn.",
    timestamp: "10:30 AM",
    isMe: false
  },
  {
    id: "2", 
    senderId: "me",
    content: "That's great! I love your portfolio. Can you tell me more about your approach to community-focused murals?",
    timestamp: "11:15 AM",
    isMe: true
  },
  {
    id: "3",
    senderId: "maya", 
    content: "I always start by spending time in the neighborhood to understand the local culture and stories. For your coffee shop, I'd want to incorporate elements that represent both coffee culture and the Red Hook community.",
    timestamp: "11:45 AM",
    isMe: false
  },
  {
    id: "4",
    senderId: "maya",
    content: "Thanks for considering my proposal! I'm excited to work on your mural project.",
    timestamp: "2:30 PM",
    isMe: false
  }
]

export function MessagesView() {
  const [selectedConversation, setSelectedConversation] = useState(mockConversations[0])
  const [newMessage, setNewMessage] = useState("")
  const [searchTerm, setSearchTerm] = useState("")

  const filteredConversations = mockConversations.filter(conv =>
    conv.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    conv.project.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      // In real app, send message via API
      console.log("Sending message:", newMessage)
      setNewMessage("")
    }
  }

  return (
    <div className="container mx-auto max-w-7xl px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="space-y-6"
      >
        <h1 className="text-3xl font-bold">Messages</h1>

        <div className="grid lg:grid-cols-3 gap-6 h-[600px]">
          {/* Conversations List */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <div className="space-y-3">
                <CardTitle className="text-lg">Conversations</CardTitle>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search conversations..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="space-y-1">
                {filteredConversations.map((conversation) => (
                  <div
                    key={conversation.id}
                    onClick={() => setSelectedConversation(conversation)}
                    className={`p-4 cursor-pointer hover:bg-accent transition-colors ${
                      selectedConversation.id === conversation.id ? 'bg-accent' : ''
                    }`}
                  >
                    <div className="flex items-start space-x-3">
                      <Avatar className="w-10 h-10">
                        <AvatarImage src={conversation.avatar} alt={conversation.name} />
                        <AvatarFallback>
                          {conversation.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <p className="font-semibold text-sm truncate">
                            {conversation.name}
                          </p>
                          {conversation.unread > 0 && (
                            <Badge variant="destructive" className="ml-2 px-1.5 py-0.5 text-xs">
                              {conversation.unread}
                            </Badge>
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground mb-1">
                          {conversation.project}
                        </p>
                        <p className="text-sm text-muted-foreground truncate">
                          {conversation.lastMessage}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {conversation.timestamp}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Chat View */}
          <Card className="lg:col-span-2 flex flex-col">
            <CardHeader className="border-b">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Avatar className="w-10 h-10">
                    <AvatarImage src={selectedConversation.avatar} alt={selectedConversation.name} />
                    <AvatarFallback>
                      {selectedConversation.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold">{selectedConversation.name}</p>
                    <p className="text-sm text-muted-foreground">{selectedConversation.project}</p>
                  </div>
                </div>
                <Button variant="ghost" size="sm">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>

            {/* Messages */}
            <CardContent className="flex-1 p-4 overflow-y-auto">
              <div className="space-y-4">
                {mockMessages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.isMe ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[70%] rounded-lg p-3 ${
                        message.isMe
                          ? 'bg-red-500 text-white'
                          : 'bg-muted'
                      }`}
                    >
                      <p className="text-sm">{message.content}</p>
                      <p className={`text-xs mt-1 ${
                        message.isMe ? 'text-red-100' : 'text-muted-foreground'
                      }`}>
                        {message.timestamp}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>

            {/* Message Input */}
            <div className="border-t p-4">
              <div className="flex space-x-2">
                <Input
                  placeholder="Type your message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  className="flex-1"
                />
                <Button onClick={handleSendMessage} className="bg-red-500 hover:bg-red-600">
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </motion.div>
    </div>
  )
}
