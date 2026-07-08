# Migration Guide

This guide helps you migrate from the original SpringBootstrap project to the Spring Bootstrap Template.

## What Changed

### 1. Package Names

**Before:** `com.renato.springbootstrap`  
**After:** `com.mycompany`

### 2. License

**Before:** GPL-3.0  
**After:** MIT (more permissive for templates)

### 3. Project Name

**Before:** SpringBootstrap  
**After:** spring-bootstrap-template

## Migration Steps

### Step 1: Copy Files

```bash
cp -r /Users/renato/Projects/SpringBootstrap /Users/renato/Projects/SpringBootstrap-Template
cd /Users/renato/Projects/SpringBootstrap-Template
```

### Step 2: Update Package Declarations

```bash
find . -name "*.kt" -type f -exec sed -i '' 's/com\.renato\.springbootstrap/com.mycompany/g' {} \;
```

### Step 3: Update Directory Structure (Optional)

If you want to match the new package structure:

```bash
# Remove old directory structure
rm -rf src/main/kotlin/com

# Create new structure
mkdir -p src/main/kotlin/com/example/springboottemplate
```

Then move files to new locations based on their package declarations.

### Step 4: Update Configuration

```bash
# Update build.gradle.kts
sed -i '' 's/group = "com.renato"/group = "com.yourcompany"/g' build.gradle.kts

# Update application.yml
sed -i '' 's/com\.renato\.springbootstrap/com.mycompany/g' src/main/resources/application.yml
sed -i '' 's/springbootstrap/your_database_name/g' src/main/resources/application.yml
```

### Step 5: Update CI/CD

Edit `.github/workflows/build.yml`:

```yaml
# Update repository references
name: Build
on:
  push:
    branches: [ main ]
env:
  COMMIT_MESSAGE: "chore: release"
```

### Step 6: Update Documentation

- Edit `README.md` with your project details
- Update GitHub badges with your repository URL
- Modify `docs/` files for your use case

## Quick Start

Use the included setup script:

```bash
./setup.sh
```

This will:
1. Rename the project
2. Update package names
3. Create .env file
4. Update database configuration

## Common Issues

### "Class not found" errors

If you get compilation errors after updating package names:

1. Make sure all files are updated
2. Clean and rebuild:
   ```bash
   ./gradlew clean build
   ```

### Directory structure mismatch

If package names don't match directory structure:

1. Either update all package names to match old structure
2. Or move files to match new package structure

See [docs/MIGRATION_GUIDE.md](docs/MIGRATION_GUIDE.md) for details.

