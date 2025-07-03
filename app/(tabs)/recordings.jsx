import { Ionicons } from "@expo/vector-icons";
import Slider from "@react-native-community/slider";
import * as FileSystem from "expo-file-system";
import { useEffect, useState } from "react";
import {
  FlatList,
  LayoutAnimation,
  Platform,
  RefreshControl,
  Text,
  TouchableOpacity,
  UIManager,
  View,
} from "react-native";

import { recordingStyles } from "../../assets/styles/recording.styles";
import EmptyRecordings from "../../components/EmptyRecordings";

if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const getSelectedRecording = async () => {
  try {
  } catch (err) {
  } finally {
  }
};

const RecordingItem = ({ item, isExpanded, onToggle }) => {
  return (
    <View style={recordingStyles.itemContainer}>
      <TouchableOpacity onPress={onToggle} style={recordingStyles.row}>
        <View style={recordingStyles.iconWrapper}>
          <Ionicons
            name={isExpanded ? "pause" : "play"}
            size={28}
            color="#fff"
          />
        </View>
        <View style={recordingStyles.details}>
          <Text style={recordingStyles.title}>{item.name}</Text>
          <Text style={recordingStyles.subtitle}>
            {new Date(item.createdAt).toLocaleString()}
          </Text>
        </View>
      </TouchableOpacity>

      {isExpanded && (
        <View style={recordingStyles.expandedSection}>
          <Slider
            style={recordingStyles.slider}
            minimumValue={0}
            maximumValue={100}
            value={0}
            minimumTrackTintColor="#34C759"
            maximumTrackTintColor="#ccc"
            thumbTintColor="#34C759"
            onValueChange={(val) => console.log("Slider value:", val)}
          />
        </View>
      )}
    </View>
  );
};

const Recording = () => {
  const [recordings, setRecordings] = useState([]);
  const [expandedIndex, setExpandedIndex] = useState(null);

  const [refreshing, setRefreshing] = useState(false);

  const toggleExpand = (index) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpandedIndex(index === expandedIndex ? null : index);
  };

  const loadRecordings = async () => {
    try {
      const files = await FileSystem.readDirectoryAsync(
        FileSystem.documentDirectory
      );
      const audioFiles = files
        .filter((file) => file.endsWith(".m4a"))
        .map((file) => ({
          name: file,
          uri: FileSystem.documentDirectory + file,
          createdAt: parseInt(file.match(/\d+/)?.[0]) || Date.now(), // Extract timestamp
        }))
        .sort((a, b) => b.createdAt - a.createdAt); // Newest first

      setRecordings(audioFiles);
    } catch (err) {
      console.error("Failed to load recordings:", err);
    } finally {
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadRecordings();
    setRefreshing(false);
  };

  useEffect(() => {
    loadRecordings();
  }, []);

  return (
    <View style={recordingStyles.container}>
      <Text style={recordingStyles.header}>My Recordings</Text>

      <FlatList
        data={recordings}
        keyExtractor={(item, index) => item.uri + index}
        contentContainerStyle={recordingStyles.list}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ListEmptyComponent={<EmptyRecordings />}
        renderItem={({ item, index }) => (
          <RecordingItem
            item={item}
            isExpanded={expandedIndex === index}
            onToggle={() => toggleExpand(index)}
          />
        )}
      />
    </View>
  );
};

export default Recording;
