import { Call, StreamVideoClient, type StreamVideoParticipant } from "@stream-io/video-client"
import {Subscription} from 'rxjs'

const config = useRuntimeConfig().public
let appToken = config.appToken
let appKey = config.appKey

export const useStreamStore = defineStore('stream', () => {
    const call = ref<Call | undefined>()
    const isBackstage = ref<boolean>(false)
    const isBackstageSub = ref<Subscription | undefined>()
    const localParticipant = ref<StreamVideoParticipant | undefined>()
    const localParticipantSub = ref<Subscription | undefined>()
    const remoteParticipant = ref<StreamVideoParticipant | undefined>()
    const remoteParticipantSub = ref<Subscription | undefined>()

    const streamVideoClient: StreamVideoClient = new StreamVideoClient({
        apiKey: appKey,
        token: appToken,
        user: {
            id: 'Roman',
            name: 'Roman',
            image: 'https://getstream.io/random_svg/?id=Roman&name=Roman'
        }
    })

    const createCall = async (id: string) => {
        const newCall = streamVideoClient.call('livestream',id)
        await newCall.camera.enable()
        await newCall.microphone.enable()
        await newCall.join({create: true})

        localParticipantSub.value = newCall.state.localParticipant$.subscribe((updatedLocalParticipant) => {
            localParticipant.value = updatedLocalParticipant
        })

        isBackstageSub.value = newCall.state.backstage$.subscribe((backstage) => {
            isBackstage.value = backstage
        })

        call.value = newCall
    } 

    const endCall = async () => {
        console.log(111)
        await call.value?.endCall()
        localParticipantSub.value?.unsubscribe()
        isBackstageSub.value?.unsubscribe()

        call.value = undefined
    }

    const watchStream = async (id: string) => {
        const newCall = streamVideoClient.call('livestream', id)
        await newCall.camera.disable()
        await newCall.microphone.disable()
        await newCall.join()

        remoteParticipantSub.value = newCall.state.remoteParticipants$.subscribe((newRemoteParticipants) => {
            if (newRemoteParticipants && newRemoteParticipants.length > 0) {
                remoteParticipant.value = newRemoteParticipants[0]
            } else {
                remoteParticipant.value = undefined
            }
        })

        call.value = newCall
    }

    const leaveStream = async () => {
        await call.value?.leave()
        remoteParticipantSub.value?.unsubscribe()

        call.value = undefined
    }

    return {
        streamVideoClient,
        localParticipant,
        isBackstage,
        call,
        createCall,
        endCall,
        watchStream,
        remoteParticipant,
        leaveStream
    }
})