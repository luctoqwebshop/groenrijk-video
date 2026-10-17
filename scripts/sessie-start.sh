#!/usr/bin/env bash
# Draait bij de start van elke cloudsessie: installeert alles wat nodig is om video's te maken.
set -uo pipefail
cd "$(dirname "$0")/.."

[ -d node_modules ] || npm ci --no-audit --no-fund

# whisper.cpp bouwen (eenmalig per sessie, ~2 min)
if [ ! -x whisper.cpp/build/bin/whisper-cli ] && [ ! -x whisper.cpp/main ]; then
  node -e "import('@remotion/install-whisper-cpp').then(m=>m.installWhisperCpp({to:'whisper.cpp',version:'1.7.6'}))" >/dev/null 2>&1 \
    || echo "Let op: whisper.cpp bouwen mislukt"
fi

# Whisper-model via curl (Node's fetch gebruikt de proxy niet). Vereist huggingface.co in de netwerkinstellingen.
if [ ! -s whisper.cpp/ggml-large-v3-turbo.bin ]; then
  curl -sSL --fail -o whisper.cpp/ggml-large-v3-turbo.bin.part \
    https://huggingface.co/ggerganov/whisper.cpp/resolve/main/ggml-large-v3-turbo.bin \
    && mv whisper.cpp/ggml-large-v3-turbo.bin.part whisper.cpp/ggml-large-v3-turbo.bin \
    || echo "Let op: Whisper-model downloaden mislukt (staat huggingface.co open?)"
fi

# Remotion gebruikt de vooraf geïnstalleerde Chromium
if [ -n "${CLAUDE_ENV_FILE:-}" ]; then
  echo "export REMOTION_CHROMIUM=/opt/pw-browsers/chromium_headless_shell-1194/chrome-linux/headless_shell" >> "$CLAUDE_ENV_FILE"
fi
exit 0
