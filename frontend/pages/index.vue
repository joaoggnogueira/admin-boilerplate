<script lang="ts" setup>
if (useSession().is_logged_in()) {
    navigateTo("/dashboard")
} else {
    navigateTo("/login")
}
</script>
<template></template>