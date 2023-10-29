import "./global.css";
import "./style/cursor.css";
import { Inter } from "next/font/google";
import Logo from "@/app/assets/imgs/logo.png";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Ceybarani | The one platform to improve your cybersecurity skills",
  description:
    "Ceybarani gives individuals, businesses and universities the tools they need to continuously improve their cybersecurity capabilities — all in one place.",
  favicon: Logo.src,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
