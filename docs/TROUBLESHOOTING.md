# 🛠️ Velora Troubleshooting Guide

This guide helps you resolve common issues when setting up and running Velora locally.

## 📋 Table of Contents

- [Environment Setup Issues](#environment-setup-issues)
- [Database Connection Problems](#database-connection-problems)
- [Authentication Issues](#authentication-issues)
- [Build and Runtime Errors](#build-and-runtime-errors)
- [Node Mode Modal Issues](#node-mode-modal-issues)
- [Performance Issues](#performance-issues)
- [Getting Help](#getting-help)

---

## 🔧 Environment Setup Issues

### **Issue: Node.js Version Incompatible**

**Error Message:**
```
Error: Node.js version 16.x is not supported. Please upgrade to Node.js 18 or higher.
```

**Solution:**
1. Check your Node.js version:
   ```bash
   node --version
   ```

2. If version is below 18, upgrade Node.js:
   - **Windows/Mac**: Download from [nodejs.org](https://nodejs.org/)
   - **Linux**: Use Node Version Manager (nvm):
     ```bash
     nvm install 18
     nvm use 18
     ```

### **Issue: Package Installation Fails**

**Error Message:**
```
npm ERR! code ENOENT
npm ERR! syscall open
npm ERR! path /path/to/package.json
```

**Solution:**
1. Ensure you're in the correct directory:
   ```bash
   pwd  # Check current directory
   ls   # Verify package.json exists
   ```

2. Clear npm cache and reinstall:
   ```bash
   npm cache clean --force
   rm -rf node_modules package-lock.json
   npm install
   ```

### **Issue: Permission Denied (Linux/Mac)**

**Error Message:**
```
EACCES: permission denied, access '/usr/local/lib/node_modules'
```

**Solution:**
1. Use a Node version manager (recommended):
   ```bash
   # Install nvm
   curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
   
   # Install and use Node.js
   nvm install 18
   nvm use 18
   ```

2. Or fix npm permissions:
   ```bash
   sudo chown -R $(whoami) ~/.npm
   ```

---

## 🗄️ Database Connection Problems

### **Issue: Database Connection Failed**

**Error Message:**
```
Error: connect ECONNREFUSED 127.0.0.1:5432
```

**Solution:**
1. **Check your DATABASE_URL**:
   ```bash
   echo $DATABASE_URL
   ```

2. **Verify NeonDB connection string format**:
   ```
   postgresql://username:password@ep-xxx.region.neon.tech/database?sslmode=require
   ```

3. **Test connection**:
   ```bash
   npm run db:studio
   ```

4. **Common fixes**:
   - Ensure your NeonDB project is active
   - Check if your IP is whitelisted (if using IP restrictions)
   - Verify the connection string is correct

### **Issue: Database Schema Not Found**

**Error Message:**
```
Error: relation "node" does not exist
```

**Solution:**
1. **Generate and push schema**:
   ```bash
   npm run db:generate
   npm run db:push
   ```

2. **Seed the database**:
   ```bash
   npm run seed
   ```

3. **Verify tables exist**:
   ```bash
   npm run db:studio
   ```

### **Issue: Migration Conflicts**

**Error Message:**
```
Error: Migration conflict detected
```

**Solution:**
1. **Reset database** (⚠️ **WARNING**: This will delete all data):
   ```bash
   npm run db:drop
   npm run db:generate
   npm run db:push
   npm run seed
   ```

2. **Or resolve conflicts manually**:
   - Check `drizzle/` folder for conflicting migrations
   - Delete conflicting migration files
   - Regenerate migrations

---

## 🔐 Authentication Issues

### **Issue: OAuth Provider Not Working**

**Error Message:**
```
Error: OAuth provider configuration is missing
```

**Solution:**
1. **Check environment variables**:
   ```bash
   # GitHub OAuth
   echo $GITHUB_CLIENT_ID
   echo $GITHUB_CLIENT_SECRET
   
   # Google OAuth
   echo $GOOGLE_CLIENT_ID
   echo $GOOGLE_CLIENT_SECRET
   ```

2. **Verify OAuth app configuration**:
   - **GitHub**: Check redirect URL is `http://localhost:3000/api/auth/callback/github`
   - **Google**: Check authorized redirect URIs include `http://localhost:3000/api/auth/callback/google`

3. **Test with minimal configuration**:
   ```env
   NEXTAUTH_SECRET="your-secret-key-here"
   NEXTAUTH_URL="http://localhost:3000"
   ```

### **Issue: NextAuth Configuration Error**

**Error Message:**
```
Error: NEXTAUTH_SECRET is not set
```

**Solution:**
1. **Generate a secure secret**:
   ```bash
   openssl rand -base64 32
   ```

2. **Add to .env file**:
   ```env
   NEXTAUTH_SECRET="your-generated-secret-here"
   NEXTAUTH_URL="http://localhost:3000"
   ```

---

## 🏗️ Build and Runtime Errors

### **Issue: TypeScript Compilation Errors**

**Error Message:**
```
Type error: Property 'x' does not exist on type 'y'
```

**Solution:**
1. **Run type checking**:
   ```bash
   npm run type-check
   ```

2. **Common fixes**:
   - Update type definitions: `npm install @types/node @types/react`
   - Check for missing imports
   - Verify component prop types

3. **Temporary workaround** (not recommended for production):
   ```typescript
   // @ts-ignore
   // Your code here
   ```

### **Issue: Module Not Found**

**Error Message:**
```
Module not found: Can't resolve '@/components/ui/button'
```

**Solution:**
1. **Check import paths**:
   ```typescript
   // Correct
   import { Button } from "@/components/ui/button"
   
   // Incorrect
   import { Button } from "./components/ui/button"
   ```

2. **Verify tsconfig.json paths**:
   ```json
   {
     "compilerOptions": {
       "paths": {
         "@/*": ["./src/*"]
       }
     }
   }
   ```

3. **Install missing components**:
   ```bash
   npx shadcn-ui@latest add button
   ```

### **Issue: Build Memory Issues**

**Error Message:**
```
JavaScript heap out of memory
```

**Solution:**
1. **Increase Node.js memory limit**:
   ```bash
   export NODE_OPTIONS="--max-old-space-size=4096"
   npm run build
   ```

2. **Or use npm script**:
   ```json
   {
     "scripts": {
       "build": "NODE_OPTIONS='--max-old-space-size=4096' next build"
     }
   }
   ```

---

## 🎯 Node Mode Modal Issues

### **Issue: Modal Not Opening**

**Symptoms:**
- Node button click doesn't open modal
- Console shows "onToggleNodeMode is undefined"

**Solution:**
1. **Check if you're on the correct page**:
   - Home page: `/home` (uses `home-page-contents.tsx`)
   - Chat page: `/home/c/[chatId]` (uses `chat-page.tsx`)

2. **Verify component integration**:
   ```typescript
   // In chat-page.tsx, ensure these props are passed:
   <ChatInput
     isNodeMode={isNodeMode}
     onToggleNodeMode={handleToggleNodeMode}
   />
   ```

3. **Check console for errors**:
   ```bash
   # Open browser dev tools (F12)
   # Check Console tab for errors
   ```

### **Issue: Modal Opens But No Specialists Show**

**Solution:**
1. **Check database seeding**:
   ```bash
   npm run seed
   npm run list  # Verify specialists are seeded
   ```

2. **Verify tRPC connection**:
   - Check Network tab in dev tools
   - Look for failed API calls

3. **Check component rendering**:
   ```typescript
   // Add debugging to node-workspace-modal.tsx
   console.log('Healthcare specialists:', healthcareSpecialists);
   ```

---

## ⚡ Performance Issues

### **Issue: Slow Page Load**

**Solution:**
1. **Check bundle size**:
   ```bash
   npm run build
   # Look for bundle analysis in output
   ```

2. **Optimize images**:
   - Use Next.js Image component
   - Compress images before adding to `/public`

3. **Enable compression**:
   ```javascript
   // next.config.js
   module.exports = {
     compress: true,
   }
   ```

### **Issue: High Memory Usage**

**Solution:**
1. **Check for memory leaks**:
   - Use React DevTools Profiler
   - Monitor memory usage in dev tools

2. **Optimize re-renders**:
   ```typescript
   // Use React.memo for expensive components
   const ExpensiveComponent = React.memo(({ data }) => {
     // Component logic
   });
   ```

---

## 🆘 Getting Help

### **Before Asking for Help**

1. **Check this troubleshooting guide**
2. **Search existing issues**: [GitHub Issues](https://github.com/your-username/velora/issues)
3. **Check the console for errors**
4. **Verify your environment setup**

### **When Reporting Issues**

Please include:

1. **Environment Information**:
   ```bash
   node --version
   npm --version
   npm list next react typescript
   ```

2. **Error Messages**: Copy the full error message
3. **Steps to Reproduce**: What did you do before the error?
4. **Expected vs Actual Behavior**: What should happen vs what actually happens
5. **Screenshots**: If applicable

### **Community Support**

- **GitHub Issues**: [Report bugs and request features](https://github.com/your-username/velora/issues)
- **Discord Community**: [Join our developer community](https://discord.gg/velora)
- **Documentation**: [Full documentation](https://docs.velora.ai)

### **Emergency Fixes**

If nothing else works, try a clean setup:

```bash
# 1. Backup your .env file
cp .env .env.backup

# 2. Clean everything
rm -rf node_modules package-lock.json .next

# 3. Reinstall
npm install

# 4. Restore .env
cp .env.backup .env

# 5. Setup database
npm run db:push
npm run seed

# 6. Start development
npm run dev
```

---

## 📚 Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [tRPC Documentation](https://trpc.io/docs)
- [Drizzle ORM Documentation](https://orm.drizzle.team/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [shadcn/ui Documentation](https://ui.shadcn.com/)

---

**Remember**: Most issues are environment-related. Double-check your setup before diving deep into code! 🚀
