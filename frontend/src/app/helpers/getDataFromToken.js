import { jwtVerify } from "jose";
import jwt from "jsonwebtoken";

export async function getDataFromToken(req) {
  try {
    const token = await req.cookies.get("token")?.value || null;
    const data = await jwt.verify(token, process.env.JWT_SECRET);
    console.log("/helpers/getDataFromToken: ", data);
    return data;
  } catch (error) {
    console.log("/helpers/getDataFromToken error: ",error.message);
    return null;
  }
}


export const getJwtSecretKey = () => {
    const secret = process.env.JWT_SECRET;
    if (!secret || secret.length === 0) {
        throw new Error("The environment variable JWT_SECRET is not set.");
    }
    return secret;
};

export async function verifyJwtToken(req) {
  try {
    const token = await req.cookies.get("token")?.value;
      const verified = await jwtVerify(
          token,
          new TextEncoder().encode(getJwtSecretKey())
      );
      return verified.payload;
  } catch (error) {
      throw new Error("Your token is expired");
  }
}