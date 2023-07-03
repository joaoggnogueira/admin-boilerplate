<script setup lang="ts">
import { App } from "@/../backend/types/app"

async function fetchAdmins(from: number, to: number, search: string) {
    const admins = await useApi().get("/admins?from=" + from + "&to=" + to + "&search=" + search)
    return admins
}

async function submit(form: App.Admin) {
    try {
        const res = await useApi().post("/admin", form)
        if (res && res.success) {
            alert("Sucesso")
            location.reload()
        }
    } catch (e) {
        alert(e)
    }
}

function gerarSenha(tamanho: number) {
    var caracteres = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    var senha = '';
    for (var i = 0; i < tamanho; i++) {
        var indice = Math.floor(Math.random() * caracteres.length);
        senha += caracteres.charAt(indice);
    }
    return senha;
}

function genNewPassword(form: App.Admin) {
    form.password = gerarSenha(12)
}

const templateForm = {
    created: new Date(),
    deleted: false,
    email: "",
    name: "",
    password: "",
    super: false
} as App.Admin

</script>
<template>
    <div class="px-8 py-12 w-full">
        <AppDataList class="mt-4 w-full" :templateForm="templateForm" :fetch-fn="fetchAdmins" title="Administradores">
            <template #default="{ item, editForm }: { item: App.Admin, editForm: Function }">
                <div class="bg-blue-light-100 w-full flex items-center h-14 rounded-md overflow-hidden">
                    <div class="aspect-square h-full bg-blue-dark-50 p-4 text-white mr-4">
                        <IconsUser />
                    </div>
                    <p class=" text-blue-dark-50"><span class="text-lg font-bold">{{ item.name }}</span><span
                            class="text-sm ml-2">{{ item.email }}</span></p>
                    <p class="bg-blue-dark-50 font-bold text-white rounded-full text-xs py-1 px-2 italic ml-4"
                        v-if=" item.super ">_super
                    </p>
                    <div class="flex-grow" />
                    <p class="text-blue-dark-50 mr-4 font-bold text-xs" v-if=" item.deleted ">ARQUIVADO</p>
                    <button class="aspect-square h-full bg-blue-dark-50 hover:bg-blue-dark-100 p-4 text-white"
                        @click="editForm(item)">
                        <IconsPen />
                    </button>
                </div>
            </template>
            <template #loading>
                <div class="w-full h-14 rounded-md">
                </div>
            </template>
            <template #form=" { form }: { form: App.Admin } ">
                <div class="w-full flex flex-col gap-y-4" v-if=" form ">
                    <AppTextField :readonly=" !!form._id " placeholder="Digite aqui o email de acesso do administrador"
                        label="email" v-model=" form.email "></AppTextField>
                    <AppTextField :readonly=" !!form._id " placeholder="Digite aqui o nome do administrador" label="name"
                        v-model=" form.name ">
                    </AppTextField>
                    <div class="flex items-end gap-x-4 w-full">
                        <AppTextField copyToClipboard readonly label="senha" class="flex-grow" v-model=" form.password "
                            placeholder="Aperte o botão ao lado para gerar uma nova senha"></AppTextField>
                        <AppButton @click="genNewPassword(form)">Gerar senha</AppButton>
                    </div>
                    <AppSwitch :readonly=" !!form._id " v-model=" form.super "
                        label="Pode cadastrar novos administradores?" />
                    <AppSwitch v-model=" form.deleted " label="Arquivado" v-if=" !!form._id " />
                    <AppButton class="flex-grow self-start" @click="submit(form)">{{ form._id?"ATUALIZAR":"CADASTRAR" }}
                    </AppButton>
                </div>
            </template>
        </AppDataList>
    </div>
</template>