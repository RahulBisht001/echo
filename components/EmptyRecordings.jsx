import { Ionicons } from "@expo/vector-icons";
import { Text, View } from "react-native";
import { emptyRecordingStyles } from "../assets/styles/emptyRecordings.styles";

const EmptyRecordings = () => (
  <View style={emptyRecordingStyles.emptyContainer}>
    <Ionicons name="musical-notes" size={48} color="#9CA3AF" />
    <Text style={emptyRecordingStyles.emptyText}>No recordings yet</Text>
    <Text style={emptyRecordingStyles.emptySubtext}>
      Start recording and your files will appear here.
    </Text>
  </View>
);

export default EmptyRecordings;
