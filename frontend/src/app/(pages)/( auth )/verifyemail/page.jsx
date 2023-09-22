"use client";

import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function VerifyEmail() {
  let [token, setToken] = useState("");
  let [verified, setVerified] = useState(false);
  let [error, setError] = useState(false);

  // grap token from url
  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken || "");
  }, []);

  useEffect(() => {
    if (token.length > 0) {
      verifyUser();
    }
  }, [token]);

  async function verifyUser() {
    try {
      const { data } = await axios.post(`/api/auth/verifyemail`, { token });
      console.log(data);
      if (data.success) {
        setVerified(true);
      }
      if (data.err_message) {
        setError(data.err_message);
      }
    } catch (error) {
      setError(error.message);
      console.log(error.response.data);
    }
  }
  return (
    <>
      <div className="items-center">
        <h1 className="p-14 text-[48px] text-center">verify email</h1>

        {error && (
          <div>
            <h2 className="text-2xl text-red-600 text-center">
              {error}
              <br />
              <Link href="/" className="text-blue-500 text-center">
                Home
              </Link>
            </h2>
          </div>
        )}

        {verified && (
          <div>
            <h2 className="text-2xl text-center">
              Email verified ✅<br />
              <Link href="/login" className="text-blue-500 text-center">
                Login
              </Link>
            </h2>
          </div>
        )}
      </div>
    </>
  );
}
