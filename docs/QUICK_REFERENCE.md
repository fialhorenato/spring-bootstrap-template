# Quick Reference

## Common Commands

### Build & Run

```bash
# Build project
./gradlew clean build

# Run application (H2)
./gradlew bootRun

# Run with PostgreSQL
SPRING_PROFILES_ACTIVE=local-postgresql ./gradlew bootRun

# Run Docker
docker build -t spring-bootstrap:local .
docker run --rm -p 8080:8080 spring-bootstrap:local
```

### Testing

```bash
# Run all tests
./gradlew test

# Generate coverage report
./gradlew jacocoTestReport

# View coverage
open build/reports/coverage/index.html
```

### Development

```bash
# Watch for changes (devtools)
SPRING_PROFILES_ACTIVE=dev ./gradlew bootRun

# H2 Console
http://localhost:8080/h2-console
```

## Configuration

### Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `PORT` | `8080` | Application port |
| `JWT_SECRET` | *(dev)* | JWT signing key |
| `SPRING_PROFILES_ACTIVE` | `default` | Active profile |
| `DATABASE_URL` | - | PostgreSQL URL |
| `DATABASE_USERNAME` | - | DB username |
| `DATABASE_PASSWORD` | - | DB password |

### Profiles

- **default**: H2 in-memory database
- **dev**: H2 with devtools
- **local-postgresql**: Local PostgreSQL
- **render**: Production (Render.com)

## API Endpoints

| Endpoint | Method | Auth | Description |
|----------|--------|------|-------------|
| `/swagger-ui/index.html` | GET | None | API documentation |
| `/actuator` | GET | None | Health & metrics |
| `/api-docs` | GET | None | OpenAPI spec |
| `/h2-console` | GET | None | H2 console (dev only) |

## Security

### JWT Token Format

```
Authorization: Bearer <token>
```

### Default Roles

- `ROLE_ADMIN` - Full access
- `ROLE_USER` - Standard user access

## Troubleshooting

### Common Issues

**Port already in use:**
```bash
# Check port 8080
lsof -i :8080

# Kill process
kill -9 <PID>
```

**Database connection failed:**
- Check DATABASE_URL in .env
- Verify PostgreSQL is running
- Check firewall settings

**JWT validation failed:**
- Verify JWT_SECRET matches in .env and application.yml
- Token may have expired (default: 24h)

**Build failed:**
```bash
# Clean build
./gradlew clean build --refresh-dependencies
```

## Resources

- [Spring Boot Documentation](https://docs.spring.io/spring-boot/)
- [Kotlin Documentation](https://kotlinlang.org/docs/home.html)
- [Spring Security](https://docs.spring.io/spring-security/reference/)
- [Docker Documentation](https://docs.docker.com/)

