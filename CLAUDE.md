# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

OpenClaude is a fork of Claude Code that adds OpenAI-compatible provider support, enabling use with any LLM (GPT-4o, DeepSeek, Gemini, Llama, Mistral, etc.) via the OpenAI chat completions API.

## Build System

**Build tool:** Bun (required for development)
**Output:** Single ESM bundle at `dist/cli.mjs`

### Commands

```bash
# Build the project (bundles src/entrypoints/cli.tsx → dist/cli.mjs)
bun run build

# Build and run in dev mode
bun run dev

# Run the built CLI
bun run start
# or: node dist/cli.mjs

# TypeScript type checking (no emit)
bun run typecheck

# Quick smoke test (build + --version check)
bun run smoke
```

### Testing

```bash
# Run provider and utility tests
bun test
# or: bun run test:provider

# Run specific test file
bun test src/services/api/openaiShim.test.ts

# Provider recommendation tests (Node.js native test runner)
npm run test:provider-recommendation
```

### Runtime Validation

```bash
# Validate environment and provider configuration
bun run doctor:runtime

# JSON output for automation
bun run doctor:runtime:json

# Persist report to reports/doctor-runtime.json
bun run doctor:report

# Full hardening checks (smoke + runtime doctor)
bun run hardening:check

# Strict hardening (includes typecheck)
bun run hardening:strict
```

## Provider System (Core Architecture)

The OpenAI provider shim is the key addition to this fork. It translates Anthropic SDK calls into OpenAI-compatible requests.

**Key files:**
- `src/services/api/openaiShim.ts` - Main translation layer (Anthropic → OpenAI format)
- `src/services/api/codexShim.ts` - Codex backend support (codexplan, codexspark)
- `src/services/api/providerConfig.ts` - Provider configuration resolution
- `src/entrypoints/cli.tsx` - Entry point with environment validation

**Environment variables:**
- `CLAUDE_CODE_USE_OPENAI=1` - Enable the OpenAI provider
- `OPENAI_API_KEY` - API key (optional for local models like Ollama)
- `OPENAI_BASE_URL` - API endpoint (default: https://api.openai.com/v1)
- `OPENAI_MODEL` - Model name (e.g., gpt-4o, deepseek-chat, llama3.1:8b)
- `CODEX_API_KEY` - Codex backend auth (alternative to ~/.codex/auth.json)

### Profile System

Profiles store provider configurations in `.openclaude-profile.json`:

```bash
# Initialize a profile (interactive bootstrap)
bun run profile:init

# Initialize with specific provider/model
bun run profile:init -- --provider ollama --model llama3.1:8b
bun run profile:init -- --provider openai --api-key sk-... --model gpt-4o

# Get model recommendations based on goal (latency/balanced/coding)
bun run profile:recommend -- --goal coding --benchmark

# Auto-select and save best available provider
bun run profile:auto -- --goal coding

# Launch using persisted profile
bun run dev:profile

# Provider-specific launchers (with runtime checks)
bun run dev:ollama
bun run dev:openai
bun run dev:codex
```

## Code Architecture

### Build Configuration

The build system (`scripts/build.ts`) uses Bun's bundler with:
- **Feature flags:** All disabled in open build (VOICE_MODE, PROACTIVE, KAIROS, etc.)
- **Macro definitions:** Build-time constants (`MACRO.VERSION`, `MACRO.DISPLAY_VERSION`, etc.)
- **External deps:** `@mariozechner/clipboard` packages kept external (native modules)
- **Stub modules:** Internal-only features replaced with error-throwing stubs

### Entry Points

- `src/entrypoints/cli.tsx` - CLI bootstrap, validates environment, dynamic imports
- `src/entrypoints/init.ts` - Full initialization (telemetry, config, OAuth, etc.)
- `src/main.tsx` - Main application logic, command parsing, React/ink UI

### Key Directories

- `src/services/api/` - API client, OpenAI/Codex shims, error handling
- `src/tools/` - Tool implementations (BashTool, FileReadTool, GrepTool, etc.)
- `src/components/` - React/ink UI components
- `src/utils/` - Utility functions, config, permissions, telemetry
- `scripts/` - Build scripts and provider management tools

### Provider Shim Flow

1. `cli.tsx` validates `CLAUDE_CODE_USE_OPENAI` and required credentials
2. `openaiShim.ts` intercepts Anthropic SDK calls via the provider configuration
3. Messages are converted: Anthropic format → OpenAI format
4. Streaming responses are translated back to Anthropic streaming format
5. Tool calls and tool results are mapped between formats

### Codex Backend Support

- Aliases: `codexplan` → GPT-5.4 (high reasoning), `codexspark` → GPT-5.3
- Auth: Reads `~/.codex/auth.json` or uses `CODEX_API_KEY`
- Different API shape (responses endpoint vs chat completions)
- Uses separate shim layer in `codexShim.ts`

## Development Notes

**Module system:** ESM only (`"type": "module"` in package.json)
**Path aliases:** `src/*` maps to `./src/*`
**TypeScript:** Strict mode, ES2022 target, React JSX

**Feature flags** (defined in build.ts, all false in open build):
- Control Anthropic-internal features (voice, daemon, proactive, etc.)
- Gated by `feature('FLAG_NAME')` from `bun:bundle`
- Disabled features throw "unavailable in the open build" errors

**Testing:**
- Uses Bun's test runner for most tests
- Provider recommendation tests use Node.js native test runner
- Test files: `*.test.ts` alongside source files

**Runtime checks:**
- `doctor:runtime` validates provider reachability, API keys, Node version
- Local providers (localhost/127.0.0.1) don't require API keys
- Placeholder keys (`SUA_CHAVE`) fail fast with clear errors
