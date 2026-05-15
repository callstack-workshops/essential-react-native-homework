import { ActivityIndicator, FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import useLotteries from "../hooks/useLotteries";
import { colors } from "../colors";
import LotteryCard from "./LotteryCard";
import { useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback } from "react";

interface LotteriesListProps {
    selectedIds: string[];
    registeredIds: string[];
    onToggleSelect: (id: string) => void;
}

export default function LotteriesList({ selectedIds, registeredIds, onToggleSelect }: LotteriesListProps) {
    const { data, loading, error, fetchLotteries } = useLotteries();
    const [search, setSearch] = useState('');

    useFocusEffect(
        useCallback(() => {
            fetchLotteries();
        }, [fetchLotteries])
    );

    if (loading) {
        return <ActivityIndicator size="large" color={colors.primary} />;
    }

    if (error) {
        return (
            <View style={styles.errorContainer}>
                <FontAwesome5 name="exclamation-circle" size={48} color={colors.grey} />
                <Text style={styles.errorTitle}>Could not load lotteries</Text>
                <Text style={styles.errorSubtitle}>Check your connection and try again.</Text>
                <TouchableOpacity style={styles.retryButton} onPress={fetchLotteries}>
                    <Text style={styles.retryButtonText}>Retry</Text>
                </TouchableOpacity>
            </View>
        );
    }

    const filteredData = data?.filter((lottery) => lottery.name.includes(search));

    return (
        <View style={styles.container}>
            <TextInput
                placeholder="Search lotteries"
                style={styles.searchInput}
                value={search}
                onChangeText={setSearch}
            />
            {filteredData?.length > 0 ? <FlatList
                data={filteredData}
                renderItem={({ item }) => (
                    <LotteryCard
                        lottery={item}
                        selected={selectedIds.includes(item.id)}
                        registered={registeredIds.includes(item.id)}
                        onPress={() => onToggleSelect(item.id)}
                    />
                )}
                keyExtractor={(item) => item.id}
                style={styles.list}
                ItemSeparatorComponent={() => <View style={{height: 8}} />}
            /> : <Text style={styles.noResults}>No lotteries found</Text>}
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        gap: 16,
        paddingInline: 8,
    },
    list: {
        flex: 1,
    },
    searchInput: {
        borderColor: colors.grey,
        padding: 8,
        borderWidth: 1,
        width: 300,
        fontSize: 16,
        marginBottom: 8,
        alignSelf: 'center',
    },
    noResults: {
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 8,
    },
    errorContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        gap: 12,
        paddingHorizontal: 24,
    },
    errorTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    errorSubtitle: {
        fontSize: 14,
        color: '#666',
        textAlign: 'center',
    },
    retryButton: {
        marginTop: 8,
        paddingVertical: 10,
        paddingHorizontal: 32,
        borderRadius: 8,
        backgroundColor: colors.buttonPrimary,
    },
    retryButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
});