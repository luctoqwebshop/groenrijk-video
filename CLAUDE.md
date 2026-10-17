# Video's maken met Remotion: GroenRijk Tilburg en Tuincentrum Outlet

Dit project maakt afgewerkte video's voor **twee aparte merken**. Ze worden strikt gescheiden gehouden.

## Welke prompt?
- Vraagt de gebruiker om een video voor **GroenRijk Tilburg** → volg `prompts/groenrijk.md` en zet `merk: "groenrijk"`.
- Vraagt de gebruiker om een video voor **Tuincentrum Outlet** → volg `prompts/tuincentrumoutlet.md` en zet `merk: "outlet"`.
- Is niet duidelijk voor welk merk de video is? **Vraag het eerst**, gok niet.
- Lees de merkprompt volledig voordat je begint. Die gaat voor op alles hieronder als ze elkaar tegenspreken.

**Nooit mengen in de vormgeving:** alles wat jij toevoegt volgt alleen het gekozen merk: logo, naam, adres, webadres, slogan, kleuren, lettertypes, hook, labels en outro. In een GroenRijk-video voeg je niets van Tuincentrum Outlet toe, en andersom. `src/merken/controle.ts` stopt het renderen als zichtbare toegevoegde tekst naar het andere merk verwijst.

**Ruwe video niet aanpassen voor het merk (afspraak met de gebruiker):** knip geen merknamen uit wat er gezegd wordt en werk geen logo's in beeld weg (bijv. op een shirt). De ondertitels volgen letterlijk wat er gezegd wordt, ook als het andere merk genoemd wordt. Gewone cuts (stiltes, pauzes, versprekingen, mislukte takes) blijven wel.

Gebruik de Remotion-skills in `.claude/skills/` (begin bij `remotion-best-practices`).

## Merken in de code
- `src/merken/groenrijk.ts` en `src/merken/outlet.ts`: kleuren, fonts, logo's, intro en outro-gegevens per merk.
- Componenten gebruiken alleen de rollen uit `useMerk()` (primair, accent, opPrimair, opAccent, licht, tekstDonker). Nergens losse hex-codes buiten `src/merken/`.
- Een nieuw merk: maak `src/merken/<merk>.ts` (type `Merk`), voeg het toe in `src/merken/index.tsx` en `src/merken/controle.ts`, en schrijf `prompts/<merk>.md`.

## Formaten
Per video twee composities: `<videonaam>-Verticaal` (ontwerp 1080x1920, 30 fps) en `<videonaam>-Horizontaal` (ontwerp 1920x1080, 30 fps).
- **Altijd de hoogst mogelijke resolutie en kwaliteit (afspraak met de gebruiker):** eindvideo's in 4K. `remotion.config.ts` rendert met `setScale(2)` (verticaal 2160x3840, horizontaal 3840x2160), CRF 12 en audio 320 kbps. Ontwerp en veilige zones blijven in de 1080-maten hieronder. Controleer na het renderen met ffprobe dat de uitvoer echt 4K is.
- Bronbeelden worden door `scripts/bereid-voor.sh` in de originele resolutie bewaard, nooit verkleind. Is de bron kleiner dan 4K (bijv. 1080p), meld dat in het verslag: het beeld wordt dan opgeschaald, alleen de vormgeving is echt 4K-scherp.
- Kijkversies blijven klein (~720p) om in de chat te bekijken.
- Veilige zones verticaal: geen tekst in de bovenste 250 px, onderste 350 px en rechterrand 120 px.
- `<OffthreadVideo>` voor bronmateriaal, `objectFit: cover`, gezicht/product in beeld houden via `focus` in de config.
- Nooit meer dan één tekstelement tegelijk naast de ondertiteling.

## Projectstructuur
- `prompts/` – de prompt per merk
- `src/merken/` – huisstijl per merk; `src/brand.ts` – gedeelde vormgeving, veilige zones, sfx-paden
- `src/components/` – `Hook`, `Intro`, `Outro`, `Captions`, `StapLabel`, `ProductLabel`, `TipBadge`, `Watermerk`, `LangzameZoom`
- `src/videos/GroenRijkVideo.tsx` – sjabloon voor alle merken; `src/videos/types.ts` – `VideoConfig`; `src/videos/<videonaam>.ts` – config per video
- `src/edits/<videonaam>.ts` – cuts (fragmenten in seconden van het bronbestand)
- `src/captions/<videonaam>.json` – gecontroleerde ondertitels (`Caption[]`, tijden t.o.v. het bronbestand)
- `src/Root.tsx` – registreer per video een `Folder` met beide composities
- `public/raw/`, `public/muziek/` (+ `BRONNEN.md`), `public/sfx/` (gemaakt met `scripts/maak-sfx.sh`)

