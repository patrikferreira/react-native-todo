import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
  interpolateColor,
} from "react-native-reanimated";

const REVEAL_WIDTH = 44;
const DELETE_THRESHOLD = -(REVEAL_WIDTH * 0.5);

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
  const translateX = useSharedValue(0);

  const panGesture = Gesture.Pan()
    .activeOffsetX([-8, 8])
    .failOffsetY([-8, 8])
    .onUpdate((e) => {
      translateX.value = Math.min(0, Math.max(e.translationX, -REVEAL_WIDTH * 1.2));
    })
    .onEnd((e) => {
      if (e.translationX < DELETE_THRESHOLD) {
        translateX.value = withTiming(-500, { duration: 250 }, () => {
          runOnJS(deleteTask)(id);
        });
      } else {
        translateX.value = withSpring(0, { damping: 18, stiffness: 200 });
      }
    });

  const rowAnimStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  const trashBgStyle = useAnimatedStyle(() => {
    const progress = Math.min(1, Math.abs(translateX.value) / REVEAL_WIDTH);
    return {
      backgroundColor: interpolateColor(
        progress,
        [0, 0.5, 1],
        ["#f5cece", "#f08080", "#DB4035"]
      ),
      opacity: progress,
    };
  });

  const trashIconStyle = useAnimatedStyle(() => {
    const progress = Math.min(1, Math.abs(translateX.value) / REVEAL_WIDTH);
    return {
      transform: [{ scale: 0.5 + 0.5 * progress }],
      opacity: progress,
    };
  });

  return (
    <View style={styles.wrapper}>
      <Animated.View style={[styles.trashContainer, trashBgStyle]}>
        <Animated.View style={trashIconStyle}>
          <Feather name="trash-2" size={18} color="#fff" />
        </Animated.View>
      </Animated.View>

      <GestureDetector gesture={panGesture}>
        <Animated.View style={rowAnimStyle}>
          <Pressable
            onPress={() => toggleTask(id)}
            onLongPress={() => router.push(`/tasks/${id}`)}
            style={({ pressed }) => [
              styles.taskRow,
              done && styles.taskRowDone,
              pressed && styles.taskRowPressed,
            ]}
          >
            <View style={[styles.checkbox, done && styles.checkboxDone]}>
              {done && <Text style={styles.checkmark}>✓</Text>}
            </View>

            <Text
              style={[styles.taskText, done && styles.taskTextDone]}
              numberOfLines={1}
            >
              {text}
            </Text>

            <Pressable
              onPress={() => router.push(`/tasks/${id}`)}
              hitSlop={8}
              style={styles.editBtn}
            >
              <Feather name="edit-2" size={14} color="#BCC1CB" />
            </Pressable>
          </Pressable>
        </Animated.View>
      </GestureDetector>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    position: "relative",
    borderRadius: 10,
    overflow: "hidden",
  },
  trashContainer: {
    position: "absolute",
    right: 0,
    top: 0,
    bottom: 0,
    width: REVEAL_WIDTH,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
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
  editBtn: {
    paddingHorizontal: 4,
  },
});