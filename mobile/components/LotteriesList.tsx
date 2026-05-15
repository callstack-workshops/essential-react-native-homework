import { ActivityIndicator, FlatList, StyleSheet, Text, TextInput, View } from "react-native";
import useLotteries from "../hooks/useLotteries";
import { colors } from "../colors";
import LotteryCard from "./LotteryCard";
import { useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback } from "react";

export default function LotteriesList() {
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
        return <Text>Error: {error}</Text>;
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
                renderItem={({ item }) => <LotteryCard lottery={item} />}
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
});