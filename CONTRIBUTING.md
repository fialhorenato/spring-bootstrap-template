# Contributing to Spring Bootstrap Template

Thank you for your interest in contributing to this template! This document provides guidelines for contributing.

## How to Contribute

### Reporting Bugs

Before reporting a bug:
1. Check if the issue already exists in the issue tracker
2. Provide clear steps to reproduce the bug
3. Include expected vs actual behavior
4. Mention your environment (OS, JDK version, etc.)

### Suggesting Enhancements

When suggesting enhancements:
1. Explain the use case or problem you're trying to solve
2. Describe how your suggestion would work
3. Consider compatibility with existing features

### Pull Requests

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes
4. Test thoroughly
5. Commit with clear messages
6. Push to your fork
7. Submit a pull request

### Code Style

This project follows these conventions:

- **Language**: Kotlin
- **Formatting**: Standard Kotlin formatting
- **Naming**:
  - Classes: PascalCase (e.g., `UserController`)
  - Functions: camelCase (e.g., `getUserById`)
  - Constants: UPPER_SNAKE_CASE (e.g., `MAX_PAGE_SIZE`)
  - Private members: prefix with underscore (e.g., `_privateField`)

### Testing

All contributions must include tests:

```kotlin
class MyFeatureTest {
    @Test
    fun `should do something`() {
        // Test code
    }
}
```

Run tests before submitting:
```bash
./gradlew test
```

### Documentation

Update documentation when adding new features:

- README.md for user-facing changes
- docs/CUSTOMIZATION.md for template changes
- Add inline comments for complex logic

## Project Structure

```
spring-bootstrap-template/
├── src/main/kotlin/           # Source code
├── src/test/kotlin/           # Tests
├── src/main/resources/        # Configuration files
├── docs/                      # Documentation
├── .github/workflows/         # CI/CD pipelines
└── setup.sh                   # Setup script
```

## Development Workflow

1. Clone the repository
2. Create a feature branch
3. Make changes
4. Run tests
5. Submit a pull request

## Style Guide

See [Kotlin Coding Conventions](https://kotlinlang.org/docs/coding-conventions.html)

## Code of Conduct

Please be respectful and inclusive in all interactions.

## License

By contributing, you agree that your contributions will be licensed under the MIT License.
