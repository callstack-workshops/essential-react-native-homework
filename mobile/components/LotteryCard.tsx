import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Lottery } from "../types";
import { colors } from "../colors";
import { FontAwesome6 } from "@expo/vector-icons";

interface LotteryCardProps {
    lottery: Pick<Lottery, 'name' | 'prize' | 'id'>;
    selected?: boolean;
    registered?: boolean;
    onPress?: () => void;
}

export default function LotteryCard({ lottery, selected, registered, onPress }: LotteryCardProps) {
    return (
        <TouchableOpacity onPress={onPress} disabled={registered} activeOpacity={0.7}>
            <View style={[styles.container, selected && styles.containerSelected, registered && styles.containerRegistered]}>
                <View style={styles.iconContainer}>
                    <FontAwesome6 name="arrows-rotate" size={24} color="black" />
                </View>
                <Text style={styles.title}>{lottery.name}</Text>
                <Text style={styles.prize}>{lottery.prize}</Text>
                <Text style={styles.id}>{lottery.id}</Text>
            </View>
        </TouchableOpacity>
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
    containerSelected: {
        borderColor: colors.buttonSecondary,
        borderWidth: 2,
        backgroundColor: '#E3F2FD',
    },
    containerRegistered: {
        opacity: 0.4,
        backgroundColor: colors.grey,
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