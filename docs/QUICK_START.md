# ⚡ Velora Quick Start Guide

Get Velora running locally in **5 minutes** or less!

## 🚀 **One-Command Setup**

### **Windows Users**
```bash
# Run the automated setup script
scripts\setup.bat
```

### **Mac/Linux Users**
```bash
# Make script executable and run
chmod +x scripts/setup.sh
./scripts/setup.sh
```

### **Manual Setup (All Platforms)**
```bash
# 1. Install dependencies
npm install

# 2. Create environment file
cp .env.example .env

# 3. Edit .env with your credentials (see below)

# 4. Setup database
npm run db:push
npm run seed

# 5. Start development server
npm run dev
```

---

## 🔑 **Required Environment Variables**

Edit your `.env` file with these **minimum required** variables:

```env
# Database (Required)
DATABASE_URL="postgresql://username:password@ep-xxx.region.neon.tech/velora?sslmode=require"

# Authentication (Required)
NEXTAUTH_SECRET="your-super-secret-key-here-minimum-32-characters"
NEXTAUTH_URL="http://localhost:3000"

# AI (Required for chat functionality)
NEXT_PUBLIC_GEMINI_API_KEY="your_gemini_api_key_here"
```

### **Getting Your Credentials**

#### **1. Database (NeonDB)**
1. Go to [neon.tech](https://neon.tech)
2. Sign up and create a new project
3. Copy the connection string from the dashboard
4. Paste it as `DATABASE_URL`

#### **2. Authentication Secret**
```bash
# Generate a secure secret
openssl rand -base64 32
```

#### **3. Gemini API Key**
1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Create a new API key
3. Copy and paste as `NEXT_PUBLIC_GEMINI_API_KEY`

---

## ✅ **Verify Setup**

After running the setup, you should see:

```bash
🎉 SETUP COMPLETED SUCCESSFULLY!
✅ Velora is ready for development!

🚀 Start Development:
Run: npm run dev
Then open: http://localhost:3000
```

---

## 🎯 **Test the Application**

1. **Open** [http://localhost:3000](http://localhost:3000)
2. **Sign in** with GitHub or Google (optional)
3. **Click the node button** (grid icon) to open the healthcare specialist workspace
4. **Add specialists** to your team by clicking the + button
5. **Start chatting** with your medical AI team!

---

## 🆘 **Common Issues**

### **Database Connection Failed**
- Check your `DATABASE_URL` format
- Ensure your NeonDB project is active
- Try: `npm run db:studio` to test connection

### **Modal Not Opening**
- Make sure you're on a chat page (`/home/c/[chatId]`)
- Check browser console for errors
- Verify all dependencies are installed

### **Authentication Not Working**
- Check `NEXTAUTH_SECRET` is set
- Verify `NEXTAUTH_URL` matches your local URL
- OAuth providers are optional for basic functionality

---

## 📚 **Next Steps**

- **Read the full [README.md](../README.md)** for detailed documentation
- **Check [TROUBLESHOOTING.md](./TROUBLESHOOTING.md)** for common issues
- **Explore the codebase** starting with `src/app/home/_ui/`
- **Join our community** for support and updates

---

## 🎉 **You're Ready!**

Your Velora healthcare chatbot is now running locally! 

**Happy coding!** 🚀❤️
