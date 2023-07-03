<script setup lang="ts">

const currentPassword = ref("")
const newPassword = ref("")
const repeatPassword = ref("")

async function atualizarSenha() {
    if (!currentPassword.value) {
        return alert("Insira a senha atual")
    }
    if (newPassword.value != repeatPassword.value) {
        return alert("Senhas são diferentes")
    }
    const res = await useApi().post("/new-password", { currentPassword: currentPassword.value, newPassword: newPassword.value })
    if (res) {
        alert("Sucesso")
    }
}

const senhaSaoDiferentes = computed(() => {
    return newPassword.value.length > 3 && repeatPassword.value.length > 3 && newPassword.value != repeatPassword.value
})
</script>
<template>
    <div class="px-8 py-12 w-full">
        <h2 class="text-xl font-bold">Segurança</h2>
        <form @submit.prevent class="max-w-xs mt-16 flex flex-col gap-y-4">
            <AppTextField v-model="currentPassword" label="Senha atual" icon="lock" type="password" />
            <AppTextField v-model="newPassword" label="Nova senha" icon="lock" type="password" />
            <AppTextField v-model="repeatPassword" label="Repita a nova senha" icon="lock" type="password" />
            <p class="text-gray text-xs" v-if="senhaSaoDiferentes">Senha são diferentes</p>
            <AppButton @click="atualizarSenha">Atualizar senha</AppButton>
        </form>
    </div>
</template>