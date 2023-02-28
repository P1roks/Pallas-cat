import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import "./bar.scss"
import {CSSProperties, ReactElement, useRef, useState} from 'react';
import {useLoaderData, useNavigate} from "react-router";
import {NavLink} from "react-router-dom";
import {Popup} from "./Popup";
import {Login} from "./Login";
import {Register} from "./Register";

export const Bar = () => {
    let {isLogged} = useLoaderData() as {isLogged: boolean}

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
				      <p>TODO: logged user component</p>
			      :
				<>
				    <LogReg title="Login" elem={<Login />} />
				    <LogReg title="Register" elem={<Register />} />
				</>
		    }
                </span>
            </div>
        </nav>
    )
}

const Search = () => {
    //Visibility can't be fluently transitioned and elems with opacity 0 can be still clicked, so this is the only real solution 
    const [visibility,setVisibility] = useState("hidden");
    const [opacity,setOpacity] = useState(0);
    const searchQuery = useRef<HTMLInputElement>(null);
    const selectPlatfom = useRef<HTMLSelectElement>(null);
    const navigate = useNavigate();

    const search = () => {
    	if(searchQuery.current && selectPlatfom.current) {
            navigate(`/search/${selectPlatfom.current.value}/${searchQuery.current.value}`);
        }
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
            <form action="#" id="form-search" method="POST" style={{visibility: visibility, opacity: opacity} as CSSProperties} onSubmit={e => {e.preventDefault(); search();}}>
                <select name="select-search" id="select-search" ref={selectPlatfom}>
                    <option value="1">CDA</option>
                    <option value="2">OgladajAnime</option>
                    <option value="3">hdbest</option>
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

const LogReg = ({title,elem}: {title: string, elem: ReactElement}) => {
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
