#!/usr/bin/env bash
# Zet een ruw filmpje klaar voor Remotion.
# Gebruik: scripts/bereid-voor.sh <pad-naar-bron.MOV> <videonaam>
# Maakt:  public/raw/<videonaam>.mp4   (H.264, 30 fps, korte zijde max 1080, stem genormaliseerd op -16 LUFS)
#         public/raw/<videonaam>.wav   (16 kHz mono, voor Whisper)
#         src/edits/<videonaam>.stiltes.txt (pauzes langer dan 0,6 s)
set -euo pipefail
bron="$1"; naam="$2"
cd "$(dirname "$0")/.."
mkdir -p public/raw src/edits

# Lichte ruis- en bromonderdrukking, dan normaliseren naar -16 LUFS
audiofilter="highpass=f=80,afftdn=nf=-25,loudnorm=I=-16:TP=-1.5:LRA=11"

ffmpeg -y -hide_banner -loglevel error -i "$bron" \
  -vf "scale='if(gt(iw,ih),-2,min(1080,iw))':'if(gt(iw,ih),min(1080,ih),-2)',fps=30" \
  -c:v libx264 -preset medium -crf 18 -pix_fmt yuv420p \
  -af "$audiofilter" -ar 48000 -c:a aac -b:a 192k \
  -movflags +faststart "public/raw/$naam.mp4"

ffmpeg -y -hide_banner -loglevel error -i "public/raw/$naam.mp4" -ar 16000 -ac 1 -c:a pcm_s16le "public/raw/$naam.wav"

ffmpeg -hide_banner -i "public/raw/$naam.mp4" -af "silencedetect=noise=-35dB:d=0.6" -f null - 2>&1 \
  | grep -E "silence_(start|end)" > "src/edits/$naam.stiltes.txt" || true

ffprobe -v error -show_entries format=duration:stream=width,height -of default=nw=1 "public/raw/$naam.mp4"
echo "Klaar: public/raw/$naam.mp4"
