import {installWhisperCpp, downloadWhisperModel} from '@remotion/install-whisper-cpp';
import path from 'node:path';
const to = path.join(process.cwd(), 'whisper.cpp');
await installWhisperCpp({to, version: '1.7.6'});
await downloadWhisperModel({model: process.argv[2] ?? 'large-v3-turbo', folder: to});
console.log('KLAAR');
