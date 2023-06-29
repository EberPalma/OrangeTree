
"use client"

//* Imports
import useSWR from 'swr';

//* Components
import Card from "../components/card";
import Breadcrumbs from '../components/breadcrumbs';
import Loader from '../components/loader';

export default function Products() {

    const companyId = 1;

    const fetcher = (args) => fetch(args).then(response => response.json());
    const {data, error, isLoading} = useSWR(`http://localhost:3000/api/inventory?companyId=${companyId}`, fetcher);

    if (error) return <span>Failed to fetch</span>
    if (isLoading) return <span><Loader/></span>

    return (
        <div className={"mt-2"}>
            <Breadcrumbs title="Products"/> 
            <div className={"row justify-content-center"}>
                { data.results.map((item)=> ( 
                    <div className={" col col-sm-6 col-md-4 col-lg-3 mb-3"}><Card key={item.id} title={item.name} url={"/products/"+item.id}/></div> ) ) 
                }
            </div>
        </div>
    )
}
