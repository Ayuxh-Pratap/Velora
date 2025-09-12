# 🏥 Velora - AI-Powered Healthcare Chatbot

<div align="center">

![Velora Logo](https://img.shields.io/badge/Velora-Healthcare%20AI-blue?style=for-the-badge&logo=medical-cross&logoColor=white)

**Revolutionary healthcare chatbot with multi-specialist AI teams and sign language support**

[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![tRPC](https://img.shields.io/badge/tRPC-10.0-2596be?style=flat-square)](https://trpc.io/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3.0-38bdf8?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)

</div>

---

## 🌟 **What is Velora?**

Velora is a cutting-edge healthcare chatbot that revolutionizes medical consultations through:

- **🤖 Multi-Specialist AI Teams**: Combine different medical specialists (Cardiology, Neurology, Pediatrics, etc.) for comprehensive consultations
- **👋 Sign Language Support**: Built-in 3D avatar system for sign language translation and learning
- **🎨 Beautiful n8n-Style Interface**: Drag-and-drop node workspace for building custom medical teams
- **🔒 Enterprise-Grade Security**: Full authentication, type-safe APIs, and secure data handling
- **📱 Responsive Design**: Works seamlessly across all devices

---

## 🚀 **Quick Start Guide**

### **Prerequisites**

Before you begin, ensure you have the following installed:

- **Node.js** (v18.0 or higher) - [Download here](https://nodejs.org/)
- **npm** or **yarn** or **pnpm** package manager
- **Git** - [Download here](https://git-scm.com/)

### **Step 1: Clone the Repository**

```bash
# Clone the repository
git clone https://github.com/your-username/velora.git

# Navigate to the project directory
cd velora

# Verify you're in the right directory
ls -la
```

### **Step 2: Install Dependencies**

```bash
# Install all dependencies
npm install

# Or if you prefer yarn
yarn install

# Or if you prefer pnpm
pnpm install
```

> **💡 Pro Tip**: The installation might take a few minutes as it downloads all the necessary packages including Next.js, React, tRPC, and UI components.

### **Step 3: Environment Setup**

Create a `.env` file in the root directory:

```bash
# Create the environment file
touch .env
```

Add the following environment variables to your `.env` file:

```env
# Database Configuration
DATABASE_URL="your_neon_database_connection_string"

# Authentication (GitHub OAuth)
GITHUB_CLIENT_ID="your_github_client_id"
GITHUB_CLIENT_SECRET="your_github_client_secret"

# Authentication (Google OAuth)
GOOGLE_CLIENT_ID="your_google_client_id"
GOOGLE_CLIENT_SECRET="your_google_client_secret"

# AI Configuration
NEXT_PUBLIC_GEMINI_API_KEY="your_gemini_api_key"

# Next.js Configuration
NEXTAUTH_SECRET="your_nextauth_secret_key"
NEXTAUTH_URL="http://localhost:3000"
```

> **🔑 Getting API Keys**: 
> - **NeonDB**: Sign up at [neon.tech](https://neon.tech) and create a new database
> - **GitHub OAuth**: Go to GitHub Settings > Developer settings > OAuth Apps
> - **Google OAuth**: Use [Google Cloud Console](https://console.cloud.google.com/)
> - **Gemini API**: Get your key from [Google AI Studio](https://makersuite.google.com/app/apikey)

### **Step 4: Database Setup**

```bash
# Generate database migrations
npm run db:generate

# Push the schema to your database
npm run db:push

# Seed the database with healthcare specialists
npm run seed
```

> **📊 Database Status**: You can verify your database connection by running `npm run list` to see the seeded healthcare specialists.

### **Step 5: Start the Development Server**

```bash
# Start the development server
npm run dev

# Or with yarn
yarn dev

# Or with pnpm
pnpm dev
```

🎉 **Congratulations!** Your Velora healthcare chatbot is now running at [http://localhost:3000](http://localhost:3000)

---

## 🏗️ **Project Architecture**

```
velora/
├── 📁 src/
│   ├── 📁 app/                    # Next.js App Router
│   │   ├── 📁 home/              # Main application pages
│   │   │   ├── 📁 _ui/           # UI components
│   │   │   │   ├── 📁 components/ # Reusable components
│   │   │   │   ├── 📁 node/      # Node workspace modal
│   │   │   │   └── 📁 model/     # 3D avatar system
│   │   │   └── 📁 c/[chatId]/    # Individual chat pages
│   │   ├── 📁 api/               # API routes
│   │   └── 📁 auth/              # Authentication pages
│   ├── 📁 components/            # Global UI components
│   │   ├── 📁 ui/               # shadcn/ui components
│   │   └── 📁 global/           # Global providers
│   ├── 📁 db/                   # Database configuration
│   │   ├── schema.ts            # Drizzle schema
│   │   └── index.ts             # Database connection
│   ├── 📁 trpc/                 # tRPC configuration
│   │   ├── 📁 client/           # Client-side tRPC
│   │   └── 📁 server/           # Server-side tRPC
│   │       └── 📁 routers/      # API route handlers
│   ├── 📁 utils/                # Utility functions
│   └── 📁 lib/                  # Shared libraries
├── 📁 public/                   # Static assets
├── 📁 drizzle/                  # Database migrations
├── 📄 package.json              # Dependencies and scripts
├── 📄 tailwind.config.js        # Tailwind configuration
├── 📄 tsconfig.json             # TypeScript configuration
└── 📄 README.md                 # This file
```

---

## 🎯 **Key Features Deep Dive**

### **1. Multi-Specialist AI Teams**

Build custom medical teams by combining different specialists:

```typescript
// Example: Combining Cardiology + Pediatrics for child heart issues
const medicalTeam = [
  { specialty: "cardiology", priority: 1 },
  { specialty: "pediatrics", priority: 2 }
];
```

**Available Specialists:**
- 🩺 General Medicine
- 👶 Pediatrics  
- ❤️ Cardiology
- 🧠 Neurology
- 🦠 Infectious Disease
- 🚨 Emergency Medicine
- 🦋 Dermatology
- 🦴 Orthopedics
- 💊 Psychiatry
- 🫀 Gastroenterology

### **2. Sign Language Integration**

```typescript
// 3D Avatar System for Sign Language
import { StudyModeLayout } from "./components/study-mode-layout";

// Automatically translates text to sign language gestures
<StudyModeLayout 
  messages={messages}
  isLoading={isLoading}
  currentInput={currentInput}
/>
```

### **3. Node-Based Workspace**

```typescript
// Drag-and-drop interface for building medical teams
<NodeWorkspaceModal
  isOpen={isNodeMode}
  onClose={() => setIsNodeMode(false)}
/>
```

---

## 🛠️ **Development Commands**

```bash
# Development
npm run dev              # Start development server
npm run build            # Build for production
npm run start            # Start production server

# Database
npm run db:generate      # Generate migrations
npm run db:push          # Push schema to database
npm run db:studio        # Open Drizzle Studio
npm run seed             # Seed healthcare specialists
npm run list             # List seeded specialists

# Code Quality
npm run lint             # Run ESLint
npm run type-check       # Run TypeScript checks
npm run format           # Format code with Prettier
```

---

## 🔧 **Configuration Guide**

### **Database Configuration**

The project uses **NeonDB** (serverless PostgreSQL) with **Drizzle ORM**:

```typescript
// src/db/schema.ts
export const node = pgTable("node", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  specialty: specialtyEnum("specialty").notNull(),
  prompt: text("prompt").notNull(),
  // ... more fields
});
```

### **Authentication Setup**

Velora supports multiple authentication providers:

```typescript
// src/app/api/auth/[...nextauth]/route.ts
export const authOptions: NextAuthOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
};
```

### **AI Integration**

```typescript
// src/trpc/server/routers/ai.ts
export const aiRouter = createTRPCRouter({
  generateResponse: publicProcedure
    .input(generateResponseSchema)
    .mutation(async ({ input }) => {
      // Gemini AI integration with node-based prompting
      const response = await generateAIResponse(input);
      return response;
    }),
});
```

---

## 🎨 **UI Component System**

Velora uses a sophisticated component system:

### **shadcn/ui Components**
```bash
# Add new components
npx shadcn-ui@latest add button
npx shadcn-ui@latest add dialog
npx shadcn-ui@latest add badge
```

### **Custom Components**
```typescript
// Example: Healthcare Node Component
<HealthcareNode
  node={node}
  onSelect={handleSelect}
  onRemove={handleRemove}
  onUpdatePriority={handleUpdatePriority}
/>
```

---

## 🚀 **Deployment Guide**

### **Vercel Deployment (Recommended)**

1. **Connect your repository to Vercel**
2. **Set environment variables** in Vercel dashboard
3. **Deploy automatically** on every push

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

### **Environment Variables for Production**

```env
# Production Database
DATABASE_URL="your_production_database_url"

# Production OAuth
GITHUB_CLIENT_ID="your_production_github_client_id"
GITHUB_CLIENT_SECRET="your_production_github_client_secret"

# Production URLs
NEXTAUTH_URL="https://your-domain.com"
NEXTAUTH_SECRET="your_production_secret"
```

---

## 🧪 **Testing**

```bash
# Run tests
npm run test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

---

## 🤝 **Contributing**

We welcome contributions! Here's how to get started:

### **1. Fork the Repository**
```bash
# Fork on GitHub, then clone your fork
git clone https://github.com/your-username/velora.git
cd velora
```

### **2. Create a Feature Branch**
```bash
git checkout -b feature/amazing-feature
```

### **3. Make Your Changes**
- Follow the existing code style
- Add tests for new features
- Update documentation as needed

### **4. Commit Your Changes**
```bash
git commit -m "Add amazing feature"
```

### **5. Push to Your Fork**
```bash
git push origin feature/amazing-feature
```

### **6. Create a Pull Request**
- Go to your fork on GitHub
- Click "New Pull Request"
- Describe your changes clearly

---

## 📚 **Learning Resources**

### **Technologies Used**
- [Next.js Documentation](https://nextjs.org/docs)
- [tRPC Documentation](https://trpc.io/docs)
- [Drizzle ORM Documentation](https://orm.drizzle.team/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [shadcn/ui Documentation](https://ui.shadcn.com/)

### **Healthcare AI Resources**
- [Medical AI Ethics Guidelines](https://example.com)
- [Healthcare Data Privacy](https://example.com)
- [Sign Language Recognition](https://example.com)

---

## 🐛 **Troubleshooting**

### **Common Issues**

**1. Database Connection Issues**
```bash
# Check your DATABASE_URL
echo $DATABASE_URL

# Test database connection
npm run db:studio
```

**2. Authentication Not Working**
```bash
# Verify OAuth credentials
# Check NEXTAUTH_URL matches your domain
# Ensure OAuth redirect URLs are correct
```

**3. Build Errors**
```bash
# Clear Next.js cache
rm -rf .next

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

**4. TypeScript Errors**
```bash
# Run type checking
npm run type-check

# Check for missing types
npm install @types/node @types/react
```

---

## 📞 **Support**

- **GitHub Issues**: [Report bugs and request features](https://github.com/your-username/velora/issues)
- **Discord Community**: [Join our developer community](https://discord.gg/velora)
- **Documentation**: [Full documentation](https://docs.velora.ai)

---

## 📄 **License**

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 **Acknowledgments**

- **Next.js Team** for the amazing framework
- **tRPC Team** for type-safe APIs
- **shadcn/ui** for beautiful components
- **Drizzle Team** for the excellent ORM
- **Healthcare Community** for inspiration and feedback

---

<div align="center">

**Built with ❤️ for the healthcare community**

[![GitHub stars](https://img.shields.io/github/stars/your-username/velora?style=social)](https://github.com/your-username/velora)
[![Twitter Follow](https://img.shields.io/twitter/follow/velora_ai?style=social)](https://twitter.com/velora_ai)

**Star ⭐ this repository if you found it helpful!**

</div>