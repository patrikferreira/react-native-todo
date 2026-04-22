import { useContext, useEffect, useRef, useState } from "react";
import {
  Animated,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AppContext from "../AppContext";

const DURATION = 25 * 60;

function pad(n: number) {
  return String(n).padStart(2, "0");
}

export default function Focus() {
  const { tasks } = useContext(AppContext);
  const pendingTasks = tasks.filter((t) => !t.done);

  const [secondsLeft, setSecondsLeft] = useState(DURATION);
  const [running, setRunning] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const fadeAnim = useRef(new Animated.Value(1)).current;

  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;
  const isFinished = secondsLeft === 0;

  useEffect(() => {
    if (running) {
      intervalRef.current = setInterval(() => {
        setSecondsLeft((s) => {
          if (s <= 1) {
            clearInterval(intervalRef.current!);
            setRunning(false);
            return 0;
          }
          return s - 1;
        });
      }, 1000);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [running]);

  useEffect(() => {
    if (running) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(fadeAnim, { toValue: 0.4, duration: 1800, useNativeDriver: true }),
          Animated.timing(fadeAnim, { toValue: 1, duration: 1800, useNativeDriver: true }),
        ])
      ).start();
    } else {
      fadeAnim.stopAnimation();
      Animated.timing(fadeAnim, { toValue: 1, duration: 200, useNativeDriver: true }).start();
    }
  }, [running]);

  const reset = () => {
    setRunning(false);
    setSecondsLeft(DURATION);
  };

  const selectedTask = tasks.find((t) => t.id === selectedId);

  return (
    <SafeAreaView style={styles.safe}>
      <View>
        <Text style={styles.title}>Focus</Text>
        <Text style={styles.subtitle}>Deep work session</Text>
      </View>

      <View style={styles.timerBlock}>
        <Animated.Text style={[styles.timerText, { opacity: running ? fadeAnim : 1 }]}>
          {pad(minutes)}:{pad(seconds)}
        </Animated.Text>

        {selectedTask ? (
          <Text style={styles.taskFocusLabel} numberOfLines={1}>
            {selectedTask.text}
          </Text>
        ) : (
          <Text style={styles.taskFocusPlaceholder}>no task selected</Text>
        )}
      </View>

      <View style={styles.controlRow}>
        <Pressable
          onPress={reset}
          style={({ pressed }) => [styles.ghostBtn, pressed && styles.pressed]}
        >
          <Text style={styles.ghostBtnText}>Reset</Text>
        </Pressable>

        <Pressable
          onPress={() => setRunning((r) => !r)}
          style={({ pressed }) => [
            styles.mainBtn,
            isFinished && styles.mainBtnDone,
            pressed && styles.pressed,
          ]}
        >
          <Text style={styles.mainBtnText}>
            {isFinished ? "Done" : running ? "Pause" : "Start"}
          </Text>
        </Pressable>
      </View>

      <Text style={styles.sectionLabel}>Select task</Text>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {pendingTasks.length === 0 && (
          <Text style={styles.emptyText}>No pending tasks</Text>
        )}

        {pendingTasks.map((task) => {
          const active = task.id === selectedId;
          return (
            <Pressable
              key={task.id}
              onPress={() => setSelectedId(active ? null : task.id)}
              style={({ pressed }) => [
                styles.taskRow,
                pressed && styles.pressed,
              ]}
            >
              <View style={[styles.radio, active && styles.radioActive]}>
                {active && <View style={styles.radioDot} />}
              </View>
              <Text
                style={[styles.taskText, active && styles.taskTextActive]}
                numberOfLines={1}
              >
                {task.text}
              </Text>
            </Pressable>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    paddingHorizontal: 30,
    paddingTop: 30,
    backgroundColor: "#F5F6F8",
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
    marginBottom: 36,
  },
  timerBlock: {
    alignItems: "center",
    marginBottom: 28,
  },
  timerText: {
    fontSize: 72,
    fontWeight: "200",
    color: "#141518",
    letterSpacing: -4,
    fontVariant: ["tabular-nums"],
  },
  taskFocusLabel: {
    marginTop: 8,
    fontSize: 13,
    color: "#DB4035",
    fontWeight: "500",
    letterSpacing: -0.1,
    maxWidth: "70%",
    textAlign: "center",
  },
  taskFocusPlaceholder: {
    marginTop: 8,
    fontSize: 13,
    color: "#BCC1CB",
    letterSpacing: -0.1,
  },
  controlRow: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 28,
  },
  ghostBtn: {
    flex: 1,
    height: 44,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ECEEF2",
  },
  ghostBtnText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#878C96",
  },
  mainBtn: {
    flex: 2,
    height: 44,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#DB4035",
  },
  mainBtnDone: {
    backgroundColor: "#BCC1CB",
  },
  mainBtnText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#FFFFFF",
    letterSpacing: -0.1,
  },
  pressed: {
    opacity: 0.6,
  },
  sectionLabel: {
    fontSize: 11,
    fontWeight: "600",
    color: "#BCC1CB",
    letterSpacing: 0.8,
    textTransform: "uppercase",
    marginBottom: 10,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    gap: 6,
    paddingBottom: 24,
  },
  emptyText: {
    fontSize: 13,
    color: "#9BA1AD",
    marginTop: 8,
    textAlign: "center",
  },
  taskRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingVertical: 11,
    paddingHorizontal: 14,
    backgroundColor: "#ECEEF2",
    borderRadius: 10,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "#E0E3E9",
  },
  radio: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 1.5,
    borderColor: "#BCC1CB",
    alignItems: "center",
    justifyContent: "center",
  },
  radioActive: {
    borderColor: "#DB4035",
  },
  radioDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#DB4035",
  },
  taskText: {
    flex: 1,
    fontSize: 14,
    fontWeight: "400",
    color: "#141518",
    letterSpacing: -0.1,
  },
  taskTextActive: {
    fontWeight: "500",
  },
});