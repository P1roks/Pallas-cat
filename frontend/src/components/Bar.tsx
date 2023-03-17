import { ReactElement, useContext, useEffect, useRef, useState } from 'react';
import { useLoaderData, useLocation } from "react-router";
import { NavLink } from "react-router-dom";
import { Popup } from "./Popup";
import { Search } from "./Search";
import { User } from "./User";
import { Login } from "./accounts/Login";
import { Register } from "./accounts/Register";
import "../scss/bar.scss";
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Turn as Hamburger } from 'hamburger-react'
import { useRecoilState } from 'recoil';
import { theme } from '../atoms';

export const Bar = () => {
    let {isLogged,username} = useLoaderData() as {isLogged: boolean, username?: string}

	const [themeVal, setTheme] = useRecoilState(theme);

	const themeIcon = (themeVal === "light" ? faMoon : faSun);
    const handleThemeChange = () => {
        const isCurrentDark = themeVal === 'dark';
        const newTheme = isCurrentDark ? 'light' : 'dark'
        setTheme(newTheme);
        localStorage.setItem('theme', newTheme);
    };

	// Hamburger
	const [isOpen, setOpen] = useState(false);
	const location = useLocation();
	useEffect(() => {
		setOpen(false);
	}, [location]);

	return (
        <nav className="bar">
            <div className="container">
				<div id="hamburger">
					<Hamburger toggled={isOpen} toggle={setOpen} direction="right" />
				</div>
				<NavLink to="/" className="logo">
					<img src="/logo.svg" alt="logo" />
					<b>Pallas Cat</b>
				</NavLink>
                <span className="rhs" style={isOpen ? { left: 0 } : { left: "-90%" }}>
                    <Search />
			{isLogged ?
					<User name={username || "User"} />
				:
				<>
					<PopupWithElem title="Login" elem={<Login />} />
					<PopupWithElem title="Register" elem={<Register />} />

				</>
				
			}
					<button className="theme-switch panel" onClick={handleThemeChange}>
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
		<div className="panel">
			<p onClick={() => setToggle(!toggled)} style={{cursor:"pointer"}} >{title}</p>	
			{
				toggled && <Popup title={title} onClose={() => setToggle(false)}>{elem}</Popup>
			}
		</div>
	)
}
