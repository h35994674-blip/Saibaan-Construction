import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { FloatingWhatsApp } from '@/components/ui/FloatingWhatsApp';
import { getSiteSettings } from '@/lib/db/queries/settings';
import { siteConfig } from '@/config/site';

export default async function PublicLayout({ children }: { children: React.ReactNode }) {
  const settings = await getSiteSettings();
  const phone = settings?.phone || siteConfig.phone;

  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
      <FloatingWhatsApp phone={phone} />
    </>
  );
}
