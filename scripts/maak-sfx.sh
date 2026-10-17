#!/usr/bin/env bash
# Maakt zachte, rechtenvrije sound effects met ffmpeg in public/sfx/
set -euo pipefail
cd "$(dirname "$0")/../public/sfx"
F="ffmpeg -y -hide_banner -loglevel error"

# pop: ronde houten "bloop", sinus die snel daalt in toonhoogte
$F -f lavfi -i "aevalsrc='0.9*sin(2*PI*(300*t+300*(1-exp(-t*40))/40))*exp(-t*28)':s=48000:d=0.25" \
  -af "lowpass=f=2500,afade=t=in:d=0.004,loudnorm=I=-20:TP=-3" -ac 2 -ar 48000 pop.wav

# whoosh: gefilterde ruis met een zwellende envelope, als wind door bladeren
$F -f lavfi -i "anoisesrc=c=pink:r=48000:d=0.7:a=0.8" \
  -af "bandpass=f=900:width_type=o:w=2,volume='sin(PI*t/0.7)^2':eval=frame,highpass=f=200,lowpass=f=4000,afade=t=in:d=0.05,afade=t=out:st=0.55:d=0.15,loudnorm=I=-22:TP=-3" -ac 2 -ar 48000 whoosh.wav

# ding: heldere sinus met boventonen en galm
$F -f lavfi -i "aevalsrc='(0.6*sin(2*PI*1318*t)+0.25*sin(2*PI*2636*t)*exp(-t*3)+0.12*sin(2*PI*3954*t)*exp(-t*6))*exp(-t*3.5)':s=48000:d=1.6" \
  -af "aecho=0.8:0.6:60|120:0.3|0.2,afade=t=in:d=0.003,afade=t=out:st=1.2:d=0.4,loudnorm=I=-20:TP=-3" -ac 2 -ar 48000 ding.wav

# groei: zachte opwaartse sweep met een sparkle aan het eind
$F -f lavfi -i "aevalsrc='0.5*sin(2*PI*(200*t+700*t*t/2))*sin(PI*min(t/1.0,1))^1.5':s=48000:d=1.0" \
  -f lavfi -i "aevalsrc='(0.3*sin(2*PI*2093*t)+0.2*sin(2*PI*2637*t+1)+0.15*sin(2*PI*3136*t+2))*if(gt(t,0.75),exp(-(t-0.75)*6),0)':s=48000:d=1.4" \
  -filter_complex "[0]apad=pad_dur=0.4,lowpass=f=1800[a];[1]aecho=0.8:0.5:40|90:0.3|0.2[b];[a][b]amix=inputs=2:normalize=0,afade=t=in:d=0.1,afade=t=out:st=1.1:d=0.3,loudnorm=I=-21:TP=-3" -ac 2 -ar 48000 groei.wav

# tik: kort droog tikje
$F -f lavfi -i "aevalsrc='0.9*sin(2*PI*1800*t)*exp(-t*90)+0.4*sin(2*PI*900*t)*exp(-t*60)':s=48000:d=0.12" \
  -af "afade=t=in:d=0.001,loudnorm=I=-22:TP=-3" -ac 2 -ar 48000 tik.wav

# belletjes (kerst): drie sleebelletjes na elkaar
$F -f lavfi -i "aevalsrc='(0.5*sin(2*PI*1568*t)+0.3*sin(2*PI*3920*t)+0.2*sin(2*PI*5300*t))*exp(-t*7)+(0.5*sin(2*PI*1760*(t-0.12))+0.3*sin(2*PI*4400*(t-0.12)))*exp(-(t-0.12)*7)*gt(t,0.12)+(0.5*sin(2*PI*2093*(t-0.24))+0.3*sin(2*PI*5232*(t-0.24)))*exp(-(t-0.24)*6)*gt(t,0.24)':s=48000:d=1.4" \
  -af "aecho=0.8:0.5:50|110:0.3|0.2,afade=t=out:st=1.0:d=0.4,loudnorm=I=-21:TP=-3" -ac 2 -ar 48000 belletjes.wav

# ambient: ritselende blaadjes (zachte gefilterde ruis met trage modulatie), 10 sec, loopbaar
$F -f lavfi -i "anoisesrc=c=brown:r=48000:d=10:a=0.5" \
  -af "highpass=f=400,lowpass=f=3000,volume='0.6+0.4*sin(2*PI*0.23*t)*sin(2*PI*0.37*t)':eval=frame,afade=t=in:d=1,afade=t=out:st=9:d=1,loudnorm=I=-30:TP=-6" -ac 2 -ar 48000 ritselen.wav

ls -la
