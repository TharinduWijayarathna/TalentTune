<script setup lang="ts">
import AppLayout from '@/layouts/AppLayout.vue';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { mockInterview } from '@/routes';
import mockInterviewRoutes from '@/routes/mock-interview';
import { type BreadcrumbItem } from '@/types';
import { Head, router } from '@inertiajs/vue3';
import { Video, Play, Clock, CheckCircle2, ArrowRight, ArrowLeft, Mic, Volume2, MicOff, Pause } from 'lucide-vue-next';
import { ref, computed, onMounted, onUnmounted } from 'vue';

const props = defineProps<{
    session?: {
        id: number;
        type: string;
        difficulty: string;
        mode: string;
        status: string;
        questions?: string[];
        answers?: Record<string, string>;
        feedback?: Record<string, any>;
        score?: number;
        started_at?: string;
    };
}>();

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Mock Interview',
        href: mockInterview().url,
    },
    {
        title: 'Voice Interview Session',
        href: mockInterviewRoutes.session(props.session?.id || 0).url,
    },
];

const currentQuestionIndex = ref(0);
const answers = ref<Record<string, string>>(props.session?.answers || {});
const isListening = ref(false);
const isSpeaking = ref(false);
const recognition: any = ref(null);
const synth = ref<SpeechSynthesis | null>(null);
const currentUtterance = ref<SpeechSynthesisUtterance | null>(null);
const transcribedText = ref<string>('');

// Sample questions based on type
const sampleQuestions: Record<string, Record<string, string[]>> = {
    technical: {
        beginner: [
            'What is the difference between a variable and a constant?',
            'Explain what a function is in programming.',
            'What is the purpose of an if statement?',
        ],
        intermediate: [
            'Explain the difference between REST and GraphQL APIs.',
            'What is the difference between SQL JOIN types?',
            'How does garbage collection work in programming languages?',
        ],
        advanced: [
            'Explain the trade-offs between microservices and monolithic architecture.',
            'How would you design a distributed caching system?',
            'Explain the CAP theorem and its implications.',
        ],
    },
    behavioral: {
        beginner: [
            'Tell me about yourself.',
            'Why are you interested in this role?',
            'What are your greatest strengths?',
        ],
        intermediate: [
            'Describe a time when you had to work under pressure.',
            'Tell me about a challenge you faced and how you overcame it.',
            'Give an example of when you worked effectively in a team.',
        ],
        advanced: [
            'Describe a situation where you had to make a difficult decision with limited information.',
            'Tell me about a time you had to convince others of your idea.',
            'Describe a conflict you resolved in a professional setting.',
        ],
    },
    mixed: {
        beginner: [
            'What is your biggest technical achievement?',
            'How do you approach learning new technologies?',
            'Describe a project you are proud of.',
        ],
        intermediate: [
            'How do you balance technical requirements with business needs?',
            'Describe your experience with agile development.',
            'How do you handle technical debt in your projects?',
        ],
        advanced: [
            'Describe a complex technical problem you solved and the approach you took.',
            'How do you mentor junior developers?',
            'Explain a time you had to make a technical decision that affected the entire team.',
        ],
    },
};

const questions = computed(() => {
    if (props.session?.questions && props.session.questions.length > 0) {
        return props.session.questions;
    }
    const typeQuestions = sampleQuestions[props.session?.type || 'mixed'];
    return typeQuestions?.[props.session?.difficulty || 'intermediate'] || [];
});

const currentQuestion = computed(() => questions.value[currentQuestionIndex.value]);

const totalQuestions = computed(() => questions.value.length);

const isFirstQuestion = computed(() => currentQuestionIndex.value === 0);
const isLastQuestion = computed(() => currentQuestionIndex.value === totalQuestions.value - 1);

// Initialize Speech Recognition
const initSpeechRecognition = () => {
    if (typeof window !== 'undefined') {
        const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
        
        if (!SpeechRecognition) {
            alert('Speech recognition is not supported in your browser. Please use Chrome or Edge.');
            return;
        }

        recognition.value = new SpeechRecognition();
        recognition.value.continuous = false;
        recognition.value.interimResults = true;
        recognition.value.lang = 'en-US';

        recognition.value.onresult = (event: any) => {
            let interimTranscript = '';
            let finalTranscript = '';

            for (let i = event.resultIndex; i < event.results.length; i++) {
                const transcript = event.results[i][0].transcript;
                if (event.results[i].isFinal) {
                    finalTranscript += transcript + ' ';
                } else {
                    interimTranscript += transcript;
                }
            }

            transcribedText.value = finalTranscript || interimTranscript;
            
            if (finalTranscript && currentQuestion.value) {
                answers.value[currentQuestion.value] = finalTranscript.trim();
            }
        };

        recognition.value.onerror = (event: any) => {
            console.error('Speech recognition error:', event.error);
            isListening.value = false;
        };

        recognition.value.onend = () => {
            isListening.value = false;
        };
    }
};

// Initialize Text-to-Speech
const initTextToSpeech = () => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        synth.value = window.speechSynthesis;
    }
};

