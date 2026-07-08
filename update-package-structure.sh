#!/bin/bash

# Update package structure to match new package names

OLD_KOTLIN_DIR="src/main/kotlin/com/renato"
NEW_KOTLIN_DIR="src/main/kotlin/com/mycompany"

# Remove old kotlin directory
rm -rf "$OLD_KOTLIN_DIR"

# Create new kotlin directory structure
mkdir -p "$NEW_KOTLIN_DIR"

# Move all kotlin files preserving subdirectory structure
find . -name "*.kt" -type f | while read -r file; do
    REL_PATH="${file#./}"
    NEW_REL_PATH="${REL_PATH#$OLD_KOTLIN_DIR/}"
    NEW_FILE_PATH="$NEW_KOTLIN_DIR/$NEW_REL_PATH"
    mkdir -p "$(dirname "$NEW_FILE_PATH")"
    cp "$file" "$NEW_FILE_PATH"
done

# Update package declarations
find . -name "*.kt" -type f -exec sed -i '' 's/com\.renato\.springbootstrap/com.mycompany/g' {} \;

echo "Package structure updated to com.mycompany"
