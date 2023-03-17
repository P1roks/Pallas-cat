import { ReactElement, useContext, useState } from 'react';
import { useLoaderData } from "react-router";
import { NavLink } from "react-router-dom";
import { Popup } from "./Popup";
import { Search } from "./Search";
import { User } from "./User";
import { Login } from "./accounts/Login";
import { Register } from "./accounts/Register";
import "../scss/bar.scss";
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ThemeContext } from '../contexts/themeContext';

export const Bar = () => {
    let {isLogged,username} = useLoaderData() as {isLogged: boolean, username?: string}
    const { theme, setTheme } = useContext(ThemeContext);

	const themeIcon = (theme === "light" ? faMoon : faSun);
    const handleThemeChange = () => {
        const isCurrentDark = theme === 'dark';
        const newTheme = isCurrentDark ? 'light' : 'dark'
        setTheme(newTheme);
        localStorage.setItem('theme', newTheme);
    };

    return (
        <nav id="bar">
            <div id="container">
				<NavLink to="/" id="logo">
					<img src="/logo.svg" alt="logo" />
					<b>Pallas Cat</b>
				</NavLink>
                <span id="rhs">
                    <Search />
			{isLogged ?
					<User name={username || "User"} />
				:
				<>
					<PopupWithElem title="Login" elem={<Login />} />
					<PopupWithElem title="Register" elem={<Register />} />

				</>
				
			}
					<button id="theme-switch" onClick={handleThemeChange}>
						<FontAwesomeIcon icon={themeIcon} color="black"/>
					</button>
                </span>
            </div>
        </nav>
    )
}


const PopupWithElem = ({title,elem}: {title: string, elem: ReactElement}) => {
	const [toggled,setToggle] = useState(false)

	return (
		<>
			<p onClick={() => setToggle(!toggled)} style={{cursor:"pointer"}} >{title}</p>	
			{
				toggled && <Popup title={title} onClose={() => setToggle(false)}>{elem}</Popup>
			}
		</>
	)
}
