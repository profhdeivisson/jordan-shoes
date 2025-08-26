import type { Metadata } from "next";
import { Archivo } from "next/font/google";
import "./globals.css";
import favicon from "@/assets/img/logo-jordan.svg";
import { CartProvider } from "@/contexts/CartContext";
import { AlertProvider } from "@/contexts/AlertContext";

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Jordan Shoes",
  description: "Projeto Jordan Shoes desenvolvido com Next.js e tailwind.css",
  icons: {
    icon: [
      {
        url: favicon.src,
        type: "image/svg+xml",
      }
    ]
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body className={`${archivo.variable}`}>
        <AlertProvider>
          <CartProvider>
            {children}
          </CartProvider>
        </AlertProvider>
      </body>
    </html>
  );
}