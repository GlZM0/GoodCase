// @ts-ignore
import passport from 'passport';
import SteamStrategy from 'passport-steam';

// Configure the Steam authentication strategy
passport.use(
	// @ts-ignore
	new SteamStrategy(
		{
			returnURL: 'http://localhost:3000/auth/steam/callback',
			realm: 'http://localhost:3000/',
			apiKey: 'your steam api key'
		},
		// @ts-ignore
		function (identifier, profile, done) {
			// Here you can implement your own logic to check if the user is authorized or not.
			// You can also store the user data in the session.
			return done(null, profile);
		}
	)
);

// Serialize user data to the session
// @ts-ignore
passport.serializeUser(function (user, done) {
	done(null, user);
});

// Deserialize user data from the session
// @ts-ignore
passport.deserializeUser(function (user, done) {
	done(null, user);
});

// @ts-ignore
export async function steamAuth(request) {
	return new Promise((resolve, reject) => {
		// Call passport.authenticate() to initiate Steam authentication
		// @ts-ignore
		passport.authenticate('steam', { session: false }, function (err, user, info) {
			if (err) return reject(err);
			if (!user) return reject(new Error('Steam authentication failed'));

			// Store the authenticated user data in the session
			request.locals.user = user;
			// @ts-ignore
			return resolve();
		})(request.raw, request.raw.res);
	});
}
