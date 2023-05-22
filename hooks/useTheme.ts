import { useDarkMode } from 'usehooks-ts';
import * as React from 'react';

type UseDarkModeReturn = ReturnType<typeof useDarkMode>;

export function useTheme(): UseDarkModeReturn {
  const darkModeHookReturn = useDarkMode();

  const adjustThemeClass = React.useCallback((isDarkMode: boolean) => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  React.useEffect(() => {
    adjustThemeClass(darkModeHookReturn.isDarkMode);
  }, []);

  return {
    ...darkModeHookReturn,
    toggle() {
      darkModeHookReturn.toggle();
      adjustThemeClass(!darkModeHookReturn.isDarkMode);
    },
  };
}
