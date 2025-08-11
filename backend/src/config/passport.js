const passport = require('passport');
const { Strategy: GoogleStrategy } = require('passport-google-oauth20');
const OAuth2Strategy = require('passport-oauth2');
const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');
const axios = require('axios');
const User = require('../models/User');

// JWT Strategy
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET || 'your-secret-key'
};

passport.use(new JwtStrategy(jwtOptions, async (jwtPayload, done) => {
  try {
    const user = await User.findById(jwtPayload.id);
    if (user) {
      return done(null, user);
    }
    return done(null, false);
  } catch (error) {
    return done(error, false);
  }
}));

// Google Strategy
passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID || '',
  clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
  callbackURL: process.env.GOOGLE_CALLBACK_URL || 'http://localhost:5000/api/auth/google/callback'
}, async (accessToken, refreshToken, profile, done) => {
  try {
    let user = await User.findOne({ googleId: profile.id });
    
    if (!user) {
      user = new User({
        googleId: profile.id,
        email: profile.emails?.[0]?.value,
        name: profile.displayName,
        avatar: profile.photos?.[0]?.value
      });
      await user.save();
    }
    
    return done(null, user);
  } catch (error) {
    return done(error, false);
  }
}));

// LinkedIn OAuth2 Strategy with OpenID Connect support
passport.use('linkedin-openidconnect', new OAuth2Strategy({
  authorizationURL: 'https://www.linkedin.com/oauth/v2/authorization',
  tokenURL: 'https://www.linkedin.com/oauth/v2/accessToken',
  clientID: process.env.LINKEDIN_CLIENT_ID || '',
  clientSecret: process.env.LINKEDIN_CLIENT_SECRET || '',
  callbackURL: process.env.LINKEDIN_CALLBACK_URL || 'http://localhost:5000/api/auth/linkedin/callback',
  scope: ['openid', 'profile', 'email'],
  state: true
}, async (accessToken, refreshToken, params, profile, done) => {
  try {
    // Fetch user profile from LinkedIn API
    const profileResponse = await axios.get('https://api.linkedin.com/v2/userinfo', {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });
    const profileData = profileResponse.data;
    console.log('LinkedIn userinfo response:', profileData);

    // Fetch email from LinkedIn API
    // Removed due to 403 error with /v2/emailAddress endpoint when using OIDC scopes
    // const emailResponse = await axios.get('https://api.linkedin.com/v2/emailAddress?q=members&projection=(elements*(handle~))', {
    //   headers: {
    //     Authorization: `Bearer ${accessToken}`
    //   }
    // });
    // const email = emailResponse.data.elements[0]['handle~'].emailAddress;

    // Use email from userinfo response instead
    const email = profileData.email || '';

    let user = await User.findOne({ linkedinId: profileData.id });

    if (!user) {
      user = new User({
        linkedinId: profileData.id,
        email: email,
        name: profileData.localizedFirstName + ' ' + profileData.localizedLastName,
        avatar: '', // LinkedIn does not provide avatar in this API by default
        linkedinAccessToken: accessToken,
        linkedinRefreshToken: refreshToken
      });
      await user.save();
    } else {
      user.linkedinAccessToken = accessToken;
      user.linkedinRefreshToken = refreshToken;
      await user.save();
    }

    return done(null, user);
  } catch (error) {
    return done(error, false);
  }
}));

// Serialize and deserialize user
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error, false);
  }
});

module.exports = passport;
