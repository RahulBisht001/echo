import { RecordingPresets, useAudioRecorder } from 'expo-audio';
import { useState } from 'react';
import { Text, View } from 'react-native';

const useVoiceRecorder = () => {

    const audioRecorder = useAudioRecorder(RecordingPresets.HIGH_QUALITY);
    const [isRecording, setIsRecording] = useState(false);
    return (
        <View>
            <Text>useVoiceRecorder</Text>
        </View>
    )
}

export default useVoiceRecorder