import { Text, StyleSheet, TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { colors } from "../colors";

export default function Fab({ onPress }: { onPress: () => void }) {
    return (
        <TouchableOpacity
            style={styles.fab}
            onPress={onPress}
        >
            <AntDesign name="plus" size={24} color="white" />
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    fab: {
        position: 'absolute',
        bottom: 20,
        right: 20,
        backgroundColor: colors.buttonPrimary,
        padding: 16,
        borderRadius: '100%',
        height: 64,
        width: 64,
        alignItems: 'center',
        justifyContent: 'center',
    },
});