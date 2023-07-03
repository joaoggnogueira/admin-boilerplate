<script setup lang="ts">
import { PropType } from 'vue';

const props = defineProps({
    label: { type: String, required: false },
    id: { type: String, required: false },
    icon: { type: String as PropType<'mail' | 'lock'>, required: false },
    modelValue: { type: String, required: true },
    placeholder: { type: String, required: false },
    copyToClipboard: { type: Boolean, required: false },
    readonly: { type: Boolean, required: false },
    type: { type: String as PropType<'number' | 'search' | 'date' | 'password' | 'text' | 'email' | 'name'>, required: false }
})
const emit = defineEmits(["update:modelValue", "fetch", "focus", "blur"])

const text = computed({
    get: () => props.modelValue,
    set: (val: string) => {
        emit("update:modelValue", val)
    },
})

async function doCopyToClipboard() {
    if (props.copyToClipboard && text.value) {
        try {
            await navigator.clipboard.writeText(text.value);
            alert('Contéudo copiado para area de transferência');
        } catch (err) {
            alert('Falha ao copiar: ' + err);
        }
    }
}

</script>
<template>
    <div>
        <div v-if="label" class="flex items-end mb-1 text-blue-dark-100">
            <div class="w-6 h-6 flex-center mr-2" v-if="icon">
                <IconsMail v-if="icon == 'mail'" />
                <IconsLock v-else-if="icon == 'lock'" />
            </div>
            <label :for="id" class="text-base font-bold">{{ label }}</label>
        </div>
        <input @click="doCopyToClipboard" v-model="text" :readonly="readonly" :class="{
            'opacity-75': readonly,
            'pointer-events-none cursor-default': !copyToClipboard && readonly,
            'cursor-pointer': copyToClipboard
        }" :placeholder="placeholder" :type="type" :id="id"
            class="bg-blue-light-100 px-6 py-3 text-base text-blue-dark-100 rounded w-full" />
    </div>
</template>