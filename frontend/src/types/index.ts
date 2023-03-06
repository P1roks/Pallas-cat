import { ReactElement } from "react";

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
	platform?: Platform,
}

// SmallVid properties
export interface SmallVidProps {
    title: string,
    img: string,
    href: string,
    platform: Platform,
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
