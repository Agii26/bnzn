import { GitCommit } from 'lucide-react'

/**
 * ActivityChart — Phase 5
 *
 * Zero-centered, diverging bar chart of real net lines changed per commit
 * (insertions − deletions, package-lock.json excluded from the count so an
 * auto-generated lockfile doesn't masquerade as authored work).
 *
 * Deliberately one neutral color for every bar, regardless of sign — net
 * lines removed isn't "bad" (the Slate & Amber redesign commit is negative
 * *because* it deleted a redundant color system, which was the right call).
 * Direction is shown by which side of center the bar falls on, not by color.
 *
 * This is a static snapshot, not a live git integration — there's no
 * backend to run `git log` from the browser. Numbers are real as of the
 * commit noted in the footer; regenerate the data file after future
 * commits to keep it current.
 */

function formatDate(iso) {
  return new Date(`${iso}T00:00:00`).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}

// Sign-preserving log scale so the +3293 initial commit doesn't reduce
// every other bar (including the -78 redesign) to an invisible sliver.
function scaledMagnitude(net) {
  return Math.sign(net) * Math.log10(1 + Math.abs(net))
}

export default function ActivityChart({ commits }) {
  const scaled = commits.map(c => ({ ...c, scaled: scaledMagnitude(c.net) }))
  const maxAbs = Math.max(...scaled.map(c => Math.abs(c.scaled)))
  const newestFirst = [...scaled].sort((a, b) => new Date(b.date) - new Date(a.date))

  return (
    <div
      style={{
        background: 'var(--card)',
        border: '1px solid var(--border)',
        borderRadius: 'var(--radius-xl)',
        padding: 'var(--sp-6)',
      }}
    >
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--sp-2)', marginBottom: 'var(--sp-1)' }}>
        <GitCommit size={16} strokeWidth={2} aria-hidden="true" style={{ color: 'var(--amber)' }} />
        <span style={{ fontSize: 'var(--fs-sm)', fontWeight: 'var(--fw-semibold)', color: 'var(--text)' }}>
          Build activity
        </span>
      </div>
      <p style={{ fontSize: 'var(--fs-xs)', color: 'var(--text-muted)', margin: '0 0 var(--sp-5)' }}>
        Net lines changed per commit, real git history · lockfile excluded · log-scaled bars, not linear
      </p>

      {/* Rows */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sp-3)' }}>
        {newestFirst.map(c => {
          const widthPct = maxAbs === 0 ? 0 : (Math.abs(c.scaled) / maxAbs) * 50 // 50% = half the diverging track
          const isNegative = c.net < 0

          return (
            <div key={c.hash} style={{ display: 'flex', alignItems: 'center', gap: 'var(--sp-3)' }}>
              {/* Label + date */}
              <div style={{ width: 168, flexShrink: 0 }}>
                <div style={{
                  fontSize: 'var(--fs-xs)',
                  color: 'var(--text)',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}>
                  {c.label}
                </div>
                <div style={{ fontSize: 'var(--fs-2xs)', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                  {formatDate(c.date)} · {c.hash}
                </div>
              </div>

              {/* Diverging track */}
              <div
                style={{ flex: 1, position: 'relative', height: 20 }}
                role="img"
                aria-label={`${c.label}: ${c.net > 0 ? '+' : ''}${c.net} net lines`}
              >
                {/* Center line */}
                <div style={{
                  position: 'absolute', left: '50%', top: 0, bottom: 0,
                  width: 1, background: 'var(--border-bright)',
                }} />
                {/* Bar */}
                <div style={{
                  position: 'absolute',
                  top: 2, bottom: 2,
                  left: isNegative ? `calc(50% - ${widthPct}%)` : '50%',
                  width: `${widthPct}%`,
                  background: 'var(--amber)',
                  opacity: 0.85,
                  borderRadius: 'var(--radius-sm)',
                }} />
              </div>

              {/* Net value */}
              <div style={{
                width: 56, flexShrink: 0, textAlign: 'right',
                fontSize: 'var(--fs-2xs)', fontFamily: 'var(--font-mono)',
                color: isNegative ? 'var(--text-muted)' : 'var(--text-sub)',
              }}>
                {c.net > 0 ? '+' : ''}{c.net}
              </div>
            </div>
          )
        })}
      </div>

      <p style={{ fontSize: 'var(--fs-2xs)', color: 'var(--text-muted)', marginTop: 'var(--sp-5)', marginBottom: 0 }}>
        Snapshot as of commit a930298 · regenerated manually, not live
      </p>
    </div>
  )
}
