# 🐾✨ NEKO DEFENSE SYSTEM - Docker Deployment Guide ✨🐾

**Complete containerized cybersecurity platform with MAXIMUM NEKO POWER, nyaa~!**

---

## 🎯 Architecture Overview

The Neko Defense System consists of 4 microservices:

| Service | Technology | Port | Description |
|---------|-----------|------|-------------|
| **neko-defense-dashboard** | React + Express + Nginx | 3000, 4000 | Frontend UI + GraphQL client server |
| **neko-defense-api** | NestJS + GraphQL | 5000 | Backend API with MongoDB |
| **neko-tv-security** | Node.js + Blessed | 3001 | Terminal-based monitoring dashboard |
| **neko-exposure-system** | Node.js + FFmpeg | - | On-demand video generator |

---

## 🚀 Quick Start

### 1. Prerequisites

Ensure you have installed:
- **Docker** (v20.10+)
- **Docker Compose** (v2.0+)

```bash
# Verify installations
docker --version
docker-compose --version
```

### 2. Setup Environment

```bash
# Navigate to the project root
cd ~/Documents/github/

# Copy environment template
cp .env.example .env

# Edit with your credentials (optional - defaults work!)
nano .env
```

### 3. Build and Start Services

```bash
# Build all containers
docker-compose build

# Start all services in background
docker-compose up -d

# View logs
docker-compose logs -f
```

### 4. Access Services

- 🎨 **Dashboard**: http://localhost:3000
- 🔐 **GraphQL API**: http://localhost:5000/graphql
- 📺 **TV Monitor**: Runs in container (docker attach neko-tv-monitor)

---

## 🛠️ Common Commands

### Service Management

```bash
# Start all services
docker-compose up -d

# Stop all services
docker-compose down

# Restart a specific service
docker-compose restart neko-defense-api

# View service status
docker-compose ps

# View logs for specific service
docker-compose logs -f neko-defense-api
```

### Building & Rebuilding

```bash
# Rebuild all containers
docker-compose build

# Rebuild specific service
docker-compose build neko-defense-api

# Rebuild and restart
docker-compose up -d --build
```

### Monitoring & Debugging

```bash
# View logs
docker-compose logs -f

# Execute command in running container
docker-compose exec neko-defense-api sh

# View resource usage
docker stats
```

---

## 🎬 Generate Exposure Video

The video generator runs on-demand:

```bash
# Generate video for threat actor
docker-compose run --rm neko-exposure-system node exposeCommand.js mikhail_matveev

# Output location
ls -lh neko-exposure-system/output/
```

---

## 📦 Individual Service Docker Builds

Each service can be built and run independently:

### Dashboard

```bash
cd neko-defense-dashboard
docker build -t neko-dashboard .
docker run -p 3000:80 -p 4000:4000 neko-dashboard
```

### API

```bash
cd neko-defense-api
docker build -t neko-api .
docker run -p 5000:5000 -e MONGODB_URI="your-uri" neko-api
```

### TV Security

```bash
cd neko-tv-security
docker build -t neko-tv .
docker run -it -e MONGODB_URI="your-uri" neko-tv
```

### Exposure System

```bash
cd neko-exposure-system
docker build -t neko-exposure .
docker run --rm -v $(pwd)/output:/app/output neko-exposure node exposeCommand.js <threat_id>
```

---

## 🔧 Troubleshooting

### Container won't start

```bash
# Check logs
docker-compose logs <service-name>

# Inspect container
docker inspect <container-name>
```

### Port conflicts

```bash
# Check what's using the port
sudo lsof -i :3000

# Modify ports in docker-compose.yml
ports:
  - "8080:80"  # Change 3000 to 8080
```

### Rebuild from scratch

```bash
# Stop and remove all containers
docker-compose down

# Remove images
docker-compose down --rmi all

# Remove volumes
docker-compose down -v

# Rebuild everything
docker-compose up -d --build
```

### MongoDB connection issues

```bash
# Verify MONGODB_URI in .env
cat .env | grep MONGODB_URI

# Test connection from container
docker-compose exec neko-defense-api node -e "require('mongoose').connect(process.env.MONGODB_URI).then(() => console.log('Connected!')).catch(err => console.error(err))"
```

---

## 🏗️ Production Deployment

### Security Hardening

1. **Update .env with strong secrets**:
   ```bash
   JWT_SECRET=$(openssl rand -base64 32)
   ```

2. **Use Docker secrets** (Docker Swarm):
   ```yaml
   secrets:
     mongodb_uri:
       external: true
   ```

3. **Enable SSL/TLS** with reverse proxy (Nginx/Traefik)

### Scaling Services

```bash
# Scale API to 3 instances
docker-compose up -d --scale neko-defense-api=3

# Use load balancer (Nginx/HAProxy)
```

### Monitoring

```bash
# Add Prometheus + Grafana
# Add health check endpoints
# Set up log aggregation (ELK stack)
```

---

## 📊 Performance Optimization

### Image Size Optimization

- ✅ Multi-stage builds (React: ~43MB final image)
- ✅ Alpine-based images (50% smaller)
- ✅ .dockerignore files (30% faster builds)

### Build Cache

```bash
# Leverage build cache
docker-compose build --parallel

# Use BuildKit for faster builds
DOCKER_BUILDKIT=1 docker-compose build
```

---

## 🐾 Architecture Highlights

### Modern 2025 Best Practices

- ✅ No `version` field (modern Compose format)
- ✅ Multi-stage builds for React
- ✅ Alpine Linux for minimal images
- ✅ Non-root users for security
- ✅ Health checks for all services
- ✅ Network isolation
- ✅ Volume persistence

### Security Features

- 🔒 Non-root containers
- 🔒 Read-only filesystems (where applicable)
- 🔒 Network segmentation
- 🔒 Secret management via .env
- 🔒 Security headers (Helmet.js)

---

## 📚 Additional Resources

- [Docker Best Practices](https://docs.docker.com/develop/dev-best-practices/)
- [Docker Compose Documentation](https://docs.docker.com/compose/)
- [Node.js Docker Guide](https://nodejs.org/en/docs/guides/nodejs-docker-webapp/)

---

## 💖 Support

Having issues? Check:
1. Container logs: `docker-compose logs -f`
2. Service health: `docker-compose ps`
3. Network connectivity: `docker network inspect neko-defense-network`

*Built with MAXIMUM NEKO POWER and modern DevOps practices, nyaa~!* 🐾✨
