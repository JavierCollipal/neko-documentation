# 🐾⚡ NEKO DEFENSE SYSTEM - Microservices Port Configuration Guide ⚡🐾

**CRITICAL DOCUMENTATION - READ THIS TO AVOID CONNECTION ISSUES, NYAA~!** 😺🔧

---

## 📋 **MICROSERVICES ARCHITECTURE OVERVIEW**

Your Neko Defense System consists of **3 main microservices**:

| Service | Technology | Default Port | Purpose |
|---------|-----------|--------------|---------|
| **React Dashboard** | React + Express | 3000 (dev) / 5000 (prod) | Frontend UI |
| **REST API Server** | Express.js | 5001 | REST endpoints for dashboard |
| **GraphQL API** | NestJS + Apollo | 4000 (default) / 5001 (current) | GraphQL queries for threat actors |

---

## 🚨 **THE BUG THAT WAS FIXED**

### **What Caused Connection Loss**:
1. **Apollo Client** was HARD-CODED to `http://localhost:4000/graphql`
2. **NestJS GraphQL API** was configured to run on PORT **5001** (via .env)
3. **Port mismatch** = Connection always failed! 💥

### **The Solution Applied** ✅:
1. ✅ Made Apollo Client use **environment variable** `REACT_APP_GRAPHQL_URL`
2. ✅ Added **auto-reconnection logic** with retry (up to 5 attempts)
3. ✅ Added **error logging** for network issues
4. ✅ Updated `.env` files with proper port configurations

---

## 🔧 **PORT CONFIGURATION FILES**

### **neko-defense-dashboard/.env**
```bash
# REST API (Express server on dashboard)
REACT_APP_API_URL=http://localhost:5001/api

# GraphQL API (NestJS server) - MUST MATCH neko-defense-api PORT!
REACT_APP_GRAPHQL_URL=http://localhost:5001/graphql
```

### **neko-defense-api/.env**
```bash
# NestJS GraphQL API Port
PORT=5001

# CORS - Must include dashboard port!
CORS_ORIGIN=http://localhost:3000,http://localhost:5000
```

---

## ⚙️ **HOW TO CHANGE PORTS**

### **Scenario 1: Change GraphQL API Port**
1. Edit `neko-defense-api/.env`:
   ```bash
   PORT=4000  # Your new port
   ```

2. Edit `neko-defense-dashboard/.env`:
   ```bash
   REACT_APP_GRAPHQL_URL=http://localhost:4000/graphql
   ```

3. **Restart both services!**

### **Scenario 2: Change Dashboard Port**
1. Edit `neko-defense-dashboard/.env`:
   ```bash
   PORT=3001  # Your new port
   ```

2. Update CORS in `neko-defense-api/.env`:
   ```bash
   CORS_ORIGIN=http://localhost:3001,http://localhost:5000
   ```

3. **Restart both services!**

---

## 🚀 **STARTING THE MICROSERVICES**

### **Start Everything in Correct Order**:

1. **Start GraphQL API** (NestJS):
   ```bash
   cd ~/Documents/github/neko-defense-api
   npm run start:dev
   # Should see: "✅ NEKO DEFENSE API running on port 5001, desu~!"
   ```

2. **Start Dashboard** (React):
   ```bash
   cd ~/Documents/github/neko-defense-dashboard
   npm start
   # React dev server will start on port 3000
   ```

3. **Verify Connections**:
   ```bash
   # Test GraphQL API
   curl http://localhost:5001/graphql \
     -H "Content-Type: application/json" \
     -d '{"query":"{ __typename }"}'

   # Test REST API
   curl http://localhost:5001/api/health

   # Test Dashboard
   curl http://localhost:3000
   ```

---

## 🐛 **DEBUGGING CONNECTION ISSUES**

### **Check 1: Verify Services Are Running**
```bash
# Check all Node.js processes
ps aux | grep node

# Check listening ports
netstat -tlnp | grep -E "(3000|4000|5000|5001)"
```

### **Check 2: Verify Environment Variables**
```bash
# Dashboard should load REACT_APP_GRAPHQL_URL
cd ~/Documents/github/neko-defense-dashboard
cat .env | grep REACT_APP_GRAPHQL_URL

# API should load PORT
cd ~/Documents/github/neko-defense-api
cat .env | grep "^PORT="
```

### **Check 3: Browser Console Logs**
Open browser DevTools (F12) and look for:
- `🎮 [Apollo Client] Initializing GraphQL client, nyaa~!`
- `🔗 [Apollo Client] Connecting to GraphQL API: http://localhost:XXXX/graphql`
- `🔄 [Apollo Client] Connection error, retrying...` (if connection fails)

### **Check 4: Test GraphQL Endpoint**
```bash
# Should return JSON response
curl -X POST http://localhost:5001/graphql \
  -H "Content-Type: application/json" \
  -d '{"query":"{ __typename }"}'
```

---

## 🎯 **AUTO-RECONNECTION FEATURES**

The Apollo Client now has **MAXIMUM RESILIENCE**, nyaa~! 🐾⚡

### **Retry Policy**:
- **Max attempts**: 5
- **Initial delay**: 300ms
- **Max delay**: 5000ms
- **Jitter**: Enabled (random delays to prevent thundering herd)

### **Error Handling**:
- GraphQL errors logged with location and path
- Network errors trigger automatic retry
- Partial data returned when possible

---

## 📚 **COMMON PORT CONFLICTS**

### **Port Already In Use?**
```bash
# Find what's using a port
lsof -i :5001
# Or
netstat -tlnp | grep 5001

# Kill the process
kill -9 <PID>
```

### **Nginx Blocking Ports?**
If you see `502 Bad Gateway` from nginx:
```bash
# Check nginx config
sudo nginx -t

# Reload nginx
sudo systemctl reload nginx
```

---

## ✅ **POST-FIX CHECKLIST**

After making ANY changes to ports or configuration:

- [ ] Restart GraphQL API (`npm run start:dev` in neko-defense-api)
- [ ] Restart React Dashboard (`npm start` in neko-defense-dashboard)
- [ ] Clear browser cache (Ctrl+Shift+R)
- [ ] Check browser console for connection logs
- [ ] Verify GraphQL endpoint with curl
- [ ] Test dashboard loads threat actors correctly

---

## 🎮 **FILE LOCATIONS**

All projects in standardized location (IMMUTABLE RULE!):

```
/home/wakibaka/Documents/github/
├── neko-defense-dashboard/      # React dashboard
│   ├── src/apollo/client.js     # Apollo Client config (NOW DYNAMIC!)
│   ├── .env                     # Port configuration
│   └── server/index.js          # Express REST API
│
├── neko-defense-api/            # NestJS GraphQL API
│   ├── src/main.ts              # Entry point (reads PORT from .env)
│   ├── .env                     # Port configuration
│   └── src/app.module.ts        # GraphQL module
│
└── NEKO_MICROSERVICES_PORT_CONFIG.md  # This file!
```

---

## 💖 **SUMMARY**

**What Changed**:
1. Apollo Client now uses `REACT_APP_GRAPHQL_URL` environment variable
2. Auto-reconnection with 5 retry attempts
3. Better error logging for debugging
4. Environment files updated with correct ports

**Current Configuration**:
- Dashboard: Port **3000** (dev server)
- REST API: Port **5001**
- GraphQL API: Port **5001** (check your .env!)

**Remember**: Always restart services after changing .env files, nyaa~! 🐾✨

---

**Generated with MAXIMUM NEKO POWER by Neko-Arc Defense System** 😺⚡
**Last Updated**: October 14, 2025 🗓️
