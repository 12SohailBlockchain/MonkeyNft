"use client";
import "./globals.css";
import Header from "./components/Header";
import AppProvider from "@/app/utils/assets/GlobalContext/AppProvider";
import Footer from "./components/Footer";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AppProvider>
          <Header />
          {children}
          <Footer />
        </AppProvider>
      </body>
    </html>
  );
}
