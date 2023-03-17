import { useState } from 'react';
import { ThemeContext } from '../contexts/themeContext';

export const ThemeWrapper = (props: any) => {
    const isBrowserDefaultDark = () => window.matchMedia('(prefers-color-scheme: dark)').matches;
    const getDefaultTheme = (): string => {
        const localStorageTheme = localStorage.getItem('theme');
        const browserDefault = isBrowserDefaultDark() ? 'dark' : 'light';
        return localStorageTheme || browserDefault;
    };

    const [theme, setTheme] = useState(getDefaultTheme());

    return (
        <ThemeContext.Provider value={{ theme, setTheme }}>
            <div className={`theme-${theme}`}>
                <div className="bg-wrapper">
                    {props.children}
                </div>
            </div>
        </ThemeContext.Provider>
    )
}