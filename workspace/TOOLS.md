# TOOLS.md - Local Notes

Skills define _how_ tools work. This file is for _your_ specifics — the stuff that's unique to your setup.

## What Goes Here

Things like:

- Camera names and locations
- SSH hosts and aliases
- Preferred voices for TTS
- Speaker/room names
- Device nicknames
- Anything environment-specific

## Examples

```markdown
### Cameras

- living-room → Main area, 180° wide angle
- front-door → Entrance, motion-triggered

### SSH

- home-server → 192.168.1.100, user: admin

### TTS

- Preferred voice: "Nova" (warm, slightly British)
- Default speaker: Kitchen HomePod
```

## Why Separate?

Skills are shared. Your setup is yours. Keeping them apart means you can update skills without losing your notes, and share skills without leaking your infrastructure.

---

Add whatever helps you do your job. This is your cheat sheet.

---

## Hardware Configuration

**Machine:** 杰的 MacBook Pro (jiedeMBP)
**OS:** macOS 12.6 (Darwin 21.6.0)
**CPU:** Intel x86_64, 8 cores
**Memory:** 16GB RAM
**Architecture:** x86_64 (NOT Apple Silicon)

### Model Deployment Notes

- ❌ **MLX**: NOT compatible - requires Apple Silicon (M1/M2/M3)
- ✅ **Ollama**: Compatible - runs on Intel Macs
- ✅ **LM Studio**: Compatible - has Intel Mac builds
- ✅ **llama.cpp**: Compatible - optimized for CPU inference
- **Recommended:** 7B models max (16GB RAM), use 4-bit quantization for better performance
