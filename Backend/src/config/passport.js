import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import dotenv from "dotenv";

dotenv.config();

passport.use(
  new GoogleStrategy(
    {
      clientID: "15413901468-21n056rnt87sv6kqltn39c4kcot6cc7n.apps.googleusercontent.com",
      clientSecret: "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",
      callbackURL: "http://localhost:5000/auth/google/callback",
    },
    async (req, accessToken, refreshToken, profile, done) => {
      if (!req.session) {
        return done(null, false);
      }
      return done(null, profile);
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});



