#!/bin/bash

# Function to generate a random commit message
generate_commit_message() {
    local file_path="$1"
    local file_name=$(basename "$file_path")
    
    case "$file_name" in
        "package.json")
            echo "🔧 Dependency: Update package configuration and dependencies"
            ;;
        "tsconfig.json")
            echo "⚙️ TypeScript: Refine compiler configuration for improved type checking"
            ;;
        "app.json")
            echo "📱 App Config: Adjust application metadata and settings"
            ;;
        ".gitignore")
            echo "🔒 Git: Update ignored files and directories"
            ;;
        "package-lock.json")
            echo "🔒 Lock: Synchronize package lock file with latest dependencies"
            ;;
        "App.tsx")
            echo "🚀 App: Update main application component"
            ;;
        "HomePage.tsx")
            echo "🏠 Screen: Enhance home page layout and functionality"
            ;;
        "BottomNavigation.tsx")
            echo "🧭 Navigation: Improve bottom navigation component"
            ;;
        ".cursorrules")
            echo "📋 Project: Update project-specific rules and guidelines"
            ;;
        *)
            echo "📝 Misc: Update ${file_name}"
            ;;
    esac
}

# Check if we are in a git repository
if ! git rev-parse --is-inside-work-tree > /dev/null 2>&1; then
    echo "Error: Not in a git repository. Please initialize git first."
    exit 1
fi

# Stage all untracked and modified files
git add .

# Commit files with custom messages
git diff --cached --name-only | while read -r file; do
    if [ -f "$file" ]; then
        # Generate and create commit message
        commit_msg=$(generate_commit_message "$file")
        git commit -m "$commit_msg"
        
        echo "Committed $file with message: $commit_msg"
    fi
done

# Push changes to the repository
git push origin main

echo "All files committed and pushed successfully!" 