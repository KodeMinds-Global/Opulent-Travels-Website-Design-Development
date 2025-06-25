# Opulent Travel Agency

A luxury travel agency website for showcasing premium travel experiences in Sri Lanka and Maldives.

## Features

- Responsive design for all device sizes
- Interactive UI elements with smooth animations
- Dark/light theme support
- Optimized for performance

## Technologies Used

- React
- TypeScript
- Tailwind CSS
- Vite
- Shadcn UI Components

## Development

### Prerequisites

- Node.js 16+
- npm or yarn

### Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

## Deployment from Private to Public Repository

This project is configured to automatically deploy from a private repository (Opulent-Travels-Website-Design-Development) to a public GitHub Pages repository (opulent-travels-public).

### Step-by-Step Setup Guide

1. **Create a public repository**
   - Go to GitHub and create a new repository named `opulent-travels-public`
   - Make sure it's set to Public
   - Do NOT initialize with any files

2. **Create a Personal Access Token (PAT)**
   - Go to your GitHub account → Settings → Developer settings → Personal access tokens → Tokens (classic)
   - Click "Generate new token" → "Generate new token (classic)"
   - Give it a descriptive name like "Deploy to Public Repo"
   - Set expiration as needed (recommended: 90 days)
   - Select these scopes: `repo`, `workflow`
   - Click "Generate token"
   - **IMPORTANT**: Copy the token immediately, as you won't be able to see it again

3. **Add the token to your private repository**
   - Go to your private repository → Settings → Secrets and variables → Actions
   - Click "New repository secret"
   - Name: `PUBLIC_REPO_TOKEN`
   - Value: paste the Personal Access Token you just created
   - Click "Add secret"

4. **Update the workflow file**
   - In `.github/workflows/deploy-to-public.yml`, replace `YOUR_USERNAME` with your actual GitHub username in TWO places:
     1. `repository: YOUR_USERNAME/Opulent-Travels-Website-Design-Development`
     2. `repository-name: YOUR_USERNAME/opulent-travels-public`

5. **Initialize the public repository**
   - Clone the new public repository locally
   - Add a simple index.html file (you can use the public/index-public-repo.html from this repo)
   - Push to initialize the repository

6. **Push changes to your private repository**
   ```bash
   git add .
   git commit -m "Set up deployment to public repository"
   git push
   ```

7. **Enable GitHub Pages in the public repository**
   - After the workflow has run successfully
   - Go to your public repository → Settings → Pages
   - Under "Source", select "Deploy from a branch"
   - Select "main" branch and "/ (root)" folder
   - Click "Save"

Your site will now be available at `https://yourusername.github.io/opulent-travels-public/`

### How it works

1. When you push to the `main` branch of your private repository, GitHub Actions will:
   - Check out your private repository code
   - Build the project
   - Deploy the built files to your public repository
   - GitHub Pages will then serve the site from the public repository

This approach keeps your source code private while making the built website public.

### Manual Deployment

If you prefer to deploy manually:

```bash
# Build the project
npm run build

# You would then need to manually push the dist folder to your public repository
```

### Custom Domain

To use a custom domain:
1. Add a CNAME file to your public repository with your domain name
2. Configure your DNS settings to point to GitHub Pages
