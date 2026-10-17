# Video's maken met Remotion: GroenRijk Tilburg en Tuincentrum Outlet

Dit project maakt afgewerkte video's voor **twee aparte merken**. Ze worden strikt gescheiden gehouden.

## Welke prompt?
- Vraagt de gebruiker om een video voor **GroenRijk Tilburg** → volg `prompts/groenrijk.md` en zet `merk: "groenrijk"`.
- Vraagt de gebruiker om een video voor **Tuincentrum Outlet** → volg `prompts/tuincentrumoutlet.md` en zet `merk: "outlet"`.
- Is niet duidelijk voor welk merk de video is? **Vraag het eerst**, gok niet.
- Lees de merkprompt volledig voordat je begint. Die gaat voor op alles hieronder als ze elkaar tegenspreken.

**Nooit mengen:** in een GroenRijk-video staat niets van Tuincentrum Outlet, en in een Outlet-video niets van GroenRijk. Dat geldt voor logo, naam, adres, webadres, slogan, kleuren, lettertypes, hook, labels, ondertitels en outro. Noemt de spreker het andere merk, knip die zin eruit. `src/merken/controle.ts` stopt het renderen bij zichtbare tekst van het andere merk en waarschuwt bij gesproken tekst.

Gebruik de Remotion-skills in `.claude/skills/` (begin bij `remotion-best-practices`).

## Merken in de code
- `src/merken/groenrijk.ts` en `src/merken/outlet.ts`: kleuren, fonts, logo's, intro en outro-gegevens per merk.
- Componenten gebruiken alleen de rollen uit `useMerk()` (primair, accent, opPrimair, opAccent, licht, tekstDonker). Nergens losse hex-codes buiten `src/merken/`.
- Een nieuw merk: maak `src/merken/<merk>.ts` (type `Merk`), voeg het toe in `src/merken/index.tsx` en `src/merken/controle.ts`, en schrijf `prompts/<merk>.md`.

## Formaten
Per video twee composities: `<videonaam>-Verticaal` (1080x1920, 30 fps) en `<videonaam>-Horizontaal` (1920x1080, 30 fps).
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
5. Bepaal cuts: haal stiltes, "eh"'s, versprekingen, mislukte takes en vermeldingen van het andere merk weg; pauzes > 0,6 s inkorten. Social: bij voorkeur 30–60 s.
6. Schrijf de config (met `merk`): hook, stappen/tips, focus, muziek.
7. Render stills (`npx remotion still`) van hook, een ondertitel, een stap-label en de outro en controleer ze zelf.
8. Render: `npx remotion render <videonaam>-Verticaal out/<videonaam>-verticaal.mp4 --crf=18` en idem horizontaal.
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
- [ ] Niets van het andere merk in beeld, tekst of ondertitels
- [ ] Ondertitels gecontroleerd en correct gespeld
- [ ] Geen tekst buiten de veilige zones
- [ ] Muziek instrumentaal, rechtenvrij en in `BRONNEN.md`
- [ ] Effecten subtiel, stem altijd goed verstaanbaar
