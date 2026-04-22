import { Slot } from "expo-router";
import { AppProvider } from "./AppContext";

export default function RootLayout() {
  return (
    <AppProvider>
      <Slot />
    </AppProvider>
  );
}