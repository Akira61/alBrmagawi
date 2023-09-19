import jwt from "jsonwebtoken";

export async function getDataFromToken(req) {
  try {
    const token = req.cookies.get("token")?.value || "";
    const data = await jwt.verify(token, process.env.JWT_SECRET);
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
}
