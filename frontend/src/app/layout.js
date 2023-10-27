import "./global.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Albrmagawi | The one platform to improve your cybersecurity skills",
  description:
    "Ceybarani gives individuals, businesses and universities the tools they need to continuously improve their cybersecurity capabilities — all in one place.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
