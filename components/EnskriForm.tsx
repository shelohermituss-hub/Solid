"use client"

import * as React from "react"
import { useRouter, useSearchParams } from "next/navigation"

import { Input } from "@/components/ui/input"

const OTP_LENGTH = 4
const MOCK_PHONE = "+509 37 12 45 88"

/**
 * Valide le code SMS. Mock uniquement — l'inscription réelle (envoi/
 * vérification OTP côté MonCash ou opérateur) reste à brancher plus tard,
 * hors périmètre de cette tâche (données mock, pas de Supabase).
 *
 * Aucun vrai SMS n'est envoyé en phase mock : n'importe quel code à 4
 * chiffres est accepté, pour ne pas bloquer l'utilisateur sur un code
 * qu'il ne peut pas deviner. L'état d'erreur reste testable via
 * /enskri?mock=error.
 */
function simulateOtpCheck(forceError: boolean): Promise<"success" | "error"> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(forceError ? "error" : "success")
    }, 600)
  })
}

export function EnskriForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const forceError = searchParams.get("mock") === "error"

  const [phone, setPhone] = React.useState(MOCK_PHONE)
  const [digits, setDigits] = React.useState<string[]>(Array(OTP_LENGTH).fill(""))
  const [status, setStatus] = React.useState<"idle" | "checking" | "error">(
    "idle"
  )
  const inputsRef = React.useRef<Array<HTMLInputElement | null>>([])

  const code = digits.join("")
  const canSubmit = code.length === OTP_LENGTH && status !== "checking"

  function handleDigitChange(index: number, value: string) {
    const digit = value.replace(/\D/g, "").slice(-1)
    const next = [...digits]
    next[index] = digit
    setDigits(next)
    if (digit && index < OTP_LENGTH - 1) {
      inputsRef.current[index + 1]?.focus()
    }
  }

  function handleDigitKeyDown(
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) {
    if (e.key === "Backspace" && !digits[index] && index > 0) {
      inputsRef.current[index - 1]?.focus()
    }
  }

  async function handleSubmit() {
    setStatus("checking")
    const outcome = await simulateOtpCheck(forceError)
    if (outcome === "success") {
      router.push("/idantite")
      return
    }
    setStatus("error")
  }

  return (
    <div className="mt-3.5">
      {status === "error" && (
        <div className="mb-(--spacing-stack) rounded-(--radius-input) bg-late-bg px-4 py-3">
          <p className="text-body font-semibold text-late">
            Kòd SMS la pa bon
          </p>
          <p className="mt-0.5 text-micro text-late">
            Tcheke kòd la nan mesaj SMS ou, epi eseye ankò.
          </p>
        </div>
      )}

      <label className="block text-micro font-bold uppercase tracking-[0.06em] text-ink-soft">
        Nimewo telefòn
      </label>
      <Input
        type="tel"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        className="mt-1.5 h-[52px] rounded-(--radius-input) border-line bg-card px-4 text-body"
      />

      <label className="mt-6 block text-micro font-bold uppercase tracking-[0.06em] text-ink-soft">
        Kòd SMS la
      </label>
      <div className="mt-1.5 flex justify-center gap-2.5">
        {digits.map((digit, index) => (
          <input
            key={index}
            ref={(el) => {
              inputsRef.current[index] = el
            }}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={digit}
            onChange={(e) => handleDigitChange(index, e.target.value)}
            onKeyDown={(e) => handleDigitKeyDown(index, e)}
            aria-label={`Chif ${index + 1} nan kòd la`}
            className="h-[60px] w-[52px] rounded-(--radius-input) border border-line text-center font-display text-h1 font-extrabold text-ink"
          />
        ))}
      </div>

      <button
        type="button"
        onClick={handleSubmit}
        disabled={!canSubmit}
        className="mt-6 flex h-[52px] w-full items-center justify-center rounded-(--radius-btn) bg-primary font-body text-body font-semibold text-primary-foreground shadow-cta disabled:opacity-40 active:bg-primary-deep"
      >
        {status === "checking" ? "N ap verifye…" : "Kontinye"}
      </button>
      <p className="mt-3.5 text-center text-micro text-ink-soft">
        Nou pap janm pataje nimewo ou.
      </p>
    </div>
  )
}
