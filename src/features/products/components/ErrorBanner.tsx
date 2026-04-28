import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { colors } from "@/shared/styles/colors";

interface ErrorBannerProps {
  message?: string;
  onRetry?: () => void;
  showRetry?: boolean;
}

const ErrorBanner: React.FC<ErrorBannerProps> = ({
  message = "Refresh failed - showing cached data",
  onRetry,
  showRetry = true,
}) => {
  return (
    <View style={styles.warningBanner}>
      <Text style={styles.warningText}>{message}</Text>
      {showRetry && onRetry && (
        <TouchableOpacity onPress={onRetry}>
          <Text style={styles.retryText}>Retry</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  warningBanner: {
    backgroundColor: colors.error,
    paddingVertical: 8,
    paddingHorizontal: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  warningText: {
    color: colors.textLight,
    fontSize: 12,
  },
  retryText: {
    color: colors.textLight,
    fontSize: 12,
    fontWeight: "600",
    textDecorationLine: "underline",
  },
});

export default ErrorBanner;
