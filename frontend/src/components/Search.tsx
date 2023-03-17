import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from "react-router";
import { CSSProperties, useRef, useState, useContext } from "react";
import { useRecoilValue } from "recoil";
import { theme } from "../atoms";

export const Search = () => {
    //Visibility can't be fluently transitioned and elems with opacity 0 can be still clicked, so this is the only real solution 
    const isMobile = (window.innerWidth <= 992);
    const [visibility, setVisibility] = useState(isMobile ? "visible" : "hidden");
    const [opacity, setOpacity] = useState(isMobile ? 100 : 0);
    const searchQuery = useRef<HTMLInputElement>(null);
    const selectPlatfom = useRef<HTMLSelectElement>(null);
    const navigate = useNavigate();
    const themeVal = useRecoilValue(theme);

    const [width, setWidth] = useState(window.innerWidth);
    window.addEventListener('resize', () => {
        setWidth(window.innerWidth);
        if(window.innerWidth <= 992) {
            setVisibility("visible");
            setOpacity(100)
        }
    });

    const search = () => {
    	if(searchQuery.current && selectPlatfom.current) {
            navigate(`/search/${selectPlatfom.current.value}/${searchQuery.current.value}`);
        }
    }

    const changeVisibility = () => {
        if(width <= 992) return;

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

    let backgroundColor = '#000';
    if(themeVal === 'light') {
        backgroundColor = "#dbdbdb";
    } else if(themeVal === 'dark') {
        backgroundColor = "#373737";
    }

    const buttonSearchStyle = (opacity === 100 ? { backgroundColor } : {});

    return (
        <div className="search">
            <form action="#" className="form-search" method="POST" style={{visibility: visibility, opacity: opacity} as CSSProperties} onSubmit={e => {e.preventDefault(); search();}}>
                <input type="text" name="input_search" className="input-search"
                placeholder="Wpisz tytuł filmu..." ref={searchQuery} />
                <select name="select-search" className="select-search" ref={selectPlatfom}>
                    <option value="1">CDA</option>
                    <option value="2">OgladajAnime</option>
                    <option value="3">hdbest</option>
                </select>
            </form>
            <button className="button-search" style={buttonSearchStyle}
                onClick={() => 
                    searchQuery.current && searchQuery.current.value !== "" 
                    ? search() : changeVisibility()
                }>
                <FontAwesomeIcon icon={faMagnifyingGlass} size="xl" />
            </button>
        </div>
    )
}
