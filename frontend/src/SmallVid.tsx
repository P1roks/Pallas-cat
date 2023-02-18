import "./items.scss"
//TODO: add platform to props
interface itemProps {
    title: string,
    img: string,
    href: string,
    year: number,
}

export const SmallVid = ({title,img,year,href}: itemProps) => {

    return (
        <a className="item" href={`/watch/${href}`}>
            <span className="wrapper">
                <img src={img} alt="Cover art" />
                <span className="text_wrapper">
                    <p className="title">{title}</p>
                    <p className="year">({year})</p>
                </span>
            </span>
        </a>
    )
}
