import React from "react";
import { Text, View } from "react-native";
import { FAB } from "./FAB";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../App";

type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

export function Home() {
  const navigation = useNavigation<HomeScreenNavigationProp>();

  const openAddLottery = () => {
    navigation.navigate("AddLottery");
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home1</Text>
      <FAB onPress={openAddLottery} />
    </View>
  );
}