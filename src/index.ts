export * from "./services/index.ts";

import { Plugin } from "@elizaos/core";

import { describeImage } from "./actions/describe-image.ts";
import {
    BrowserService,
    SpeechService,
    TranscriptionService,
} from "./services/index.ts";

export type NodePlugin = ReturnType<typeof createNodePlugin>;

export function createNodePlugin() {
    return {
        name: "default",
        description: "Default plugin, with basic actions and evaluators",
        services: [
            new BrowserService(),
            new SpeechService(),
            new TranscriptionService(),
        ],
        actions: [describeImage],
    } as const satisfies Plugin;
}
