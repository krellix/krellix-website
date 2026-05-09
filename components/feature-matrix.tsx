import { featureMatrix } from "@/lib/site-config";
import { cn } from "@/lib/utils";

/**
 * Personal vs Enterprise feature comparison. The differentiation is
 * "you're collecting yourself" vs "you're collecting from someone
 * else," not artificial feature-gating.
 */
export function FeatureMatrix({ className }: { className?: string }) {
  return (
    <div className={cn("overflow-x-auto", className)}>
      <div className="min-w-[640px] border-y-2 border-double border-[var(--color-border-strong)]">
        <table className="w-full border-separate border-spacing-0 text-left">
          <thead>
            <tr>
              <th scope="col" className="w-[48%] py-5 pr-4 text-left">
                <span className="eyebrow">Feature</span>
              </th>
              <th scope="col" className="w-[26%] py-5 text-left">
                <span className="font-display text-[1.5rem] leading-none tracking-[-0.014em] text-[color:var(--color-ink)]">
                  Personal
                </span>
              </th>
              <th scope="col" className="w-[26%] py-5 text-left">
                <span className="font-display text-[1.5rem] leading-none tracking-[-0.014em] text-[color:var(--color-ink)]">
                  Enterprise
                </span>
              </th>
            </tr>
          </thead>
          <tbody>
            {featureMatrix.map((group) => (
              <GroupRows key={group.group} group={group} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function GroupRows({
  group,
}: {
  group: (typeof featureMatrix)[number];
}) {
  return (
    <>
      <tr>
        <td colSpan={3} className="border-t border-[var(--color-border-strong)] pb-2 pt-7">
          <p className="font-mono text-[length:var(--text-mono-sm)] uppercase tracking-[0.2em] text-[color:var(--color-ink-subtle)]">
            §&nbsp;&nbsp;{group.group}
          </p>
        </td>
      </tr>
      {group.rows.map((row) => (
        <tr key={row.label}>
          <td className="border-t border-[var(--color-border)] py-3.5 pr-4 text-[length:var(--text-body)] text-[color:var(--color-ink)]">
            {row.label}
          </td>
          <td className="border-t border-[var(--color-border)] py-3.5">
            <Cell included={row.personal} />
          </td>
          <td className="border-t border-[var(--color-border)] py-3.5">
            <Cell included={row.enterprise} />
          </td>
        </tr>
      ))}
    </>
  );
}

function Cell({ included }: { included: boolean }) {
  return included ? (
    <span className="inline-flex items-center gap-2 text-[length:var(--text-body-sm)] text-[color:var(--color-ink)]">
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
        <path
          d="M2 7.5l3.5 3.5L12 3.5"
          stroke="var(--color-accent)"
          strokeWidth="1.6"
          strokeLinecap="square"
          strokeLinejoin="miter"
        />
      </svg>
      <span className="sr-only">Included</span>
      <span aria-hidden="true">Included</span>
    </span>
  ) : (
    <span className="inline-flex items-center gap-2 text-[length:var(--text-body-sm)] text-[color:var(--color-ink-subtle)]">
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
        <path d="M2 7h10" stroke="currentColor" strokeWidth="1.4" strokeLinecap="square" />
      </svg>
      <span className="sr-only">Not included</span>
      <span aria-hidden="true">—</span>
    </span>
  );
}
