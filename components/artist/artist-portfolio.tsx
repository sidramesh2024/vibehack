
"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { 
  Plus, 
  Upload, 
  Edit, 
  Trash2, 
  Eye, 
  Settings,
  Image as ImageIcon,
  Save
} from "lucide-react"
import { motion } from "framer-motion"
import Image from "next/image"

// Mock data - in real app, this would come from API
const mockPortfolio = {
  id: "1",
  title: "Featured Work",
  description: "A collection of my best projects showcasing my range and expertise in murals and community art.",
  isPublic: true,
  coverImage: "https://i.pinimg.com/originals/3d/33/a7/3d33a780155df0085488328b0948b832.jpg",
  items: [
    {
      id: "1",
      title: "Community Garden Mural",
      description: "Large-scale mural celebrating local urban farming and community growth.",
      imageUrl: "https://www.gastongazette.com/gcdn/-mm-/5ddc9e2403eb8b4639ebf474027464685f7bac4f/c=0-189-2016-1323/local/-/media/2020/11/21/Gastonia/ghows-NC-200819772-9b84dde6.jpg?width=1200&disable=upscale&format=pjpg&auto=webp",
      category: "Muralist",
      tags: ["Community Art", "Nature", "Urban Farming", "Brooklyn"],
      order: 0
    },
    {
      id: "2",
      title: "Restaurant Interior Mural", 
      description: "Custom mural design for local Italian restaurant featuring Brooklyn Bridge and pasta themes.",
      imageUrl: "https://restaurants.daveshotchicken.com/wp-content/uploads/2024/10/daves-hot-chicken-fulton-st-mural-brooklyn-bridge-brooklyn-ny.webp",
      category: "Muralist",
      tags: ["Interior Design", "Food & Beverage", "Custom Art", "Italian"],
      order: 1
    },
    {
      id: "3",
      title: "Music Festival Wall",
      description: "Dynamic mural created live during Brooklyn music festival, incorporating musical instruments and local landmarks.",
      imageUrl: "https://i.pinimg.com/originals/71/eb/73/71eb737876c32acade877bcde61497b2.jpg",
      category: "Muralist", 
      tags: ["Live Art", "Music", "Festival", "Performance"],
      order: 2
    }
  ]
}

export function ArtistPortfolio() {
  const [portfolio, setPortfolio] = useState(mockPortfolio)
  const [isEditing, setIsEditing] = useState(false)
  const [editingItem, setEditingItem] = useState<string | null>(null)

  return (
    <div className="container mx-auto max-w-7xl px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="space-y-8"
      >
        {/* Header */}
        <div className="flex justify-between items-start">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold">My Portfolio</h1>
            <p className="text-muted-foreground">
              Showcase your best work to attract clients
            </p>
          </div>
          <div className="flex space-x-2">
            <Button
              variant="outline"
              onClick={() => setIsEditing(!isEditing)}
            >
              {isEditing ? <Save className="mr-2 h-4 w-4" /> : <Edit className="mr-2 h-4 w-4" />}
              {isEditing ? 'Save Changes' : 'Edit Portfolio'}
            </Button>
            <Button className="bg-red-500 hover:bg-red-600">
              <Eye className="mr-2 h-4 w-4" />
              Preview Public View
            </Button>
          </div>
        </div>

        {/* Portfolio Settings */}
        {isEditing && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Settings className="h-5 w-5" />
                  <span>Portfolio Settings</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Portfolio Title</Label>
                    <Input
                      id="title"
                      value={portfolio.title}
                      onChange={(e) => setPortfolio(prev => ({ ...prev, title: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Visibility</Label>
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="public"
                        checked={portfolio.isPublic}
                        onChange={(e) => setPortfolio(prev => ({ ...prev, isPublic: e.target.checked }))}
                        className="rounded"
                      />
                      <Label htmlFor="public">Make portfolio public</Label>
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={portfolio.description}
                    onChange={(e) => setPortfolio(prev => ({ ...prev, description: e.target.value }))}
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Add New Item */}
        {isEditing && (
          <Card className="border-dashed border-2">
            <CardContent className="flex flex-col items-center justify-center py-12">
              <ImageIcon className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">Add Portfolio Item</h3>
              <p className="text-muted-foreground text-center mb-4">
                Upload your best work to showcase your skills and attract clients
              </p>
              <Button className="bg-red-500 hover:bg-red-600">
                <Plus className="mr-2 h-4 w-4" />
                Add New Work
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Portfolio Items Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {portfolio.items.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="group hover:shadow-lg transition-all duration-300 overflow-hidden">
                <div className="relative aspect-video">
                  <Image
                    src={item.imageUrl}
                    alt={item.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {isEditing && (
                    <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity space-x-1">
                      <Button
                        size="sm"
                        variant="secondary"
                        onClick={() => setEditingItem(item.id)}
                      >
                        <Edit className="h-3 w-3" />
                      </Button>
                      <Button size="sm" variant="destructive">
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  )}
                </div>
                
                <CardContent className="p-4 space-y-3">
                  {editingItem === item.id ? (
                    <div className="space-y-3">
                      <Input
                        value={item.title}
                        onChange={(e) => {
                          // Update item title logic
                        }}
                        placeholder="Item title"
                      />
                      <Textarea
                        value={item.description}
                        onChange={(e) => {
                          // Update item description logic  
                        }}
                        placeholder="Item description"
                        rows={2}
                      />
                      <div className="flex space-x-2">
                        <Button size="sm" onClick={() => setEditingItem(null)}>
                          Save
                        </Button>
                        <Button size="sm" variant="outline" onClick={() => setEditingItem(null)}>
                          Cancel
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div>
                        <h3 className="font-semibold text-lg group-hover:text-red-500 transition-colors">
                          {item.title}
                        </h3>
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {item.description}
                        </p>
                      </div>

                      <div className="flex flex-wrap gap-1">
                        {item.tags.slice(0, 3).map((tag) => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                        {item.tags.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{item.tags.length - 3}
                          </Badge>
                        )}
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Empty State */}
        {portfolio.items.length === 0 && (
          <Card className="border-dashed border-2">
            <CardContent className="flex flex-col items-center justify-center py-16">
              <ImageIcon className="h-16 w-16 text-muted-foreground mb-4" />
              <h3 className="text-xl font-semibold mb-2">Your portfolio is empty</h3>
              <p className="text-muted-foreground text-center mb-6">
                Start by adding your best work to showcase your skills and attract clients
              </p>
              <Button className="bg-red-500 hover:bg-red-600">
                <Plus className="mr-2 h-4 w-4" />
                Add Your First Work
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Portfolio Stats */}
        <div className="grid md:grid-cols-3 gap-6">
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-red-500">{portfolio.items.length}</div>
              <div className="text-sm text-muted-foreground">Portfolio Items</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-blue-500">1,234</div>
              <div className="text-sm text-muted-foreground">Total Views</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-green-500">23</div>
              <div className="text-sm text-muted-foreground">Client Inquiries</div>
            </CardContent>
          </Card>
        </div>
      </motion.div>
    </div>
  )
}
