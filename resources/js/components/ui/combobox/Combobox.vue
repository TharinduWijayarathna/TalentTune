<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { Check, ChevronsUpDown } from 'lucide-vue-next';
import { Button } from '@/components/ui/button';
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from '@/components/ui/command';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';

interface Option {
    value: string | number;
    label: string;
}

const props = withDefaults(defineProps<{
    options: Option[];
    modelValue?: string | number;
    placeholder?: string;
    searchPlaceholder?: string;
    emptyText?: string;
    disabled?: boolean;
}>(), {
    placeholder: 'Select option...',
    searchPlaceholder: 'Search...',
    emptyText: 'No option found.',
    disabled: false,
});

const emit = defineEmits<{
    'update:modelValue': [value: string | number | undefined];
}>();

const open = ref(false);
const searchQuery = ref('');

const selectedOption = computed(() => {
    if (props.modelValue === undefined || props.modelValue === null || props.modelValue === '') return null;
    return props.options.find(opt => {
        // Handle both string and number comparison
        const optValue = typeof opt.value === 'number' ? opt.value : String(opt.value);
        const modelValue = typeof props.modelValue === 'number' ? props.modelValue : String(props.modelValue);
        return optValue === modelValue;
    });
});

const filteredOptions = computed(() => {
    if (!searchQuery.value) return props.options;
    const query = searchQuery.value.toLowerCase();
    return props.options.filter(option =>
        option.label.toLowerCase().includes(query)
    );
});

const selectOption = (option: Option) => {
    emit('update:modelValue', option.value);
    open.value = false;
    searchQuery.value = '';
};

watch(() => props.modelValue, () => {
    searchQuery.value = '';
});
</script>

<template>
    <Popover v-model:open="open">
        <PopoverTrigger as-child>
            <Button
                variant="outline"
                role="combobox"
                :aria-expanded="open"
                :disabled="disabled"
                class="w-full justify-between"
            >
                <span :class="cn('truncate', !selectedOption && 'text-muted-foreground')">
                    {{ selectedOption ? selectedOption.label : placeholder }}
                </span>
                <ChevronsUpDown class="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
        </PopoverTrigger>
        <PopoverContent class="w-full p-0" :style="{ width: 'var(--radix-popover-trigger-width)' }">
            <Command>
                <CommandInput
                    v-model="searchQuery"
                    :placeholder="searchPlaceholder"
                />
                <CommandList>
                    <CommandEmpty>{{ emptyText }}</CommandEmpty>
                    <CommandGroup>
                        <CommandItem
                            v-for="option in filteredOptions"
                            :key="option.value"
                            :value="option.value.toString()"
                            @select="selectOption(option)"
                        >
                            <Check
                                :class="cn(
                                    'mr-2 h-4 w-4',
                                    props.modelValue === option.value ? 'opacity-100' : 'opacity-0'
                                )"
                            />
                            {{ option.label }}
                        </CommandItem>
                    </CommandGroup>
                </CommandList>
            </Command>
        </PopoverContent>
    </Popover>
</template>

