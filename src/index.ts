export * from "./services/index.js";

import { Plugin } from "@elizaos/core";

import { describeImage } from "./actions/describe-image.js";
import {
    SpeechService,
    TranscriptionService,
} from "./services/index.js";

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

