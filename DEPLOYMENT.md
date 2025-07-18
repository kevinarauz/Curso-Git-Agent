# Deployment Instructions for GitHub Pages

## Automatic Deployment

This project is configured for automatic deployment to GitHub Pages using GitHub Actions.

### Setup:

1. **Push to master branch**: Any push to the master branch will trigger automatic deployment
2. **GitHub Pages Settings**: Ensure GitHub Pages is set to deploy from "gh-pages" branch
3. **GitHub Actions**: The workflow in `.github/workflows/deploy.yml` handles the build and deployment

### Configuration Files:

- `vite.config.ts`: Contains `base: '/Curso-Git-Agent/'` for correct path resolution
- `package.json`: Contains correct homepage URL
- `.github/workflows/deploy.yml`: GitHub Actions workflow for deployment

### Manual Deployment:

If you need to deploy manually:

```bash
# Build the project
npm run build

# Deploy to GitHub Pages (requires gh-pages package)
npm run deploy
```

### Troubleshooting:

1. **404 Errors**: Make sure the `base` path in `vite.config.ts` matches your repository name
2. **Assets not loading**: Verify that all paths are relative or use the correct base path
3. **GitHub Pages not updating**: Check the Actions tab for deployment status

### URLs:

- **Repository**: https://github.com/kevinarauz/Curso-Git-Agent
- **Live Site**: https://kevinarauz.github.io/Curso-Git-Agent/
- **Actions**: https://github.com/kevinarauz/Curso-Git-Agent/actions

## Files Modified for GitHub Pages:

1. **vite.config.ts**: Added `base: '/Curso-Git-Agent/'`
2. **package.json**: Updated homepage URL and added deploy script
3. **index.html**: Added manifest link
4. **public/.nojekyll**: Prevents Jekyll processing
5. **.github/workflows/deploy.yml**: GitHub Actions workflow
