"use client"
import axios from "axios";
import { useEffect, useState } from "react";

export default function Profile() {
  //get user details from token
  let [userData, setUserData] = useState()
  useEffect(()=> {
    userDetails()
  },[])
  async function userDetails() {
    try {
      const { data } = await axios.get("/api/tokenData");
      setUserData(data);
    } catch (error) {
      throw new Error(error.message);
    }
  }
  return (
    <>
      <p>
        {userData ? 
                <h1>{userData.data.first_name}</h1>
             : (
              <>
              please login
              </>
            )
            }
      </p>
    </>
  );
}
