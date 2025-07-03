
import { StyleSheet } from "react-native";

export const emptyRecordingStyles = StyleSheet.create({
    emptyContainer: {
        alignItems: "center",
        justifyContent: "center",
        marginTop: 60,
    },
    emptyText: {
        fontSize: 20,
        fontWeight: "600",
        marginTop: 12,
        color: "#4B5563",
        fontFamily: "Outfit-SemiBold",
    },
    emptySubtext: {
        fontSize: 16,
        color: "#9CA3AF",
        marginTop: 4,
        textAlign: "center",
        paddingHorizontal: 20,
        fontFamily: "Outfit-Regular"
    }
});
