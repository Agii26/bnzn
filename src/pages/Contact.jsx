import { MessageSquare } from 'lucide-react'
import PagePlaceholder from '@/components/ui/PagePlaceholder'

export default function Contact() {
  return (
    <PagePlaceholder
      icon={MessageSquare}
      title="Contact"
      phase={4}
      description="Reach out for collaborations, freelance work, or just to say hi — styled like a DM compose window."
      features={[
        'DM-style contact form with subject tagging',
        'Availability status: Open to work / Busy / Available for collab',
        'Social links: GitHub, LinkedIn, Twitter',
        'Project inquiry quick-select templates',
        'Auto-reply confirmation on send',
        'Response time indicator',
      ]}
    />
  )
}
