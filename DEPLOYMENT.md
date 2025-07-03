# 🚀 Deployment Guide - Cerebras Studio AI

This guide covers the complete CI/CD pipeline and deployment process for Cerebras Studio AI.

## 📋 Prerequisites

### 1. Required Accounts
- [GitHub](https://github.com) account
- [Vercel](https://vercel.com) account
- [Cerebras](https://cerebras.ai) API key

### 2. Required Secrets
Set up these secrets in your GitHub repository (`Settings > Secrets and variables > Actions`):

```bash
CEREBRAS_API_KEY=your_cerebras_api_key_here
VERCEL_TOKEN=your_vercel_token_here
VERCEL_ORG_ID=your_vercel_org_id_here
VERCEL_PROJECT_ID=your_vercel_project_id_here
```

## 🔧 Getting Vercel Credentials

### 1. Install Vercel CLI
```bash
npm install -g vercel
```

### 2. Login and Link Project
```bash
# Login to Vercel
vercel login

# Link your project
vercel link

# Get your credentials
vercel env ls
```

### 3. Get Required IDs
```bash
# Get Organization ID
vercel teams ls

# Get Project ID (from .vercel/project.json after linking)
cat .vercel/project.json
```

## 🔄 CI/CD Pipeline Overview

Our pipeline consists of 4 main workflows:

### 1. 🚀 Main Deployment (`deploy.yml`)
**Triggers**: Push to main, Pull Requests
**Features**:
- Quality assurance checks
- Security scanning
- Preview deployments for PRs
- Production deployments for main branch
- Automated PR comments with deployment URLs

### 2. 🔍 Pull Request Checks (`pr-checks.yml`)
**Triggers**: Pull Request events
**Features**:
- Code quality analysis
- Dependency analysis
- Performance checks
- Security analysis
- Automated PR summary comments

### 3. 📦 Dependency Updates (`dependency-update.yml`)
**Triggers**: Weekly schedule (Mondays 9 AM UTC), Manual trigger
**Features**:
- Automated dependency updates
- Security vulnerability fixes
- Automated PRs for updates
- Build verification

## 🚀 Deployment Process

### Automatic Deployment

1. **Push to Main Branch**:
   ```bash
   git push origin main
   ```
   - Triggers full CI/CD pipeline
   - Deploys to production automatically
   - Updates production URL

2. **Create Pull Request**:
   ```bash
   git checkout -b feature/new-feature
   git push origin feature/new-feature
   # Create PR on GitHub
   ```
   - Triggers preview deployment
   - Runs all quality checks
   - Comments deployment URL on PR

### Manual Deployment

1. **Local Deployment**:
   ```bash
   # Install dependencies
   npm install
   
   # Build and deploy
   npm run deploy:prod
   ```

2. **Quick Deploy**:
   ```bash
   # Deploy current branch
   npm run deploy
   ```

## 🔍 Quality Gates

Every deployment goes through these quality gates:

### ✅ Code Quality
- TypeScript type checking
- ESLint linting
- Prettier formatting
- Build verification

### 🛡️ Security
- Dependency vulnerability scanning
- Secret detection
- Security audit

### ⚡ Performance
- Bundle size analysis
- Build performance metrics
- Asset optimization

## 🌍 Environment Configuration

### Production Environment Variables
Set these in Vercel dashboard:

```bash
CEREBRAS_API_KEY=your_production_api_key
NEXT_TELEMETRY_DISABLED=1
NODE_ENV=production
```

### Development Environment Variables
Create `.env.local`:

```bash
CEREBRAS_API_KEY=your_development_api_key
NEXT_TELEMETRY_DISABLED=1
NODE_ENV=development
```

## 📊 Monitoring & Analytics

### Build Monitoring
- GitHub Actions provide build status
- Vercel dashboard shows deployment metrics
- Automated notifications for failures

### Performance Monitoring
- Bundle size tracking
- Build time analysis
- Deployment frequency metrics

## 🔧 Troubleshooting

### Common Issues

1. **Build Failures**:
   ```bash
   # Run locally to debug
   npm run ci
   ```

2. **Deployment Failures**:
   ```bash
   # Check Vercel logs
   vercel logs
   ```

3. **Dependency Issues**:
   ```bash
   # Use fix scripts
   ./quick-fix.sh
   # or
   ./comprehensive-fix.sh
   ```

### Debug Commands

```bash
# Check build locally
npm run build

# Analyze bundle
npm run analyze

# Check types
npm run type-check

# Format code
npm run format

# Clean cache
npm run clean
```

## 🎯 Best Practices

### 1. Branch Strategy
- `main` branch for production
- Feature branches for development
- Automated testing on all branches

### 2. Commit Messages
Use conventional commits:
```bash
feat: add new feature
fix: resolve bug
docs: update documentation
style: format code
refactor: improve code structure
test: add tests
chore: update dependencies
```

### 3. Pull Request Process
1. Create feature branch
2. Make changes
3. Push and create PR
4. Wait for automated checks
5. Review and merge

### 4. Security
- Never commit API keys
- Use environment variables
- Regular dependency updates
- Security scanning enabled

## 📈 Scaling Considerations

### Performance Optimization
- Bundle splitting enabled
- Image optimization configured
- CDN distribution via Vercel

### Monitoring
- Error tracking via Vercel
- Performance monitoring
- User analytics (optional)

## 🆘 Support

### Resources
- [Vercel Documentation](https://vercel.com/docs)
- [Next.js Documentation](https://nextjs.org/docs)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)

### Getting Help
1. Check GitHub Issues
2. Review deployment logs
3. Run diagnostic scripts
4. Contact maintainers

---

**🎉 Your Cerebras Studio AI is now ready for production deployment with a robust CI/CD pipeline!**
