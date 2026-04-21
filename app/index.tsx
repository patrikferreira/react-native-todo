import { Link } from "expo-router";
import { useContext } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import AppContext from "./AppContext";

export default function Home() {
  const context = useContext(AppContext);
  const { tasks } = context;

  const total = tasks.length;
  const done = tasks.filter((t) => t.done).length;
  const pct = total === 0 ? 0 : Math.round((done / total) * 100);
  const recent = [...tasks].reverse().slice(0, 5);

  return (
    <ScrollView
      style={styles.safe}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.header}>
        <Text style={styles.title}>Hello 👋</Text>
        <Text style={styles.subtitle}>See how your day is going</Text>
      </View>

      <View style={styles.statsRow}>
        <View style={styles.statCard}>
          <Text style={styles.statLabel}>Total</Text>
          <Text style={styles.statValue}>{total}</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statLabel}>Done</Text>
          <Text style={styles.statValue}>{done}</Text>
        </View>
      </View>

      <View style={styles.progressSection}>
        <View style={styles.progressHeader}>
          <Text style={styles.progressLabel}>Progress</Text>
          <Text style={styles.progressLabel}>{pct}%</Text>
        </View>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: `${pct}%` }]} />
        </View>
      </View>

      <View style={styles.sectionHeader}>
        <Text style={styles.sectionLabel}>Recent tasks</Text>
      </View>

      <View style={styles.recentList}>
        {recent.length === 0 ? (
          <Text style={styles.emptyText}>No tasks yet</Text>
        ) : (
          recent.map((task) => (
            <View key={task.id} style={styles.recentItem}>
              <View style={[styles.dot, task.done && styles.dotDone]} />
              <Text
                style={[styles.recentText, task.done && styles.recentTextDone]}
              >
                {task.text}
              </Text>
            </View>
          ))
        )}
      </View>

      <Link href="/tasks" style={styles.ctaBtn}>
        <Text style={styles.ctaBtnText}>Tasks</Text>
      </Link>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#F5F6F8",
  },
  content: {
    padding: 20,
    paddingBottom: 40,
  },

  header: {
    marginBottom: 22,
  },
  title: {
    fontSize: 28,
    fontWeight: "500",
    color: "#141518",
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 13,
    color: "#878C96",
    marginTop: 2,
  },

  statsRow: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 20,
  },
  statCard: {
    flex: 1,
    backgroundColor: "#ECEEF2",
    borderRadius: 10,
    padding: 14,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "#E0E3E9",
  },
  statLabel: {
    fontSize: 12,
    color: "#878C96",
    marginBottom: 4,
  },
  statValue: {
    fontSize: 28,
    fontWeight: "500",
    color: "#141518",
    letterSpacing: -0.5,
  },

  progressSection: {
    marginBottom: 24,
  },
  progressHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  progressLabel: {
    fontSize: 13,
    color: "#878C96",
  },
  progressBar: {
    height: 5,
    backgroundColor: "#ECEEF2",
    borderRadius: 99,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#DB4035",
    borderRadius: 99,
  },

  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  sectionLabel: {
    fontSize: 11,
    color: "#878C96",
    letterSpacing: 0.8,
    textTransform: "uppercase",
  },
  seeAll: {
    fontSize: 12,
    color: "#878C96",
  },

  recentList: {
    gap: 6,
    marginBottom: 28,
  },
  recentItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    backgroundColor: "#ECEEF2",
    borderRadius: 10,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "#E0E3E9",
  },
  dot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: "#BCC1CB",
  },
  dotDone: {
    backgroundColor: "#DB4035",
  },
  recentText: {
    fontSize: 13,
    color: "#141518",
    flex: 1,
  },
  recentTextDone: {
    color: "#9BA1AD",
    textDecorationLine: "line-through",
  },
  emptyText: {
    fontSize: 13,
    color: "#9BA1AD",
    paddingVertical: 8,
  },

  ctaBtn: {
    backgroundColor: "#DB4035",
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: "center",
    display: "flex",
    justifyContent: "center",
  },
  ctaBtnText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "500",
    textAlign: "center",
  },
});
