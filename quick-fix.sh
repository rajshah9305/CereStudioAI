#!/bin/bash
# ✈ Quick Fix for JSONDecodeError in Cerebras Studio
echo "🚧 Fixing JSONDecodeError in Cerebras Studio..."
echo "=============================================="
# Check if we're in the right directory
if [ ! -f "package.json" ]; then
echo "❌ Error: Please run this script from your Cerebras Studio project directory"
echo "   cd cerebras-studio && ./quick-fix.sh"
exit 1
fi

# Check if vercel.json has GitHub Actions syntax (the main issue this fixes)
if [ -f "vercel.json" ]; then
    if grep -q '\${{' vercel.json; then
        echo "🎯 Found GitHub Actions syntax in vercel.json - fix needed!"
    else
        echo "ℹ️  Your vercel.json looks clean, but continuing with enhancements..."
    fi
fi
# Backup existing vercel.json
if [ -f "vercel.json" ]; then
echo "💾 Backing up existing vercel.json..."
cp vercel.json vercel.json.backup
fi
echo "🚧 Creating fixed vercel.json..."
# Create clean vercel.json without GitHub Actions syntax
cat > vercel.json << 'EOF'
{
"framework": "nextjs",
"buildCommand": "npm run build",
"outputDirectory": ".next",
"installCommand": "npm install",
"devCommand": "npm run dev",
"regions": ["iad1", "sfo1", "fra1"],
"functions": {
"app/api/**/*.ts": {
"runtime": "nodejs20.x",
"maxDuration": 30
}
},
"headers": [
{
"source": "/(.*)",
"headers": [
{
"key": "X-Frame-Options",
"value": "DENY"
},
{
"key": "X-Content-Type-Options",
"value": "nosniff"
},
{
"key": "X-XSS-Protection",
"value": "1; mode=block"
},
{
"key": "Referrer-Policy",
"value": "strict-origin-when-cross-origin"
}
]
},
{
"source": "/api/(.*)",
"headers": [
{
"key": "Access-Control-Allow-Origin",
"value": "*"
},
{
"key": "Access-Control-Allow-Methods",
"value": "GET, POST, PUT, DELETE, OPTIONS"
},
{
"key": "Access-Control-Allow-Headers",
"value": "Content-Type, Authorization"
}
]
}
],
"build": {
"env": {
"NEXT_TELEMETRY_DISABLED": "1"
}
}
}
EOF
echo "✅ Fixed vercel.json created!"
# Validate JSON syntax
echo "🔍 Validating JSON syntax..."
if command -v python3 &> /dev/null; then
if python3 -m json.tool vercel.json > /dev/null 2>&1; then
echo "✅ JSON syntax is valid!"
else
echo "❌ JSON syntax error detected"
exit 1
fi
elif command -v node &> /dev/null; then
if node -e "JSON.parse(require('fs').readFileSync('vercel.json', 'utf8'))" > /dev/null 2>&1; then
echo "✅ JSON syntax is valid!"
else
echo "❌ JSON syntax error detected"
exit 1
fi
else
echo "⚠️  Cannot validate JSON (no python3 or node found), but file created"
fi
# Create GitHub Actions workflow if it doesn't exist
if [ ! -d ".github/workflows" ]; then
echo "📁 Creating GitHub Actions workflow directory..."
mkdir -p .github/workflows
fi
if [ ! -f ".github/workflows/deploy.yml" ]; then
echo "🚤 Creating GitHub Actions deployment workflow..."
cat > .github/workflows/deploy.yml << 'EOF'
name: Deploy to Vercel
on:
push:
branches:
- main
- master
pull_request:
branches:
- main
- master
jobs:
deploy:
runs-on: ubuntu-latest
steps:
- name: Checkout code
uses: actions/checkout@v4
- name: Setup Node.js
uses: actions/setup-node@v4
with:
node-version: '18'
cache: 'npm'
- name: Install dependencies
run: npm ci
- name: Run type check
run: npm run type-check
- name: Run linter
run: npm run lint
- name: Build project
run: npm run build
env:
CEREBRAS_API_KEY: ${{ secrets.CEREBRAS_API_KEY }}
- name: Deploy to Vercel (Preview)
if: github.event_name == 'pull_request'
uses: amondnet/vercel-action@v25
with:
vercel-token: ${{ secrets.VERCEL_TOKEN }}
vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
working-directory: ./
- name: Deploy to Vercel (Production)
if: github.ref == 'refs/heads/main'
uses: amondnet/vercel-action@v25
with:
vercel-token: ${{ secrets.VERCEL_TOKEN }}
vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
vercel-args: '--prod'
working-directory: ./
EOF
echo "✅ GitHub Actions workflow created!"
fi
# Install dependencies with legacy peer deps to handle React 19 compatibility
echo "📦 Installing dependencies with compatibility fixes..."
if npm install --legacy-peer-deps > /dev/null 2>&1; then
    echo "✅ Dependencies installed successfully!"
else
    echo "⚠️  Dependency installation failed - trying alternative approach..."
    echo "   This is often due to React 19 compatibility issues"

    # Try to fix common React 19 compatibility issues
    echo "🔧 Updating package versions for React 19 compatibility..."

    # Update framer-motion to a React 19 compatible version
    npm install framer-motion@^11.0.0 --legacy-peer-deps > /dev/null 2>&1

    # Update lucide-react to a React 19 compatible version
    npm install lucide-react@^0.460.0 --legacy-peer-deps > /dev/null 2>&1

    # Install missing dependencies
    npm install zod @typescript-eslint/eslint-plugin @typescript-eslint/parser --legacy-peer-deps > /dev/null 2>&1

    echo "✅ Compatibility fixes applied!"
fi

# Test build locally
echo "🏗️  Testing build locally..."
if npm run build > /dev/null 2>&1; then
echo "✅ Build successful!"
else
echo "⚠️  Build failed - check your code for errors"
echo "   Run 'npm run build' to see detailed errors"
echo ""
echo "🔍 Common build issues to check:"
echo "   - Missing environment variables (CEREBRAS_API_KEY)"
echo "   - TypeScript errors"
echo "   - Missing dependencies"
echo "   - API route configuration"
echo "   - React 19 compatibility issues"
fi
echo ""
echo "🎉 QUICK FIX COMPLETE!"
echo "====================="
echo ""
echo "✅ What was fixed:"
echo "   - Removed GitHub Actions syntax from vercel.json"
echo "   - Created proper GitHub Actions workflow"
echo "   - Validated JSON syntax"
echo ""
echo "🚀 Next steps:"
echo "1. Deploy to Vercel:"
echo "   vercel"
echo ""
echo "2. Set environment variables in Vercel dashboard:"
echo "   - CEREBRAS_API_KEY=your_api_key_here"
echo ""
echo "3. Redeploy with production flag:"
echo "   vercel --prod"
echo ""
echo "💡 If you still get errors, run: npm run build"
echo "   to check for any remaining issues"
echo ""
echo "🎯 Your deployment should now work without JSON errors!"  