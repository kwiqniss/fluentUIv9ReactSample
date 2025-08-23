# Azure Static Web App Recreation Guide

## Current Status
- ❌ Previous Azure Static Web App (`ambitious-water-01eb75c0f`) is broken
- ❌ Deployment fails with "invalid status pending" and "no logs to display"
- ✅ Local build works perfectly (`npm run build` creates dist/ folder correctly)
- ✅ All application code is functional

## Steps to Recreate Azure Static Web App

### 1. Delete Old Resource
1. Go to [Azure Portal](https://portal.azure.com/)
2. Navigate to your Resource Group
3. Find the Static Web App named `ambitious-water-01eb75c0f` (or similar)
4. Delete it completely
5. Wait for deletion to complete

### 2. Create New Azure Static Web App
1. In Azure Portal, create a new "Static Web App" resource
2. **Choose GitHub as source**
3. **Connect to repository**: `kwiqniss/fluentUIv9ReactSample`
4. **Branch**: Select `deploymentTroubleshooting` (for testing)
5. **Build Presets**: Choose "React" or "Custom"
6. **App location**: `/`
7. **API location**: Leave empty (we don't have an API)
8. **Output location**: `dist`

### 3. Azure Will Auto-Generate Workflow
- Azure will automatically create a workflow file in `.github/workflows/`
- The filename will be something like `azure-static-web-apps-[RANDOM-NAME].yml`
- Note the secret name (will be like `AZURE_STATIC_WEB_APPS_API_TOKEN_[RANDOM_NAME]`)

### 4. Replace Generated Workflow
1. Delete the auto-generated workflow file
2. Rename `azure-static-web-apps-TEMPLATE.yml` to match the pattern Azure expects
3. Update the secret name in the template where it says `REPLACE_WITH_NEW_SECRET_NAME`

### 5. Test Deployment
1. Commit and push to `deploymentTroubleshooting` branch
2. Check GitHub Actions for successful deployment
3. Visit the Azure Static Web App URL to verify it's working

### 6. When Ready for Production
1. Uncomment the `main` branch lines in the workflow
2. Merge `deploymentTroubleshooting` into `main`
3. The workflow will then deploy from main branch

## Project Configuration
- ✅ Build command: `npm run build`
- ✅ Build output: `dist/` directory  
- ✅ Webpack configured correctly
- ✅ All dependencies installed

## Next Steps
1. Follow steps 1-2 above to create the new Azure resource
2. Let me know the new secret name and I'll update the template
3. Test the deployment
