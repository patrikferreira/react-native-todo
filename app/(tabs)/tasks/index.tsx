import { useContext, useState } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import AppContext from "../../AppContext";
import { SafeAreaView } from "react-native-safe-area-context";
import Task from "@/components/Task";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function Tasks() {
  const context = useContext(AppContext);
  const { tasks, setTasks } = context;

  const [input, setInput] = useState("");

  function toggle(id: number) {
    const updated = tasks.map((t) =>
      t.id === id ? { ...t, done: !t.done } : t
    );
    setTasks(updated);
  }

  function addTask() {
    const text = input.trim();
    if (!text) return;
    if (tasks.length >= 21) {
      alert("Task limit reached");
      return;
    }
    setTasks([{ id: Date.now(), text, done: false }, ...tasks]);
    setInput("");
  }

  function removeTask(id: number) {
    setTasks(tasks.filter((t) => t.id !== id));
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
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
            maxLength={50}
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
            <Task
              key={task.id}
              {...task}
              toggleTask={toggle}
              deleteTask={removeTask}
            />
          ))}
        </ScrollView>
      </SafeAreaView>
    </GestureHandlerRootView>
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
});
