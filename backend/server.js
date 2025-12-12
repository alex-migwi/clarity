const express = require('express');
const session = require('express-session');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const GitHubStrategy = require('passport-github').Strategy;
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config(); // Load environment variables from .env file

const app = express();
const PORT = process.env.PORT || 3000;
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:4321';

// CORS setup
app.use(cors({
    origin: FRONTEND_URL, // Allow requests from Astro frontend
    credentials: true // Allow cookies to be sent
}));

// Session setup
app.use(session({
    secret: process.env.SESSION_SECRET || 'supersecretkey', // Use a strong secret from .env
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
        maxAge: 24 * 60 * 60 * 1000 // 24 hours
    }
}));

// Passport.js initialization
app.use(passport.initialize());
app.use(passport.session());

// Serialize and deserialize user
passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});

// Google OAuth Strategy
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: '/auth/google/callback'
},
(accessToken, refreshToken, profile, done) => {
    // In a real application, you would find or create a user in your database here
    // For now, we'll just pass the profile
    return done(null, profile);
}));

// GitHub OAuth Strategy
passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: '/auth/github/callback'
},
(accessToken, refreshToken, profile, done) => {
    // In a real application, you would find or create a user in your database here
    // For now, we'll just pass the profile
    return done(null, profile);
}));

// Authentication Routes
// Store redirect URL before authentication
app.get('/auth/set-redirect', (req, res) => {
    const redirectUrl = req.query.redirect;
    if (redirectUrl) {
        req.session.redirectAfterLogin = `${FRONTEND_URL}${redirectUrl}`;
    }
    res.json({ success: true });
});

app.get('/auth/google',
    passport.authenticate('google', { scope: ['profile', 'email'] }));

app.get('/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/login' }),
    (req, res) => {
        // Get redirect URL from session (stored before auth)
        const redirectUrl = req.session.redirectAfterLogin || `${FRONTEND_URL}/dashboard`;
        delete req.session.redirectAfterLogin; // Clean up
        res.redirect(redirectUrl);
    });

app.get('/auth/github',
    passport.authenticate('github', { scope: ['user:email'] }));

app.get('/auth/github/callback',
    passport.authenticate('github', { failureRedirect: '/login' }),
    (req, res) => {
        // Get redirect URL from session (stored before auth)
        const redirectUrl = req.session.redirectAfterLogin || `${FRONTEND_URL}/dashboard`;
        delete req.session.redirectAfterLogin; // Clean up
        res.redirect(redirectUrl);
    });

// User info endpoint
app.get('/auth/user', (req, res) => {
    if (req.isAuthenticated()) {
        res.json(req.user);
    } else {
        res.status(401).json({ message: 'Not authenticated' });
    }
});

// Logout endpoint
app.get('/auth/logout', (req, res) => {
    req.logout((err) => {
        if (err) { return next(err); }
        res.redirect(`${FRONTEND_URL}/login`); // Redirect to Astro login page
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Backend server running on http://localhost:${PORT}`);
});
