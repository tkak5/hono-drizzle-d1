import { Hono } from "hono";
import { cors } from "hono/cors";
import { Bindings } from "../bindings";
// import * as userModel from '../models/userModel'
// import * as sessionModel from '../models/sessionModel'

const api = new Hono<{ Bindings: Bindings }>();
api.use("/posts/*", cors());

api.get("/", (c) => {
	return c.json({ message: "Hello" });
});

export default api;
