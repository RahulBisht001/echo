import { StyleSheet } from "react-native";

export const homeStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        paddingTop: 80,
        paddingHorizontal: 20,
    },
    scrollContent: {
        flexGrow: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    header: {
        fontSize: 28,
        marginBottom: 20,
        fontFamily: 'Outfit-SemiBold'
    },
    timer: {
        fontSize: 40,
        fontWeight: "600",
        marginBottom: 50,
        fontFamily: 'Outfit-Regular'
    },
    waveform: {
        flexDirection: "row",
        alignItems: "flex-end",
        justifyContent: "center",
        gap: 5,
        height: 70,
        marginBottom: 40,
        paddingHorizontal: 20
    },
    waveBar: {
        width: 3,
        backgroundColor: "#6dbd67",
        borderRadius: 4,
    },
    recordButton: {
        backgroundColor: "#6dbd67",
        padding: 35,
        borderRadius: 100,
        marginBottom: 16,
        elevation: 4,
    },
    outestCircle: {
        width: 150,
        height: 150,
        borderRadius: 100,
        backgroundColor: "#e8fae6", // very light green
        justifyContent: "center",
        alignItems: "center",
    },
    outerCircle: {
        width: 130,
        height: 130,
        borderRadius: 100,
        backgroundColor: "#d0f5cc", // very light green
        justifyContent: "center",
        alignItems: "center",
    },

    innerCircle: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: "#6dbd67", // darker green
        justifyContent: "center",
        alignItems: "center",
    }
    ,
    hintText: {
        fontSize: 18,
        color: "#888",
        marginTop: 8,
        fontFamily: 'Outfit-Regular'
    },
})