"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { TriangleAlert } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

type ConfirmBeneficiaryNumberFormProps = {
  beneficiaryName: string
  originalPhone: string
}

export function ConfirmBeneficiaryNumberForm({
  beneficiaryName,
  originalPhone,
}: ConfirmBeneficiaryNumberFormProps) {
  const router = useRouter()
  const [phone, setPhone] = React.useState(originalPhone)
  const isChanged = phone.trim() !== originalPhone

  function handleSubmit() {
    if (isChanged) {
      toast.success("Chanjman anrejistre", {
        description: `Nouvo nimewo ${beneficiaryName} a ap aktif nan 48è.`,
      })
    } else {
      toast.success("Nimewo konfime", {
        description: `${beneficiaryName} ka resevwa pot la kounye a.`,
      })
    }
    router.push("/dashboard")
  }

  return (
    <div className="flex flex-col gap-(--spacing-stack)">
      <div>
        <label className="block text-micro font-bold uppercase tracking-[0.06em] text-ink-soft">
          Nimewo MonCash benefisyè a
        </label>
        <Input
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="mt-1.5 h-[52px] rounded-(--radius-input) border-line bg-card px-4 text-body"
        />
      </div>

      {isChanged && (
        <div className="flex items-start gap-2.5 rounded-(--radius-card) border border-wait bg-wait-bg p-(--spacing-stack)">
          <TriangleAlert
            className="mt-0.5 size-5 shrink-0 text-wait"
            aria-hidden="true"
          />
          <p className="text-body text-ink">
            Ou chanje nimewo a.{" "}
            <span className="font-extrabold">
              Yon delè 48è ap aplike anvan vèsman an ka fèt
            </span>{" "}
            — se konsa nou pwoteje benefisyè a kont erè.
          </p>
        </div>
      )}

      <Button
        type="button"
        onClick={handleSubmit}
        className="h-[52px] w-full rounded-(--radius-btn) font-body text-body font-semibold"
      >
        {isChanged ? "Konfime chanjman an (48è)" : "Konfime nimewo a"}
      </Button>
    </div>
  )
}
