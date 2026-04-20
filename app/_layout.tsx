import { useState } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type Task = {
  id: number;
  text: string;
  done: boolean;
};

export default function RootLayout() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [input, setInput] = useState("");

  const toggle = (id: number) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t))
    );
  };

  const addTask = () => {
    const text = input.trim();
    if (!text) return;
    setTasks((prev) => [{ id: Date.now(), text, done: false }, ...prev]);
    setInput("");
  };

  const removeTask = (id: number) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <Text style={styles.title}>My tasks</Text>
      </View>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {tasks.map((task) => (
          <Pressable
            key={task.id}
            onPress={() => toggle(task.id)}
            onLongPress={() => removeTask(task.id)}
            style={({ pressed }) => [
              styles.taskRow,
              pressed && styles.taskRowPressed,
            ]}
          >
            <View style={[styles.checkbox, task.done && styles.checkboxDone]}>
              {task.done && <View style={styles.checkmark} />}
            </View>

            <Text style={[styles.taskText, task.done && styles.taskTextDone]}>
              {task.text}
            </Text>
          </Pressable>
        ))}
      </ScrollView>

      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          placeholder="Add a task…"
          placeholderTextColor="#999"
          value={input}
          onChangeText={setInput}
          onSubmitEditing={addTask}
          returnKeyType="done"
        />
        <Pressable
          onPress={addTask}
          style={({ pressed }) => [
            styles.addBtn,
            pressed && styles.addBtnPressed,
          ]}
        >
          <Text style={styles.addBtnText}>+</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#FAFAF9",
  },
  header: {
    paddingHorizontal: 28,
    paddingTop: 20,
    paddingBottom: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: "300",
    color: "#1A1A18",
    letterSpacing: -0.5,
    textAlign: "center",
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 28,
    paddingBottom: 8,
  },
  taskRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    paddingVertical: 15,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#E8E6E1",
  },
  taskRowPressed: {
    opacity: 0.5,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: "#C8C5BF",
    alignItems: "center",
    justifyContent: "center",
  },
  checkboxDone: {
    backgroundColor: "#1A1A18",
    borderColor: "#1A1A18",
  },
  checkmark: {
    width: 8,
    height: 5,
    borderLeftWidth: 1.5,
    borderBottomWidth: 1.5,
    borderColor: "#FAFAF9",
    transform: [{ rotate: "-45deg" }, { translateY: -1 }],
  },
  taskText: {
    flex: 1,
    fontSize: 15,
    fontWeight: "400",
    color: "#1A1A18",
    letterSpacing: -0.1,
  },
  taskTextDone: {
    color: "#C0BDB8",
    textDecorationLine: "line-through",
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingHorizontal: 28,
    paddingTop: 12,
    paddingBottom: 12,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: "#E8E6E1",
    backgroundColor: "#FAFAF9",
  },
  input: {
    flex: 1,
    height: 44,
    fontSize: 15,
    color: "#1A1A18",
    letterSpacing: -0.1,
  },
  addBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#1A1A18",
    alignItems: "center",
    justifyContent: "center",
  },
  addBtnPressed: {
    opacity: 0.6,
  },
  addBtnText: {
    color: "#FAFAF9",
    fontSize: 22,
    fontWeight: "300",
    lineHeight: 26,
  },
});
