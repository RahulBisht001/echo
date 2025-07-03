import { useEffect, useState } from "react";
import {
  Alert,
  Linking,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { AudioModule, RecordingPresets, useAudioRecorder } from "expo-audio";
import * as FileSystem from "expo-file-system";
import * as MediaLibrary from "expo-media-library";

import { homeStyles } from "../../assets/styles/home.styles";

const RecordScreen = () => {
  const audioRecorder = useAudioRecorder(RecordingPresets.HIGH_QUALITY);
  const [isRecording, setIsRecording] = useState(false);

  const [permissionResponse, requestPermission] = MediaLibrary.usePermissions();
  const [timer, setTimer] = useState(0);
  const [intervalId, setIntervalId] = useState(null);

  const formatTime = (time) => {
    const hrs = String(Math.floor(time / 3600)).padStart(2, "0");
    const mins = String(Math.floor((time % 3600) / 60)).padStart(2, "0");
    const secs = String(time % 60).padStart(2, "0");
    return `${hrs}:${mins}:${secs}`;
  };

  // Record the sound
  const record = async () => {
    const hasPermission = await requestAudioPermission();
    if (!hasPermission) {
      return;
    }

    // Reset timer and start
    setTimer(0);
    const id = setInterval(() => {
      setTimer((prev) => prev + 1);
    }, 1000);
    setIntervalId(id);

    await audioRecorder.prepareToRecordAsync();
    audioRecorder.record();
    setIsRecording(true);
  };

  const stopRecording = async () => {
    // The recording will be available on `audioRecorder.uri`.
    await audioRecorder.stop();
    setIsRecording(false);
    setTimer(0);

    // Stop the timer
    if (intervalId) {
      clearInterval(intervalId);
      setIntervalId(null);
    }

    const filename = `echo_${Date.now()}.m4a`;
    const destinationUri = FileSystem.documentDirectory + filename;

    console.log("Original URI:", audioRecorder.uri);
    console.log("Destination URI:", destinationUri);

    await FileSystem.moveAsync({
      from: audioRecorder.uri,
      to: destinationUri,
    });

    // // check for permission
    // const { status } = await MediaLibrary.getPermissionsAsync();
    // if (status !== "granted") {
    //   console.log("Media library permission not granted");
    //   return;
    // }

    // // Save to media library
    // try {
    //   const asset = await MediaLibrary.createAssetAsync(destinationUri);
    //   await MediaLibrary.createAlbumAsync("Echo Recordings", asset, false); // optional: create album
    //   console.log("Recording saved to media library:", asset.uri);
    // } catch (error) {
    //   console.log("Error saving to media library:", error);
    // }
  };

  const requestAudioPermission = async () => {
    try {
      const currentStatus = await AudioModule.getRecordingPermissionsAsync();

      if (currentStatus.granted) {
        console.log("Permission granted!");
        return true;
      }

      // 👇 Check if we can ask again [ Never ask again thing]
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
        console.log("Permission granted by New Status!");
        return true;
      }

      console.error("Permission not granted");
      return false;
    } catch (err) {
      console.error("Error requesting audio permission:", err);
      return false;
    }
  };

  const requestFilePermissions = async () => {
    try {
      if (permissionResponse?.status !== "granted") {
        const newStatus = await requestPermission();
        console.log(
          "Media library permission requested, new status:",
          newStatus
        );
      } else {
        console.log(
          "Media library permission already granted:",
          permissionResponse
        );
      }
    } catch (err) {
      console.log("Error requesting media permission:", err);
    }
  };

  useEffect(() => {
    requestAudioPermission();
    requestFilePermissions();
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
        <Text style={homeStyles.timer}>{formatTime(timer)}</Text>

        {/* Recorder Button UI */}
        <View style={[homeStyles.outestCircle]}>
          <View style={[homeStyles.outerCircle]}>
            <View style={homeStyles.innerCircle}>
              <TouchableOpacity onPress={isRecording ? stopRecording : record}>
                {isRecording ? (
                  <Ionicons name="stop" size={60} color="#FAFAFA" />
                ) : (
                  <Ionicons name="play" size={60} color="#FAFAFA" />
                )}
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {isRecording ? (
          <Text style={homeStyles.hintText}>Tap to stop recording</Text>
        ) : (
          <Text style={homeStyles.hintText}>Tap to start recording</Text>
        )}
      </ScrollView>
    </View>
  );
};

export default RecordScreen;
