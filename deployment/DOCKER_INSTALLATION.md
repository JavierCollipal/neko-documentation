# 🐾✨ Docker Installation Guide for Ubuntu ✨🐾

**Quick guide to install Docker and Docker Compose on Ubuntu, nyaa~!**

---

## 🚀 Quick Installation (Recommended)

```bash
# 1. Update package index
sudo apt update

# 2. Install Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh

# 3. Add your user to docker group (to run without sudo)
sudo usermod -aG docker $USER

# 4. Log out and back in for group changes to take effect
# OR use: newgrp docker

# 5. Verify installation
docker --version
docker compose version

# 6. Test Docker
docker run hello-world
```

---

## 📦 Manual Installation (Ubuntu 20.04+)

### Step 1: Remove old versions

```bash
sudo apt remove docker docker-engine docker.io containerd runc
```

### Step 2: Install dependencies

```bash
sudo apt update
sudo apt install -y \
    ca-certificates \
    curl \
    gnupg \
    lsb-release
```

### Step 3: Add Docker's official GPG key

```bash
sudo mkdir -p /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
```

### Step 4: Set up the repository

```bash
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu \
  $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
```

### Step 5: Install Docker Engine

```bash
sudo apt update
sudo apt install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
```

### Step 6: Add user to docker group

```bash
sudo usermod -aG docker $USER
newgrp docker
```

### Step 7: Verify installation

```bash
docker --version
docker compose version
docker run hello-world
```

---

## ✅ Post-Installation Verification

```bash
# Check Docker is running
sudo systemctl status docker

# Check Docker Compose
docker compose version

# Test with Neko Defense System
cd ~/Documents/github/
docker compose config
```

---

## 🎯 Start Neko Defense System

Once Docker is installed:

```bash
cd ~/Documents/github/

# Build all containers
docker compose build

# Start all services
docker compose up -d

# View logs
docker compose logs -f

# Check status
docker compose ps
```

---

## 🔧 Troubleshooting

### Permission denied errors

```bash
# Add yourself to docker group
sudo usermod -aG docker $USER

# Apply group changes
newgrp docker
```

### Docker daemon not running

```bash
# Start Docker service
sudo systemctl start docker

# Enable on boot
sudo systemctl enable docker
```

### Docker Compose not found

Docker Compose V2 is now integrated into Docker as `docker compose` (without hyphen). If you have an old version:

```bash
# Remove old docker-compose
sudo apt remove docker-compose

# Reinstall Docker with compose plugin
sudo apt install docker-compose-plugin
```

---

## 📚 Useful Docker Commands

```bash
# View running containers
docker ps

# View all containers
docker ps -a

# Stop all containers
docker stop $(docker ps -aq)

# Remove all containers
docker rm $(docker ps -aq)

# View images
docker images

# Remove unused images
docker image prune

# View system usage
docker system df

# Clean up everything
docker system prune -a
```

---

## 🐾 Ready to Deploy!

After installation, follow the **README-DOCKER.md** guide to deploy the Neko Defense System!

*Built with MAXIMUM NEKO POWER, nyaa~!* 🐾✨
