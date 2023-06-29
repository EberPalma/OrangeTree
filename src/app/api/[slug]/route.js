import mysql from "mysql2/promise";
import { NextResponse } from "next/server";

import { prisma } from '../../../../server/db/client';

// * Index and get function from the API
// * Params : [ request, { params } ]

export async function GET(request, { params }) {
    const id = getID(request);
    const companyId = getCompanyID(request);

    const slug = validateSlug(params.slug);

    //return NextResponse.json(params.slug);
    try {

        if (slug === undefined){
            return NextResponse.json({ error: "Category not found" }, {
                status: 404,
                headers: { "Content-Type": "application/json" }
            })
        }

        var results;

        if( slug == "company" ){
            if(id == null && companyId == null ){
                results = await prisma.companies.findMany();
            }else if (companyId != null) {
                results = await prisma.companies.findMany({
                    where: {
                        companiesId: Number.parseInt(companyId, 10)
                    }
                });
            }else{
                results = await prisma.companies.findFirst({
                    where: {
                        id: Number.parseInt(id, 10)
                    }
                });
            }
        }

        if ( slug == "inventory" ){
            if( id == null && companyId == null){
                results = await prisma.stock.findMany();
            }else if (companyId != null) {
                results = await prisma.stock.findMany({
                    where: {
                        companiesId: Number.parseInt(companyId, 10)
                    }
                });
            }else{
                results = await prisma.stock.findFirst({
                    where: {
                        id: Number.parseInt(id, 10)
                    }
                });
            }
        }

        var json_response  = {
            status: "success",
            count: results.length,
            results: parseBigint(results)
        }

        return NextResponse.json( json_response, {
            status: 200,
            headers:{ "Content-Type": "application/json" }
        });

    } catch ( error ) {
        return NextResponse.error( error );
    }
}

// * Store function from the API
// * Params : [ request, { params } ]

export async function POST(request, { params }) {
    const slug = validateSlug(params.slug);

    try {

        if (slug === undefined){
            return NextResponse.json({ error: "Category not found" }, {
                status: 404,
                headers: { "Content-Type": "application/json" }
            })
        }
        
        const req = await request.json();

        //return NextResponse.json(req);

        var results;

        if ( slug == "company" ){
            //return NextResponse.json(req);
            results = await prisma.companies.create({
                data:{
                    name: req.name,
                    user: {
                        connectOrCreate: {
                            where: {
                                email: req.email
                            },
                            create: {
                                email: req.email
                            }
                            
                        }
                    }
                },
                include:{
                    user: true,
                }
            })
        }

        if ( slug == "inventory" ){
            results = await prisma.stock.create({
                data:{
                    name: req.name,
                    category: req.category,
                    buy_price: Number.parseFloat(req.buy_price, 10),
                    sell_price: Number.parseFloat(req.sell_price, 10),
                    active: Number.parseInt(req.active, 10) === 1 ? true: false,
                    amount: Number.parseInt(req.amount, 10),
                    images_allowed: Number.parseInt(req.images_allowed, 10) === 1 ? true: false,
                    max_images: Number.parseInt(req.max_images, 10),
                    images_json: req.images_json,
                    files_allowed: Number.parseInt(req.files_allowed, 10) === 1 ? true: false,
                    max_files: Number.parseInt(req.max_files, 10),
                    files_json: req.files_json,
                    Companies: {
                        connect: {
                            id: req.companiesId
                        }
                    }, //Number.parseInt(req.company_id, 10)
                },
                include: {
                    Companies: true
                }
            });
        }

        var json_response  = {
            status: "success",
            count: results.length,
            results: parseBigint(results)
        }

        return NextResponse.json( json_response, {
            status: 201,
            headers: { "Content-Type": "application/json" }
        });
    } catch (error) {
        
            return NextResponse.json( error, {
                status: 500
            })
        
    }
}

// * Update function from the API
// * Params : [ request, { params } ]

export async function PUT(request, { params }) {
    const slug = validateSlug(params.slug);

    const id = getID(request);

    try {

        if (slug === undefined){
            return NextResponse.json({ error: "Category not found" }, {
                status: 404,
                headers: { "Content-Type": "application/json" }
            })
        }

        if (id == null) {
            return NextResponse.json({ error: "ID not defined" }, {
                status: 503
            });
        }

        var req = await request.json();

        var results;

        if ( slug == "company" ) {
            results = await prisma.companies.update({
                where: {
                    id: Number.parseInt(id, 10)
                },
                data: {
                    name: req.name
                }
            });
        } 

        if ( slug == "inventory" ){
            results = await prisma.stock.update({
                where: {
                    id: Number.parseInt(id, 10)
                },
                data:{
                    //company_id: Number.parseInt(req.company_id, 10),
                    name: req.name,
                    category: req.category,
                    buy_price: Number.parseFloat(req.buy_price, 10),
                    sell_price: Number.parseFloat(req.sell_price, 10),
                    active: Number.parseInt(req.active, 10) === 1 ? true: false,
                    amount: Number.parseInt(req.amount, 10),
                    images_allowed: Number.parseInt(req.images_allowed, 10) === 1 ? true: false,
                    max_images: Number.parseInt(req.max_images, 10),
                    images_json: req.images_json,
                    files_allowed: Number.parseInt(req.files_allowed, 10) === 1 ? true: false,
                    max_files: Number.parseInt(req.max_files, 10),
                    files_json: req.files_json
                }
            });
        }

        var json_response  = {
            status: "success",
            count: results.length,
            results: parseBigint(results)
        }

        return NextResponse.json( json_response, {
            status: 202,
            headers: { "Content-Type": "application/json" }
        });
    } catch (error) {
        return NextResponse.json("", {status: 500} );
    }
}

// * Delete function from the API
// * Params : [ request, { params } ]

export async function DELETE(request, { params }) {
    const id = getID(request);

    const slug = validateSlug(params.slug);

    try {

        if (slug === undefined){
            return NextResponse.json({ error: "Category not found" }, {
                status: 404,
                headers: { "Content-Type": "application/json" }
            })
        }

        if (id == null) {
            return NextResponse.json({ error: "ID not defined" }, {
                status: 503
            });
        }

        var results

        if ( slug == "company" ){
            results = await prisma.companies.delete({
                where: {
                    id: Number.parseInt(id, 10)
                }
            });
        }

        if ( slug == "inventory" ){
            results = await prisma.stock.delete({
                where: {
                    id: Number.parseInt(id, 10)
                }
            });
        }

        return NextResponse.json( parseBigint( results ) );
    } catch (error) {}
}

// * Validates the slug from the categories to prevent an error on the response
function validateSlug(param) {
    var slug = undefined;

    switch (param) {
        case "company":
            slug = "company";
            break;
        case "inventory":
            slug = "inventory";
            break;
        default:
            slug = undefined;
    }
    return slug;
}

// * Validates the ID from the searchParams on the response
function getID(request) {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    return id;
}

// * Validates if exists a Company ID from the searchParams on the response
function getCompanyID(request) {
    const { searchParams } = new URL(request.url);
    const companyId = searchParams.get("companyId");

    return companyId;
}

// * Parses Prisma results if has Bigint values
function parseBigint(results){
    return JSON.parse(JSON.stringify( results, (key, value) => 
        (typeof value === 'bigint' ? value.toString() : value)
    ));
}
