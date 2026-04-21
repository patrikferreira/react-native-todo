import React, { createContext, useState } from "react";

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

  return (
    <AppContext.Provider value={{ tasks, setTasks }}>
      {children}
    </AppContext.Provider>
  );
}
