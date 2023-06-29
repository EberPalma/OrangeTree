import Link from "next/link";
import { quicksand } from "@/fonts/fonts";

export default function Breadcrumbs(props){
    var subtitle = props.subtitle;

    if(subtitle === undefined){
        subtitle="";
    }else{
        subtitle = <small className={"text-capitalize"}>{subtitle}</small>;
    }
    return (
        <div className="container breadcrumb">
            <div className="row">
                <div className="col-12">
                    <h4 className={ quicksand.className }><Link className={"text-capitalize"} href={'/products'}>{ props.title }</Link>{ subtitle != "" ? ": " : ""}{ subtitle }</h4>
                </div>
            </div>
        </div>
        
    )
}