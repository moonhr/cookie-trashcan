// src/App.tsx
import React, { useState, useEffect } from "react";
import CookieItem from "./components/CookieItem";
import TrashBin from "./components/TrashBin";

interface Cookie {
  name: string;
  value: string;
  size: number;
  essential: boolean;
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

  const deleteCookie = (cookieName: string, isEssential: boolean) => {
    if (
      isEssential &&
      !window.confirm("이 쿠키는 필수입니다. 정말 삭제하시겠습니까?")
    ) {
      return;
    }
    const updatedCookies = cookies.filter(
      (cookie) => cookie.name !== cookieName
    );
    setCookies(updatedCookies);
  };

  // 테스트용 쿠키 추가 함수
  const addTestCookie = () => {
    const date = new Date();
    date.setTime(date.getTime() + 7 * 24 * 60 * 60 * 1000); // 7일 후 만료
    document.cookie = `testCookie${Date.now()}=value; expires=${date.toUTCString()}; path=/`;
    // 쿠키 목록 새로고침
    setCookies((prev) => [
      ...prev,
      {
        name: `testCookie${Date.now()}`,
        value: "value",
        size: 20,
        essential: false,
      },
    ]);
  };

  return (
    <div>
      <h1>쿠키 관리</h1>
      <p>
        쿠키 총 용량: {cookies.reduce((acc, cookie) => acc + cookie.size, 0)}KB
      </p>
      <button onClick={addTestCookie}>테스트 쿠키 추가</button>
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
