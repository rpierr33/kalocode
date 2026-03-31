import { Hero } from '@/components/home/hero'
import { About } from '@/components/home/about'
import { EventsStrip } from '@/components/home/events-strip'
import { VideoShowcase } from '@/components/home/video-showcase'
import { MenuPreview } from '@/components/home/menu-preview'
import { OrderSection } from '@/components/home/order-section'
import { Testimonials } from '@/components/home/testimonials'
import { ContactSection } from '@/components/home/contact-section'

export default function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <div className="gold-rule" />
      <EventsStrip />
      <div className="gold-rule" />
      <VideoShowcase />
      <div className="gold-rule" />
      <MenuPreview />
      <OrderSection />
      <div className="gold-rule" />
      <Testimonials />
      <div className="gold-rule" />
      <ContactSection />
    </>
  )
}
