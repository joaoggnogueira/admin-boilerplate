<script setup>
const showUserNav = ref(false)
function toggleUserNav() {
    showUserNav.value = !showUserNav.value
}
function logout() {
    useSession().clear_session()
    navigateTo("/login")
}
</script>
<template>
    <div class="h-screen w-full flex flex-col items-stretch">
        <header class="h-20 flex items-stretch bg-blue-darker-100 py-4 pr-7">
            <div class="w-80 flex justify-center items-center text-white text-3xl">
                Admin<span class="text-blue">Template</span>
            </div>
            <div class="flex-grow"></div>
            <button @click="toggleUserNav"
                class="w-56 px-6 py-3 h-full text-blue-bright-100 hover:bg-white hover:bg-opacity-10 flex items-center justify-between">
                <IconsUser class="w-8 h-8" />
                Usuário
                <IconsChevron class="w-4 h-4" />
            </button>
            <div v-if="showUserNav" class="w-60 flex flex-col bg-blue-darker-100 right-4 top-24 absolute py-3 rounded-md">
                <button class="w-full h-12 px-6 py-3 hover:bg-blue-dark-200 text-gray-bright flex items-center"
                    @click="logout">
                    <IconsLogout class="h-6 w-6 mr-2" /> SAIR
                </button>
            </div>
        </header>
        <div class="flex-grow flex items-stretch">
            <nav class="w-full max-w-[20rem] bg-blue-light-100 p-16">
                <ul class="flex flex-col gap-y-4">
                    <li>
                        <NuxtLink href="/dashboard" class="flex items-center text-lg text-blue-dark-50 hover:underline">
                            <IconsHome class="mr-2" /> Início
                        </NuxtLink>
                    </li>
                    <li><label class="text-blue my-2">Conteúdo</label></li>
                    <li><label class="text-blue my-2">Administração</label></li>
                    <li>
                        <NuxtLink href="/dashboard/admins"
                            class="flex items-center text-lg text-blue-dark-50 hover:underline">
                            <IconsUsers class="mr-2" />
                            Administradores
                        </NuxtLink>
                    </li>
                    <li>
                        <NuxtLink href="/dashboard/security"
                            class="flex items-center text-lg text-blue-dark-50 hover:underline">
                            <IconsCog class="mr-2" />
                            Segurança
                        </NuxtLink>
                    </li>
                </ul>
            </nav>
            <NuxtPage />
        </div>
    </div>
</template>