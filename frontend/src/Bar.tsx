import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import "./bar.scss"
import {CSSProperties, useEffect, useRef, useState} from 'react';
import {redirect, useNavigate} from "react-router";
import {Link, NavLink} from "react-router-dom";

export const Bar = () => {

//TODO: change a to NavLink
    return (
        <nav id="bar">
            <div id="container">
                <NavLink to="/" id="logo">
                    <img src="/logo.svg" alt="logo" />
                    <b>Pallas Cat</b>
                </NavLink>
                <span id="rhs">
                    <Search />
                    <NavLink to="/login">Login</NavLink>
                    <NavLink to="/register">Register</NavLink>
                </span>
            </div>
        </nav>
    )
}

const Search = () => {
    //Visibility can't be fluently transitioned and elems with opacity 0 can be still clicked, so this is the only real solution 
    const [visibility,setVisibility] = useState("hidden")
    const [opacity,setOpacity] = useState(0)
    const searchQuery = useRef<HTMLInputElement>(null);

    const search = () => {
	console.log("TODO")
    }

    const changeVisibility = () => {
    	if (opacity === 0){
		setVisibility("visible")
		setOpacity(100)
	}
	else{
	//This had to be done so the transition takes effect
		setOpacity(0);
		setTimeout(function(){
			setVisibility("hidden")
		},500)
	}
    }

    return (
        <span id="search">
            <form action="#" id="form-search" method="POST" style={{visibility: visibility, opacity: opacity} as CSSProperties} onSubmit={() => console.log("submit")}>
                <select name="select-search" id="select-search">
                    <option value="">CDA</option>
                    <option value="">Zaluknij</option>
                </select>
                <input type="text" name="input_search" id="input-search"
                placeholder="Wpisz swoje wyszukiwanie..." ref={searchQuery} />
            </form>
            <button id="button-search" onClick={(_) => searchQuery.current && searchQuery.current.value !== "" ? search() : changeVisibility()} >
                <FontAwesomeIcon icon={faMagnifyingGlass} size="xl" />
            </button>
        </span>
    )
}
