<script setup lang="ts">
const email = ref("")
const password = ref("")

async function submit() {
    if (!email.value || !password.value) {
        return alert("Insira todos os dados de acesso")
    }
    const data = await useApi().post("/singin", { email: email.value, password: password.value })
    useSession().set_session(data.session_token)
    navigateTo("/")
}

</script>
<template>
    <div class="h-screen w-full flex-center flex-col bg-blue-bright-100">
        <h1 class="text-3xl mb-8" data-aos="fade-down">
            <span class="text-blue mr-2">Template</span><span class="text-blue-dark-100">CMS</span>
        </h1>
        <form @submit.prevent="submit" data-aos="fade-up"
            class="bg-white rounded-lg py-20 px-12 max-w-lg w-full grid grid-cols-2 gap-y-8">
            <AppTextField type="email" v-model="email" icon="mail" id="email" label="Endereço de email"
                class="col-span-2" />
            <AppTextField type="password" v-model="password" icon="lock" id="password" label="Senha"
                class="mb-2 col-span-2" />
            <span></span>
            <AppButton class="col-span-1">Entrar</AppButton>
        </form>
    </div>
</template>