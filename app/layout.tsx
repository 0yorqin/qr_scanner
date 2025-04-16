import type { Metadata } from "next";
import "./globals.css";
import localFont from "next/font/local";

export const proximaNova = localFont({
  src: "../public/fonts/ProximaNovaRegular.ttf",
  variable: "--font-proxima-nova",
  display: "swap",
});

export const proximaNovaBold = localFont({
  src: "../public/fonts/ProximaNovaBold.otf",
  variable: "--font-proxima-nova-bold",
  display: "swap",
});

export const aquino = localFont({
  src: "../public/fonts/Aquino-Demo.ttf",
  variable: "--font-aquino",
});

export const metadata: Metadata = {
  title: "Mix Burger",
  description: "Вы Достойны Самого Вкусного!",
  icons: "/mix_logo.png",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${proximaNova.variable} ${proximaNovaBold.variable} ${aquino.variable}`}
      >
        {children}
      </body>
    </html>
  );
}
