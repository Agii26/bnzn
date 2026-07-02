/**
 * SkillBar — shared component (Phase 4)
 *
 * Proficiency bar for a single skill. Originally local to Profile.jsx;
 * extracted so Explore's Tech Stack Breakdown can reuse the exact same
 * visual instead of re-implementing it.
 *
 * Props:
 *   name  — skill label
 *   level — 0–100 proficiency percentage
 */
export default function SkillBar({ name, level }) {
  return (
    <div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginBottom: 6,
        }}
      >
        <span style={{ fontSize: 'var(--fs-sm)', color: 'var(--text)', fontWeight: 'var(--fw-medium)' }}>
          {name}
        </span>
        <span style={{ fontSize: 'var(--fs-xs)', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
          {level}%
        </span>
      </div>
      <div
        style={{
          height: 6,
          borderRadius: 'var(--radius-full)',
          background: 'var(--surf)',
          border: '1px solid var(--border)',
          overflow: 'hidden',
        }}
      >
        <div
          className="anim-fade-left"
          style={{
            height: '100%',
            width: `${level}%`,
            background: 'var(--amber)',
            borderRadius: 'var(--radius-full)',
          }}
        />
      </div>
    </div>
  )
}
