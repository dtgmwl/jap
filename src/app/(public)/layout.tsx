import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import { getCompanyInfo } from '@/lib/dataReader';

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  const company = getCompanyInfo();

  return (
    <>
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
      <WhatsAppButton phone={company.phone} name={company.name} />
    </>
  );
}
