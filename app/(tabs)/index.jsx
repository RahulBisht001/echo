import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import {
  Alert,
  Button,
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { AudioModule, RecordingPresets, useAudioRecorder } from "expo-audio";
import * as FileSystem from "expo-file-system";
import * as MediaLibrary from "expo-media-library";

import { homeStyles } from "../../assets/styles/home.styles";

const RecordScreen = () => {
  const audioRecorder = useAudioRecorder(RecordingPresets.HIGH_QUALITY);
  const [isRecording, setIsRecording] = useState(false);

  const [permissionResponse, requestPermission] = MediaLibrary.usePermissions();

  const record = async () => {
    const hasPermission = await requestAudioPermission();
    if (!hasPermission) return;

    await audioRecorder.prepareToRecordAsync();
    audioRecorder.record();
    setIsRecording(true);
  };

  const stopRecording = async () => {
    // The recording will be available on `audioRecorder.uri`.
    await audioRecorder.stop();
    setIsRecording(false);

    const filename = `recording_${Date.now()}.m4a`;
    const destinationUri = FileSystem.documentDirectory + filename;

    console.log("Original URI:", audioRecorder.uri);
    console.log("Destination URI:", destinationUri);

    await FileSystem.moveAsync({
      from: audioRecorder.uri,
      to: destinationUri,
    });

    // check for permission

    const { status } = await MediaLibrary.getPermissionsAsync();
    if (status !== "granted") {
      console.log("Media library permission not granted");
      return;
    }

    // Save to media library
    try {
      const asset = await MediaLibrary.createAssetAsync(destinationUri);
      await MediaLibrary.createAlbumAsync("Echo Recordings", asset, false); // optional: create album
      console.log("Recording saved to media library:", asset.uri);
    } catch (error) {
      console.log("Error saving to media library:", error);
    }
  };

  const requestAudioPermission = async () => {
    console.log("requestAudioPermission called");
    try {
      const currentStatus = await AudioModule.getRecordingPermissionsAsync();

      if (currentStatus.granted) {
        console.log("Permission already granted!");
        return true;
      }

      // 👇 Check if we can ask again
      if (!currentStatus.canAskAgain) {
        console.log("Permission denied permanently (Don't ask again)");
        Alert.alert(
          "Permission Required",
          "Microphone access is required to record audio. Please enable it from settings.",
          [
            {
              text: "Open Settings",
              onPress: () => {
                Linking.openSettings(); // Opens app settings
              },
            },
            { text: "Cancel", style: "cancel" },
          ]
        );
        return false;
      }

      const newStatus = await AudioModule.requestRecordingPermissionsAsync();

      if (newStatus.granted) {
        console.log("Permission granted!");
        return true;
      }

      console.log("Permission not granted");
      return false;
    } catch (err) {
      console.log("Error requesting audio permission:", err);
      return false;
    }
  };

  // const requestPermissions = async () => {
  //   console.log("requestPermissions called");
  //   try {
  //     if (permissionResponse?.status !== "granted") {
  //       const newStatus = await requestPermission();
  //       console.log(
  //         "Media library permission requested, new status:",
  //         newStatus
  //       );
  //     } else {
  //       console.log(
  //         "Media library permission already granted:",
  //         permissionResponse
  //       );
  //     }
  //   } catch (err) {
  //     console.log("Error requesting media permission:", err);
  //   }
  // };

  useEffect(() => {
    console.log("Hello");
    requestAudioPermission();

    // requestPermissions();
  }, []);

  return (
    <View style={homeStyles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        // refreshControl={
        //   <RefreshControl
        //     // refreshing={refreshing}
        //     // onRefresh={onRefresh}
        //     tintColor={COLORS.primary}
        //   />
        // }
        contentContainerStyle={homeStyles.scrollContent}
      >
        <Text style={homeStyles.header}>Start Recording</Text>

        <Text style={homeStyles.timer}>00:00:00</Text>

        {/* Audio waveform UI */}
        <View style={homeStyles.waveform}>
          {/* Dummy waves (you can animate this later) */}
          {Array.from({ length: 30 }).map((_, index) => (
            <View
              key={index}
              style={[
                homeStyles.waveBar,
                { height: 10 + Math.random() * 40 }, // random height
              ]}
            />
          ))}
        </View>

        {/* Recorder Button UI */}
        <View style={homeStyles.outestCircle}>
          <View style={homeStyles.outerCircle}>
            <View style={homeStyles.innerCircle}>
              <TouchableOpacity>
                <Ionicons name="stop" size={40} color="#fff" />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <Text style={homeStyles.hintText}>Tap to start recording</Text>

        <View style={styles.container}>
          <Button
            title={isRecording ? "Stop Recording" : "Start Recording"}
            onPress={isRecording ? stopRecording : record}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default RecordScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#ecf0f1",
    padding: 10,
  },
});
