<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Google\Cloud\TextToSpeech\V1\AudioConfig;
use Google\Cloud\TextToSpeech\V1\AudioEncoding;
use Google\Cloud\TextToSpeech\V1\SynthesisInput;
use Google\Cloud\TextToSpeech\V1\TextToSpeechClient;
use Google\Cloud\TextToSpeech\V1\VoiceSelectionParams;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class TextToSpeechController extends Controller
{
    public function synthesize(Request $request)
    {
        $validated = $request->validate([
            'text' => 'required|string|max:5000',
        ]);

        try {
            // Initialize Google Cloud TTS client
            // Note: Set GOOGLE_APPLICATION_CREDENTIALS environment variable to your service account JSON file path
            // Or set credentials in config/services.php
            $config = [];
            
            if (config('services.google.application_credentials')) {
                $config['credentials'] = config('services.google.application_credentials');
            } elseif (env('GOOGLE_APPLICATION_CREDENTIALS')) {
                // Use environment variable if set
                putenv('GOOGLE_APPLICATION_CREDENTIALS=' . env('GOOGLE_APPLICATION_CREDENTIALS'));
            }
            
            $client = new TextToSpeechClient($config);

            $input = new SynthesisInput();
            $input->setText($validated['text']);

            $voice = new VoiceSelectionParams();
            $voice->setLanguageCode('en-US');
            $voice->setSsmlGender(\Google\Cloud\TextToSpeech\V1\SsmlVoiceGender::NEUTRAL);

            $audioConfig = new AudioConfig();
            $audioConfig->setAudioEncoding(AudioEncoding::MP3);

            $response = $client->synthesizeSpeech($input, $voice, $audioConfig);
            $audioContent = $response->getAudioContent();

            $client->close();

            return response($audioContent)
                ->header('Content-Type', 'audio/mpeg')
                ->header('Content-Disposition', 'inline; filename="speech.mp3"');

        } catch (\Exception $e) {
            Log::error('Text-to-Speech error: ' . $e->getMessage());
            
            // Fallback: Return error response
            return response()->json([
                'error' => 'Text-to-speech service unavailable. Please try again later.',
                'message' => config('app.debug') ? $e->getMessage() : null,
            ], 503);
        }
    }
}
