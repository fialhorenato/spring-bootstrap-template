# Customization Guide

This guide will walk you through customizing the Spring Bootstrap Template for your project.

## Table of Contents

1. [Project Rename](#1-project-rename)
2. [Package Names](#2-package-names)
3. [Configuration](#3-configuration)
4. [Database Setup](#4-database-setup)
5. [CI/CD Configuration](#5-cicd-configuration)
6. [Docker Configuration](#6-docker-configuration)
7. [Environment Variables](#7-environment-variables)
8. [Testing](#8-testing)

---

## 1. Project Rename

Rename the repository to your project name:

```bash
cd spring-bootstrap-template
mv spring-bootstrap-template YOUR_PROJECT_NAME
```

## 2. Package Names

Update all package declarations:

```bash
find . -name "*.kt" -type f -exec sed -i '' 's/com\.example\.springboottemplate/com.yourcompany.yourproject/g' {} \;
```

**Files to update:**
- All `.kt` files in `src/main/kotlin/`
- Test files in `src/test/kotlin/`

## 3. Configuration

### 3.1 Update `build.gradle.kts`

```kotlin
// Update group and version
group = "com.yourcompany"
version = "1.0.0"  // Follow semantic versioning

// Update JVM target if needed
tasks.withType<KotlinCompile> {
    compilerOptions {
        jvmTarget.set(JvmTarget.JVM_24)  // or JVM_17, JVM_21, etc.
    }
}
```

### 3.2 Update `application.yml`

```yaml
# Update logging package
logging:
  level:
    com.yourcompany.yourproject: DEBUG  # Change to your package

# Update database name (local-postgresql profile)
spring:
  datasource:
    url: jdbc:postgresql://localhost:5432/your_database_name
```

### 3.3 Update `application-render.yml`

```yaml
# Update database credentials
spring:
  datasource:
    url: ${DATABASE_URL}
    username: ${DATABASE_USERNAME}
    password: ${DATABASE_PASSWORD}
```

## 4. Database Setup

### 4.1 Liquibase Migrations

Update database schema files in `src/main/resources/db/changelog/`:

```properties
# Update changelog properties
spring.liquibase.change-log: db/changelog/db.changelog-master.yaml
```

### 4.2 H2 Console (Development Only)

The H2 console is enabled in the `dev` profile. To disable in production:

```yaml
# Add to your production profile
spring:
  h2:
    console:
      enabled: false
```

## 5. CI/CD Configuration

### 5.1 Update GitHub Actions

Edit `.github/workflows/build.yml`:

```yaml
# Update repository name
name: Build
on:
  push:
    branches: [ main ]
env:
  COMMIT_MESSAGE: "chore: release"  # Customize as needed
```

### 5.2 Optional: Remove Unneeded Workflows

If you don't use all features, you can remove or disable:

- `snyk-build-scan.yml` - If you don't use Snyk
- `snyk-test-scan.yml` - If you don't use Snyk
- `render-deploy.yml` - If you don't deploy to Render

## 6. Docker Configuration

### 6.1 Update Dockerfile

```dockerfile
# Update maintainer
MAINTAINER your-email@example.com

# Update labels
LABEL org.opencontainers.image.authors="your-email@example.com"
```

### 6.2 Update docker-compose.yml

```yaml
services:
  db:
    environment:
      POSTGRES_DB: your_database_name  # Change from default
```

## 7. Environment Variables

Update `.env.example` or create your own `.env` file:

```bash
# Required for production
JWT_SECRET=your-strong-secret-key-here
DATABASE_URL=jdbc:postgresql://host:5432/your_database
DATABASE_USERNAME=your_username
DATABASE_PASSWORD=your_password

# Optional
SPRING_PROFILES_ACTIVE=production
CODECOV_TOKEN=your_codecov_token
SNYK_TOKEN=your_snyk_token
```

## 8. Testing

### 8.1 Update Test Data

Modify test factories and entities to match your domain:

```kotlin
// Example: Update UserFactory
object UserFactory {
    fun create(): User {
        return User(
            id = 1L,
            username = "testuser",
            email = "test@example.com",
            password = passwordEncoder.encode("password123"),
            roles = listOf(Role.ADMIN)
        )
    }
}
```

### 8.2 Run Tests

```bash
# Run all tests
./gradlew test

# Generate coverage report
./gradlew jacocoTestReport

# View coverage report
open build/reports/coverage/index.html
```

## Additional Customization

### Add New Features

The template structure supports easy addition of:

- **New Controllers**: Add to `src/main/kotlin/com/yourcompany/yourproject/api/`
- **New Entities**: Add to `src/main/kotlin/com/yourcompany/yourproject/entity/`
- **New DTOs**: Add to `src/main/kotlin/com/yourcompany/yourproject/api/request/` and `response/`
- **New Repositories**: Add to `src/main/kotlin/com/yourcompany/yourproject/repository/`

### Security Configuration

Modify `src/main/kotlin/com/yourcompany/yourproject/security/SecurityConfig.kt`:

```kotlin
// Add new security filters
// Change authentication methods
// Add role-based access control
```

## Next Steps

1. **Review all files** - Check for hardcoded values
2. **Update documentation** - Modify README.md for your project
3. **Test thoroughly** - Run all tests before deployment
4. **Set up CI/CD** - Configure GitHub Actions for your workflow
5. **Deploy** - Follow your deployment strategy

## Support

For issues or questions:
- Open an issue on GitHub
- Check the [FAQ](FAQ.md)
- Review the [API Documentation](https://your-project.swagger-ui/index.html)
