#!/bin/bash

# Function to generate a descriptive commit message based on the file
generate_commit_message() {
    local file="$1"
    
    case "$file" in
        "package.json")
            echo "📦 Update project dependencies and configuration"
            ;;
        "tsconfig.json")
            echo "🛠️ Refine TypeScript configuration for improved type checking"
            ;;
        "app.json")
            echo "🚀 Update app configuration and metadata"
            ;;
        ".gitignore")
            echo "🙈 Modify ignored files and directories"
            ;;
        *"src/"*)
            echo "✨ Enhance source code: ${file#src/}"
            ;;
        *".cursorrules")
            echo "📝 Update project development guidelines and rules"
            ;;
        *)
            echo "🔧 General project maintenance: ${file}"
            ;;
    esac
}

# Get list of modified files
modified_files=$(git status --porcelain | grep -E '^ ?M' | cut -c 3-)

# Check if there are any modified files
if [ -z "$modified_files" ]; then
    echo "No modified files to commit."
    exit 0
fi

# Stage all modified files
git add .

# Commit each file with a personalized message
for file in $modified_files; do
    commit_message=$(generate_commit_message "$file")
    git commit -m "$commit_message"
done

# Push changes
git push origin main

echo "Commit and push completed successfully!"
