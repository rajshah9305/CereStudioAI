# 🚀 Vercel Deployment Setup Guide

Complete guide to set up automated deployment from GitHub to Vercel for Cerebras Studio AI.

## 📋 Prerequisites

1. **GitHub Repository**: https://github.com/rajshah9305/CereStudioAI
2. **Vercel Account**: Sign up at [vercel.com](https://vercel.com)
3. **Cerebras API Key**: Get from [cerebras.ai](https://cerebras.ai)

## 🔧 Step 1: Connect GitHub to Vercel

### 1.1 Import Project
1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "New Project"
3. Import from GitHub: `rajshah9305/CereStudioAI`
4. Configure project settings:
   - **Framework Preset**: Next.js
   - **Root Directory**: `./` (default)
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next` (default)
   - **Install Command**: `npm install`

### 1.2 Environment Variables
Add these in Vercel project settings:

```bash
CEREBRAS_API_KEY=your_cerebras_api_key_here
NEXT_TELEMETRY_DISABLED=1
NODE_ENV=production
```

## 🔑 Step 2: Get Vercel Credentials for GitHub Actions

### 2.1 Install Vercel CLI
```bash
npm install -g vercel
```

### 2.2 Login and Get Tokens
```bash
# Login to Vercel
vercel login

# Navigate to your project directory
cd CereStudioAI

# Link the project
vercel link

# Get your Organization ID
vercel teams ls

# Get your Project ID (from .vercel/project.json)
cat .vercel/project.json
```

### 2.3 Generate Vercel Token
1. Go to [Vercel Account Settings](https://vercel.com/account/tokens)
2. Create new token with name: "GitHub Actions - CereStudioAI"
3. Copy the token (you'll need it for GitHub secrets)

## 🔒 Step 3: Configure GitHub Secrets

Go to your GitHub repository: `Settings > Secrets and variables > Actions`

Add these **Repository Secrets**:

```bash
CEREBRAS_API_KEY=your_cerebras_api_key_here
VERCEL_TOKEN=your_vercel_token_here
VERCEL_ORG_ID=your_vercel_org_id_here
VERCEL_PROJECT_ID=your_vercel_project_id_here
```

### How to Find Your IDs:

**VERCEL_ORG_ID**: 
- Run `vercel teams ls` or
- Check Vercel dashboard URL: `vercel.com/[ORG_ID]/[PROJECT_NAME]`

**VERCEL_PROJECT_ID**:
- From `.vercel/project.json` after running `vercel link`
- Or from Vercel project settings

## 🚀 Step 4: Test the Pipeline

### 4.1 Trigger Deployment
```bash
# Make a small change and push
echo "# Test" >> README.md
git add README.md
git commit -m "test: trigger CI/CD pipeline"
git push origin main
```

### 4.2 Monitor Deployment
1. **GitHub Actions**: Check the "Actions" tab in your repository
2. **Vercel Dashboard**: Monitor deployment progress
3. **Deployment URL**: Will be available after successful deployment

## 📊 Step 5: Verify CI/CD Pipeline

### 5.1 Check GitHub Actions
Your repository should now have these workflows running:
- ✅ **CI/CD Pipeline**: Quality checks + deployment
- ✅ **PR Checks**: Code analysis for pull requests  
- ✅ **Dependency Updates**: Weekly automated updates

### 5.2 Test Pull Request Flow
```bash
# Create a feature branch
git checkout -b test/ci-cd-pipeline
echo "Testing PR pipeline" >> test.txt
git add test.txt
git commit -m "test: PR pipeline"
git push origin test/ci-cd-pipeline

# Create PR on GitHub
# Check that preview deployment is created
```

## 🎯 Step 6: Production Deployment

### 6.1 Automatic Production Deployment
- Every push to `main` branch triggers production deployment
- Quality gates must pass before deployment
- Deployment URL will be your production site

### 6.2 Custom Domain (Optional)
1. Go to Vercel project settings
2. Add your custom domain
3. Configure DNS records as instructed
4. SSL certificate will be automatically provisioned

## 🔍 Step 7: Monitoring & Maintenance

### 7.1 Deployment Monitoring
- **GitHub Actions**: Build and deployment status
- **Vercel Dashboard**: Performance metrics and logs
- **Health Check**: `/api/health` endpoint for monitoring

### 7.2 Automated Maintenance
- **Dependency Updates**: Automated weekly PRs
- **Security Patches**: Automated vulnerability fixes
- **Performance Monitoring**: Bundle size tracking

## 🛠️ Troubleshooting

### Common Issues

1. **Build Failures**:
   ```bash
   # Check logs in GitHub Actions
   # Run build locally to debug
   npm run build
   ```

2. **Environment Variables**:
   ```bash
   # Verify in Vercel dashboard
   # Check GitHub secrets are set correctly
   ```

3. **API Key Issues**:
   ```bash
   # Test API key locally
   # Verify key is active in Cerebras dashboard
   ```

### Debug Commands

```bash
# Test deployment locally
vercel dev

# Check deployment logs
vercel logs

# Test production build
npm run build && npm start
```

## ✅ Success Checklist

- [ ] GitHub repository connected to Vercel
- [ ] Environment variables configured
- [ ] GitHub secrets added
- [ ] CI/CD pipeline running successfully
- [ ] Production deployment working
- [ ] Health check endpoint responding
- [ ] PR preview deployments working
- [ ] Automated dependency updates enabled

## 🎉 You're All Set!

Your Cerebras Studio AI now has:
- ✅ **Automated CI/CD Pipeline**
- ✅ **Quality Gates & Security Scanning**  
- ✅ **Preview Deployments for PRs**
- ✅ **Production Deployments**
- ✅ **Automated Maintenance**
- ✅ **Performance Monitoring**

**Production URL**: Your app will be available at `https://[project-name].vercel.app`

---

**Need Help?** Check the [DEPLOYMENT.md](DEPLOYMENT.md) for detailed troubleshooting and advanced configuration options.
