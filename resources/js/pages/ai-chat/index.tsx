import { useState, useRef, useEffect } from 'react';
import { Head, useForm, router } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
    Send,
    Bot,
    User,
    Copy,
    ThumbsUp,
    ThumbsDown,
    Paperclip,
    MessageSquare,
    Sparkles,
    MoreHorizontal
} from 'lucide-react';

interface ChatMessage {
    id: number;
    type: 'user' | 'ai';
    message: string;
    timestamp: string;
    model?: string;
}

interface AiModel {
    id: string;
    name: string;
    description: string;
    provider: string;
    maxTokens: number;
    cost: string;
    icon: string;
    capabilities: string[];
}

interface Props {
    availableModels: AiModel[];
    chatHistory: ChatMessage[];
    suggestedQuestions: string[];
    userSkills: string[];
}

export default function AiChatIndex({ availableModels, chatHistory, suggestedQuestions }: Props) {
    const [selectedModel, setSelectedModel] = useState(availableModels[0]?.id || 'gpt-4');
    const [messages, setMessages] = useState<ChatMessage[]>([]); // Start with empty chat
    const [isLoading, setIsLoading] = useState(false);
    const [showLibrary, setShowLibrary] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const { data, setData, processing, errors } = useForm({
        message: '',
        model: selectedModel,
    });

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto';
            textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
        }
    }, [data.message]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    const handleSendMessage = (e: React.FormEvent) => {
        e.preventDefault();
        if (!data.message.trim() || processing) return;

        const userMessage: ChatMessage = {
            id: Date.now(),
            type: 'user',
            message: data.message,
            timestamp: new Date().toISOString(),
        };

        setMessages(prev => [...prev, userMessage]);
        setData('message', '');
        setIsLoading(true);

        // Send message to backend
        router.post('/ai-chat/send', {
            message: data.message,
            model: selectedModel,
        }, {
            onSuccess: (response: { aiResponse: string; timestamp: string; model: string }) => {
                const aiMessage: ChatMessage = {
                    id: Date.now() + 1,
                    type: 'ai',
                    message: response.aiResponse || 'AI response received',
                    timestamp: response.timestamp || new Date().toISOString(),
                    model: response.model || selectedModel,
                };
                setMessages(prev => [...prev, aiMessage]);
                setIsLoading(false);
            },
            onError: () => {
                setIsLoading(false);
            },
        });
    };

    const handleModelChange = (modelId: string) => {
        setSelectedModel(modelId);
        setData('model', modelId);
    };

    const handleNewChat = () => {
        setMessages([]);
    };

    const handleCopyMessage = (message: string) => {
        navigator.clipboard.writeText(message);
    };

    const handleSuggestedQuestion = (question: string) => {
        setData('message', question);
        if (textareaRef.current) {
            textareaRef.current.focus();
        }
    };

    const getModelIcon = (modelId: string) => {
        const model = availableModels.find(m => m.id === modelId);
        return model?.icon || '🤖';
    };

    const getModelName = (modelId: string) => {
        const model = availableModels.find(m => m.id === modelId);
        return model?.name || 'AI Assistant';
    };

    const formatTime = (timestamp: string) => {
        return new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    return (
        <AppLayout
            showChatControls={true}
            onNewThread={handleNewChat}
            onToggleLibrary={() => setShowLibrary(!showLibrary)}
        >
            <Head title="AI Chat" />
            <div className="flex h-[calc(100vh-8rem)] bg-white dark:bg-gray-900">
                {/* Library Sidebar */}
                {showLibrary && (
                    <div className="w-80 bg-gray-50 dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col">
                        {/* Library Header */}
                        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                            <div className="flex items-center justify-between">
                                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Chat Library</h2>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => setShowLibrary(false)}
                                >
                                    <MoreHorizontal className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>

                        {/* Chat History */}
                        <div className="flex-1 overflow-y-auto p-4">
                            <div className="space-y-2">
                                {chatHistory.length > 0 ? (
                                    chatHistory.map((chat, index) => (
                                        <div
                                            key={index}
                                            className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                                        >
                                            <MessageSquare className="h-4 w-4 text-gray-500" />
                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                                                    Chat {index + 1}
                                                </p>
                                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                                    {formatTime(chat.timestamp)}
                                                </p>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-sm text-gray-500 dark:text-gray-400 text-center py-8">
                                        No chat history yet
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                )}

                {/* Main Chat Area */}
                <div className="flex-1 flex flex-col min-h-0">
                    {/* Messages - Scrollable Area */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-6 min-h-0">
                        {messages.length === 0 ? (
                            <div className="flex flex-col items-center justify-center h-full text-center">
                                <div className="mb-8">
                                    <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mb-4 mx-auto">
                                        <Sparkles className="h-8 w-8 text-gray-400" />
                                    </div>
                                    <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
                                        How can I help you today?
                                    </h2>
                                    <p className="text-gray-600 dark:text-gray-400">
                                        Ask me anything about your skills, career, or get personalized advice.
                                    </p>
                                </div>

                                {/* Suggested Questions */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-w-2xl">
                                    {suggestedQuestions.map((question, index) => (
                                        <Button
                                            key={index}
                                            variant="outline"
                                            className="h-auto p-4 text-left justify-start hover:bg-gray-50 dark:hover:bg-gray-800"
                                            onClick={() => handleSuggestedQuestion(question)}
                                        >
                                            <span className="text-sm">{question}</span>
                                        </Button>
                                    ))}
                                </div>
                            </div>
                        ) : (
                            <div className="max-w-4xl mx-auto space-y-6">
                                {messages.map((message) => (
                                    <div
                                        key={message.id}
                                        className={`flex gap-4 ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                                    >
                                        {message.type === 'ai' && (
                                            <div className="w-8 h-8 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center flex-shrink-0">
                                                <Bot className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                                            </div>
                                        )}
                                        <div
                                            className={`max-w-3xl ${
                                                message.type === 'user'
                                                    ? 'bg-gray-900 text-white rounded-2xl rounded-br-md'
                                                    : 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white rounded-2xl rounded-bl-md'
                                            } p-4`}
                                        >
                                            <div className="whitespace-pre-wrap text-sm leading-relaxed">
                                                {message.message}
                                            </div>
                                            <div className="flex items-center justify-between mt-3">
                                                <div className="flex items-center gap-2">
                                                    <span className="text-xs text-gray-500 dark:text-gray-400">
                                                        {formatTime(message.timestamp)}
                                                    </span>
                                                    {message.model && (
                                                        <span className="text-xs text-gray-500 dark:text-gray-400">
                                                            • {getModelName(message.model)}
                                                        </span>
                                                    )}
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        className="h-6 w-6 p-0 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                                                        onClick={() => handleCopyMessage(message.message)}
                                                    >
                                                        <Copy className="h-3 w-3" />
                                                    </Button>
                                                    {message.type === 'ai' && (
                                                        <>
                                                            <Button
                                                                variant="ghost"
                                                                size="sm"
                                                                className="h-6 w-6 p-0 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                                                            >
                                                                <ThumbsUp className="h-3 w-3" />
                                                            </Button>
                                                            <Button
                                                                variant="ghost"
                                                                size="sm"
                                                                className="h-6 w-6 p-0 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                                                            >
                                                                <ThumbsDown className="h-3 w-3" />
                                                            </Button>
                                                        </>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                        {message.type === 'user' && (
                                            <div className="w-8 h-8 bg-gray-900 dark:bg-gray-700 rounded-full flex items-center justify-center flex-shrink-0">
                                                <User className="h-4 w-4 text-white" />
                                            </div>
                                        )}
                                    </div>
                                ))}
                                {isLoading && (
                                    <div className="flex gap-4 justify-start">
                                        <div className="w-8 h-8 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center flex-shrink-0">
                                            <Bot className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                                        </div>
                                        <div className="bg-gray-100 dark:bg-gray-800 rounded-2xl rounded-bl-md p-4">
                                            <div className="flex items-center gap-2">
                                                <div className="flex space-x-1">
                                                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                                                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                                                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                                                </div>
                                                <span className="text-sm text-gray-500 dark:text-gray-400">AI is thinking...</span>
                                            </div>
                                        </div>
                                    </div>
                                )}
                                <div ref={messagesEndRef} />
                            </div>
                        )}
                    </div>

                    {/* Input Area */}
                    <div className="border-t border-gray-200 dark:border-gray-700 p-4 flex-shrink-0">
                        <form onSubmit={handleSendMessage} className="max-w-4xl mx-auto">
                            <div className="relative">
                                <Textarea
                                    ref={textareaRef}
                                    value={data.message}
                                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setData('message', e.target.value)}
                                    placeholder="Message AI Assistant..."
                                    className="w-full resize-none border-gray-200 dark:border-gray-600 focus:border-gray-400 dark:focus:border-gray-500 rounded-2xl pr-32 py-3 text-sm"
                                    rows={1}
                                    onKeyDown={(e: React.KeyboardEvent) => {
                                        if (e.key === 'Enter' && !e.shiftKey) {
                                            e.preventDefault();
                                            handleSendMessage(e);
                                        }
                                    }}
                                />
                                <div className="absolute right-2 bottom-2 flex items-center gap-1">
                                    {/* Model Selector */}
                                    <Select value={selectedModel} onValueChange={handleModelChange}>
                                        <SelectTrigger className="w-32 h-8 bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-xs">
                                            <SelectValue>
                                                <div className="flex items-center gap-1">
                                                    <span className="text-sm">{getModelIcon(selectedModel)}</span>
                                                    <span className="truncate">{getModelName(selectedModel)}</span>
                                                </div>
                                            </SelectValue>
                                        </SelectTrigger>
                                        <SelectContent className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                                            {availableModels.map((model) => (
                                                <SelectItem key={model.id} value={model.id}>
                                                    <div className="flex items-center gap-2">
                                                        <span className="text-lg">{model.icon}</span>
                                                        <div>
                                                            <div className="font-medium text-sm">{model.name}</div>
                                                            <div className="text-xs text-gray-500">{model.provider}</div>
                                                        </div>
                                                    </div>
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>

                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        type="button"
                                        className="h-8 w-8 p-0 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                                    >
                                        <Paperclip className="h-4 w-4" />
                                    </Button>
                                    <Button
                                        type="submit"
                                        disabled={!data.message.trim() || processing}
                                        className="h-8 w-8 p-0 bg-gray-900 hover:bg-gray-800 text-white dark:bg-white dark:hover:bg-gray-100 dark:text-gray-900"
                                    >
                                        <Send className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                            {errors.message && (
                                <p className="text-red-500 text-sm mt-2">{errors.message}</p>
                            )}
                        </form>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
