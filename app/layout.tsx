import type {Metadata} from 'next';
import { Plus_Jakarta_Sans, Montserrat } from 'next/font/google';
import './globals.css';

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans',
});

const montserrat = Montserrat({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-display',
});

export const metadata: Metadata = {
  title: "AURELIUS & CO. | Men's Footwear",
  description: "Minimal, luxury men's footwear atelier offering handcrafted calfskin sneakers, Goodyear-welted oxfords, Italian suede loafers, and Chelsea boots.",
  openGraph: {
    title: "AURELIUS & CO. | Men's Footwear",
    description: "Minimal, luxury men's footwear atelier offering handcrafted calfskin sneakers, Goodyear-welted oxfords, Italian suede loafers, and Chelsea boots.",
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "AURELIUS & CO. | Men's Footwear",
    description: "Minimal, luxury men's footwear atelier offering handcrafted calfskin sneakers, Goodyear-welted oxfords, Italian suede loafers, and Chelsea boots.",
  },
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" className={`${jakarta.variable} ${montserrat.variable}`}>
      <body className="bg-[#FAF9F6] text-[#191919] font-sans antialiased selection:bg-neutral-900 selection:text-white" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}

