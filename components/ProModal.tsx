'use client'

import { useProModal } from "@/hooks/useProModal"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "./ui/dialog"
import { Badge } from "./ui/badge"
import { Check, Code, ImageIcon, MessageSquare, Music, VideoIcon, Zap } from "lucide-react"
import { Card } from "./ui/card"
import { cn } from "@/lib/utils"
import { Button } from "./ui/button"
import axios from "axios"
import { useState } from "react"
import { toast } from "react-hot-toast"


const tools = [
    {
      label: "Conversation",
      icon: MessageSquare,
      color: "text-sky-500",
      bgColor: "bg-sky-500/10",
    },
    {
      label: "Music Generation",
      icon: Music,
      color: "text-emerald-500",
      bgColor: "bg-emerald-500/10",

    },
    {
      label: "Image Generation",
      icon: ImageIcon,
      color: "text-pink-700",
      bgColor: "bg-pink-500/10",

    },
    {
      label: "Video Generation",
      icon: VideoIcon,
      color: "text-orange-700",
      bgColor: "bg-orange-500/10",
    },
    {
      label: "Code Generation",
      icon: Code,
      color: "text-purple-700",
      bgColor: "bg-purple-500/10",
    },
  ]


export const ProModal = () => {
    const proModal = useProModal();;
    const [isLoading, setIsLoading] = useState(false);


    const onSubscribe = async () => {
      try {
        setIsLoading(true)
        const response = axios.get("/api/stripe");
        window.location.href = (await response).data.url;
      } catch (error) {
        toast.error("Something went wrong")
      } finally {
        setIsLoading(false)
      }
    }

    return (
        <Dialog open={proModal.isOPen} onOpenChange={proModal.onClose}>
          <DialogContent>
            <DialogHeader>
                <DialogTitle className="flex justify-center items-center flex-col gap-y-4 pb-2">
                    <div className="flex items-center gap-x-2 font-bold py-1">
                        Upgrade To Genius
                        <Badge variant="special" className="uppercase text-sm py-1">
                            Pro
                        </Badge>
                    </div>
                </DialogTitle>
                <DialogDescription className="text-center pt-2 space-y-2 text-zinc-900 font-medium">
                    {tools.map((tool) => (
                        <Card key={tool.label}
                        className="p-3 border-black/5 flex items-center justify-between"
                        >
                          <div className="flex items-center gap-x-4">
                            <div className={cn("p-2 w-fit rounded-md", tool.bgColor)}>
                              <tool.icon className={cn("w-6 h-6", tool.color)} />
                            </div>
                            <div className="font-semibold text-sm">
                                {tool.label}
                            </div>
                          </div>
                          <Check className="text-primary w-5 h-5" />
                        </Card>
                    ))}
                </DialogDescription>
            </DialogHeader>
            <DialogFooter>
                <Button disabled={isLoading} onClick={onSubscribe} variant="special" className="w-full">
                    Upgrade
                    <Zap className="w-4 h-4 ml-2 fill-white" />
                </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
    )
}