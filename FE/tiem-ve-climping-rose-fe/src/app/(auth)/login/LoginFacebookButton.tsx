"use client";

import { useEffect } from "react";

// ✅ Khai báo mở rộng interface Window đúng cách
declare global {
  interface Window {
    fbAsyncInit?: () => void;
    FB: any;
  }
}

export default function FacebookLoginButton() {
  useEffect(() => {
    window.fbAsyncInit = function () {
      window.FB.init({
        appId: process.env.NEXT_PUBLIC_FACEBOOK_APP_ID,
        cookie: true,
        xfbml: true,
        version: "v18.0",
        status: true,
      });
    };

    const script = document.createElement("script");
    script.src = "https://connect.facebook.net/en_US/sdk.js";
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);
  }, []);

  const handleLogin = () => {
    window.FB.login(
      function (response: any) {
        if (response.authResponse) {
          const accessToken = response.authResponse.accessToken;
          console.log("✅ Access Token:", accessToken);
        } else {
          console.warn("⛔ Người dùng từ chối hoặc đóng popup.");
        }
      },
      {
        scope: "public_profile,email",
        display: "popup",
      }
    );
  };

  return (
    <button
      onClick={handleLogin}
      className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
    >
      Đăng nhập Facebook
    </button>
  );
}
