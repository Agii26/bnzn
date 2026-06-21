import { useState } from 'react'
import { Heart, Share2, Bookmark, Code2, Github, ExternalLink } from 'lucide-react'
import { Avatar, Badge, Tooltip } from '@/components/ui'

/**
 * PostCard — shared feed/project card (Phase 3)
 *
 * Renders a single project as a social-media-style post.
 * Used by: Home (full feed), Profile (pinned + project grid).
 *
 * Props:
 *   post     — project object from data/projects.json
 *   index    — used for stagger-delay animation class
 *   pinned   — boolean: shows a "Pinned" indicator instead of "Featured"
 */
export default function PostCard({ post, index = 0, pinned = false }) {
  // Local like/bookmark interaction — persists per-session only.
  // Real persistence + server sync is Phase 5 (Innovation Layer / Zustand).
  const [liked, setLiked] = useState(false)
  const [bookmarked, setBookmarked] = useState(false)
  const [likeCount, setLikeCount] = useState(post.stats.likes)
  const [bookmarkCount, setBookmarkCount] = useState(post.stats.bookmarks)

  function toggleLike() {
    setLiked(v => !v)
    setLikeCount(c => (liked ? c - 1 : c + 1))
  }

  function toggleBookmark() {
    setBookmarked(v => !v)
    setBookmarkCount(c => (bookmarked ? c - 1 : c + 1))
  }

  const ACTION_BUTTONS = [
    {
      Icon: Heart,
      count: likeCount,
      label: liked ? 'Unlike' : 'Like',
      active: liked,
      activeColor: 'var(--red)',
      onClick: toggleLike,
      fill: liked,
    },
    {
      Icon: Share2,
      count: post.stats.shares,
      label: 'Share',
      active: false,
      activeColor: 'var(--text)',
      onClick: () => {},
      fill: false,
    },
    {
      Icon: Bookmark,
      count: bookmarkCount,
      label: bookmarked ? 'Remove bookmark' : 'Bookmark',
      active: bookmarked,
      activeColor: 'var(--amber)',
      onClick: toggleBookmark,
      fill: bookmarked,
    },
  ]

  return (
    <div
      className={`anim-fade-up delay-${Math.min(index + 2, 8)}`}
      style={{
        background: 'var(--card)',
        border: '1px solid var(--border)',
        borderRadius: 'var(--radius-xl)',
        overflow: 'hidden',
        transition:
          'border-color var(--transition-base), transform var(--transition-base), box-shadow var(--transition-base)',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = 'var(--border-bright)'
        e.currentTarget.style.transform = 'translateY(-2px)'
        e.currentTarget.style.boxShadow = 'var(--shadow-md)'
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = 'var(--border)'
        e.currentTarget.style.transform = 'translateY(0)'
        e.currentTarget.style.boxShadow = 'none'
      }}
    >
      {/* ── Screenshot header ── */}
      <div
        style={{
          height: 164,
          background: 'var(--surf)',
          position: 'relative',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage:
              'radial-gradient(circle, rgba(255,255,255,0.05) 1px, transparent 1px)',
            backgroundSize: '22px 22px',
          }}
        />

        <div
          style={{
            background: 'rgba(0,0,0,0.35)',
            backdropFilter: 'blur(12px)',
            border: '1px solid rgba(255,255,255,0.12)',
            borderRadius: 'var(--radius-full)',
            padding: '7px 18px',
            fontSize: 'var(--fs-xs)',
            fontWeight: 'var(--fw-semibold)',
            color: 'rgba(255,255,255,0.8)',
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--sp-2)',
            position: 'relative',
            zIndex: 1,
          }}
        >
          <Code2 size={12} aria-hidden="true" />
          Screenshot coming soon
        </div>

        {/* Top-right badges */}
        <div
          style={{
            position: 'absolute',
            top: 12,
            right: 12,
            display: 'flex',
            gap: 'var(--sp-2)',
            zIndex: 1,
          }}
        >
          {pinned ? (
            <div
              style={{
                background: 'var(--amber)',
                backdropFilter: 'blur(8px)',
                borderRadius: 'var(--radius-full)',
                padding: '3px 10px',
                fontSize: 'var(--fs-2xs)',
                fontWeight: 'var(--fw-black)',
                color: 'var(--text-inverse)',
                textTransform: 'uppercase',
                letterSpacing: '0.8px',
              }}
            >
              Pinned
            </div>
          ) : (
            post.featured && (
              <div
                style={{
                  background: 'rgba(28,34,43,0.85)',
                  backdropFilter: 'blur(8px)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: 'var(--radius-full)',
                  padding: '3px 10px',
                  fontSize: 'var(--fs-2xs)',
                  fontWeight: 'var(--fw-black)',
                  color: 'var(--text)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.8px',
                }}
              >
                Featured
              </div>
            )
          )}
          <div
            style={{
              background: 'rgba(0,0,0,0.5)',
              backdropFilter: 'blur(8px)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: 'var(--radius-full)',
              padding: '3px 10px',
              fontSize: 'var(--fs-2xs)',
              fontWeight: 'var(--fw-bold)',
              color: 'var(--text-sub)',
              textTransform: 'uppercase',
              letterSpacing: '0.8px',
            }}
          >
            {post.domain}
          </div>
        </div>

        {/* Top-left action buttons */}
        <div
          style={{
            position: 'absolute',
            top: 12,
            left: 12,
            display: 'flex',
            gap: 8,
            zIndex: 1,
          }}
        >
          {[
            { Icon: Github, label: 'GitHub', href: post.githubUrl },
            ...(post.liveUrl
              ? [{ Icon: ExternalLink, label: 'Live Demo', href: post.liveUrl }]
              : []),
          ].map(({ Icon, label, href }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${label} (opens in new tab)`}
              style={{
                width: 36,
                height: 36,
                borderRadius: '50%',
                background: 'rgba(0,0,0,0.5)',
                backdropFilter: 'blur(8px)',
                border: '1px solid rgba(255,255,255,0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'rgba(255,255,255,0.7)',
                transition: 'all var(--transition-fast)',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.2)'
                e.currentTarget.style.color = 'white'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = 'rgba(0,0,0,0.5)'
                e.currentTarget.style.color = 'rgba(255,255,255,0.7)'
              }}
            >
              <Icon size={14} aria-hidden="true" />
            </a>
          ))}
        </div>
      </div>

      {/* ── Post body ── */}
      <div style={{ padding: 'var(--sp-4)' }}>
        {/* Author row */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--sp-3)',
            marginBottom: 'var(--sp-3)',
          }}
        >
          <Avatar name="Benzon" size="sm" status="online" />
          <div>
            <div
              style={{
                fontSize: 'var(--fs-sm)',
                fontWeight: 'var(--fw-semibold)',
                color: 'var(--text)',
                display: 'flex',
                alignItems: 'center',
                gap: 6,
              }}
            >
              Benzon
              <span
                style={{
                  background: 'var(--surf)',
                  border: '1px solid var(--border-bright)',
                  color: 'var(--text-sub)',
                  fontSize: 'var(--fs-2xs)',
                  fontWeight: 'var(--fw-black)',
                  padding: '1px 5px',
                  borderRadius: 3,
                  fontFamily: 'var(--font-mono)',
                  letterSpacing: '0.5px',
                }}
              >
                DEV
              </span>
            </div>
            <div
              style={{
                fontSize: 'var(--fs-xs)',
                color: 'var(--text-muted)',
                marginTop: 2,
              }}
            >
              @benzon · {post.date}
            </div>
          </div>
        </div>

        {/* Title */}
        <div
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'var(--fs-xl)',
            fontWeight: 'var(--fw-bold)',
            color: 'var(--text)',
            letterSpacing: '-0.4px',
            marginBottom: 'var(--sp-2)',
          }}
        >
          {post.title}
        </div>

        {/* Description */}
        <p
          style={{
            fontSize: 'var(--fs-sm)',
            color: 'var(--text-sub)',
            lineHeight: 'var(--lh-normal)',
            marginBottom: 'var(--sp-4)',
          }}
        >
          {post.description}
        </p>

        {/* Tech tag pills */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 6,
            marginBottom: 'var(--sp-4)',
          }}
        >
          {post.tags.map(tag => (
            <Badge key={tag} variant="outline" color="gray" size="sm">
              {tag}
            </Badge>
          ))}
        </div>

        {/* Action bar */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            borderTop: '1px solid var(--border-muted)',
            paddingTop: 'var(--sp-3)',
          }}
        >
          {ACTION_BUTTONS.map(({ Icon, count, label, activeColor, onClick, active, fill }) => (
            <Tooltip key={label} content={label} position="top">
              <button
                type="button"
                onClick={onClick}
                aria-label={`${label}: ${count}`}
                aria-pressed={active}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 6,
                  flex: 1,
                  minHeight: 44,
                  color: active ? activeColor : 'var(--text-muted)',
                  fontSize: 'var(--fs-xs)',
                  fontWeight: 'var(--fw-medium)',
                  padding: 'var(--sp-3)',
                  borderRadius: 'var(--radius-sm)',
                  transition:
                    'color var(--transition-fast), background var(--transition-fast)',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.color = active ? activeColor : 'var(--text)'
                  e.currentTarget.style.background = 'var(--surf)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.color = active ? activeColor : 'var(--text-muted)'
                  e.currentTarget.style.background = 'transparent'
                }}
              >
                <Icon
                  size={14}
                  strokeWidth={1.8}
                  aria-hidden="true"
                  fill={fill ? activeColor : 'none'}
                />
                <span>{count}</span>
              </button>
            </Tooltip>
          ))}
        </div>
      </div>
    </div>
  )
}
