import { Instrument_Serif, Inter, Mrs_Saint_Delafield, Noto_Serif_Display } from 'next/font/google';
import './globals.css';

const serif = Instrument_Serif({ subsets: ['latin'], weight: '400', style: ['normal', 'italic'], variable: '--serif' });
const sans = Inter({ subsets: ['latin', 'vietnamese'], weight: ['400', '500'], variable: '--sans' });
// Instrument Serif has no Vietnamese glyphs; this condensed display serif stands in when lang="vi"
const serifVi = Noto_Serif_Display({ subsets: ['latin', 'vietnamese'], style: ['normal', 'italic'], axes: ['wdth'], variable: '--serif-vi', preload: false });
const script = Mrs_Saint_Delafield({ subsets: ['latin'], weight: '400', variable: '--script' });

export const metadata = {
  title: 'Nguyen Van Phu — Backend Developer',
  description: 'Backend developer at Magenest: Magento 2, headless WordPress and Go services.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${serif.variable} ${serifVi.variable} ${sans.variable} ${script.variable}`}>
      <body>{children}</body>
    </html>
  );
}
