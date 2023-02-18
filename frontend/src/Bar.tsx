import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import "./bar.scss"
import {useState} from 'react';

export const Bar = () => {

    return (
        <nav id="bar">
            <div id="container">
                <span id="logo">
                    <img src="/logo.svg" alt="logo" />
                    <b>Pallas Cat</b>
                </span>
                <span id="rhs">
                    <Search />
                    <a href="login">Login</a>
                    <a href="register">Register</a>
                </span>
            </div>
        </nav>
    )
}

const Search = () => {
    const [opacity,setOpacity] = useState(0);

    return (
        <span id="search">
            <form action="#" id="form_search" method="POST" style={{opacity: opacity}}>
                <select name="select_search" id="select_search">
                    <option value="">CDA</option>
                    <option value="">Zaluknij</option>
                </select>
                <input type="text" name="input_search" id="input_search"
                placeholder="Wpisz swoje wyszukiwanie..."/>
            </form>
            <button id="button_search" onClick={(_) => opacity === 0 ? setOpacity(100) : setOpacity(0)}>
                <FontAwesomeIcon icon={faMagnifyingGlass} size="xl" />
            </button>
        </span>
    )
}
