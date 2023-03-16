import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from "react-router";
import { CSSProperties, useRef, useState } from "react";

export const Search = () => {
    //Visibility can't be fluently transitioned and elems with opacity 0 can be still clicked, so this is the only real solution 
    const [visibility, setVisibility] = useState("hidden");
    const [opacity, setOpacity] = useState(0);
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
	} else {
	        //This had to be done so the transition takes effect
            setOpacity(0);
            setTimeout(() => {
                setVisibility("hidden")
            }, 500)
	    }
    }

    return (
        <div id="search">
            <form action="#" id="form-search" method="POST" style={{visibility: visibility, opacity: opacity} as CSSProperties} onSubmit={e => {e.preventDefault(); search();}}>
                <input type="text" name="input_search" id="input-search"
                placeholder="Wpisz tytuł filmu..." ref={searchQuery} />
                <select name="select-search" id="select-search" ref={selectPlatfom}>
                    <option value="1">CDA</option>
                    <option value="2">OgladajAnime</option>
                    <option value="3">hdbest</option>
                </select>
            </form>
            <button id="button-search" style={opacity === 100 ? {backgroundColor: "#373737"} : {}}
                onClick={() => 
                    searchQuery.current && searchQuery.current.value !== "" 
                    ? search() : changeVisibility()
                }>
                <FontAwesomeIcon icon={faMagnifyingGlass} size="xl" />
            </button>
        </div>
    )
}
