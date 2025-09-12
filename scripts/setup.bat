@echo off
setlocal enabledelayedexpansion

REM ===========================================
REM 🏥 VELORA HEALTHCARE CHATBOT - SETUP SCRIPT (Windows)
REM ===========================================
REM This script helps you set up Velora locally in minutes!

echo.
echo ===========================================
echo 🏥 VELORA HEALTHCARE CHATBOT SETUP
echo ===========================================
echo.

REM Check if Node.js is installed
echo ℹ️ Checking Node.js installation...
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Node.js is not installed. Please install Node.js 18+ from https://nodejs.org/
    pause
    exit /b 1
)

for /f "tokens=*" %%i in ('node --version') do set NODE_VERSION=%%i
echo ✅ Node.js is installed: %NODE_VERSION%

REM Check if npm is installed
echo ℹ️ Checking npm installation...
npm --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ npm is not installed. Please install npm.
    pause
    exit /b 1
)

for /f "tokens=*" %%i in ('npm --version') do set NPM_VERSION=%%i
echo ✅ npm is installed: %NPM_VERSION%

REM Install dependencies
echo ℹ️ Installing project dependencies...
if exist package-lock.json (
    npm ci
) else (
    npm install
)
if %errorlevel% neq 0 (
    echo ❌ Failed to install dependencies
    pause
    exit /b 1
)
echo ✅ Dependencies installed successfully!

REM Check if .env file exists
echo ℹ️ Checking environment configuration...
if exist .env (
    echo ✅ .env file exists
    findstr /C:"DATABASE_URL" .env >nul 2>&1
    if %errorlevel% equ 0 (
        findstr /C:"NEXTAUTH_SECRET" .env >nul 2>&1
        if %errorlevel% equ 0 (
            echo ✅ Required environment variables are set
        ) else (
            echo ⚠️ Some required environment variables might be missing
        )
    ) else (
        echo ⚠️ Some required environment variables might be missing
    )
) else (
    echo ⚠️ .env file not found
    echo ℹ️ Creating .env file from template...
    
    (
        echo # ===========================================
        echo # 🏥 VELORA HEALTHCARE CHATBOT - ENVIRONMENT VARIABLES
        echo # ===========================================
        echo.
        echo # Database Configuration
        echo DATABASE_URL="your_neon_database_connection_string"
        echo.
        echo # NextAuth.js Configuration
        echo NEXTAUTH_SECRET="your-super-secret-key-here-minimum-32-characters"
        echo NEXTAUTH_URL="http://localhost:3000"
        echo.
        echo # GitHub OAuth ^(Optional^)
        echo GITHUB_CLIENT_ID="your_github_client_id"
        echo GITHUB_CLIENT_SECRET="your_github_client_secret"
        echo.
        echo # Google OAuth ^(Optional^)
        echo GOOGLE_CLIENT_ID="your_google_client_id"
        echo GOOGLE_CLIENT_SECRET="your_google_client_secret"
        echo.
        echo # AI Configuration
        echo NEXT_PUBLIC_GEMINI_API_KEY="your_gemini_api_key"
    ) > .env
    
    echo ✅ .env file created!
    echo ⚠️ Please edit .env file and add your actual credentials
)

REM Setup database (optional)
echo ℹ️ Setting up database...
findstr /C:"your_neon_database_connection_string" .env >nul 2>&1
if %errorlevel% equ 0 (
    echo ⚠️ DATABASE_URL is not configured in .env file
    echo ℹ️ Please set up your NeonDB database and update DATABASE_URL in .env
    echo ℹ️ You can skip this step for now and set it up later
) else (
    echo ℹ️ Generating database migrations...
    npm run db:generate
    if %errorlevel% neq 0 (
        echo ⚠️ Database migration generation failed
    ) else (
        echo ℹ️ Pushing database schema...
        npm run db:push
        if %errorlevel% neq 0 (
            echo ⚠️ Database schema push failed
        ) else (
            echo ℹ️ Seeding healthcare specialists...
            npm run seed
            if %errorlevel% neq 0 (
                echo ⚠️ Database seeding failed
            ) else (
                echo ✅ Database setup completed!
            )
        )
    )
)

REM Run type checking
echo ℹ️ Running TypeScript type checking...
npm run type-check
if %errorlevel% neq 0 (
    echo ⚠️ TypeScript type checking found some issues
    echo ℹ️ You can fix these later or continue with development
) else (
    echo ✅ TypeScript type checking passed!
)

REM Final instructions
echo.
echo ===========================================
echo 🎉 SETUP COMPLETED SUCCESSFULLY!
echo ===========================================
echo.
echo ✅ Velora is ready for development!
echo.
echo 🚀 Next Steps:
echo 1. Edit .env file with your actual credentials
echo 2. Set up your NeonDB database at https://neon.tech
echo 3. Get your Gemini API key from https://makersuite.google.com/app/apikey
echo 4. Configure OAuth providers ^(GitHub/Google^) if needed
echo.
echo 🚀 Start Development:
echo Run: npm run dev
echo Then open: http://localhost:3000
echo.
echo 🚀 Useful Commands:
echo • npm run dev - Start development server
echo • npm run build - Build for production
echo • npm run db:studio - Open database studio
echo • npm run seed - Seed healthcare specialists
echo • npm run lint - Run code linting
echo.
echo ❤️ Happy coding! Welcome to the Velora community! ❤️
echo.
pause
