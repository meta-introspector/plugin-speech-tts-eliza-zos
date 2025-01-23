export * from "./services/index.ts";

import { Plugin } from "@elizaos/core";

import { describeImage } from "./actions/describe-image.ts";
import {
    SpeechService,
    TranscriptionService,
} from "./services/index.ts";

export const speechTTS: Plugin = {
        name: "default",
        description: "Default plugin, with basic actions and evaluators",
        services: [
            new SpeechService(),
            new TranscriptionService(),
        ],
        actions: [describeImage],
    }
    
export default speechTTS;

