import { Bell } from 'lucide-react'
import PagePlaceholder from '@/components/ui/PagePlaceholder'

export default function Notifications() {
  return (
    <PagePlaceholder
      icon={Bell}
      title="Notifications"
      phase={4}
      description="Activity feed for portfolio interactions — project views, skill endorsements, and live build log updates."
      features={[
        'Project view and engagement notifications',
        'Skill endorsement alerts',
        'Build log milestone updates',
        'New message / contact request pings',
        'Mark all as read + filter by type',
        'Notification preferences settings',
      ]}
    />
  )
}
