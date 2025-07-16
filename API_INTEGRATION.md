# API Configuration Setup

This document explains the API configuration changes made to integrate the deployed backend.

## Changes Made

### 1. Created API Configuration File
- **File**: `src/config/api.js`
- **Purpose**: Centralized API URL configuration
- **URL**: https://pasig-commutr-06f45cde4fc9.herokuapp.com

### 2. Environment Variables
Created environment files for different deployment scenarios:
- `.env` - Default configuration (production URL)
- `.env.development` - Local development (localhost:3001)
- `.env.production` - Production deployment (Heroku URL)

### 3. Updated Files
The following files were updated to use the new API configuration:

#### Frontend API Calls:
- `src/utils/formSubmission.js` - Form submission endpoints
- `src/components/MainMap.js` - Station data fetching
- `src/pages/RouteArchives.js` - Route archives data
- `src/pages/Home.js` - Home page station data
- `src/data/stations.js` - Stations data component

#### Changes Made:
- Replaced hardcoded `http://localhost:3001` with `${API_BASE_URL}`
- Added import for API_BASE_URL configuration
- Updated error messages to be more generic

## API Endpoints

The following endpoints are now configured to use the deployed backend:

1. **GET** `/get-stations` - Fetch all station data
2. **POST** `/contribute-route` - Submit new route contributions
3. **POST** `/contribute-report` - Submit route correction reports
4. **POST** `/contact-us` - Send contact form messages

## Environment Configuration

### Development
When running locally with `npm start`, the app will use:
```
REACT_APP_API_URL=http://localhost:3001
```

### Production
When built for production with `npm run build`, the app will use:
```
REACT_APP_API_URL=https://pasig-commutr-06f45cde4fc9.herokuapp.com
```

## Testing

To test the integration:

1. **Local Development**: Ensure your local backend is running on port 3001
2. **Production**: The app will automatically connect to the deployed Heroku backend

## Deployment Notes

- No additional configuration needed for deployment
- The app will automatically use the production API URL when built
- Environment variables are handled by Create React App's built-in support
