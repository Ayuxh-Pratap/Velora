#!/bin/bash

# ===========================================
# 🏥 VELORA HEALTHCARE CHATBOT - SETUP SCRIPT
# ===========================================
# This script helps you set up Velora locally in minutes!

set -e  # Exit on any error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

# Emojis
ROCKET="🚀"
CHECK="✅"
WARNING="⚠️"
ERROR="❌"
INFO="ℹ️"
HEART="❤️"

echo -e "${PURPLE}"
echo "==========================================="
echo "🏥 VELORA HEALTHCARE CHATBOT SETUP"
echo "==========================================="
echo -e "${NC}"

# Function to print colored output
print_status() {
    echo -e "${GREEN}${CHECK} $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}${WARNING} $1${NC}"
}

print_error() {
    echo -e "${RED}${ERROR} $1${NC}"
}

print_info() {
    echo -e "${BLUE}${INFO} $1${NC}"
}

# Check if Node.js is installed
check_node() {
    print_info "Checking Node.js installation..."
    if command -v node &> /dev/null; then
        NODE_VERSION=$(node --version)
        print_status "Node.js is installed: $NODE_VERSION"
        
        # Check if version is 18 or higher
        NODE_MAJOR=$(echo $NODE_VERSION | cut -d'.' -f1 | sed 's/v//')
        if [ "$NODE_MAJOR" -ge 18 ]; then
            print_status "Node.js version is compatible (18+)"
        else
            print_error "Node.js version 18 or higher is required. Please update Node.js."
            exit 1
        fi
    else
        print_error "Node.js is not installed. Please install Node.js 18+ from https://nodejs.org/"
        exit 1
    fi
}

# Check if npm is installed
check_npm() {
    print_info "Checking npm installation..."
    if command -v npm &> /dev/null; then
        NPM_VERSION=$(npm --version)
        print_status "npm is installed: $NPM_VERSION"
    else
        print_error "npm is not installed. Please install npm."
        exit 1
    fi
}

# Install dependencies
install_dependencies() {
    print_info "Installing project dependencies..."
    if [ -f "package-lock.json" ]; then
        npm ci
    else
        npm install
    fi
    print_status "Dependencies installed successfully!"
}

# Check if .env file exists
check_env_file() {
    print_info "Checking environment configuration..."
    if [ -f ".env" ]; then
        print_status ".env file exists"
        
        # Check for required variables
        if grep -q "DATABASE_URL" .env && grep -q "NEXTAUTH_SECRET" .env; then
            print_status "Required environment variables are set"
        else
            print_warning "Some required environment variables might be missing"
            print_info "Please check your .env file and ensure all required variables are set"
        fi
    else
        print_warning ".env file not found"
        print_info "Creating .env file from template..."
        
        cat > .env << EOF
# ===========================================
# 🏥 VELORA HEALTHCARE CHATBOT - ENVIRONMENT VARIABLES
# ===========================================

# Database Configuration
DATABASE_URL="your_neon_database_connection_string"

# NextAuth.js Configuration
NEXTAUTH_SECRET="your-super-secret-key-here-minimum-32-characters"
NEXTAUTH_URL="http://localhost:3000"

# GitHub OAuth (Optional)
GITHUB_CLIENT_ID="your_github_client_id"
GITHUB_CLIENT_SECRET="your_github_client_secret"

# Google OAuth (Optional)
GOOGLE_CLIENT_ID="your_google_client_id"
GOOGLE_CLIENT_SECRET="your_google_client_secret"

# AI Configuration
NEXT_PUBLIC_GEMINI_API_KEY="your_gemini_api_key"
EOF
        
        print_status ".env file created!"
        print_warning "Please edit .env file and add your actual credentials"
    fi
}

# Setup database
setup_database() {
    print_info "Setting up database..."
    
    # Check if DATABASE_URL is set
    if grep -q "your_neon_database_connection_string" .env; then
        print_warning "DATABASE_URL is not configured in .env file"
        print_info "Please set up your NeonDB database and update DATABASE_URL in .env"
        print_info "You can skip this step for now and set it up later"
        return
    fi
    
    # Generate and push database schema
    print_info "Generating database migrations..."
    npm run db:generate
    
    print_info "Pushing database schema..."
    npm run db:push
    
    print_info "Seeding healthcare specialists..."
    npm run seed
    
    print_status "Database setup completed!"
}

# Run type checking
run_type_check() {
    print_info "Running TypeScript type checking..."
    if npm run type-check; then
        print_status "TypeScript type checking passed!"
    else
        print_warning "TypeScript type checking found some issues"
        print_info "You can fix these later or continue with development"
    fi
}

# Final instructions
show_final_instructions() {
    echo -e "${PURPLE}"
    echo "==========================================="
    echo "🎉 SETUP COMPLETED SUCCESSFULLY!"
    echo "==========================================="
    echo -e "${NC}"
    
    print_status "Velora is ready for development!"
    echo ""
    
    echo -e "${CYAN}${ROCKET} Next Steps:${NC}"
    echo "1. Edit .env file with your actual credentials"
    echo "2. Set up your NeonDB database at https://neon.tech"
    echo "3. Get your Gemini API key from https://makersuite.google.com/app/apikey"
    echo "4. Configure OAuth providers (GitHub/Google) if needed"
    echo ""
    
    echo -e "${CYAN}${ROCKET} Start Development:${NC}"
    echo "Run: ${GREEN}npm run dev${NC}"
    echo "Then open: ${GREEN}http://localhost:3000${NC}"
    echo ""
    
    echo -e "${CYAN}${ROCKET} Useful Commands:${NC}"
    echo "• ${GREEN}npm run dev${NC} - Start development server"
    echo "• ${GREEN}npm run build${NC} - Build for production"
    echo "• ${GREEN}npm run db:studio${NC} - Open database studio"
    echo "• ${GREEN}npm run seed${NC} - Seed healthcare specialists"
    echo "• ${GREEN}npm run lint${NC} - Run code linting"
    echo ""
    
    echo -e "${HEART} Happy coding! Welcome to the Velora community! ${HEART}"
}

# Main setup flow
main() {
    echo -e "${BLUE}Starting Velora setup process...${NC}"
    echo ""
    
    check_node
    check_npm
    install_dependencies
    check_env_file
    setup_database
    run_type_check
    show_final_instructions
}

# Run the setup
main "$@"
