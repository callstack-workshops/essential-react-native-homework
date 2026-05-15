import { StyleSheet, Text, View } from "react-native";
import { Lottery } from "../types";
import { colors } from "../colors";
import { FontAwesome6 } from "@expo/vector-icons";

export default function LotteryCard({lottery}: {lottery: Pick<Lottery, 'name' | 'prize' | 'id'>}) {
    return (
        <View style={styles.container}>
            <View style={styles.iconContainer}>
                <FontAwesome6 name="arrows-rotate" size={24} color="black" />
            </View>
            <Text style={styles.title}>{lottery.name}</Text>
            <Text style={styles.prize}>{lottery.prize}</Text>
            <Text style={styles.id}>{lottery.id}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 16,
        borderRadius: 8,
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: colors.grey,
        display: 'flex',
        gap: 8,
    },
    iconContainer: {
        alignSelf: 'flex-end',
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    prize: {
        fontSize: 14,
    },
    id: {
        fontSize: 14,
    },
});