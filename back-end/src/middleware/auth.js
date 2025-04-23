import jwt from "jsonwebtoken";

const bypassRoutes = [{ url: "/users/login", method: "POST" }];

export default (req, res, next) => {
  for (let route of bypassRoutes) {
    if (route.url === req.url && route.method === req.method) {
      next();
      return;
    }
  }

  let token;

  const authHeader = req.headers["authorization"];

  if (!authHeader) {
    console.error("No authorization header");
    return res.status(403).end();
  }

  console.log({ authHeader });

  token = authHeader.split(" ")[1];

  jwt.verify(token, process.env.TOKEN_SECRET, (error, user) => {
    if (error) {
      console.error("Invalid token");
      return res.status(403).end();
    }
    req.authUser = user;
    next();
  });
};
