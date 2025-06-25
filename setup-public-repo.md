# Instructions for Setting Up the Public Repository

Run these commands to initialize the public repository:

```bash
# Clone the public repository
git clone https://github.com/YOUR_ORGANIZATION/opulent-travels-public.git
cd opulent-travels-public

# Create a basic index.html file
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

# Create a .nojekyll file to prevent GitHub Pages from using Jekyll
touch .nojekyll

# Initialize git repository
git add .
git commit -m "Initial commit"
git push origin main
```

Replace `YOUR_ORGANIZATION` with your actual GitHub organization name. 