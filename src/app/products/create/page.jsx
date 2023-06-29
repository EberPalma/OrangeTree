
"use client"

//* Components
import Breadcrumbs from "@/app/components/breadcrumbs";

//* Imports
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import { quicksand } from "@/fonts/fonts";

export default function Page (){

    const { register, handleSubmit, watch, formState: {errors} } = new useForm();
    const fetcher = () => fetch("http://localhost:3000/api/inventory", {
        method: "POST",
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
    .then( response => response.json() )
    .then( console.log(category) )
    .catch(error => console.log(error));

    const [ companyID, setCompanyID] = new useState(1);
    const [ name, setName ] = new useState("");
    const [ category, setCategory ] = new useState("product");
    const [ buyPrice, setBuyPrice ] = new useState(0.0);
    const [ sellPrice, setSellPrice ] = new useState(0.0);
    const [ amount, setAmount] = new useState(0);
    
    const onSubmit = () => fetcher();

    return (
        <div className={`mt-2 ${quicksand.className}`}>
            <Breadcrumbs title={"Products"} subtitle={"create"} />
            <div className="row justify-content-center">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="col-12 col-md-10 mb-2">
                        <div className="w-100 d-flex justify-content-between">
                            <label className="form-label" htmlFor="name">Product/Service name</label> 
                            { errors.name && <span className="text-danger form-text">
                                <Icon icon={"far-regular fa-circle-exclamation"} /> 
                                Required
                            </span> }
                        </div>
                        <input className="form-control" name="name" type="text" { ...register( "name", { required: true } ) } onChange={ (e) => setName( e.target.value ) } />
                    </div>
                    <div className="col-12 col-md-10 mb-2">
                        <label htmlFor="category">Category</label>
                        <select className="form-control" { ...register( "category", { required: true } ) } onChange={ (e) => setCategory(e.target.value) }>
                            <option value="product">Product</option>
                            <option value="service">Service</option>
                        </select>
                    </div>
                    <div className="col-12 col-md-10 mb-2">
                        <label htmlFor="buyPrice">Buy price</label> { errors.buyPrice && <span>Just accept numbers</span> }
                        <input className="form-control" type="number" name="buyPrice" { ...register( "buyPrice", { required: true, pattern: /[0-9]+$/ } ) } onChange={ (e) => setBuyPrice( e.target.value ) } />
                    </div>
                    <div className="col-12 col-md-10 mb-2">
                        <label htmlFor="sellPrice">Sell price</label> { errors.sellPrice && <span>Just accept numbers</span> }
                        <input className="form-control" name="selPrice" type="number" { ...register( "sellPrice", { required: true, pattern: /[0-9]+$/ } ) } onChange={ (e) => setSellPrice( e.target.value ) } />
                    </div>
                    <div className="col-12 col-md-10 mb-2">
                        <label htmlFor="amount">Amount</label>
                        <input className="form-control" name="amount" type="number" { ...register( "amount", { required: true, pattern: /[0-9]+$/ } ) } onChange={ (e) => setAmount( e.target.value ) } />
                    </div>
                    <div className="col-12 col-md-10 mb-2">
                        <div className="row justify-content-center">
                            <input className="btn btn-info my-2 text-white" type="submit" value="Submit" />
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}