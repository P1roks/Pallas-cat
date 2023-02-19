import "./smallVid.scss"
//TODO: add platform to props
interface itemProps {
    title: string,
    img: string,
    href: string,
    platform: Platform,
}

export enum Platform {
	CDA = 1,
	OgladajAnime,
	Zaluknij,
}

export const SmallVid = ({title,img,platform,href}: itemProps) => {

    return (
        <a className="small-vid" href={`/watch/${platform}/${href}`}>
            <span className="wrapper">
                <img src={img} alt="Cover art" />
                <span className="text-wrapper">
                    <p className="title">{title}</p>
                    <h6 className="platform">({Platform[platform]})</h6>
                </span>
            </span>
        </a>
    )
}
