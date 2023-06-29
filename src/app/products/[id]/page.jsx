
"use client"

//* Components
import Breadcrumbs from "@/app/components/breadcrumbs";
import Loader from "@/app/components/loader";

//* Imports
import useSWR from "swr";
import { useState } from "react";
import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import { useForm } from "react-hook-form";
import Swal from 'sweetalert2'

export default function Page( { params } ){

    const format = { style: "currency", currency: "MXN" };
    const moneyFormat = new Intl.NumberFormat("es-Mx", format)

    const [editable, setEditable] = new useState(false);
    const [ companyID, setCompanyID] = new useState(1);
    const [ name, setName ] = new useState("");
    const [ category, setCategory ] = new useState("product");
    const [ buyPrice, setBuyPrice ] = new useState(0.0);
    const [ sellPrice, setSellPrice ] = new useState(0.0);
    const [ amount, setAmount] = new useState(0);

    const fetcher = (args) => fetch(args)
                                .then( response => response.json() )
                                .then( response => {
                                    setName(response[0].name);
                                    setCategory(response[0].category);
                                    setBuyPrice(response[0].buy_price);
                                    setSellPrice(response[0].sell_price);
                                    setAmount(response[0].amount);
                                } );
    const {data, error, isLoading} = useSWR(`http://localhost:3000/api/inventory?id=${params.id}`, fetcher);

    const { register, handleSubmit, watch, formState: {errors} } = new useForm();

    const putFetcher = () => fetch(`http://localhost:3000/api/inventory?id=${params.id}`, {
        method: "PUT",
        cache: "no-cache",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            company_id: companyID,
            name: name,
            category: category,
            active: 1,
            buy_price: buyPrice,
            sell_price: sellPrice,
            amount: amount,
            images_allowed: 0,
            max_images: 0,
            images_json: "[]",
            files_allowed: 0,
            max_files: 0,
            files_json: "[]"
        })
    })
    .then( () => {
        Swal.fire({
            title: "Article updated!",
            icon: "success"
        });
        setEditable(!editable);
    } )
    .catch(error => console.log(error));

    if (error) return <span>Failed to fetch</span>
    if (isLoading) return <span><Loader/></span>

    const onSubmit = () => putFetcher();
    
    return (
        <div className="mt-2">
            <div className="row">
                <div className="col-10">
                    <Breadcrumbs title={"products"} subtitle={ name } />
                </div>
                <div className="col-2">
                    <button className="btn" onClick={ () => setEditable( !editable ) }>
                        <Icon icon={"far-regular fa-pen-to-square"} />
                    </button>
                </div>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="row justify-content-center">
                    <div className="col-12 col-md-10 mb-2">
                        <div className="w-100 d-flex justify-content-between">
                            <label className="form-label" htmlFor="name"><span className="text-capitalize">{ category }</span> name</label> 
                            { errors.name && <span className="text-danger form-text">
                                <Icon icon={"far-regular fa-circle-exclamation"} /> 
                                Required
                            </span> }
                        </div>
                        { editable == false 
                            ? <span className="text-capitalize"> { name } </span>
                            : <input className="form-control text-capitalize" name="name" type="text" { ...register( "name", { required: true } ) } onChange={ (e) => setName( e.target.value ) } value={ name } />
                        }
                    </div>
                    <div className="col-12 col-md-10 mb-2">
                        <div className="w-100 d-flex justify-content-between">
                            <label htmlFor="category">Category</label>
                        </div>
                        { editable == false 
                            ? <span className="text-capitalize">{ category }</span> 
                            : ( <select className="form-control" { ...register( "category", { required: true } ) } onChange={ (e) => setCategory(e.target.value) } value={ category } >
                                    <option value="product">Product</option>
                                    <option value="service">Service</option>
                                </select> )
                        }
                        
                    </div>
                    <div className="col-6 col-md-10 mb-2">
                        <div className="w-100 d-flex justify-content-between">
                            <label htmlFor="buyPrice">Buy price</label> { errors.buyPrice && <span>Just accept numbers</span> }
                        </div>
                        { editable == false 
                            ? <span>{ moneyFormat.format(buyPrice) }</span> 
                            : <input className="form-control" type="number" name="buyPrice" { ...register( "buyPrice", { required: true, pattern: /[0-9]+$/ } ) } onChange={ (e) => setBuyPrice( e.target.value ) } value={ buyPrice } />
                        }
                    </div>
                    <div className="col-6 col-md-10 mb-2">
                        <div className="w-100 d-flex justify-content-between">
                            <label htmlFor="sellPrice">Sell price</label> { errors.sellPrice && <span>Just accept numbers</span> }
                        </div>
                        { editable == false 
                            ? <span>{ moneyFormat.format(sellPrice) }</span> 
                            : <input className="form-control" name="selPrice" type="number" { ...register( "sellPrice", { required: true, pattern: /[0-9]+$/ } ) } onChange={ (e) => setSellPrice( e.target.value ) } value={ sellPrice } />
                        }
                    </div>
                    <div className="col-12 col-md-10 mb-2">
                        <div className="w-100 d-flex justify-content-between">
                            <label htmlFor="amount">Amount</label>
                        </div>
                        { editable == false 
                            ? <span>{ amount }</span> 
                            : <input className="form-control" name="amount" type="number" { ...register( "amount", { required: true, pattern: /[0-9]+$/ } ) } onChange={ (e) => setAmount( e.target.value ) }  value={ amount } />
                        }
                    </div>
                    <div className="col-12 col-md-10 mb-2">
                        <div className="row justify-content-center">
                            { editable == false
                                ? ""
                                : <input className="btn btn-info my-2 text-white" type="submit" value="Submit" />
                            }
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}