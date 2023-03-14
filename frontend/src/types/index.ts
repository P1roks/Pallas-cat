import { ReactElement } from "react";
import { SmallVid } from "../components/video/SmallVid";

// All avaiable platforms
export enum Platform {
	CDA = 1,
	OgladajAnime,
	hdbest,
}

// Properties of video retrieved from backend
export interface Video {
	link: string,
	title: string,
	cover: string,
}

export interface VideoPlatform extends Video{
	platform: Platform,
}

// SmallVid properties
export interface SmallVidProps {
    displayPlatform: boolean,
    title: string,
    img: string,
    href: string,
    platform: Platform,
    fav?: boolean,
    favVids?: string[],
}

//TODO: fix this type error somehow
// VidGroup properties
export interface VidGroupProps{
	titleElem: ReactElement,
	children: any
	//children: ReactElement | null
}

// Popup's properties
export interface PopupProps {
	children: ReactElement,
	title: string,
	onClose: any,
}

// Essential Video's data to render a video that was obtained from router 
export interface VideoLoaderData {
	source: string,
	embeddable: boolean,
}
