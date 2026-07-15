import { cn } from "@/lib/utils"
import { formatHTG } from "@/lib/format"

export type WonnMemberStatus = "paid" | "wait" | "late"

export type WonnMember = {
  position: number
  status: WonnMemberStatus
  isBeneficiary?: boolean
}

type WonnProps = {
  potAmount: number
  monthLabel: string
  beneficiaryName: string
  beneficiaryPosition: number
  members: WonnMember[]
  size?: number
  className?: string
}

const RING_RADIUS = 100
const DISK_RADIUS = 13
const DISK_ORBIT = RING_RADIUS - DISK_RADIUS
const CENTER_RADIUS = 66

/**
 * Le wonn — composant signature de Sòlid (DESIGN.md §5).
 * Cercle de 10 positions, départ 12h, sens horaire. Ne jamais remplacer par
 * une liste ou un donut chart générique.
 */
export function Wonn({
  potAmount,
  monthLabel,
  beneficiaryName,
  beneficiaryPosition,
  members,
  size = 200,
  className,
}: WonnProps) {
  return (
    <svg
      viewBox="0 0 200 200"
      width={size}
      height={size}
      role="img"
      aria-label={`Wonn sòl la, pot ${formatHTG(potAmount)} HTG pou ${beneficiaryName}, pozisyon ${beneficiaryPosition}`}
      className={cn("mx-auto overflow-visible", className)}
    >
      {members.map((member) => {
        const angle =
          ((member.position - 1) / members.length) * 2 * Math.PI -
          Math.PI / 2
        const cx = 100 + DISK_ORBIT * Math.cos(angle)
        const cy = 100 + DISK_ORBIT * Math.sin(angle)

        return (
          <g key={member.position}>
            {member.isBeneficiary && (
              <circle
                cx={cx}
                cy={cy}
                r={DISK_RADIUS + 4}
                className="fill-soley/35"
              />
            )}
            <circle
              cx={cx}
              cy={cy}
              r={DISK_RADIUS}
              strokeWidth={2.5}
              className={cn(
                "stroke-paper",
                member.isBeneficiary
                  ? "fill-soley"
                  : member.status === "paid"
                    ? "fill-paid"
                    : member.status === "wait"
                      ? "fill-wait"
                      : "fill-late"
              )}
            />
            <text
              x={cx}
              y={cy}
              textAnchor="middle"
              dominantBaseline="central"
              className={cn(
                "select-none font-body text-[10px] font-extrabold",
                member.isBeneficiary ? "fill-soley-ink" : "fill-paper"
              )}
            >
              {member.position}
            </text>
          </g>
        )
      })}

      <circle
        cx={100}
        cy={100}
        r={CENTER_RADIUS}
        strokeWidth={1.5}
        className="fill-card stroke-line"
      />

      <foreignObject x={100 - 58} y={100 - 58} width={116} height={116}>
        <div className="flex h-full w-full flex-col items-center justify-center gap-0.5 px-2 text-center">
          <p className="text-micro font-bold uppercase tracking-[0.08em] text-ink-soft">
            {monthLabel}
          </p>
          <p className="font-display text-h1 font-extrabold tracking-[-0.02em] text-ink">
            {formatHTG(potAmount)}
          </p>
          <p className="text-micro font-semibold text-soley">
            → {beneficiaryName} (poz. {beneficiaryPosition})
          </p>
        </div>
      </foreignObject>
    </svg>
  )
}
