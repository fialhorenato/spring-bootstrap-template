#!/bin/bash

# Spring Bootstrap Template Setup Script
# This script helps customize the template for your project

set -e

echo "🚀 Spring Bootstrap Template Setup"
echo "=================================="
echo ""

# Check if running in the template directory
if [ ! -f "build.gradle.kts" ]; then
    echo "❌ Please run this script from the template directory"
    exit 1
fi

# Step 1: Rename project
echo "📦 Step 1: Renaming project..."
read -p "Enter your project name: " PROJECT_NAME
mv spring-bootstrap-template "$PROJECT_NAME"
echo "✅ Project renamed to $PROJECT_NAME"
echo ""

# Step 2: Update package names and folder structure
echo "📝 Step 2: Updating package names and folder structure..."
read -p "Enter your package name (e.g., com.yourcompany.project): " PACKAGE_NAME

# Extract company name from package (first two parts: com.company)
PACKAGE_PARTS=($PACKAGE_NAME)
COMPANY_NAME="${PACKAGE_PARTS[1]}"

# Create new folder structure with company name
OLD_KOTLIN_DIR="src/main/kotlin/com/renato"
NEW_KOTLIN_DIR="src/main/kotlin/com/$COMPANY_NAME"

# Remove old kotlin directory
rm -rf "$OLD_KOTLIN_DIR"

# Create new kotlin directory structure
mkdir -p "$NEW_KOTLIN_DIR"

# Move all kotlin files preserving subdirectory structure
find . -name "*.kt" -type f | while read -r file; do
    # Get relative path from current directory
    REL_PATH="${file#./}"
    # Remove the old package path from the file path
    NEW_REL_PATH="${REL_PATH#$OLD_KOTLIN_DIR/}"
    # Create the new file path
    NEW_FILE_PATH="$NEW_KOTLIN_DIR/$NEW_REL_PATH"
    # Create parent directories if needed
    mkdir -p "$(dirname "$NEW_FILE_PATH")"
    # Copy the file
    cp "$file" "$NEW_FILE_PATH"
done

# Update package declarations in all kotlin files
# Replace com.renato.springbootstrap with com.company.springboottemplate
find . -name "*.kt" -type f -exec sed -i '' 's/com\.renato\.springbootstrap/com.'"$COMPANY_NAME".springbootstrap/g' {} \;
echo "✅ Package names and folder structure updated"
echo ""

# Step 3: Copy environment file
echo "🔧 Step 3: Setting up environment variables..."
cp .env.example .env
echo "✅ .env file created"
echo ""
echo "⚠️  Please update .env with your configuration values"
echo ""

# Step 4: Update database name
echo "🗄️  Step 4: Updating database configuration..."
read -p "Enter your database name: " DB_NAME
sed -i '' 's/your_database_name/'"$DB_NAME"'/g' src/main/resources/application.yml
sed -i '' 's/your_database_name/'"$DB_NAME"'/g' docker-compose.yml
echo "✅ Database name updated"
echo ""

# Step 5: Update group in build.gradle.kts
echo "🔨 Step 5: Updating build configuration..."
read -p "Enter your group (e.g., com.yourcompany): " GROUP
sed -i '' 's/group = "com.yourcompany"/group = "'"$GROUP"'"/g' build.gradle.kts
echo "✅ Build configuration updated"
echo ""

echo "✅ Setup complete!"
echo ""
echo "Next steps:"
echo "1. Update JWT_SECRET in .env with a strong random value"
echo "2. Review and update other configuration files"
echo "3. Run './gradlew clean build' to verify everything works"
echo "4. Commit your changes: 'git add . && git commit -m \"Initialize project\""
