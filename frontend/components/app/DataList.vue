<script setup lang="ts">
import { Debounce } from "@/libs/debounce"

const { fetchFn, templateForm } = defineProps({
    title: { type: String, required: true },
    keyFn: { type: Function, required: false, default: (d: any) => d },
    fetchFn: { type: Function, required: true },
    templateForm: { type: Object, required: true }
})
const search = ref("")
const ends = ref(false)

const list = ref([])
const form = ref(null as null | object)
let loading = ref(false);

const debounce = new Debounce({ delay: 500 });

watch(search, () => {
    debounce.do(() => {
        ends.value = false;
        list.value.length = 0
        retrieve()
    })
})

async function retrieve() {
    if (!ends.value && !loading.value) {
        loading.value = true
        const newConcat = await fetchFn(list.value.length, list.value.length + 5, search.value)
        loading.value = false
        if (newConcat.length < 5) {
            ends.value = true
        }
        list.value = list.value.concat(newConcat)
    }
}

function newForm() {
    form.value = JSON.parse(JSON.stringify(templateForm))
}

function closeForm() {
    form.value = null
}

function editForm(editform: object) {
    form.value = JSON.parse(JSON.stringify(editform))
}

retrieve()

</script>
<template>
    <div>
        <AppModal :opened="!!form" @close="closeForm">
            <slot name="form" :form="(form as any)" />
        </AppModal>
        <div class="w-full flex items-start mb-2">
            <p class="text-xl font-bold">{{ title }}</p>
            <div class="flex-grow"></div>
            <AppButton @click="newForm" class="mr-2">NOVO</AppButton>
            <AppTextField id="search" type="search" v-model="search" placeholder="Pesquisar"></AppTextField>
        </div>
        <ul class="w-full flex flex-col items-stretch gap-y-4">
            <li v-for="item in list" :key="keyFn(item)">
                <slot :item="item" :editForm="editForm" />
            </li>
            <template v-if="loading">
                <li class="gradient-loading">
                    <slot name="loading" />
                </li>
                <li class="gradient-loading">
                    <slot name="loading" />
                </li>
                <li class="gradient-loading">
                    <slot name="loading" />
                </li>
                <li class="gradient-loading">
                    <slot name="loading" />
                </li>
                <li class="gradient-loading">
                    <slot name="loading" />
                </li>
            </template>
            <AppTriggerVisibility @triggered="retrieve" v-else-if="!ends">
                <li>show more</li>
            </AppTriggerVisibility>
            <div class="flex flex-col items-center font-bold mt-20" v-else-if="!list.length">
                <img src="/empty.jpg" class="w-1/3" />
                <p>Nenhum resultado encontrado</p>
            </div>
        </ul>
    </div>
</template>