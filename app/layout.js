import { LanguageProvider } from "../components/LanguageProvider";
import "./globals.css";

export const metadata = {
  title: "정우성 | Security Backend Portfolio",
  description: "백엔드와 보안 프로젝트를 성좌 맵으로 탐색하는 포트폴리오"
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body>
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
