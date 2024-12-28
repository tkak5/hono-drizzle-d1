import { Hono } from "hono";
import { Bindings } from "../bindings";
import * as userModel from "../models/userModel";
// import * as sessionModel from "../models/sessionModel";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";

const api = new Hono<{ Bindings: Bindings }>();

api.get("/", (c) => {
  return c.json({ message: "Hello" });
});

api.post(
  "/register",
  zValidator(
    "json",
    z.object({
      id: z.string(),
      name: z.string(),
      password: z.string(),
    }),
  ),
  async (c) => {
    const { id, name, password } = c.req.valid("json");
    const user = await userModel.create(c.env.DB, id, name, password);
    return c.json({ user: user, message: "User created" });
  },
);

api.post("/login", async (c) => { });

api.post("/logout", async (c) => { });

api.delete("/delete", async (c) => { });
export default api;
