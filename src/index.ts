
import { Plugin } from "@elizaos/core";

import { describeImage } from "./actions/describe-image.ts";
import {
    SpeechService
} from "./services/speech.ts";

import { TranscriptionService } from "./services/transcription.ts";
;
export type NodePlugin = ReturnType<typeof createNodePlugin>;

export function createNodePlugin() {
    return {
        name: "default",
        description: "Default plugin, with basic actions and evaluators",
        services: [
            new SpeechService(),
            new TranscriptionService(),
        ],
        actions: [describeImage],
    } as const satisfies Plugin;
}
