// src/App.tsx
import React, { useState, useEffect } from "react";
import CookieItem from "./components/CookieItem";
import TrashBin from "./components/TrashBin";

interface Cookie {
  name: string;
  value: string;
  size: number;
}

const App: React.FC = () => {
  const [cookies, setCookies] = useState<Cookie[]>([]);

  useEffect(() => {
    // 브라우저 쿠키를 파싱하는 함수
    const parseBrowserCookies = () => {
      const cookieString = document.cookie;
      const cookieList = cookieString.split(";").map((cookie) => {
        const [name, value] = cookie.trim().split("=");
        return {
          name,
          value,
          // 쿠키 크기 계산 (name + value의 바이트 길이)
          size: new Blob([`${name}=${value}`]).size,
          // 필수 쿠키 여부는 이름으로 판단 (예시)
          essential: name.toLowerCase().includes("essential"),
        };
      });
      setCookies(cookieList);
    };

    parseBrowserCookies();
  }, []);

  const deleteCookie = (cookieName: string) => {
    // 실제 브라우저 쿠키 삭제
    document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;

    // UI 상태 업데이트
    const updatedCookies = cookies.filter(
      (cookie) => cookie.name !== cookieName
    );
    setCookies(updatedCookies);
  };

  return (
    <div>
      <p>
        Total Size: {cookies.reduce((acc, cookie) => acc + cookie.size, 0)}KB
      </p>
      <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
        {cookies.map((cookie) => (
          <CookieItem key={cookie.name} cookie={cookie} />
        ))}
      </div>
      <TrashBin onDrop={deleteCookie} />
    </div>
  );
};

export default App;
