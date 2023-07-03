  
<script setup lang="ts">
const parent = ref(null as null | HTMLElement)
const emits = defineEmits(["triggered"])
onMounted(() => {
    if (parent.value) {
        var observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.intersectionRatio > 0) {
                        emits('triggered')
                    }
                })
            },
            {
                root: null,
                rootMargin: '10px',
                threshold: 1.0,
            }
        )

        observer.observe(parent.value)
    }
})
</script>
<template>
    <div ref="parent">
        <slot></slot>
    </div>
</template>

  