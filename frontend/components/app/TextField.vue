<script setup lang="ts">
import { PropType } from 'vue';

const props = defineProps({
    label: { type: String, required: true },
    id: { type: String, required: true },
    icon: { type: String as PropType<'mail' | 'lock'>, required: false },
    modelValue: { type: String, required: true },
    type: { type: String as PropType<'number' | 'date' | 'password' | 'text' | 'email' | 'name'>, required: false }
})
const emit = defineEmits(["update:modelValue", "fetch", "focus", "blur"])

const text = computed({
    get: () => props.modelValue,
    set: (val: string) => {
        emit("update:modelValue", val)
    },
})

</script>
<template>
    <div>
        <div class="row-center mb-3 text-blue-dark-100">
            <div class="w-6 h-6 flex-center mr-2">
                <IconsMail v-if="icon == 'mail'" />
                <IconsLock v-else-if="icon == 'lock'" />
            </div>
            <label :for="id" class="text-base">{{ label }}</label>
        </div>
        <input v-model="text" :type="type" :id="id" class="bg-blue-light-100 px-6 py-3 text-base text-blue-dark-100 rounded w-full" />
    </div>
</template>