// Speak question using browser's built-in TTS (fallback if Google TTS not available)
const speakQuestion = (text: string) => {
    if (!synth.value) {
        initTextToSpeech();
    }

    // Stop any current speech
    if (synth.value && synth.value.speaking) {
        synth.value.cancel();
    }

    if (synth.value) {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'en-US';
        utterance.rate = 0.9;
        utterance.pitch = 1;
        utterance.volume = 1;

        utterance.onstart = () => {
            isSpeaking.value = true;
        };

        utterance.onend = () => {
            isSpeaking.value = false;
        };

        utterance.onerror = () => {
            isSpeaking.value = false;
        };

        currentUtterance.value = utterance;
        synth.value.speak(utterance);
    }
};

// Use Google Cloud Text-to-Speech API (needs backend endpoint)
const speakWithGoogleTTS = async (text: string) => {
    try {
        // Get CSRF token from meta tag
        const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
        
        // Call backend endpoint that uses Google TTS
        const response = await fetch('/api/text-to-speech', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'audio/mpeg',
                'X-CSRF-TOKEN': csrfToken || '',
                'X-Requested-With': 'XMLHttpRequest',
            },
            body: JSON.stringify({ text }),
        });

        if (response.ok && response.headers.get('Content-Type')?.includes('audio')) {
            const audioBlob = await response.blob();
            const audioUrl = URL.createObjectURL(audioBlob);
            const audio = new Audio(audioUrl);
            
            isSpeaking.value = true;
            
            audio.onended = () => {
                isSpeaking.value = false;
                URL.revokeObjectURL(audioUrl);
            };

            audio.onerror = () => {
                isSpeaking.value = false;
                URL.revokeObjectURL(audioUrl);
                // Fallback to browser TTS
                speakQuestion(text);
            };
            
            await audio.play();
        } else {
            // Fallback to browser TTS
            speakQuestion(text);
        }
    } catch (error) {
        console.error('Google TTS error:', error);
        // Fallback to browser TTS
        speakQuestion(text);
    }
};

// Start listening for voice input
const startListening = () => {
    if (!recognition.value) {
        initSpeechRecognition();
    }

    if (recognition.value && !isListening.value) {
        transcribedText.value = '';
        isListening.value = true;
        recognition.value.start();
    }
};

// Stop listening
const stopListening = () => {
    if (recognition.value && isListening.value) {
        recognition.value.stop();
        isListening.value = false;
    }
};

// Stop speaking
const stopSpeaking = () => {
    if (synth.value && synth.value.speaking) {
        synth.value.cancel();
        isSpeaking.value = false;
    }
};

// Save answer
const saveAnswer = () => {
    if (!currentQuestion.value) return;
    if (transcribedText.value.trim()) {
        answers.value[currentQuestion.value] = transcribedText.value.trim();
    }
};

// Next question
const nextQuestion = () => {
    saveAnswer();
    stopSpeaking();
    stopListening();
    
    if (currentQuestionIndex.value < totalQuestions.value - 1) {
        currentQuestionIndex.value++;
        transcribedText.value = answers.value[currentQuestion.value] || '';
        // Auto-speak next question
        setTimeout(() => {
            if (currentQuestion.value) {
                speakWithGoogleTTS(currentQuestion.value);
            }
        }, 500);
    }
};

// Previous question
const previousQuestion = () => {
    saveAnswer();
    stopSpeaking();
    stopListening();
    
    if (currentQuestionIndex.value > 0) {
        currentQuestionIndex.value--;
        transcribedText.value = answers.value[currentQuestion.value] || '';
    }
};

// Complete interview
const completeInterview = () => {
    saveAnswer();
    stopSpeaking();
    stopListening();

    router.put(
        mockInterviewRoutes.update(props.session?.id || 0).url,
        {
            answers: answers.value,
            status: 'completed',
        },
        {
            onSuccess: () => {
                router.visit(mockInterview().url);
            },
        }
    );
};

// Auto-speak question when it loads
onMounted(() => {
    initSpeechRecognition();
    initTextToSpeech();
    
    if (currentQuestion.value) {
        setTimeout(() => {
            speakWithGoogleTTS(currentQuestion.value);
        }, 1000);
    }
});

// Cleanup on unmount
onUnmounted(() => {
    stopSpeaking();
    stopListening();
    if (recognition.value) {
        recognition.value.abort();
    }
});
</script>

