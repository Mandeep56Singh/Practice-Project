2. Login Flow
Endpoint: /api/auth/login

Steps:
Verify email and password.

Generate an accessToken (15 minutes) and a refreshToken (e.g., 7 days).

Store the refreshToken in the RefreshToken table with valid: true and an expiresAt date.

Set both tokens as HTTP-only cookies.

Outcome: Client receives tokens, and the refresh token is tracked in the DB.

3. Token Refresh Flow
Trigger: deserializeUser detects an expired accessToken and uses the refreshToken.

Steps:
Extract refreshToken from cookies.

Verify it (JWT signature) and check its validity in the RefreshToken table (valid: true).

If valid:
Invalidate the old refreshToken (valid: false).

Generate a new accessToken and a new refreshToken.

Store the new refreshToken in the DB.

Set both new tokens as cookies.

If invalid or reused (already valid: false):
Flag as potential reuse, invalidate all refresh tokens for the user, and reject the request.

Outcome: Client gets updated tokens, and the old refresh token is unusable.

4. Protected Routes
Remains largely unchanged:
deserializeUser handles token verification and reissuance.

requireAuth ensures res.locals.user is set.

5. Logout Flow
Endpoint: /api/auth/logout

Steps:
Extract refreshToken from cookies.

Invalidate it in the DB (valid: false).

Clear both cookies.

Outcome: User is logged out, and the refresh token is no longer usable.

