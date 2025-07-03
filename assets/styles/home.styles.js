import { StyleSheet } from "react-native";

export const homeStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F1FBF0",
        alignItems: "center",
        paddingTop: 80,
        // paddingHorizontal: 20,
    },
    scrollContent: {
        flexGrow: 1,
        // justifyContent: "center",
        alignItems: "center",
    },
    header: {
        fontSize: 28,
        marginBottom: 20,
        fontFamily: 'Outfit-SemiBold'
    },
    timer: {
        fontSize: 60,
        fontWeight: "500",
        marginBottom: 50,
        color: "#4D4D4D",
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
    outestCircle: {
        width: 200,
        height: 200,
        borderRadius: 100,
        backgroundColor: "#e8fae6", // very light green
        justifyContent: "center",
        alignItems: "center",
    },
    outerCircle: {
        width: 170,
        height: 170,
        borderRadius: 100,
        backgroundColor: "#d0f5cc", // very light green
        justifyContent: "center",
        alignItems: "center",
    },

    innerCircle: {
        width: 140,
        height: 140,
        borderRadius: 100,
        backgroundColor: "#4CAF50", // vibrant green — active center
        justifyContent: "center",
        alignItems: "center",
    }
    ,
    hintText: {
        fontSize: 18,
        color: "#4D4D4D",
        marginTop: 20,
        fontFamily: 'Outfit-Medium'
    },
})