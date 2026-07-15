"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { Camera } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { MemberAvatar } from "@/components/MemberAvatar"

type EditProfileFormProps = {
  initialName: string
  initials: string
}

export function EditProfileForm({ initialName, initials }: EditProfileFormProps) {
  const router = useRouter()
  const [name, setName] = React.useState(initialName)
  const [photoChosen, setPhotoChosen] = React.useState(false)
  const fileInputRef = React.useRef<HTMLInputElement | null>(null)

  function handlePhotoClick() {
    fileInputRef.current?.click()
  }

  function handlePhotoChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files?.[0]) {
      setPhotoChosen(true)
      toast.success("Foto chwazi", {
        description: "Foto a ap parèt apre ou anrejistre chanjman yo.",
      })
    }
  }

  function handleSubmit() {
    toast.success("Pwofil anrejistre", {
      description: "Chanjman ou yo sove.",
    })
    router.push("/paramet")
  }

  return (
    <div className="flex flex-col gap-(--spacing-stack)">
      <div className="flex flex-col items-center gap-3">
        <MemberAvatar
          name={initialName}
          initials={initials}
          className="size-20"
          fallbackClassName="text-h1"
        />
        <Button
          type="button"
          variant="ghost"
          onClick={handlePhotoClick}
          className="h-9 gap-1.5 rounded-(--radius-chip) px-3 text-body font-semibold text-primary"
        >
          <Camera className="size-4" aria-hidden="true" />
          {photoChosen ? "Foto chwazi ✓" : "Chanje foto"}
        </Button>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handlePhotoChange}
        />
      </div>

      <div>
        <label className="block text-micro font-bold uppercase tracking-[0.06em] text-ink-soft">
          Non ou
        </label>
        <Input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mt-1.5 h-[52px] rounded-(--radius-input) border-line bg-card px-4 text-body"
        />
      </div>

      <Button
        type="button"
        onClick={handleSubmit}
        className="h-[52px] w-full rounded-(--radius-btn) font-body text-body font-semibold"
      >
        Anrejistre chanjman yo
      </Button>
    </div>
  )
}
