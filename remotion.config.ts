/**
 * Note: When using the Node.JS APIs, the config file
 * doesn't apply. Instead, pass options directly to the APIs.
 *
 * All configuration options: https://remotion.dev/docs/config
 */

import { Config } from "@remotion/cli/config";

Config.setRspack(true);
Config.setVideoImageFormat("jpeg");
Config.setOverwriteOutput(true);
Config.setDefaultPremountInSeconds(2);

// Eindvideo's in 4K: de composities zijn ontworpen op 1080x1920 / 1920x1080 en worden
// 2x zo groot gerenderd (2160x3840 / 3840x2160). Tekst en vormen blijven scherp.
Config.setScale(2);

// In de cloudomgeving: gebruik de vooraf geïnstalleerde Chromium (remotion.media is niet bereikbaar)
if (process.env.REMOTION_CHROMIUM) {
  Config.setBrowserExecutable(process.env.REMOTION_CHROMIUM);
}
