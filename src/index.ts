import { Hono } from "hono";
import { prettyJSON } from "hono/pretty-json";
import authApi from "./apis/authApi";
import postApi from "./apis/postApi";
import { Bindings } from "./bindings";
import { cors } from "hono/cors";

const app = new Hono();
app.get("/", (c) => c.text("Pretty Blog API"));
app.notFound((c) => c.json({ message: "Not Found", ok: false }, 404));

const middleware = new Hono<{ Bindings: Bindings }>();
middleware.use("*", prettyJSON());
middleware.use("*", cors({ origin: "*" }));
// middleware.use('/posts/*', async (c, next) => {
//   if (c.req.method !== 'GET') {
//     const auth = basicAuth({ username: c.env.USERNAME, password: c.env.PASSWORD })
//     return auth(c, next)
//   } else {
//     await next()
//   }
// })

app.route("/api", middleware);
app.route("/api/auth", authApi);
app.route("/api/posts", postApi);

export default app;
