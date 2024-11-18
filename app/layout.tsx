import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Watch Tower",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {" "}
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="theme-color" content="#000000"></meta>
        <meta
          name="apple-mobile-web-app-status-bar-style"
          content="black-translucent"
        />
        <link
          rel="apple-touch-icon"
          sizes="192x192"
          href="/apple-touch-icon-192x192.png"
        ></link>
        <link
          rel="apple-touch-icon"
          sizes="512x512"
          href="/apple-touch-icon-512x512.png"
        ></link>
        <link rel="manifest" href="/manifest.json"></link>
      </head>
      <body
        className={`${inter.className} bg-black`}
        color="black"
        style={{ backgroundColor: "black" }}
      >
        {children}
      </body>
    </html>
  );
}
