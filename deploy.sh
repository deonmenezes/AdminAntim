#!/bin/bash

# Clear any cached data
rm -rf .next

# Install dependencies
npm install

# Build the application
npm run build

# Deploy to Vercel
vercel --prod
