
import { StyleSheet } from "react-native";

export const recordingStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f9fafb",

        paddingTop: 40,
        paddingHorizontal: 16,
    },
    header: {
        fontSize: 24,
        marginBottom: 16,
        color: "#111827",
        fontFamily: 'Outfit-SemiBold'
    },
    list: {
        paddingBottom: 20,
    },
    itemContainer: {
        backgroundColor: "#F8FCF7",
        borderColor: "#C1E1C1",
        borderWidth: 1,
        borderRadius: 15,
        padding: 15,
        marginBottom: 12,
    },
    row: {
        flexDirection: "row",
        alignItems: "center",
    },
    iconWrapper: {
        backgroundColor: "#34C759",
        borderRadius: 50,
        padding: 12,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 12,
    },
    details: {
        flex: 1,
    },
    title: {
        fontSize: 18,
        fontFamily: 'Outfit-Medium',
        color: "#111827",
    },
    subtitle: {
        fontSize: 13,
        color: "#6B7280",
        marginTop: 2,
        fontFamily: "Outfit-Regular"
    },
    expandedSection: {
        marginTop: 20,
        paddingHorizontal: 10,
    },
    slider: {
        width: "100%",
    },
});
