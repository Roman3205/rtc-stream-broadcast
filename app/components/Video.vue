<template>
  <div>
    <video width="400" height="400" ref="videoElement" />
    <audio ref="audioElement" />
  </div>
</template>

<script lang="ts" setup>
import type { Call, StreamVideoParticipant } from '@stream-io/video-client';

const props = defineProps<{
    call: Call | undefined,
    participant: StreamVideoParticipant | undefined
}>()

const videoElement = ref<HTMLVideoElement | null>(null)
const audioElement = ref<HTMLAudioElement | null>(null)
const unbindVideo = ref<(() => void) | undefined>()
const unbindAudio = ref<(() => void) | undefined>()

onMounted(() => {
    if (videoElement.value) {
        unbindVideo.value = props.call?.bindVideoElement(videoElement.value, props.participant?.sessionId || 'sessionId', 'videoTrack')
    }

    if (audioElement.value) {
        unbindAudio.value = props.call?.bindAudioElement(audioElement.value, props.participant?.sessionId || 'sessionId')
    }
})

onUnmounted(() => {
    unbindVideo.value?.()
    unbindAudio.value?.()
})
</script>

<style>

</style>