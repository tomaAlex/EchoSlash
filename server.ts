import fs from "fs";
import multer from "multer";
import express from "express";
import passport from "passport";
import session from "express-session";
import { SUMMARIES_DIRECTORY } from "@constants";
import summarizeAndEmailNews from "./src/summarizeAndEmailNews";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";

const app = express();
const port = process.env.PORT ?? 3000;
const domain = process.env.DOMAIN ?? "http://localhost";
const fullDomain =
  process.env.IS_PROD == "false" ? `${domain}:${port}` : domain;

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(multer().none()); // handle form-data for non-file fields
app.set("view engine", "ejs"); // server-side rendering
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user: Express.User, done) => done(null, user));
passport.deserializeUser((obj: Express.User, done) => done(null, obj));

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: `${fullDomain}/auth/google/callback`,
    },
    function (accessToken, refreshToken, profile, cb) {
      // For now, just pass the profile to the callback
      return cb(null, profile);
    }
  )
);

// Route to start OAuth flow
app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// OAuth callback route
app.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  (req, res) => {
    // Successful authentication, redirect home.
    res.redirect("/");
  }
);

app.get("/", (req, res) => {
  res.render("index", {
    user: req.isAuthenticated() ? req.user : null,
    nodemailerUser: process.env.NODEMAILER_USER,
  });
});

// Logout route
app.get("/logout", (req, res) => {
  req.logout((err) => {
    if (err) {
      console.error(err);
    }
  });
  res.redirect("/");
});

app.post("/submit", async (req, res) => {
  if (!req.isAuthenticated()) {
    res.send(
      `<h4 style="color: red;">You need to be authenticated to use this feature! 😡</h4>`
    );
    return;
  }

  const { topic } = req.body;
  const email = (req.user as { emails: { value: string }[] }).emails[0].value;

  if (fs.existsSync(`./${SUMMARIES_DIRECTORY}/${email}`)) {
    res.send(`<h4 style="color: red;">Do you like it this much? 🤓</h4>`);
    return;
  }

  summarizeAndEmailNews(topic, email);

  res.send(
    `<h4 style="color: green;">Your latest slash about ${topic} is being prepared and will ` +
      `be sent to ${email} shortly! Watchout for that echo 👓</h4>`
  );
});

app.listen(port, () => {
  console.log(`Server running at ${fullDomain}/`);
});
