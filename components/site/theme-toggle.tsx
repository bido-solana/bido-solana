"use client";

import { useSyncExternalStore } from "react";
import { Monitor, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const mounted = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const resolvedTheme = mounted ? theme : "light";

  return (
    <div className="flex gap-0.5 rounded-full border border-border bg-surface p-1 dark:bg-surface-2">
      <SwitchButton
        selected={resolvedTheme === "light"}
        label="Light theme"
        onClick={() => setTheme("light")}
      >
        <Sun className="size-4" strokeWidth={2} />
      </SwitchButton>
      <SwitchButton
        selected={resolvedTheme === "system"}
        label="System theme"
        onClick={() => setTheme("system")}
      >
        <Monitor className="size-4" strokeWidth={2} />
      </SwitchButton>
      <SwitchButton
        selected={resolvedTheme === "dark"}
        label="Dark theme"
        onClick={() => setTheme("dark")}
      >
        <Moon className="size-4" strokeWidth={2} />
      </SwitchButton>
    </div>
  );
}

function subscribe() {
  return () => {};
}

function getSnapshot() {
  return true;
}

function getServerSnapshot() {
  return false;
}

function SwitchButton({
  selected,
  label,
  onClick,
  children,
}: {
  selected: boolean;
  label: string;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      data-selected={selected}
      onClick={onClick}
      className="flex size-7 items-center justify-center rounded-full p-[3px] text-muted-foreground transition-colors hover:bg-surface-2 hover:text-foreground data-[selected=true]:bg-violet data-[selected=true]:text-white dark:hover:bg-background/40"
    >
      {children}
    </button>
  );
}
