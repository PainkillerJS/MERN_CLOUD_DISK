import jwt from "jsonwebtoken";
import type { Secret } from "jsonwebtoken";

export function genetateJWT(id: number) {
  const payload = {
    id
  };

  return jwt.sign(payload, process.env.SECRET_JWT as Secret, { expiresIn: "1h" });
}
