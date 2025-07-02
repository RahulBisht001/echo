// const requestPermissions = async () => {
//   const audioStatus = await AudioModule.requestRecordingPermissionsAsync();
//   const mediaStatus = await MediaLibrary.requestPermissionsAsync();
//   console.log("Audio permission:", audioStatus);
//   console.log("Media permission:", mediaStatus);

//   if (!audioStatus.granted || !mediaStatus.granted) {
//     Alert.alert(
//       "Permissions Required",
//       "Microphone and Media Library access are required to use this app.",
//       [
//         {
//           text: "Open Settings",
//           onPress: () => {
//             if (Platform.OS === "ios") {
//               Linking.openURL("app-settings:");
//             } else {
//               IntentLauncher.startActivityAsync(
//                 IntentLauncher.ActivityAction.APPLICATION_DETAILS_SETTINGS,
//                 {
//                   data: `package:${Application.applicationId}`,
//                 }
//               );
//             }
//           },
//         },
//         { text: "Cancel", style: "cancel" },
//       ]
//     );
//     return false;
//   }

//   return true;
// };