<template>
    <Head title="Voice Mock Interview Session" />

    <AppLayout :breadcrumbs="breadcrumbs">
        <div class="flex h-full flex-1 flex-col gap-6 p-6">
            <!-- Session Header -->
            <div class="flex items-center justify-between">
                <div>
                    <h1 class="text-3xl font-bold tracking-tight">Voice Interview</h1>
                    <p class="text-muted-foreground mt-2">
                        Speak your answers naturally
                    </p>
                </div>
                <div class="flex items-center gap-2">
                    <span class="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
                        Question {{ currentQuestionIndex + 1 }} of {{ totalQuestions }}
                    </span>
                </div>
            </div>

            <!-- Interview Card -->
            <Card class="shadow-sm">
                <CardHeader>
                    <CardTitle class="flex items-center gap-2">
                        <Volume2 class="h-5 w-5" />
                        Current Question
                    </CardTitle>
                    <CardDescription>
                        The question will be read aloud. Click the microphone to speak your answer.
                    </CardDescription>
                </CardHeader>
                <CardContent class="space-y-6">
                    <!-- Current Question -->
                    <div>
                        <Label class="mb-2 block text-base font-semibold">Question:</Label>
                        <div class="p-4 bg-secondary rounded-lg">
                            <p class="text-lg mb-3">{{ currentQuestion }}</p>
                            <div class="flex items-center gap-2">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    :disabled="isSpeaking"
                                    @click="speakWithGoogleTTS(currentQuestion)"
                                >
                                    <Volume2 class="h-4 w-4 mr-2" />
                                    Replay Question
                                </Button>
                                <Button
                                    v-if="isSpeaking"
                                    variant="outline"
                                    size="sm"
                                    @click="stopSpeaking"
                                >
                                    <Pause class="h-4 w-4 mr-2" />
                                    Stop
                                </Button>
                            </div>
                        </div>
                    </div>

                    <!-- Voice Input Controls -->
                    <div class="grid gap-2">
                        <Label>Your Answer (Voice Input)</Label>
                        <div class="flex items-center gap-4 p-4 border rounded-lg">
                            <Button
                                :variant="isListening ? 'destructive' : 'default'"
                                size="lg"
                                class="rounded-full w-16 h-16"
                                @click="isListening ? stopListening() : startListening()"
                            >
                                <Mic v-if="!isListening" class="h-6 w-6" />
                                <MicOff v-else class="h-6 w-6" />
                            </Button>
                            <div class="flex-1">
                                <p v-if="isListening" class="text-sm font-medium text-primary animate-pulse">
                                    🎤 Listening... Speak now
                                </p>
                                <p v-else-if="transcribedText || (currentQuestion && answers[currentQuestion])" class="text-sm text-muted-foreground">
                                    {{ transcribedText || answers[currentQuestion] || 'Click microphone to speak your answer' }}
                                </p>
                                <p v-else class="text-sm text-muted-foreground">
                                    Click the microphone button to start speaking your answer
                                </p>
                            </div>
                        </div>
                        
                        <!-- Hidden input field to store the answer -->
                        <input
                            type="hidden"
                            :value="answers[currentQuestion] || transcribedText"
                            :name="`answer_${currentQuestionIndex}`"
                        />
                    </div>

                    <!-- Transcribed Text Display -->
                    <div v-if="transcribedText || (currentQuestion && answers[currentQuestion])" class="p-4 bg-accent rounded-lg">
                        <Label class="mb-2 block text-sm font-medium">Transcribed Answer:</Label>
                        <p class="text-sm whitespace-pre-wrap">{{ transcribedText || answers[currentQuestion] }}</p>
                        <Button
                            v-if="transcribedText && currentQuestion && !answers[currentQuestion]"
                            variant="outline"
                            size="sm"
                            class="mt-2"
                            @click="saveAnswer"
                        >
                            Save Answer
                        </Button>
                    </div>

                    <!-- Navigation Buttons -->
                    <div class="flex items-center justify-between pt-4 border-t">
                        <Button
                            variant="outline"
                            :disabled="isFirstQuestion"
                            @click="previousQuestion"
                        >
                            <ArrowLeft class="mr-2 h-4 w-4" />
                            Previous
                        </Button>

                        <div class="flex gap-2">
                            <span
                                v-for="(question, index) in questions"
                                :key="index"
                                class="h-2 w-2 rounded-full"
                                :class="index === currentQuestionIndex ? 'bg-primary' : index in answers ? 'bg-green-500' : 'bg-muted'"
                            />
                        </div>

                        <Button
                            v-if="!isLastQuestion"
                            @click="nextQuestion"
                            :disabled="isListening || isSpeaking"
                        >
                            Next
                            <ArrowRight class="ml-2 h-4 w-4" />
                        </Button>
                        <Button
                            v-else
                            @click="completeInterview"
                            :disabled="isListening || isSpeaking"
                        >
                            <CheckCircle2 class="mr-2 h-4 w-4" />
                            Complete Interview
                        </Button>
                    </div>
                </CardContent>
            </Card>

            <!-- Progress Summary -->
            <Card class="shadow-sm">
                <CardHeader>
                    <CardTitle>Progress</CardTitle>
                </CardHeader>
                <CardContent>
                    <div class="space-y-2">
                        <div class="flex items-center justify-between text-sm">
                            <span>Questions Answered</span>
                            <span class="font-medium">{{ Object.keys(answers).length }} / {{ totalQuestions }}</span>
                        </div>
                        <div class="w-full bg-secondary rounded-full h-2">
                            <div
                                class="bg-primary h-2 rounded-full transition-all"
                                :style="{ width: `${(Object.keys(answers).length / totalQuestions) * 100}%` }"
                            />
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    </AppLayout>
</template>

