"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { TriangleAlert } from "lucide-react"

import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { mockKreyeGwoup } from "@/lib/mock/kreyeGwoup"

export function KreyeGwoupForm() {
  const router = useRouter()
  const {
    defaultName,
    defaultKotizasyon,
    memberCountOptions,
    dayOptions,
    invitedMembers,
    remainingToInvite,
  } = mockKreyeGwoup

  const [name, setName] = React.useState(defaultName)
  const [kotizasyon, setKotizasyon] = React.useState(defaultKotizasyon)
  const [memberCount, setMemberCount] = React.useState(memberCountOptions[0])
  const [day, setDay] = React.useState(dayOptions[0])
  const [members, setMembers] = React.useState(invitedMembers)
  const [newMember, setNewMember] = React.useState("")

  function handleAddMember() {
    const trimmed = newMember.trim()
    if (!trimmed) return
    setMembers((prev) => [...prev, trimmed])
    setNewMember("")
  }

  function handleSendInvitations() {
    toast.success("Envitasyon yo voye", {
      description: `${members.length} manm envite pou ${name}.`,
    })
    router.push("/dashboard")
  }

  return (
    <div className="flex flex-col gap-(--spacing-stack)">
      <div>
        <label className="block text-micro font-bold uppercase tracking-[0.06em] text-ink-soft">
          Non sòl la
        </label>
        <Input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mt-1.5 h-[52px] rounded-(--radius-input) border-line bg-card px-4 text-body"
        />
      </div>

      <div>
        <label className="block text-micro font-bold uppercase tracking-[0.06em] text-ink-soft">
          Kotizasyon chak manm
        </label>
        <Input
          value={kotizasyon}
          onChange={(e) => setKotizasyon(e.target.value)}
          className="mt-1.5 h-[52px] rounded-(--radius-input) border-line bg-card px-4 text-body"
        />
      </div>

      <div className="flex gap-(--spacing-stack)">
        <div className="flex-1">
          <label className="block text-micro font-bold uppercase tracking-[0.06em] text-ink-soft">
            Kantite manm
          </label>
          <Select
            value={memberCount}
            onValueChange={(value) => value && setMemberCount(value)}
          >
            <SelectTrigger className="mt-1.5 h-[52px] w-full rounded-(--radius-input) border-line bg-card px-4 text-body">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {memberCountOptions.map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex-1">
          <label className="block text-micro font-bold uppercase tracking-[0.06em] text-ink-soft">
            Jou kotizasyon
          </label>
          <Select value={day} onValueChange={(value) => value && setDay(value)}>
            <SelectTrigger className="mt-1.5 h-[52px] w-full rounded-(--radius-input) border-line bg-card px-4 text-body">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {dayOptions.map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex items-start gap-2.5 rounded-(--radius-card) border border-wait bg-wait-bg p-(--spacing-stack)">
        <TriangleAlert
          className="mt-0.5 size-5 shrink-0 text-wait"
          aria-hidden="true"
        />
        <p className="text-body text-ink">
          Lòd pozisyon yo ap fikse lè sòl la kòmanse.{" "}
          <span className="font-extrabold">
            Apre sa, pèsonn pa ka chanje l
          </span>{" "}
          — se sa k fè tout moun fè sòl la konfyans.
        </p>
      </div>

      <div>
        <label className="block text-micro font-bold uppercase tracking-[0.06em] text-ink-soft">
          Envite manm yo
        </label>
        <div className="mt-1.5 flex gap-2">
          <Input
            value={newMember}
            onChange={(e) => setNewMember(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault()
                handleAddMember()
              }
            }}
            placeholder="Nimewo oswa non"
            className="h-[52px] flex-1 rounded-(--radius-input) border-line bg-card px-4 text-body"
          />
          <button
            type="button"
            onClick={handleAddMember}
            aria-label="Ajoute manm"
            className="flex h-[52px] w-[52px] items-center justify-center rounded-(--radius-input) bg-primary text-body font-bold text-primary-foreground"
          >
            +
          </button>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {members.map((member) => (
          <span
            key={member}
            className="rounded-(--radius-chip) bg-primary-bg px-3 py-1.5 text-micro font-semibold text-primary"
          >
            {member} ✓
          </span>
        ))}
        {remainingToInvite > 0 && (
          <span className="rounded-(--radius-chip) bg-line px-3 py-1.5 text-micro font-semibold text-ink-soft">
            + {remainingToInvite} pou envite
          </span>
        )}
      </div>

      <button
        type="button"
        onClick={handleSendInvitations}
        className="flex h-[52px] w-full items-center justify-center rounded-(--radius-btn) bg-primary font-body text-body font-semibold text-primary-foreground active:bg-primary-deep"
      >
        Voye envitasyon yo
      </button>
    </div>
  )
}
