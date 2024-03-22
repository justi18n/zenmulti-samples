import type { Metadata } from "next";
import "../globals.css";

export const metadata: Metadata = {
  title: "ZenMulti nextjs example",
  description: "Multilingual in minutes, double your visits",
};

export default function RootLayout({
  params,
  children,
}: Readonly<{
  params: Readonly<{ lang: string }>;
  children: React.ReactNode;
}>) {
  return (
    <html lang={params.lang}>
      <body>{children}</body>
    </html>
  );
}
