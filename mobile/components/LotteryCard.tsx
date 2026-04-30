import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Lottery } from "../types";

interface LotteryCardProps {
  lottery: Lottery;
  isSelected?: boolean;
  isRegistered?: boolean;
  onPress?: () => void;
}

export function LotteryCard({ lottery, isSelected = false, isRegistered = false, onPress }: LotteryCardProps) {
  const registeredStyle = isRegistered && styles.lotteryItemRegistered;
  const registeredTextStyle = isRegistered && styles.textRegistered;

  return (
    <TouchableOpacity
      style={[
        styles.lotteryItem,
        isSelected && styles.lotteryItemSelected,
        registeredStyle,
      ]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Text style={[styles.lotteryName, registeredTextStyle]}>
        {lottery.name}
      </Text>
      <Text style={[styles.lotteryPrize, registeredTextStyle]}>
        Prize: {lottery.prize}
      </Text>
      <Text style={[styles.lotteryStatus, registeredTextStyle]}>
        Status: {lottery.status}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  lotteryItem: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  lotteryItemSelected: {
    borderColor: '#007AFF',
    backgroundColor: '#E3F2FD',
  },
  lotteryItemRegistered: {
    opacity: 0.5,
    backgroundColor: '#f0f0f0',
  },
  textRegistered: {
    color: '#999',
  },
  registeredLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#28a745',
    marginTop: 8,
  },
  lotteryName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  lotteryPrize: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  lotteryStatus: {
    fontSize: 14,
    color: '#666',
  },
});
