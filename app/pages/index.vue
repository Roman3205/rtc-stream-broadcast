<template>
    <div class="flex justify-center items-center h-screen w-full">
        <div class="flex flex-col gap-4">
            <div class="flex gap-3 justify-between w-full">
                <UButton class="cursor-pointer w-1/2 flex justify-center transition duration-500 hover:opacity-80" :class="{'bg-primary-700': tabShowing === 'broadcast'}" @click="switchTab('broadcast')">Broadcast</UButton>
                <UButton class="cursor-pointer w-1/2 flex justify-center  transition duration-500 hover:opacity-80" :class="{'bg-primary-700': tabShowing === 'viewer'}" @click="switchTab('viewer')">Viewer</UButton>
            </div>
            <section v-if="tabShowing === 'broadcast'"><Broadcast /></section>
            <section v-if="tabShowing === 'viewer'"><Viewing /></section>
        </div>
    </div>
</template>

<script lang="ts" setup>
const tabShowing = ref<'broadcast' | 'viewer'>('broadcast')
const switchTab = (tab: 'broadcast' | 'viewer') => {
    tabShowing.value = tab
}
</script>

<style>

</style>