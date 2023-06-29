import Link from "next/link";
import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";

export default function NavBottom(){
    return (
            <div className="col col-12 bg-light bg-secondary fixed-bottom bottom-nav">
                <ul>
                    <li>
                        <Link className={""} href={"/products"}>
                            <span className="icon-cont">
                                <Icon icon={"far-regular fa-house"} />
                            </span>
                            <span className="text">Home</span>
                        </Link>
                    </li>
                    <li>
                        <Link className={""} href={"/products/create"}>
                            <span className="icon-cont">
                                <Icon icon={"far-regular fa-plus"} />
                            </span>
                            <span className="text">Add</span>
                        </Link>
                    </li>
                </ul>
            </div>
    );
}