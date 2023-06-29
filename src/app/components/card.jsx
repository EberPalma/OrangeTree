
//* Fontawesome Icons
import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";
import { flowCircular } from "../../fonts/fonts";

export default function Card(props) {
    var title = props.title;
    var content = props.content;
    var img = props.image;
    var url = props.url

    if (title == undefined) {
        title = "Example";
    }
    if (content == undefined) {
        content = <span className={flowCircular.className}>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Veniam quaerat similique pariatur natus omnis.</span>
    }
    if (img !== undefined) {
        img = (<Image className="card-img-top" src={img} alt={title + " image card"} />);
    } else {
        img = ""
    }
    if (url !== undefined) {
        url = (<Link href={url} className="btn btn-primary">Read more</Link>);
    } else {
        url = "";
    }

    return (
        <div className="card">
            <div className="card-body">
                {img}
                <span className="card-title text-capitalize">
                    <Icon className="icon" icon="fas-solid fa-chevron-right" /> {title}
                </span>
                <hr />
                <p className="card-text two-lines-text text-justify">
                    {content}
                </p>
                {url}
            </div>
        </div>
    )
}