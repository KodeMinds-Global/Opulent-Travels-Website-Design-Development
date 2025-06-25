# Manual Instructions to Fix Deployment Issues

## Part 1: Initialize the Public Repository

1. Create a new folder on your computer:
   ```
   mkdir temp-public-repo
   cd temp-public-repo
   ```

2. Initialize a git repository:
   ```
   git init
   ```

3. Create basic files:
   - Create a README.md file with content: `# Opulent Travels`
   - Create an empty .nojekyll file
   - Create an index.html file with basic HTML (you can copy from public/index-public-repo.html)

4. Add and commit the files:
   ```
   git add .
   git commit -m "Initial commit"
   ```

5. Add the remote repository and push:
   ```
   git remote add origin https://github.com/KodeMinds-Global/opulent-travels-public.git
   git branch -M main
   git push -u origin main --force
   ```
   
   When prompted, enter your GitHub credentials for a user with access to this repository.

## Part 2: Check and Fix the GitHub Action Secret

1. Go to your private repository on GitHub
2. Navigate to Settings → Secrets and variables → Actions
3. Check if `PUBLIC_REPO_TOKEN` exists
4. If it doesn't exist or you need to update it:
   - Click "New repository secret"
   - Name: `PUBLIC_REPO_TOKEN`
   - Value: Your Personal Access Token with `repo` and `workflow` permissions
   - Click "Add secret"

## Part 3: Test the Deployment

1. Make a small change to your private repository:
   ```
   cd /path/to/your/private/repo
   echo "# Updated on $(date)" >> README.md
   git add README.md
   git commit -m "Test deployment"
   git push
   ```

2. Check the Actions tab in your private repository to see if the workflow runs

## Part 4: Manually Deploy (If GitHub Actions Still Fails)

If the GitHub Actions workflow still fails, you can manually deploy:

1. Build your project locally:
   ```
   npm run build
   ```

2. Copy the contents of the `dist` folder to your public repository
3. Commit and push the changes to the public repository

## Part 5: Enable GitHub Pages

After your public repository has content:

1. Go to the repository settings → Pages
2. Source: Deploy from a branch
3. Branch: main, Folder: / (root)
4. Click Save

Your site should now be available at: https://kodeminds-global.github.io/opulent-travels-public/ 