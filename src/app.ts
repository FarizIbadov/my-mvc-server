import path from "path";
import express from "express";
import mongoose from "mongoose";
import session from "express-session";
import connectMongoDBSession from "connect-mongodb-session";
import csrf from "csurf";

import appRouter from "./routes";
import { getError, get404Page } from "./controllers/error";
import postStorage from "./middleware/postStorage";
import { resLocals } from "./middleware/resLocals";
import avatarStorage from "./middleware/avatarStorage";

const PORT = process.env.PORT || 5000;
const MONGODB_URI = "mongodb://localhost:27017/my-mvc";

const MongoDbStore = connectMongoDBSession(session);

const app = express();
app.disable("x-powered-by");
const store = new MongoDbStore({
  uri: MONGODB_URI,
  collection: "session",
});
const csrfProtection = csrf();

app.post("/posts/add-post", postStorage.single("image"));
app.post("/posts/edit-post", postStorage.single("image"));
app.post("/account", avatarStorage.single("avatar"));

app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.resolve("public")));
app.use("/images", express.static(path.resolve("images")));
app.set("view engine", "ejs");
app.set("views", path.resolve("views"));

app.use(
  session({
    secret: "my-secret",
    resave: false,
    saveUninitialized: false,
    store: store,
    cookie: {
      httpOnly: true,
      maxAge: 3600 * 1000 * 24 * 7,
    },
  })
);
app.use(csrfProtection);
app.use(resLocals);

app.use(appRouter);
app.use(get404Page);
app.use(getError);

mongoose
  .connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("DB Connected!");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch(() => {
    console.log("Error with DB connection");
  });
