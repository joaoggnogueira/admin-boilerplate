<script setup lang="ts">
defineProps({
    opened: { type: Boolean, required: true }
})

const emit = defineEmits(['close'])

function close() {
    emit('close')
}

</script>
<template>
    <div class="w-full h-full top-0 left-0 fixed bg-blue-dark-50 bg-opacity-25 backdrop-blur-sm flex items-center justify-center"
        v-if="opened" @click="close">
        <div class="w-[40rem] px-10 py-10 bg-white rounded-md" @click.stop>
            <slot />
        </div>
    </div>
</template>