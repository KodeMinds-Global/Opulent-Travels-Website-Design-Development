#!/bin/bash

# Create a temporary directory
mkdir -p temp-public-repo
cd temp-public-repo

# Initialize git repository
git init
git config --global init.defaultBranch main

# Create basic files
echo "# Opulent Travels" > README.md
touch .nojekyll

# Create a basic index.html
cat > index.html << 'EOL'
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Opulent Travel - Coming Soon</title>
    <style>
        body {
            font-family: 'Arial', sans-serif;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            margin: 0;
            background-color: #f8f9fa;
            text-align: center;
        }
        .container {
            padding: 2rem;
            border-radius: 10px;
            background-color: white;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            max-width: 600px;
        }
        h1 {
            color: #333;
        }
        p {
            color: #666;
            line-height: 1.6;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Opulent Travel</h1>
        <p>Our luxurious travel experience website is coming soon.</p>
    </div>
</body>
</html>
EOL

# Add files to git
git add .
git commit -m "Initial commit"

# Add remote and push
git remote add origin https://github.com/KodeMinds-Global/opulent-travels-public.git
echo "Now run: git push -u origin main --force"
echo "You'll need to enter your GitHub credentials with access to the repository"

# Note: We don't push automatically as that would require credentials 