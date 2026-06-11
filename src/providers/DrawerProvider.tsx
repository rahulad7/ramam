import { createContext, useCallback, useMemo, useState, type ReactNode } from 'react';

type DrawerContextValue = {
  isOpen: boolean;
  openDrawer: () => void;
  closeDrawer: () => void;
  toggleDrawer: () => void;
};

export const DrawerContext = createContext<DrawerContextValue | null>(null);

type DrawerProviderProps = {
  children: ReactNode;
};

export function DrawerProvider({ children }: DrawerProviderProps) {
  const [isOpen, setIsOpen] = useState(false);

  const openDrawer = useCallback(() => setIsOpen(true), []);
  const closeDrawer = useCallback(() => setIsOpen(false), []);
  const toggleDrawer = useCallback(() => setIsOpen((prev) => !prev), []);

  const value = useMemo(
    () => ({ isOpen, openDrawer, closeDrawer, toggleDrawer }),
    [isOpen, openDrawer, closeDrawer, toggleDrawer]
  );

  return <DrawerContext.Provider value={value}>{children}</DrawerContext.Provider>;
}
