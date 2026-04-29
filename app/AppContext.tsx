import React, { createContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

type Task = {
  id: number;
  text: string;
  done: boolean;
};

type AppContextType = {
  tasks: Task[];
  setTasks: (tasks: Task[]) => void;
};

const AppContext = createContext<AppContextType>({
  tasks: [],
  setTasks: () => {},
});

export default AppContext;

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [tasks, setTasks] = useState<any[]>([]);
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    const loadTasks = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem("tasks");
        if (jsonValue) setTasks(JSON.parse(jsonValue));
      } catch (e) {
        console.log("Failed to load tasks", e);
      } finally {
        setHasLoaded(true);
      }
    };
    loadTasks();
  }, []);

  useEffect(() => {
    if (!hasLoaded) return;
    const saveTasks = async () => {
      try {
        await AsyncStorage.setItem("tasks", JSON.stringify(tasks));
      } catch (e) {
        console.log("Failed to save tasks", e);
      }
    };
    saveTasks();
  }, [tasks, hasLoaded]);

  return (
    <AppContext.Provider value={{ tasks, setTasks }}>
      {children}
    </AppContext.Provider>
  );
}
