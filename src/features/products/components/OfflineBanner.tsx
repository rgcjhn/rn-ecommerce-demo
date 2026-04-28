import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { colors } from "@/shared/styles/colors";

interface OfflineBannerProps {
  isOnline?: boolean;
  onRefresh?: () => void;
  showRefresh?: boolean;
}

const OfflineBanner: React.FC<OfflineBannerProps> = ({
  isOnline,
  onRefresh,
  showRefresh = true,
}) => {
  return (
    <View style={styles.offlineBanner}>
      <View>
        <Text style={styles.offlineBannerText}>Offline Mode</Text>
      </View>
      {showRefresh && isOnline && onRefresh && (
        <TouchableOpacity onPress={onRefresh}>
          <Text style={styles.retryText}>Refresh</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  offlineBanner: {
    backgroundColor: colors.warning || "#ff9800",
    paddingVertical: 8,
    paddingHorizontal: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  offlineBannerText: {
    color: colors.textLight || "#fff",
    fontSize: 12,
    fontWeight: "500",
  },
  lastSyncText: {
    color: colors.textLight || "#fff",
    fontSize: 10,
    opacity: 0.9,
    marginTop: 2,
  },
  retryText: {
    color: colors.textLight || "#fff",
    fontSize: 12,
    fontWeight: "600",
    textDecorationLine: "underline",
  },
});

export default OfflineBanner;
