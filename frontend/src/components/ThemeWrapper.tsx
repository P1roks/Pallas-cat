import { useState } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { theme } from '../atoms';

export const ThemeWrapper = (props: any) => {

    const [themeVal,setTheme] = useRecoilState(theme);
    // const [theme, setTheme] = useState(getDefaultTheme());

    return (
            <div className={`theme-${themeVal}`}>
                <div className="bg-wrapper">
                    {props.children}
                </div>
            </div>
    )
}