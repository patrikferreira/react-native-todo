import { useRouter } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

type Props = {
  id: number;
  text: string;
  done: boolean;
  toggleTask: (id: number) => void;
  deleteTask: (id: number) => void;
};

export default function Task({
  id,
  text,
  done,
  toggleTask,
  deleteTask,
}: Props) {
  const router = useRouter();

  return (
    <Pressable
      key={id}
      onPress={() => {
        toggleTask(id);
      }}
      onLongPress={() => {
        router.push(`/tasks/${id}`);
      }}
      style={({ pressed }) => [
        styles.taskRow,
        done && styles.taskRowDone,
        pressed && styles.taskRowPressed,
      ]}
    >
      <View style={[styles.checkbox, done && styles.checkboxDone]}>
        {done && <Text style={styles.checkmark}>✓</Text>}
      </View>

      <Text style={[styles.taskText, done && styles.taskTextDone]}>{text}</Text>

      <Pressable
        onPress={() => deleteTask(id)}
        hitSlop={8}
        style={styles.deleteBtn}
      >
        <Text style={styles.deleteText}>×</Text>
      </Pressable>
    </Pressable>
  );
}

const styles = StyleSheet.create({
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
