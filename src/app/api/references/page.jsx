
'use client'

//import Image from "next/image";
import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import Card from "../components/card";
//import { useSession } from "next-auth/react";

export default async function Home() {

    var tools = [
        { title: "Next.js", url: "https://nextjs.org/" },
        { title: "React", url: "https://es.react.dev/" },
        { title: "eslint-config-standard", url: "https://www.npmjs.com/package/eslint-config-standard" },
        { title: "Fontawesome", url: "https://fontawesome.com/" },
        { title: "MySQL2", url: "https://www.npmjs.com/package/mysql2" },
        { title: "esLint", url: "https://eslint.org/" },
        { title: "NextAuth.js", url: "https://next-auth.js.org/" }
    ];

    tools = tools.map((el) => <div className="col-4 mb-4"><Card title={el.title} url={el.url} /></div>);

    return (
        <diw className="row">
            <div className="col-12">
                <h2>Page references <Icon className="icon" icon="far-regular fa-file" /> </h2>
            </div>
            <hr />
            <div className="col-12">
                <h4>Tools</h4>
                <div className="row">
                    {tools}
                </div>
                <hr />
                <h4>API</h4>
                <p>
                    The api is used to fetch the info about the products and some other info in the project
                </p>
                <p>To get the info of some all products and services on inventory</p>
                <code className="alert alert-dark">
                    http:://localhost:3000/api/inventory
                </code>
                <Link href="/api/inventory" target="blank">Copy</Link>
            </div>
        </diw>
    );
}