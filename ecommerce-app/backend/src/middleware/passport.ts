import passport from "passport";

interface GitHubProfileMinimal {
  id: string;
  username?: string | null;
  displayName?: string | null;
  emails?: Array<{ value: string }> | null;
}

export const initPassport = (): void => {
  const clientID = process.env.GITHUB_CLIENT_ID;
  const clientSecret = process.env.GITHUB_CLIENT_SECRET;
  const callbackURL =
    process.env.GITHUB_CALLBACK_URL || "http://localhost:3000/api/auth/github/callback";

  if (!clientID || !clientSecret) {
    // Passport GitHub strategy is optional; only register when env is set
    return;
  }

  // Use lazy require to avoid build-time dependency if strategy is not installed
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const GitHubStrategy = require("passport-github2").Strategy as any;

  passport.use(
    new GitHubStrategy(
      {
        clientID,
        clientSecret,
        callbackURL,
        scope: ["user:email"],
      },
      (
        _accessToken: string,
        _refreshToken: string,
        profile: GitHubProfileMinimal,
        done: (error: unknown, user?: unknown) => void
      ) => {
        const primaryEmail = Array.isArray(profile.emails) && profile.emails.length > 0
          ? profile.emails[0].value
          : undefined;

        const user = {
          id: profile.id,
          username: profile.username || profile.displayName || primaryEmail || "github-user",
          email: primaryEmail,
          provider: "github" as const,
        };

        done(null, user);
      }
    )
  );
};

export default passport;


