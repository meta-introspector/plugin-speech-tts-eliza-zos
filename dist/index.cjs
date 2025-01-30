var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var index_exports = {};
__export(index_exports, {
  SpeechService: () => SpeechService,
  TranscriptionService: () => TranscriptionService,
  default: () => index_default,
  speechTTS: () => speechTTS
});
module.exports = __toCommonJS(index_exports);

// src/services/speech.ts
var import_stream = require("stream");
var import_node_stream = require("stream");
var import_web = require("stream/web");
var import_core = require("@elizaos/core");

// src/services/audioUtils.ts
function getWavHeader(audioLength, sampleRate, channelCount = 1, bitsPerSample = 16) {
  const wavHeader = Buffer.alloc(44);
  wavHeader.write("RIFF", 0);
  wavHeader.writeUInt32LE(36 + audioLength, 4);
  wavHeader.write("WAVE", 8);
  wavHeader.write("fmt ", 12);
  wavHeader.writeUInt32LE(16, 16);
  wavHeader.writeUInt16LE(1, 20);
  wavHeader.writeUInt16LE(channelCount, 22);
  wavHeader.writeUInt32LE(sampleRate, 24);
  wavHeader.writeUInt32LE(
    sampleRate * bitsPerSample * channelCount / 8,
    28
  );
  wavHeader.writeUInt16LE(bitsPerSample * channelCount / 8, 32);
  wavHeader.writeUInt16LE(bitsPerSample, 34);
  wavHeader.write("data", 36);
  wavHeader.writeUInt32LE(audioLength, 40);
  return wavHeader;
}

