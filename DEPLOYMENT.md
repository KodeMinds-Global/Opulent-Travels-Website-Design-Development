# Team Deployment Guide

This document explains how our team deploys the Opulent Travels website from our private repository to a public GitHub Pages site.

## Overview

We use GitHub Actions to automatically deploy our website from our private repository (`Opulent-Travels-Website-Design-Development`) to a public repository (`opulent-travels-public`), which is then served via GitHub Pages.

## Deployment Setup (One-time)

1. **Create a public repository**
   - Repository name: `opulent-travels-public`
   - Visibility: Public
   - No initialization files

2. **Set up a Personal Access Token (PAT)**
   - A designated team member with admin permissions has created a PAT
   - The PAT has been stored as a secret (`PUBLIC_REPO_TOKEN`) in our private repository
   - The token is used by GitHub Actions to push to the public repository

3. **Initialize the public repository**
   - Follow the instructions in `setup-public-repo.md`
   - This only needs to be done once

4. **Enable GitHub Pages**
   - In the public repository, go to Settings → Pages
   - Set source to "Deploy from a branch"
   - Select "main" branch and "/ (root)" folder

## How Deployments Work

1. When any team member pushes to the `main` branch of our private repository, GitHub Actions:
   - Builds the project using Vite
   - Deploys the built files to the public repository
   - The public site is automatically updated

2. The deployed site is available at: `https://YOUR_ORGANIZATION.github.io/opulent-travels-public/`

## Important Notes for Team Members

- **DO NOT** commit sensitive information (API keys, credentials, etc.) to the repository
- The deployment workflow will deploy everything in the `dist` folder after building
- If you need to modify the deployment process, update the `.github/workflows/deploy-to-public.yml` file

## Troubleshooting

If deployment fails:
1. Check the Actions tab in GitHub for error logs
2. Verify the PAT has not expired (they need to be renewed periodically)
3. Contact the team admin if the PAT needs to be regenerated

## Custom Domain (Future)

If we decide to use a custom domain:
1. Add a CNAME file to the public repository
2. Configure DNS settings to point to GitHub Pages
3. Update the Vite configuration as needed 