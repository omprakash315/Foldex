# Authentication Scopes Update

## Overview
This document outlines the changes made to implement OpenID Connect scopes (`openid`, `profile`, `email`) for both Google and LinkedIn OAuth authentication.

## Changes Made

### 1. Google OAuth
- **File**: `backend/src/routes/auth.js`
- **Change**: Updated scope from `['profile', 'email']` to `['openid', 'profile', 'email']`
- **Line**: 9

### 2. LinkedIn OAuth
- **File**: `backend/src/config/passport.js`
- **Change**: Updated scope from `['r_liteprofile', 'r_emailaddress']` to `['openid', 'profile', 'email']`
- **Line**: 52

## Benefits of OpenID Connect Scopes

1. **Standardized Identity Protocol**: OpenID Connect provides a standardized way to authenticate users
2. **Better Security**: Includes ID tokens for identity verification
3. **Future-Proof**: Aligns with modern OAuth 2.0 and OpenID Connect standards
4. **Enhanced User Data**: Access to more comprehensive profile information

## Testing Instructions

### Google OAuth Testing
1. Navigate to `http://localhost:8080/login`
2. Click "Continue with Google"
3. Verify that the consent screen shows:
   - View your email address
   - View your basic profile info
   - Authenticate using OpenID Connect

### LinkedIn OAuth Testing
1. Navigate to `http://localhost:8080/login`
2. Click "Continue with LinkedIn"
3. Verify that the consent screen shows:
   - View your email address
   - View your basic profile info
   - Authenticate using OpenID Connect

### Expected Behavior
- Existing users should be able to log in seamlessly
- New users should be created with the same data structure
- User profile information (email, name, avatar) should be correctly retrieved
- No breaking changes to the existing authentication flow

## Environment Variables
Ensure the following environment variables are set:

```bash
# Google OAuth
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_CALLBACK_URL=http://localhost:5000/api/auth/google/callback

# LinkedIn OAuth
LINKEDIN_CLIENT_ID=your_linkedin_client_id
LINKEDIN_CLIENT_SECRET=your_linkedin_client_secret
LINKEDIN_CALLBACK_URL=http://localhost:5000/api/auth/linkedin/callback
```

## Backward Compatibility
These changes maintain full backward compatibility:
- Existing user accounts continue to work
- User data structure remains unchanged
- Authentication flow remains the same from user perspective
- No database migrations required
