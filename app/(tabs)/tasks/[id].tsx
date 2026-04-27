import { router, Stack, useLocalSearchParams } from "expo-router";
import { useContext, useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AppContext from "../../AppContext";

export default function TaskDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { tasks, setTasks } = useContext(AppContext);

  const task = tasks.find((t) => t.id === Number(id));
  const [text, setText] = useState(task?.text ?? "");

  function save() {
    if (!text.trim() || !task) return;
    setTasks(
      tasks.map((t) => (t.id === task.id ? { ...t, text: text.trim() } : t))
    );
    router.back();
  };

  return (
    <>
      <Stack.Screen options={{ presentation: "modal", headerShown: false }} />
      <SafeAreaView style={styles.safe}>
        <TextInput
          style={styles.input}
          value={text}
          onChangeText={setText}
          autoFocus
          returnKeyType="done"
          onSubmitEditing={save}
          placeholderTextColor="#878C96"
          placeholder="Task name"
          maxLength={50}
        />

        <View style={styles.row}>
          <Pressable
            onPress={() => router.back()}
            style={({ pressed }) => [
              styles.btn,
              styles.btnCancel,
              pressed && styles.pressed,
            ]}
          >
            <Text style={styles.btnCancelText}>Cancel</Text>
          </Pressable>

          <Pressable
            onPress={save}
            style={({ pressed }) => [
              styles.btn,
              styles.btnSave,
              pressed && styles.pressed,
            ]}
          >
            <Text style={styles.btnSaveText}>Save</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    padding: 30,
    backgroundColor: "#F5F6F8",
  },
  input: {
    height: 44,
    fontSize: 14,
    color: "#141518",
    backgroundColor: "#ECEEF2",
    borderRadius: 10,
    paddingHorizontal: 14,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "#E0E3E9",
    marginBottom: 8,
  },
  row: {
    flexDirection: "row",
    gap: 8,
  },
  btn: {
    flex: 1,
    height: 44,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  btnCancel: {
    backgroundColor: "#ECEEF2",
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "#E0E3E9",
  },
  btnSave: {
    backgroundColor: "#DB4035",
  },
  pressed: {
    opacity: 0.6,
  },
  btnCancelText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#141518",
  },
  btnSaveText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#FFFFFF",
  },
});