// src/services/speech.ts
var import_core2 = require("@elizaos/core");
var Echogarden = __toESM(require("echogarden"), 1);
var import_core3 = require("@elizaos/core");
function prependWavHeader(readable, audioLength, sampleRate, channelCount = 1, bitsPerSample = 16) {
  const wavHeader = getWavHeader(
    audioLength,
    sampleRate,
    channelCount,
    bitsPerSample
  );
  let pushedHeader = false;
  const passThrough = new import_stream.PassThrough();
  readable.on("data", function(data) {
    if (!pushedHeader) {
      passThrough.push(wavHeader);
      pushedHeader = true;
    }
    passThrough.push(data);
  });
  readable.on("end", function() {
    passThrough.end();
  });
  return passThrough;
}
async function getVoiceSettings(runtime) {
  var _a, _b, _c;
  const hasElevenLabs = !!runtime.getSetting("ELEVENLABS_XI_API_KEY");
  const useVits = !hasElevenLabs;
  const vitsSettings = (_a = runtime.character.settings) == null ? void 0 : _a.voice;
  const elevenlabsSettings = (_c = (_b = runtime.character.settings) == null ? void 0 : _b.voice) == null ? void 0 : _c.elevenlabs;
  import_core3.elizaLogger.log("Voice settings:", {
    hasElevenLabs,
    useVits,
    vitsSettings,
    elevenlabsSettings
  });
  return {
    elevenlabsVoiceId: (elevenlabsSettings == null ? void 0 : elevenlabsSettings.voiceId) || runtime.getSetting("ELEVENLABS_VOICE_ID") || "21m00Tcm4TlvDq8ikWAM",
    elevenlabsModel: (elevenlabsSettings == null ? void 0 : elevenlabsSettings.model) || runtime.getSetting("ELEVENLABS_MODEL_ID") || "eleven_multilingual_v2",
    elevenlabsStability: (elevenlabsSettings == null ? void 0 : elevenlabsSettings.stability) || runtime.getSetting("ELEVENLABS_VOICE_STABILITY") || "0.5",
    elevenlabsStreamingLatency: runtime.getSetting("ELEVENLABS_OPTIMIZE_STREAMING_LATENCY") || "4",
    elevenlabsOutputFormat: runtime.getSetting("ELEVENLABS_OUTPUT_FORMAT") || "pcm_16000",
    elevenlabsSimilarity: runtime.getSetting("ELEVENLABS_VOICE_SIMILARITY_BOOST") || "0.9",
    elevenlabsStyle: runtime.getSetting("ELEVENLABS_VOICE_STYLE") || "0.66",
    elevenlabsSpeakerBoost: runtime.getSetting("ELEVENLABS_VOICE_USE_SPEAKER_BOOST") || "false",
    vitsVoice: (vitsSettings == null ? void 0 : vitsSettings.model) || (vitsSettings == null ? void 0 : vitsSettings.url) || runtime.getSetting("VITS_VOICE") || "en_US-hfc_female-medium",
    elevenlabsUrl: runtime.getSetting("ELEVENLABS_XI_API_URL") || "https://api.elevenlabs.io/v1",
    useVits
  };
}
async function textToSpeech(runtime, text) {
  var _a;
  const {
    elevenlabsVoiceId,
    elevenlabsModel,
    elevenlabsUrl,
    elevenlabsStreamingLatency,
    elevenlabsOutputFormat,
    elevenlabsSimilarity,
    elevenlabsStability,
    elevenlabsStyle,
    elevenlabsSpeakerBoost
  } = await getVoiceSettings(runtime);
  try {
    import_core3.elizaLogger.log("sending request to Eleven Labs API");
    import_core3.elizaLogger.log("Eleven Labs voice ID:", elevenlabsVoiceId);
    import_core3.elizaLogger.log("Eleven Labs model ID:", elevenlabsModel);
    import_core3.elizaLogger.log("Eleven Labs streaming latency:", elevenlabsStreamingLatency);
    import_core3.elizaLogger.log("Eleven Labs output format:", elevenlabsOutputFormat);
    import_core3.elizaLogger.log("Eleven Labs similarity boost:", elevenlabsSimilarity);
    import_core3.elizaLogger.log("Eleven Labs stability:", elevenlabsStability);
    import_core3.elizaLogger.log("Eleven Labs style:", elevenlabsStyle);
    import_core3.elizaLogger.log("Eleven Labs speaker boost:", elevenlabsSpeakerBoost);
    const response = await fetch(
      `${elevenlabsUrl}/text-to-speech/${elevenlabsVoiceId}/stream?optimize_streaming_latency=${elevenlabsStreamingLatency}&output_format=${elevenlabsOutputFormat}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "xi-api-key": runtime.getSetting("ELEVENLABS_XI_API_KEY")
        },
        body: JSON.stringify({
          model_id: elevenlabsModel,
          text,
          voice_settings: {
            similarity_boost: elevenlabsSimilarity,
            stability: elevenlabsStability,
            style: elevenlabsStyle,
            use_speaker_boost: elevenlabsSpeakerBoost
          }
        })
      }
    );
    const status = response.status;
    if (status != 200) {
      const errorBodyString = await response.text();
      const errorBody = JSON.parse(errorBodyString);
      if (status === 401 && ((_a = errorBody.detail) == null ? void 0 : _a.status) === "quota_exceeded") {
        import_core3.elizaLogger.log(
          "ElevenLabs quota exceeded, falling back to VITS"
        );
        throw new Error("QUOTA_EXCEEDED");
      }
      throw new Error(
        `Received status ${status} from Eleven Labs API: ${errorBodyString}`
      );
    }
    if (response) {
      const webStream = import_web.ReadableStream.from(
        response.body
      );
      const reader = webStream.getReader();
      const readable = new import_node_stream.Readable({
        read() {
          reader.read().then(({ done, value }) => {
            if (done) {
              this.push(null);
            } else {
              this.push(value);
            }
          });
        }
      });
      if (elevenlabsOutputFormat.startsWith("pcm_")) {
        const sampleRate = parseInt(
          elevenlabsOutputFormat.substring(4)
        );
        const withHeader = prependWavHeader(
          readable,
          1024 * 1024 * 100,
          sampleRate,
          1,
          16
        );
        return withHeader;
      } else {
        return readable;
      }
    } else {
      return new import_node_stream.Readable({
        read() {
        }
      });
    }
  } catch (error) {
    if (error.message === "QUOTA_EXCEEDED") {
      const { vitsVoice } = await getVoiceSettings(runtime);
      const { audio } = await Echogarden.synthesize(text, {
        engine: "vits",
        voice: vitsVoice
      });
      let wavStream;
      if (audio instanceof Buffer) {
        import_core3.elizaLogger.log("audio is a buffer");
        wavStream = import_node_stream.Readable.from(audio);
      } else if ("audioChannels" in audio && "sampleRate" in audio) {
        import_core3.elizaLogger.log("audio is a RawAudio");
        const floatBuffer = Buffer.from(audio.audioChannels[0].buffer);
        import_core3.elizaLogger.log("buffer length: ", floatBuffer.length);
        const sampleRate = audio.sampleRate;
        const floatArray = new Float32Array(floatBuffer.buffer);
        const pcmBuffer = new Int16Array(floatArray.length);
        for (let i = 0; i < floatArray.length; i++) {
          pcmBuffer[i] = Math.round(floatArray[i] * 32767);
        }
        const wavHeaderBuffer = getWavHeader(
          pcmBuffer.length * 2,
          sampleRate,
          1,
          16
        );
        const wavBuffer = Buffer.concat([
          wavHeaderBuffer,
          Buffer.from(pcmBuffer.buffer)
        ]);
        wavStream = import_node_stream.Readable.from(wavBuffer);
      } else {
        throw new Error("Unsupported audio format");
      }
      return wavStream;
    }
    throw error;
  }
}
async function processVitsAudio(audio) {
  let wavStream;
  if (audio instanceof Buffer) {
    import_core3.elizaLogger.log("audio is a buffer");
    wavStream = import_node_stream.Readable.from(audio);
  } else if ("audioChannels" in audio && "sampleRate" in audio) {
    import_core3.elizaLogger.log("audio is a RawAudio");
    const floatBuffer = Buffer.from(audio.audioChannels[0].buffer);
    import_core3.elizaLogger.log("buffer length: ", floatBuffer.length);
    const sampleRate = audio.sampleRate;
    const floatArray = new Float32Array(floatBuffer.buffer);
    const pcmBuffer = new Int16Array(floatArray.length);
    for (let i = 0; i < floatArray.length; i++) {
      pcmBuffer[i] = Math.round(floatArray[i] * 32767);
    }
    const wavHeaderBuffer = getWavHeader(
      pcmBuffer.length * 2,
      sampleRate,
      1,
      16
    );
    const wavBuffer = Buffer.concat([
      wavHeaderBuffer,
      Buffer.from(pcmBuffer.buffer)
    ]);
    wavStream = import_node_stream.Readable.from(wavBuffer);
  } else {
    throw new Error("Unsupported audio format");
  }
  return wavStream;
}
async function generateVitsAudio(runtime, text) {
  const { vitsVoice } = await getVoiceSettings(runtime);
  const { audio } = await Echogarden.synthesize(text, {
    engine: "vits",
    voice: vitsVoice
  });
  return processVitsAudio(audio);
}
var SpeechService = class _SpeechService extends import_core2.Service {
  static serviceType = import_core.ServiceType.SPEECH_GENERATION;
  async initialize(_runtime) {
  }
  getInstance() {
    return _SpeechService.getInstance();
  }
  async generate(runtime, text) {
    try {
      import_core3.elizaLogger.log("Generating speech for text:", text);
      const { useVits } = await getVoiceSettings(runtime);
      if (useVits || !runtime.getSetting("ELEVENLABS_XI_API_KEY")) {
        return await generateVitsAudio(runtime, text);
      }
      return await textToSpeech(runtime, text);
    } catch (error) {
      console.error("Speech generation error:", error);
      return await generateVitsAudio(runtime, text);
    }
  }
};

// src/services/transcription.ts
var import_core4 = require("@elizaos/core");
var import_core5 = require("@elizaos/core");
var import_child_process = require("child_process");
var import_formdata_node = require("formdata-node");
var import_fs = __toESM(require("fs"), 1);
var import_nodejs_whisper = require("nodejs-whisper");
var import_openai = __toESM(require("openai"), 1);
var import_os = __toESM(require("os"), 1);
var import_path = __toESM(require("path"), 1);
var import_url = require("url");
var import_util = require("util");
var import_sdk = require("@deepgram/sdk");
var import_meta = {};
var __filename = (0, import_url.fileURLToPath)(import_meta.url);
var __dirname = import_path.default.dirname(__filename);
var execAsync = (0, import_util.promisify)(import_child_process.exec);
var TranscriptionService = class extends import_core5.Service {
  runtime = null;
  static serviceType = import_core5.ServiceType.TRANSCRIPTION;
  CONTENT_CACHE_DIR;
  DEBUG_AUDIO_DIR;
  TARGET_SAMPLE_RATE = 16e3;
  // Common sample rate for speech recognition
  isCudaAvailable = false;
  /**
   * CHANGED: We now use TranscriptionProvider instead of separate flags/strings.
   * This allows us to handle character settings, env variables, and fallback logic.
   */
  transcriptionProvider = null;
  deepgram = null;
  openai = null;
  /**
   * We keep the queue and processing logic as is.
   */
  queue = [];
  processing = false;
  /**
   * CHANGED: initialize() now checks:
   * 1) character.settings.transcription (if available and keys exist),
   * 2) then the .env TRANSCRIPTION_PROVIDER,
   * 3) then old fallback logic (Deepgram -> OpenAI -> local).
   */
  async initialize(_runtime) {
    var _a, _b;
    this.runtime = _runtime;
    const openaiBaseURL = this.runtime.getSetting(
      "OPENAI_API_URL"
    );
    import_core4.elizaLogger.log("OPENAI_API_URL", openaiBaseURL);
    let chosenProvider = null;
    const charSetting = (_b = (_a = this.runtime.character) == null ? void 0 : _a.settings) == null ? void 0 : _b.transcription;
    if (charSetting === import_core4.TranscriptionProvider.Deepgram) {
      const deepgramKey = this.runtime.getSetting("DEEPGRAM_API_KEY");
      if (deepgramKey) {
        this.deepgram = (0, import_sdk.createClient)(deepgramKey);
        chosenProvider = import_core4.TranscriptionProvider.Deepgram;
      }
    } else if (charSetting === import_core4.TranscriptionProvider.OpenAI) {
      const openaiKey = this.runtime.getSetting("OPENAI_API_KEY");
      if (openaiKey) {
        this.openai = new import_openai.default({ apiKey: openaiKey, baseURL: openaiBaseURL });
        chosenProvider = import_core4.TranscriptionProvider.OpenAI;
      }
    } else if (charSetting === import_core4.TranscriptionProvider.Local) {
      chosenProvider = import_core4.TranscriptionProvider.Local;
    }
    if (!chosenProvider) {
      const envProvider = this.runtime.getSetting(
        "TRANSCRIPTION_PROVIDER"
      );
      if (envProvider) {
        switch (envProvider.toLowerCase()) {
          case "deepgram":
            {
              const dgKey = this.runtime.getSetting("DEEPGRAM_API_KEY");
              if (dgKey) {
                this.deepgram = (0, import_sdk.createClient)(dgKey);
                chosenProvider = import_core4.TranscriptionProvider.Deepgram;
              }
            }
            break;
          case "openai":
            {
              const openaiKey = this.runtime.getSetting("OPENAI_API_KEY");
              if (openaiKey) {
                this.openai = new import_openai.default({ apiKey: openaiKey, baseURL: openaiBaseURL });
                chosenProvider = import_core4.TranscriptionProvider.OpenAI;
              }
            }
            break;
          case "local":
            chosenProvider = import_core4.TranscriptionProvider.Local;
            break;
        }
      }
    }
    if (!chosenProvider) {
      const deepgramKey = this.runtime.getSetting("DEEPGRAM_API_KEY");
      if (deepgramKey) {
        this.deepgram = (0, import_sdk.createClient)(deepgramKey);
        chosenProvider = import_core4.TranscriptionProvider.Deepgram;
      } else {
        const openaiKey = this.runtime.getSetting("OPENAI_API_KEY");
        if (openaiKey) {
          this.openai = new import_openai.default({ apiKey: openaiKey, baseURL: openaiBaseURL });
          chosenProvider = import_core4.TranscriptionProvider.OpenAI;
        } else {
          chosenProvider = import_core4.TranscriptionProvider.Local;
        }
      }
    }
    this.transcriptionProvider = chosenProvider;
    this.detectCuda();
  }
  constructor() {
    super();
    const rootDir = import_path.default.resolve(__dirname, "../../");
    this.CONTENT_CACHE_DIR = import_path.default.join(rootDir, "content_cache");
    this.DEBUG_AUDIO_DIR = import_path.default.join(rootDir, "debug_audio");
    this.ensureCacheDirectoryExists();
    this.ensureDebugDirectoryExists();
  }
  ensureCacheDirectoryExists() {
    if (!import_fs.default.existsSync(this.CONTENT_CACHE_DIR)) {
      import_fs.default.mkdirSync(this.CONTENT_CACHE_DIR, { recursive: true });
    }
  }
  ensureDebugDirectoryExists() {
    if (!import_fs.default.existsSync(this.DEBUG_AUDIO_DIR)) {
      import_fs.default.mkdirSync(this.DEBUG_AUDIO_DIR, { recursive: true });
    }
  }
  detectCuda() {
    const platform = import_os.default.platform();
    if (platform === "linux") {
      try {
        import_fs.default.accessSync("/usr/local/cuda/bin/nvcc", import_fs.default.constants.X_OK);
        this.isCudaAvailable = true;
        import_core4.elizaLogger.log(
          "CUDA detected. Transcription will use CUDA acceleration."
        );
      } catch (_error) {
        import_core4.elizaLogger.log(
          "CUDA not detected. Transcription will run on CPU."
        );
      }
    } else if (platform === "win32") {
      const cudaPath = import_path.default.join(
        import_core4.settings.CUDA_PATH || "C:\\Program Files\\NVIDIA GPU Computing Toolkit\\CUDA\\v11.0",
        "bin",
        "nvcc.exe"
      );
      if (import_fs.default.existsSync(cudaPath)) {
        this.isCudaAvailable = true;
        import_core4.elizaLogger.log(
          "CUDA detected. Transcription will use CUDA acceleration."
        );
      } else {
        import_core4.elizaLogger.log(
          "CUDA not detected. Transcription will run on CPU."
        );
      }
    } else {
      import_core4.elizaLogger.log(
        "CUDA not supported on this platform. Transcription will run on CPU."
      );
    }
  }
  async convertAudio(inputBuffer) {
    const inputPath = import_path.default.join(
      this.CONTENT_CACHE_DIR,
      `input_${Date.now()}.wav`
    );
    const outputPath = import_path.default.join(
      this.CONTENT_CACHE_DIR,
      `output_${Date.now()}.wav`
    );
    import_fs.default.writeFileSync(inputPath, Buffer.from(inputBuffer));
    try {
      const { stdout } = await execAsync(
        `ffprobe -v error -show_entries stream=codec_name,sample_rate,channels -of json "${inputPath}"`
      );
      const probeResult = JSON.parse(stdout);
      const stream = probeResult.streams[0];
      import_core4.elizaLogger.log("Input audio info:", stream);
      let ffmpegCommand = `ffmpeg -i "${inputPath}" -ar ${this.TARGET_SAMPLE_RATE} -ac 1`;
      if (stream.codec_name === "pcm_f32le") {
        ffmpegCommand += " -acodec pcm_s16le";
      }
      ffmpegCommand += ` "${outputPath}"`;
      import_core4.elizaLogger.log("FFmpeg command:", ffmpegCommand);
      await execAsync(ffmpegCommand);
      const convertedBuffer = import_fs.default.readFileSync(outputPath);
      import_fs.default.unlinkSync(inputPath);
      import_fs.default.unlinkSync(outputPath);
      return convertedBuffer;
    } catch (error) {
      import_core4.elizaLogger.error("Error converting audio:", error);
      throw error;
    }
  }
  async saveDebugAudio(audioBuffer, prefix) {
    this.ensureDebugDirectoryExists();
    const filename = `${prefix}_${Date.now()}.wav`;
    const filePath = import_path.default.join(this.DEBUG_AUDIO_DIR, filename);
    import_fs.default.writeFileSync(filePath, Buffer.from(audioBuffer));
    import_core4.elizaLogger.log(`Debug audio saved: ${filePath}`);
  }
  async transcribeAttachment(audioBuffer) {
    return await this.transcribe(audioBuffer);
  }
  /**
   * If the audio buffer is too short, return null. Otherwise push to queue.
   */
  async transcribe(audioBuffer) {
    if (audioBuffer.byteLength < 0.2 * 16e3) {
      return null;
    }
    return new Promise((resolve) => {
      this.queue.push({ audioBuffer, resolve });
      if (!this.processing) {
        this.processQueue();
      }
    });
  }
  async transcribeAttachmentLocally(audioBuffer) {
    return this.transcribeLocally(audioBuffer);
  }
  /**
   * CHANGED: processQueue() uses the final transcriptionProvider enum set in initialize().
   */
  async processQueue() {
    if (this.processing || this.queue.length === 0) return;
    this.processing = true;
    while (this.queue.length > 0) {
      const { audioBuffer, resolve } = this.queue.shift();
      let result = null;
      switch (this.transcriptionProvider) {
        case import_core4.TranscriptionProvider.Deepgram:
          result = await this.transcribeWithDeepgram(audioBuffer);
          break;
        case import_core4.TranscriptionProvider.OpenAI:
          result = await this.transcribeWithOpenAI(audioBuffer);
          break;
        default:
          result = await this.transcribeLocally(audioBuffer);
      }
      resolve(result);
    }
    this.processing = false;
  }
  /**
   * Original logic from main is now handled by the final fallback in initialize().
   * We'll keep transcribeUsingDefaultLogic() if needed by other code references,
   * but it's no longer invoked in the new flow.
   */
  async transcribeUsingDefaultLogic(audioBuffer) {
    if (this.deepgram) {
      return await this.transcribeWithDeepgram(audioBuffer);
    } else if (this.openai) {
      return await this.transcribeWithOpenAI(audioBuffer);
    }
    return await this.transcribeLocally(audioBuffer);
  }
  async transcribeWithDeepgram(audioBuffer) {
    const buffer = Buffer.from(audioBuffer);
    const response = await this.deepgram.listen.prerecorded.transcribeFile(
      buffer,
      {
        model: "nova-2",
        language: "en-US",
        smart_format: true
      }
    );
    const result = response.result.results.channels[0].alternatives[0].transcript;
    return result;
  }
  async transcribeWithOpenAI(audioBuffer) {
    import_core4.elizaLogger.log("Transcribing audio with OpenAI...");
    try {
      await this.saveDebugAudio(audioBuffer, "openai_input_original");
      const arrayBuffer = new Uint8Array(audioBuffer).buffer;
      const convertedBuffer = Buffer.from(await this.convertAudio(arrayBuffer)).buffer;
      await this.saveDebugAudio(
        convertedBuffer,
        "openai_input_converted"
      );
      const file = new import_formdata_node.File([convertedBuffer], "audio.wav", {
        type: "audio/wav"
      });
      const result = await this.openai.audio.transcriptions.create({
        model: "whisper-1",
        language: "en",
        response_format: "text",
        file
      });
      const trimmedResult = result.trim();
      import_core4.elizaLogger.log(`OpenAI speech to text result: "${trimmedResult}"`);
      return trimmedResult;
    } catch (error) {
      import_core4.elizaLogger.error(
        "Error in OpenAI speech-to-text conversion:",
        error
      );
      if (error.response) {
        import_core4.elizaLogger.error("Response data:", error.response.data);
        import_core4.elizaLogger.error("Response status:", error.response.status);
        import_core4.elizaLogger.error("Response headers:", error.response.headers);
      } else if (error.request) {
        import_core4.elizaLogger.error("No response received:", error.request);
      } else {
        import_core4.elizaLogger.error("Error setting up request:", error.message);
      }
      return null;
    }
  }
  /**
   * Local transcription with nodejs-whisper. We keep it as it was,
   * just making sure to handle CUDA if available.
   */
  async transcribeLocally(audioBuffer) {
    try {
      import_core4.elizaLogger.log("Transcribing audio locally...");
      await this.saveDebugAudio(audioBuffer, "local_input_original");
      const arrayBuffer = new Uint8Array(audioBuffer).buffer;
      const convertedBuffer = Buffer.from(await this.convertAudio(arrayBuffer)).buffer;
      await this.saveDebugAudio(convertedBuffer, "local_input_converted");
      const tempWavFile = import_path.default.join(
        this.CONTENT_CACHE_DIR,
        `temp_${Date.now()}.wav`
      );
      const uint8Array = new Uint8Array(convertedBuffer);
      import_fs.default.writeFileSync(tempWavFile, uint8Array);
      import_core4.elizaLogger.debug(`Temporary WAV file created: ${tempWavFile}`);
      let output = await (0, import_nodejs_whisper.nodewhisper)(tempWavFile, {
        modelName: "base.en",
        autoDownloadModelName: "base.en",
        removeWavFileAfterTranscription: false,
        withCuda: this.isCudaAvailable,
        whisperOptions: {
          outputInText: true,
          outputInVtt: false,
          outputInSrt: false,
          outputInCsv: false,
          translateToEnglish: false,
          wordTimestamps: false,
          timestamps_length: 60
          // splitOnWord: true,
        }
      });
      output = output.split("\n").map((line) => {
        if (line.trim().startsWith("[")) {
          const endIndex = line.indexOf("]");
          return line.substring(endIndex + 1);
        }
        return line;
      }).join("\n");
      import_fs.default.unlinkSync(tempWavFile);
      if (!output || output.length < 5) {
        import_core4.elizaLogger.log("Output is null or too short, returning null");
        return null;
      }
      return output;
    } catch (error) {
      import_core4.elizaLogger.error(
        "Error in local speech-to-text conversion:",
        error
      );
      return null;
    }
  }
};

// src/index.ts
var speechTTS = {
  name: "default",
  description: "Default plugin, with basic actions and evaluators",
  services: [
    new SpeechService(),
    new TranscriptionService()
  ],
  actions: []
};
var index_default = speechTTS;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  SpeechService,
  TranscriptionService,
  speechTTS
});
//# sourceMappingURL=index.cjs.map