## Werkwijze per video
1. Bepaal het merk en lees de bijbehorende prompt.
2. `scripts/bereid-voor.sh <bron> <videonaam>` – H.264, 30 fps, stem op -16 LUFS met lichte ruisonderdrukking, 16 kHz wav, stiltelijst
3. `node scripts/transcribeer.mjs <videonaam>` – whisper.cpp large-v3-turbo, taal `nl`
4. Controleer en verbeter de transcriptie (plant- en productnamen). Verander nooit de inhoud of het advies.
5. Bepaal cuts: haal stiltes, "eh"'s, versprekingen en mislukte takes weg; pauzes > 0,6 s inkorten. Niet knippen vanwege een merknaam. Social: bij voorkeur 30–60 s.
6. Schrijf de config (met `merk`): hook, stappen/tips, focus, muziek.
7. Render stills (`npx remotion still`) van hook, een ondertitel, een stap-label en de outro en controleer ze zelf.
8. Render in 4K: `npx remotion render <videonaam>-Verticaal out/<videonaam>-verticaal-4k.mp4` en idem horizontaal; geef geen lagere `--crf` of `--scale` mee (de 4K-schaal staat in `remotion.config.ts`). Renderen duurt ongeveer 4x zo lang als in 1080p.
9. Kort verslag: wat je gedaan hebt plus twijfels.

**Automatische modus (afgesproken met de gebruiker):** geen akkoordstap tussendoor, alles in één keer maken; de gebruiker kijkt achteraf. Draait alleen als de gebruiker erom vraagt (geen schema).

## Ondertiteling (beide merken)
Woordgroepen van 3–5 woorden, actief woord in de accentkleur, verticaal 64–72 px, horizontaal 48–56 px, binnen de veilige zones, zachte pop-in per groep. Lettertype en kleuren volgen het merk.

## Muziek (beide merken)
- Kies volgens de tabel in de merkprompt. Alleen rechtenvrije, zakelijk bruikbare, instrumentale muziek (bij voorkeur Pixabay Music). Engelse zoektermen.
- Pixabay blokkeert automatische downloads. Gebruik muziek die de gebruiker in Drive (`GroenRijk/muziek`) of `public/muziek/` zet; lukt dat niet, maak de video zonder muziek en noem een concreet nummer met link.
- Elk nummer in `public/muziek/BRONNEN.md` (titel, maker, link, licentie, merk, gebruikt in). Niet steeds hetzelfde nummer.
- Mix (zit in het sjabloon): 12–15%, ducking naar ~5–6% tijdens spraak, 1 s fade-in, 1,5 s fade-out.

## Sound effects (beide merken)
Zelf gemaakt met ffmpeg in `public/sfx/`: `pop` (stap, 25–35%), `whoosh` (overgang, 20–30%), `ding` (tip, 30%), `groei` (logo-intro, 30%), `tik` (prijs/product, 25%), `belletjes` (kerst i.p.v. ding), `ritselen` (ambient, 10–15%).
- Hooguit één effect per 2–3 s, nooit over een belangrijk woord, altijd zachter dan de stem. Geen comedy-effecten.

## Overgangen en animatie
`@remotion/transitions` (fade, slide), 10–15 frames. `spring()`/`interpolate()` met zachte demping. Geen glitches, flitsen of harde zooms.

## Omgeving (cloud)
- `scripts/sessie-start.sh` (SessionStart-hook) installeert node_modules, bouwt whisper.cpp en haalt het model op.
- Rendering gebruikt de vooraf geïnstalleerde Chromium via `REMOTION_CHROMIUM` (zie `remotion.config.ts`); remotion.media is niet bereikbaar.
- Fonts staan lokaal in `public/fonts/` (Google Fonts-bestanden): Chromium in de cloud vertrouwt de proxy niet voor fonts.gstatic.com.
- Node's `fetch` gaat niet via de proxy: downloads altijd met `curl`.
- Google Drive-connector: zoeken, mappen en verplaatsen werkt; downloaden en uploaden via de connector kan maar tot 10 MB. Video's ophalen met curl via `drive.usercontent.google.com` (bestand of map gedeeld met "Iedereen met de link").

## Controlelijst voor oplevering
- [ ] Juiste merk en de controlelijst uit de merkprompt afgewerkt
- [ ] Eindvideo's in 4K, hoogste kwaliteit, gecontroleerd met ffprobe
- [ ] Niets van het andere merk in de toegevoegde vormgeving (logo, kleuren, fonts, hook, labels, outro); ruwe beelden en gesproken tekst ongewijzigd
- [ ] Ondertitels gecontroleerd en correct gespeld
- [ ] Geen tekst buiten de veilige zones
- [ ] Muziek instrumentaal, rechtenvrij en in `BRONNEN.md`
- [ ] Effecten subtiel, stem altijd goed verstaanbaar
