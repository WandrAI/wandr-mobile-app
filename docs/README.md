# Wandr Mobile App Documentation

This documentation is designed to help developers (including AI assistants) understand the Wandr travel app architecture, conventions, and development patterns.

## 📋 Documentation Overview

### 🏗️ Architecture Decision Records (ADRs)
- **Location**: `/docs/adr/`
- **Purpose**: Documents important architectural decisions and their rationale
- **For AI**: Understand why certain patterns and technologies were chosen

### 🎨 Component System
- **Location**: `/docs/components/`
- **Purpose**: Documents the atomic design component structure
- **For AI**: Understand component hierarchy and usage patterns

### 📐 Development Conventions
- **Location**: `/docs/conventions/`
- **Purpose**: Coding standards, naming conventions, Git workflow, and patterns
- **For AI**: Follow consistent patterns when generating code and commits

### 🎯 Project Context
- **Location**: `/docs/project/`
- **Purpose**: Business context, user needs, and feature specifications
- **For AI**: Understand the travel domain and user requirements

## 🚀 Quick Start for AI Assistants

When working with this codebase:

1. **Read the ADRs first** - Understand architectural decisions
2. **Review component conventions** - Follow atomic design patterns
3. **Check naming conventions** - Use consistent naming
4. **Follow Git conventions** - Use conventional commits with travel context
5. **Understand the travel domain** - Consider user personas and travel needs

## 📁 Project Structure

```
mobile-app/
├── app/                    # Expo Router - file-based routing
│   └── (tabs)/            # Tab navigation screens
├── components/             # Atomic design component system
│   ├── atoms/             # Basic building blocks
│   ├── molecules/         # Simple combinations
│   ├── organisms/         # Complex components
│   └── templates/         # Layout components
├── assets/                # Static assets (images, fonts)
├── constants/             # App-wide constants
├── hooks/                 # Custom React hooks
├── docs/                  # This documentation
└── scripts/               # Build and utility scripts
```

## 🎨 Component Philosophy

**Atomic Design Principles:**
- **Atoms**: Basic UI elements (Button, Text, Icon)
- **Molecules**: Simple combinations (SearchBar, TabItem)
- **Organisms**: Complex components (Header, Navigation)
- **Templates**: Page layouts and structure

## 🌍 Travel App Context

**Target Users**: Travel enthusiasts who want AI-powered, social travel planning
**Key Features**: 
- Real-time AI travel assistance
- Hyper-localized recommendations
- Group trip planning and collaboration
- Social sharing and reviews

## 📱 Platform Specifications

- **Framework**: React Native with Expo
- **Router**: Expo Router (file-based)
- **UI System**: Custom themed components (ThemedText, ThemedView) with planned Tamagui migration
- **Language**: TypeScript
- **Platforms**: iOS, Android, Web

## 🤖 AI Assistant Guidelines

When generating code for this project:

1. **Follow atomic design** - Place components in appropriate atomic folders
2. **Use TypeScript** - Always include proper types and interfaces
3. **Consider travel context** - Think about user journeys and travel scenarios
4. **Maintain consistency** - Follow existing patterns and conventions
5. **Document decisions** - Update relevant documentation when making changes

---

**For detailed information, see the specific documentation sections in this directory.** 