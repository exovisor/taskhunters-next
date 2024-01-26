import "@/styles/globals.css";

import { Open_Sans } from "next/font/google";

import React from "react";
import { TRPCReactProvider } from "@/trpc/react";
import {ThemeProvider} from "@/components/theme-provider";

const openSans = Open_Sans({
  subsets: ["latin", "cyrillic"],
  variable: "--font-sans",
});

export const metadata = {
  title: "TaskHunters",
  description: "Агрегатор заданий для практикантов СПБ ГУП \"СПБ ИАЦ\"",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <body className={`${openSans.className}`}>
				<ThemeProvider
					attribute="class"
					defaultTheme="system"
					enableSystem
					disableTransitionOnChange
				>
					<TRPCReactProvider>{children}</TRPCReactProvider>
				</ThemeProvider>
      </body>
    </html>
  );
}
