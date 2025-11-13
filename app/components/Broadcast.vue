<template>
  <div>
    <section v-if="isCallLive" class="sectionStream">
        <Video :call="call" :participant="localParticipant" />
        <div class="flex justify-between items-center">
          <UButton @click="goLive">{{ backstageStatus }}</UButton>
          <UButton @click="store.endCall()">End stream</UButton>
        </div>
    </section>
    <section v-else class="sectionStream">
        <UInput v-model="callId" placeholder="Enter call ID" />
        <UButton @click="startBroadcast" class="transition duration-500 hover:opacity-80">Start Broadcast</UButton>
    </section>
  </div>
</template>

<script lang="ts" setup>
import { useStreamStore } from '~/stores/streamStore'
const store = useStreamStore()
const {call, localParticipant, isBackstage} = storeToRefs(store)
const callId = ref('')

const isCallLive = computed(() => {
    return call.value && localParticipant.value
})

const backstageStatus = computed(() => {
  return isBackstage.value ? 'Go live' : 'End broadcast'
})

const startBroadcast = () => {
    if (callId.value) {
        store.createCall(callId.value)
    }
}

const goLive = async () => {
  if (isBackstage.value) {
    console.log(1)
    await call.value?.goLive()
  } else {
    console.log(2)
    await call.value?.stopLive()
  }
}
</script>

<style>

</style>