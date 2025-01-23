import * as _elizaos_core from '@elizaos/core';
import { Service, ISpeechService, ServiceType, IAgentRuntime, ITranscriptionService } from '@elizaos/core';
import { Readable } from 'node:stream';

declare class SpeechService extends Service implements ISpeechService {
    static serviceType: ServiceType;
    initialize(_runtime: IAgentRuntime): Promise<void>;
    getInstance(): ISpeechService;
    generate(runtime: IAgentRuntime, text: string): Promise<Readable>;
}

declare class TranscriptionService extends Service implements ITranscriptionService {
    private runtime;
    static serviceType: ServiceType;
    private CONTENT_CACHE_DIR;
    private DEBUG_AUDIO_DIR;
    private TARGET_SAMPLE_RATE;
    private isCudaAvailable;
    /**
     * CHANGED: We now use TranscriptionProvider instead of separate flags/strings.
     * This allows us to handle character settings, env variables, and fallback logic.
     */
    private transcriptionProvider;
    private deepgram;
    private openai;
    /**
     * We keep the queue and processing logic as is.
     */
    private queue;
    private processing;
    /**
     * CHANGED: initialize() now checks:
     * 1) character.settings.transcription (if available and keys exist),
     * 2) then the .env TRANSCRIPTION_PROVIDER,
     * 3) then old fallback logic (Deepgram -> OpenAI -> local).
     */
    initialize(_runtime: IAgentRuntime): Promise<void>;
    constructor();
    private ensureCacheDirectoryExists;
    private ensureDebugDirectoryExists;
    private detectCuda;
    private convertAudio;
    private saveDebugAudio;
    transcribeAttachment(audioBuffer: ArrayBuffer): Promise<string | null>;
    /**
     * If the audio buffer is too short, return null. Otherwise push to queue.
     */
    transcribe(audioBuffer: ArrayBuffer): Promise<string | null>;
    transcribeAttachmentLocally(audioBuffer: ArrayBuffer): Promise<string | null>;
    /**
     * CHANGED: processQueue() uses the final transcriptionProvider enum set in initialize().
     */
    private processQueue;
    /**
     * Original logic from main is now handled by the final fallback in initialize().
     * We'll keep transcribeUsingDefaultLogic() if needed by other code references,
     * but it's no longer invoked in the new flow.
     */
    private transcribeUsingDefaultLogic;
    private transcribeWithDeepgram;
    private transcribeWithOpenAI;
    /**
     * Local transcription with nodejs-whisper. We keep it as it was,
     * just making sure to handle CUDA if available.
     */
    transcribeLocally(audioBuffer: ArrayBuffer): Promise<string | null>;
}

type NodePlugin = ReturnType<typeof createNodePlugin>;
declare function createNodePlugin(): {
    readonly name: "default";
    readonly description: "Default plugin, with basic actions and evaluators";
    readonly services: [SpeechService, TranscriptionService];
    readonly actions: [_elizaos_core.Action];
};

export { type NodePlugin, createNodePlugin };
