import "./bar.scss"
import {ReactElement, useState} from 'react';
import {useLoaderData} from "react-router";
import {NavLink} from "react-router-dom";
import {Popup} from "./Popup";
import {Login} from "./Login";
import {Register} from "./Register";
import {Search} from "./Search";
import {User} from "./User";

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
		    		<User name="Piroks" />
			      :
				<>
				    <PopupWithElem title="Login" elem={<Login />} />
				    <PopupWithElem title="Register" elem={<Register />} />
				</>
		    }
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
