# 👨‍💻 Velora Developer Guide

A comprehensive guide for developers working on the Velora healthcare chatbot.

## 📋 Table of Contents

- [Project Architecture](#project-architecture)
- [Development Workflow](#development-workflow)
- [Code Organization](#code-organization)
- [Component Guidelines](#component-guidelines)
- [API Development](#api-development)
- [Database Management](#database-management)
- [Testing Strategy](#testing-strategy)
- [Performance Optimization](#performance-optimization)
- [Deployment Process](#deployment-process)

---

## 🏗️ Project Architecture

### **Technology Stack**

```
Frontend (React/Next.js)
├── UI Framework: Next.js 15 + React 19
├── Styling: Tailwind CSS + shadcn/ui
├── State Management: TanStack Query + tRPC
├── 3D Graphics: Three.js + MediaPipe
└── Type Safety: TypeScript

Backend (tRPC + Drizzle)
├── API Layer: tRPC for type-safe APIs
├── Database: NeonDB (PostgreSQL) + Drizzle ORM
├── Authentication: NextAuth.js
└── AI Integration: Google Gemini API

Infrastructure
├── Hosting: Vercel (recommended)
├── Database: NeonDB (serverless PostgreSQL)
├── CDN: Vercel Edge Network
└── Monitoring: Built-in Vercel Analytics
```

### **Architecture Patterns**

1. **Feature-Based Organization**: Components grouped by feature/domain
2. **API-First Design**: tRPC for type-safe client-server communication
3. **Component Composition**: Reusable UI components with clear interfaces
4. **State Colocation**: State management close to where it's used
5. **Progressive Enhancement**: Core functionality works without JavaScript

---

## 🔄 Development Workflow

### **Getting Started**

```bash
# 1. Clone and setup
git clone https://github.com/your-username/velora.git
cd velora
npm install

# 2. Environment setup
cp .env.example .env
# Edit .env with your credentials

# 3. Database setup
npm run db:push
npm run seed

# 4. Start development
npm run dev
```

### **Daily Development Commands**

```bash
# Development
npm run dev              # Start dev server with hot reload
npm run type-check       # Check TypeScript types
npm run lint             # Run ESLint
npm run format           # Format code with Prettier

# Database
npm run db:studio        # Open Drizzle Studio
npm run db:generate      # Generate migrations
npm run db:push          # Push schema changes

# Testing
npm run test             # Run tests
npm run test:watch       # Run tests in watch mode
npm run test:coverage    # Generate coverage report
```

### **Git Workflow**

```bash
# Feature development
git checkout -b feature/healthcare-specialist-search
# Make changes
git add .
git commit -m "feat: add specialist search functionality"
git push origin feature/healthcare-specialist-search
# Create PR on GitHub
```

---

## 📁 Code Organization

### **Directory Structure**

```
src/
├── app/                          # Next.js App Router
│   ├── home/                    # Main application
│   │   ├── _ui/                 # UI components
│   │   │   ├── components/      # Reusable components
│   │   │   ├── node/           # Node workspace
│   │   │   └── model/          # 3D avatar system
│   │   └── c/[chatId]/         # Individual chat pages
│   ├── api/                     # API routes
│   └── auth/                    # Authentication pages
├── components/                   # Global components
│   ├── ui/                      # shadcn/ui components
│   └── global/                  # Global providers
├── db/                          # Database layer
│   ├── schema.ts                # Drizzle schema
│   └── index.ts                 # Database connection
├── trpc/                        # tRPC configuration
│   ├── client/                  # Client-side tRPC
│   └── server/                  # Server-side tRPC
│       └── routers/             # API route handlers
├── utils/                       # Utility functions
└── lib/                         # Shared libraries
```

### **Naming Conventions**

- **Files**: `kebab-case` for files, `PascalCase` for components
- **Components**: `PascalCase` (e.g., `HealthcareNode`)
- **Functions**: `camelCase` (e.g., `handleNodeToggle`)
- **Constants**: `UPPER_SNAKE_CASE` (e.g., `HEALTHCARE_SPECIALISTS`)
- **Types/Interfaces**: `PascalCase` (e.g., `HealthcareNodeProps`)

---

## 🧩 Component Guidelines

### **Component Structure**

```typescript
// Example: HealthcareNode component
interface HealthcareNodeProps {
  node: HealthcareNode;
  onSelect: (id: string) => void;
  onRemove: (id: string) => void;
  onUpdatePriority: (id: string, priority: number) => void;
}

export function HealthcareNode({
  node,
  onSelect,
  onRemove,
  onUpdatePriority
}: HealthcareNodeProps) {
  // 1. Hooks
  const [isSelected, setIsSelected] = useState(false);
  
  // 2. Event handlers
  const handleClick = useCallback(() => {
    onSelect(node.id);
    setIsSelected(true);
  }, [node.id, onSelect]);
  
  // 3. Render
  return (
    <div className="healthcare-node" onClick={handleClick}>
      {/* Component JSX */}
    </div>
  );
}
```

### **Component Best Practices**

1. **Single Responsibility**: Each component should have one clear purpose
2. **Props Interface**: Always define TypeScript interfaces for props
3. **Event Handlers**: Use `useCallback` for event handlers passed as props
4. **Conditional Rendering**: Use early returns for cleaner code
5. **Accessibility**: Include proper ARIA labels and keyboard navigation

### **Styling Guidelines**

```typescript
// Use Tailwind classes with cn() utility for conditional styling
import { cn } from "@/lib/utils";

const buttonClasses = cn(
  "base-button-styles",
  isActive && "active-styles",
  isDisabled && "disabled-styles",
  className // Allow custom classes
);
```

---

## 🔌 API Development

### **tRPC Router Structure**

```typescript
// src/trpc/server/routers/healthcare.ts
export const healthcareRouter = createTRPCRouter({
  // Query procedures (read operations)
  getSpecialists: publicProcedure
    .input(z.object({ specialty: z.string().optional() }))
    .query(async ({ input, ctx }) => {
      return await ctx.db.query.node.findMany({
        where: input.specialty ? eq(node.specialty, input.specialty) : undefined,
      });
    }),

  // Mutation procedures (write operations)
  createSpecialist: protectedProcedure
    .input(createSpecialistSchema)
    .mutation(async ({ input, ctx }) => {
      return await ctx.db.insert(node).values({
        ...input,
        createdByUserId: ctx.session.user.id,
      });
    }),
});
```

### **API Best Practices**

1. **Input Validation**: Use Zod schemas for all inputs
2. **Error Handling**: Consistent error responses
3. **Authentication**: Use `protectedProcedure` for authenticated routes
4. **Rate Limiting**: Implement rate limiting for public endpoints
5. **Caching**: Use TanStack Query for client-side caching

---

## 🗄️ Database Management

### **Schema Design**

```typescript
// src/db/schema.ts
export const node = pgTable("node", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  specialty: specialtyEnum("specialty").notNull(),
  prompt: text("prompt").notNull(),
  isActive: boolean("is_active").notNull().default(true),
  createdByUserId: text("created_by_user_id").references(() => user.id),
  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at").notNull(),
});
```

### **Migration Workflow**

```bash
# 1. Make schema changes
# Edit src/db/schema.ts

# 2. Generate migration
npm run db:generate

# 3. Review generated migration
# Check drizzle/migrations/ folder

# 4. Apply migration
npm run db:push

# 5. Update seed data if needed
npm run seed
```

### **Database Best Practices**

1. **Indexes**: Add indexes for frequently queried columns
2. **Foreign Keys**: Use proper foreign key constraints
3. **Soft Deletes**: Use `isActive` flags instead of hard deletes
4. **Timestamps**: Always include `createdAt` and `updatedAt`
5. **Validation**: Use database-level constraints where possible

---

## 🧪 Testing Strategy

### **Testing Pyramid**

```
E2E Tests (Playwright)
├── User flows
├── Critical paths
└── Integration scenarios

Integration Tests (Jest)
├── API endpoints
├── Database operations
└── Component integration

Unit Tests (Jest + Testing Library)
├── Utility functions
├── Component logic
└── Business logic
```

### **Test Examples**

```typescript
// Unit test example
import { render, screen, fireEvent } from '@testing-library/react';
import { HealthcareNode } from './HealthcareNode';

describe('HealthcareNode', () => {
  it('should call onSelect when clicked', () => {
    const mockOnSelect = jest.fn();
    const node = { id: '1', name: 'Cardiology', specialty: 'cardiology' };
    
    render(<HealthcareNode node={node} onSelect={mockOnSelect} />);
    
    fireEvent.click(screen.getByText('Cardiology'));
    
    expect(mockOnSelect).toHaveBeenCalledWith('1');
  });
});
```

---

## ⚡ Performance Optimization

### **Frontend Optimization**

1. **Code Splitting**: Use dynamic imports for large components
2. **Image Optimization**: Use Next.js Image component
3. **Bundle Analysis**: Regular bundle size monitoring
4. **Memoization**: Use React.memo and useMemo strategically
5. **Virtual Scrolling**: For large lists of specialists

### **Backend Optimization**

1. **Database Queries**: Optimize with proper indexes
2. **Caching**: Implement Redis for frequently accessed data
3. **Rate Limiting**: Prevent API abuse
4. **Connection Pooling**: Efficient database connections
5. **CDN**: Use Vercel Edge Network for static assets

### **Monitoring**

```typescript
// Performance monitoring example
import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals';

function sendToAnalytics(metric) {
  // Send to your analytics service
  console.log(metric);
}

getCLS(sendToAnalytics);
getFID(sendToAnalytics);
getFCP(sendToAnalytics);
getLCP(sendToAnalytics);
getTTFB(sendToAnalytics);
```

---

## 🚀 Deployment Process

### **Vercel Deployment**

1. **Connect Repository**: Link GitHub repo to Vercel
2. **Environment Variables**: Set production environment variables
3. **Build Settings**: Configure build command and output directory
4. **Domain Setup**: Configure custom domain (optional)
5. **Monitoring**: Set up error tracking and analytics

### **Environment Configuration**

```env
# Production environment variables
DATABASE_URL="postgresql://prod-user:password@prod-host/database"
NEXTAUTH_SECRET="production-secret-key"
NEXTAUTH_URL="https://your-domain.com"
NEXT_PUBLIC_GEMINI_API_KEY="production-gemini-key"
```

### **CI/CD Pipeline**

```yaml
# .github/workflows/deploy.yml
name: Deploy to Vercel
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run type-check
      - run: npm run lint
      - run: npm run build
      - uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
```

---

## 📚 Additional Resources

### **Documentation**
- [Next.js Documentation](https://nextjs.org/docs)
- [tRPC Documentation](https://trpc.io/docs)
- [Drizzle ORM Documentation](https://orm.drizzle.team/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [shadcn/ui Documentation](https://ui.shadcn.com/)

### **Tools**
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [React Documentation](https://react.dev/)
- [TanStack Query Documentation](https://tanstack.com/query/latest)

### **Community**
- [GitHub Issues](https://github.com/your-username/velora/issues)
- [Discord Community](https://discord.gg/velora)
- [Stack Overflow](https://stackoverflow.com/questions/tagged/velora)

---

## 🤝 Contributing

### **Pull Request Process**

1. **Fork** the repository
2. **Create** a feature branch
3. **Make** your changes
4. **Add** tests for new functionality
5. **Update** documentation
6. **Submit** a pull request

### **Code Review Checklist**

- [ ] Code follows project conventions
- [ ] Tests are included and passing
- [ ] Documentation is updated
- [ ] No breaking changes (or properly documented)
- [ ] Performance impact is considered
- [ ] Security implications are reviewed

---

**Happy coding!** 🚀❤️
