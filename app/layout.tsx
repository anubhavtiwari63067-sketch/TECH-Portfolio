import type { Metadata } from "next";
import { Inter, Outfit, Space_Grotesk } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-space" });

export const metadata: Metadata = {
  title: "Tech Trailer | Professional Portfolio",
  description: "A cinematic journey through full-stack architecture and interactive design.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className={`${inter.variable} ${outfit.variable} ${spaceGrotesk.variable} bg-black text-white font-sans overflow-x-hidden selection:bg-cyan-500/30 selection:text-cyan-400`}>
        {/* 
          Satisfy buggy Chrome extensions (e.g., Emily AI) that crash if they don't find these IDs.
          We inject them via a script so they exist in the DOM but don't interfere with React's hydration.
        */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                if (!document.getElementById('root')) {
                  var r = document.createElement('div'); r.id = 'root'; r.className = 'hidden'; r.setAttribute('aria-hidden', 'true');
                  document.body.appendChild(r);
                }
                if (!document.getElementById('__next')) {
                  var n = document.createElement('div'); n.id = '__next'; n.className = 'hidden'; n.setAttribute('aria-hidden', 'true');
                  document.body.appendChild(n);
                }
              })();
            `,
          }}
        />
        {children}
      </body>
    </html>
  );
}
