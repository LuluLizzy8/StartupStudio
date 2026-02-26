#!/bin/bash

# NoticeMe Waitlist Setup Script

echo "🚀 Setting up NoticeMe Waitlist Server..."
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 14+ from https://nodejs.org/"
    exit 1
fi

echo "✅ Node.js $(node -v) detected"
echo ""

# Install dependencies
echo "📦 Installing dependencies..."
npm install

echo ""
echo "✅ Setup complete!"
echo ""
echo "To start the server, run:"
echo "  npm start"
echo ""
echo "Then open http://localhost:3000 in your browser"
echo ""
echo "📊 API Endpoints:"
echo "  GET  /api/waitlist          - View all signups"
echo "  GET  /api/waitlist/stats    - View statistics"
echo "  POST /api/waitlist          - Add to waitlist (form submits to this)"
echo ""
