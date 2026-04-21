import { Stack } from "expo-router";
import { AppProvider } from "./AppContext";

export default function RootLayout() {
  return (
    <>
      <AppProvider>
        <Stack>
          <Stack.Screen
            name="index"
            options={{
              title: "Home",
            }}
          />
          <Stack.Screen
            name="tasks"
            options={{
              title: "Tasks",
            }}
          />
        </Stack>
      </AppProvider>
    </>
  );
}
