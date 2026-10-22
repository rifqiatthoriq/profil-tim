import React from "react";
import { TouchableOpacity, Text } from "react-native";
import { buttonStyles } from "@/styles";

interface PageButtonProps {
  title: string;
  onPress: () => void;
}

export default function PageButton({ title, onPress }: PageButtonProps) {
  return (
    <TouchableOpacity style={buttonStyles.button} onPress={onPress}>
      <Text style={buttonStyles.text}>{title}</Text>
    </TouchableOpacity>
  );
}