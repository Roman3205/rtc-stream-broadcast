<template>
  <div>
    <section v-if="showRemoteVideo" class="sectionStream">
        <Video :call="call" :participant="remoteParticipant" />
        <UButton @click="store.leaveStream">Leave</UButton>
    </section>
    <section v-else class="sectionStream">
        <UInput v-model="callId" placeholder="Enter stream id to join" />
        <UButton @click="watchStream">Watch Stream</UButton>
    </section>
  </div>
</template>

<script lang="ts" setup>
import { useStreamStore } from '~/stores/streamStore';

const store = useStreamStore()
const {call, remoteParticipant} = storeToRefs(store)

const callId = ref('')

const showRemoteVideo = computed(() => {
    return call.value && remoteParticipant.value
})

const watchStream = () => {
    if (callId.value) {
        store.watchStream(callId.value)
    }
}
</script>

<style>

</style>