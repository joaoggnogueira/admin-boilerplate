<script setup lang="ts">
let props = defineProps({
    modelValue: { type: Boolean, required: true },
    label: { type: String, required: false },
    readonly: { type: Boolean, required: false }
})
let emit = defineEmits(["update:modelValue"])
const value = computed({
    get() {
        return props.modelValue
    },
    set(b: boolean) {
        emit("update:modelValue", b)
    }
})

const toggle = () => {
    if (!props.readonly) {
        value.value = !value.value
    }
}
</script>
<template>
    <div class="flex items-center">
        <div @dragenter.stop="() => { }" @dragleave.stop="() => { }" @click="toggle" :class="{
            'bg-gray justify-start': !value,
            'bg-blue-dark-100 justify-end hover:bg-blue-dark-200': value,
            'opacity-75 cursor-default': readonly
        }" class="w-14 h-8 flex items-center px-0.5 rounded-full cursor-pointer hover:border-blue">
            <div :class="{
                ' text-blue hover:text-blue-dark-50': value,
                ' text-white': !value
            }" class="bg-white h-7 w-7 rounded-full text-xs flex justify-center items-center shadow-md">
                <IconsCheck class="w-full h-full text-blue-dark-100" v-if="value" />
                <IconsClose class="w-full h-full text-gray" v-else />
            </div>
        </div>
        <label class="ml-2">{{ label }}</label>
    </div>
</template>
