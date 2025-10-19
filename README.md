# Neko Documentation Repository

**Centralized documentation for all Neko-Arc development projects**

This repository contains organized documentation for the Neko Defense System ecosystem, including architectural guides, deployment procedures, security reports, and ability evolution tracking.

## Repository Structure

```
neko-documentation/
├── abilities/          - Neko-Arc ability evolution and learning documentation
├── architecture/       - System architecture and design documents
├── configuration/      - Configuration guides and port mappings
├── deployment/         - Deployment guides, Docker setup, worldwide deployment
├── guides/             - User guides, tutorials, and integration documentation
├── reports/            - Project completion reports and summaries
└── security/           - Security hardening guides and threat reports
```

## Directory Contents

### `/abilities/` - Ability Evolution Documentation
Documentation tracking Neko-Arc's learned abilities and capability development.

- **PUPPETEER-ABILITY-EVOLUTION-2025.md** - Complete evolution of Puppeteer automation abilities from basic scripts to visual demonstration with MongoDB persistence

### `/architecture/` - System Architecture
High-level system designs and architectural decisions.

- **DINA_VALECH_UPGRADE_ARCHITECTURE.md** - Integration architecture for DINA AI Agent with Valech testimony database
- **NEKO_CANARY_TOKEN_SYSTEM_ARCHITECTURE.md** - Canary token system for detecting data breaches and unauthorized access
- **VALECH_INGESTION_ARCHITECTURE.md** - Architecture for ingesting Chilean Valech Commission testimonies into MongoDB

### `/configuration/` - Configuration Documentation
Configuration guides and service port mappings.

- **NEKO_MICROSERVICES_PORT_CONFIG.md** - Port allocation table for all Neko microservices (React frontends, GraphQL APIs, Express services)

### `/deployment/` - Deployment Guides
Docker setup, installation procedures, and worldwide deployment documentation.

- **DOCKER_INSTALLATION.md** - Complete Docker and Docker Compose installation guide for Ubuntu
- **NEKO_WORLDWIDE_DEPLOYMENT_COMPLETE.md** - Worldwide deployment completion report with Vercel configuration
- **README-DOCKER.md** - Docker containerization guide for Neko Defense Dashboard

### `/guides/` - User Guides and Tutorials
Comprehensive guides for development practices and integrations.

- **COMPREHENSIVE_FUNCTIONAL_PROGRAMMING_GUIDE.md** - Complete guide to functional programming patterns in validation pipelines
- **YOUTUBE-INTEGRATION-README.md** - YouTube API integration documentation
- **YOUTUBE-SETUP-GUIDE.md** - Step-by-step YouTube API setup and configuration

### `/reports/` - Project Reports
Project completion summaries and implementation reports.

- **VALECH_COMPLETE_REPORT.md** - Complete Valech Commission testimony ingestion report
- **VALECH_FINAL_SAVE_CONFIRMATION.md** - Final confirmation of Valech data save to MongoDB
- **VALECH_INGESTION_SUMMARY.md** - Summary of Valech testimony ingestion process
- **VALECH_V2_UPGRADE_COMPLETE_REPORT.md** - V2 upgrade report with enhanced data structure

### `/security/` - Security Documentation
Security hardening procedures and threat intelligence reports.

- **GITHUB_SECURITY_HARDENING_GUIDE.md** - GitHub repository security hardening with secrets scanning and vulnerability detection
- **NEKO_DEFENSE_2025_SECURITY_REPORT.md** - 2025 security posture report for Neko Defense System

## Total Documentation

- **17 markdown files**
- **7 organized categories**
- Comprehensive coverage of development, deployment, security, and architecture

## How to Use This Repository

### For Development
1. Check `/guides/` for development best practices
2. Review `/architecture/` before making structural changes
3. Consult `/configuration/` for service port assignments

### For Deployment
1. Follow `/deployment/` guides for Docker and production setup
2. Review `/security/` for hardening procedures
3. Check `/reports/` for deployment completion examples

### For Security
1. Read `/security/` guides before exposing services
2. Implement recommendations from security reports
3. Follow credential management protocols

### For Learning
1. Explore `/abilities/` to see capability evolution
2. Study `/architecture/` to understand system design
3. Read `/guides/` for advanced programming patterns

## Related Projects

This documentation supports the following repositories:

- **neko-defense-dashboard** - Main defense system dashboard (React + GraphQL)
- **neko-defense-api** - Defense API microservice (Express + MongoDB)
- **neko-exposure-system** - YouTube threat actor exposure video generator
- **neko-video-tools** - Video editing utilities for content creation
- **puppeteer-microservice** - Browser automation microservice with error persistence
- **ctb-carga-engine-ms** - CTB Carga microservice engine

## Maintenance

- Documentation is continuously updated as projects evolve
- All markdown files follow GitHub-flavored markdown specification
- Files are organized by category for easy navigation
- Regular audits ensure documentation stays current

## Contributing

When adding new documentation:

1. Place files in the appropriate category directory
2. Use descriptive filenames with ALL_CAPS_WITH_UNDERSCORES.md format
3. Include clear headings and table of contents for long documents
4. Add cross-references to related documentation
5. Update this README.md with the new file listing

## License

All documentation is maintained by wakibaka and Neko-Arc for the Neko Defense System ecosystem.

---

*Built with maximum neko power!* 🐾✨
