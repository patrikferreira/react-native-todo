import { useContext, useState } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import AppContext from "../AppContext";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Tasks() {
  const context = useContext(AppContext);
  const { tasks, setTasks } = context;

  const [input, setInput] = useState("");

  const toggle = (id: number) => {
    const updated = tasks.map((t) =>
      t.id === id ? { ...t, done: !t.done } : t
    );
    setTasks(updated);
  };

  const addTask = () => {
    const text = input.trim();
    if (!text) return;
    setTasks([{ id: Date.now(), text, done: false }, ...tasks]);
    setInput("");
  };

  const removeTask = (id: number) => {
    setTasks(tasks.filter((t) => t.id !== id));
  };

  return (
    <SafeAreaView style={styles.safe}>
      <View>
        <Text style={styles.title}>Tasks</Text>
        <Text style={styles.subtitle}>Organize your day</Text>
      </View>

      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          placeholder="New task"
          placeholderTextColor="#878C96"
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

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {tasks.length === 0 && (
          <View style={styles.emptyState}>
            <Text style={styles.emptyText}>No tasks yet</Text>
          </View>
        )}

        {tasks.map((task) => (
          <Pressable
            key={task.id}
            onPress={() => toggle(task.id)}
            onLongPress={() => removeTask(task.id)}
            style={({ pressed }) => [
              styles.taskRow,
              task.done && styles.taskRowDone,
              pressed && styles.taskRowPressed,
            ]}
          >
            <View style={[styles.checkbox, task.done && styles.checkboxDone]}>
              {task.done && <Text style={styles.checkmark}>✓</Text>}
            </View>

            <Text style={[styles.taskText, task.done && styles.taskTextDone]}>
              {task.text}
            </Text>

            <Pressable
              onPress={() => removeTask(task.id)}
              hitSlop={8}
              style={styles.deleteBtn}
            >
              <Text style={styles.deleteText}>×</Text>
            </Pressable>
          </Pressable>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    padding: 30,
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
    marginBottom: 18,
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 16,
  },
  input: {
    flex: 1,
    height: 44,
    fontSize: 14,
    color: "#141518",
    backgroundColor: "#ECEEF2",
    borderRadius: 10,
    paddingHorizontal: 14,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "#E0E3E9",
  },
  addBtn: {
    width: 44,
    height: 44,
    borderRadius: 10,
    backgroundColor: "#DB4035",
    alignItems: "center",
    justifyContent: "center",
  },
  addBtnPressed: {
    opacity: 0.6,
  },
  addBtnText: {
    color: "#FFFFFF",
    fontSize: 24,
    fontWeight: "300",
    lineHeight: 28,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    gap: 8,
  },
  emptyState: {
    alignItems: "center",
    marginTop: 48,
  },
  emptyText: {
    fontSize: 14,
    color: "#9BA1AD",
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
  taskRowDone: {
    opacity: 0.45,
  },
  taskRowPressed: {
    opacity: 0.6,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: "#BCC1CB",
    alignItems: "center",
    justifyContent: "center",
  },
  checkboxDone: {
    backgroundColor: "#DB4035",
    borderColor: "#DB4035",
  },
  checkmark: {
    fontSize: 11,
    color: "#FFFFFF",
    lineHeight: 14,
  },
  taskText: {
    flex: 1,
    fontSize: 14,
    fontWeight: "400",
    color: "#141518",
    letterSpacing: -0.1,
  },
  taskTextDone: {
    textDecorationLine: "line-through",
    color: "#9BA1AD",
  },
  deleteBtn: {
    paddingHorizontal: 4,
  },
  deleteText: {
    fontSize: 18,
    color: "#BCC1CB",
    lineHeight: 20,
  },
});
