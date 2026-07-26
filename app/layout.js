import { ClerkProvider } from '@clerk/nextjs';
import { ThemeProvider } from 'next-themes';
import { Toaster } from 'sonner';
import Header from '@/components/Header';
import { lora, dmSans } from '@/lib/fonts';

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body className={`${lora.variable} ${dmSans.variable} font-sans`}>
        <ClerkProvider appearance={{ theme: dark }}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Header />
            <main className="min-h-screen">{children}</main>
            <Toaster richColors />
            <footer className="relative z-10 border-t border-white/7 py-12 mx-auto px-6 flex flex-wrap items-center justify-center text-stone-400">
              Made with ❤️ by Soumalya Ray
            </footer>
          </ThemeProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}