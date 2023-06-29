import mysql from "mysql2/promise";
import { NextResponse } from "next/server";

export async function POST(request){
    const req = await request.json();
    const name = req.name;
    const email = req.email;

    var query;
    var values;

    try{

        const dbconnection = await mysql.createConnection({
            host: "localhost",
            database: "orange_tree",
            port: "3306",
            user: "root",
            password: "",
            //socketPath: "/Applications/MAMP/tmp/mysql/mysql.sock",
        });

        query = `SELECT COUNT(email) as logged FROM users WHERE email = ?`;
        values = [email];

        var [results] = await dbconnection.query(query, values);
        var data = [results];

        if(data[0].length == 0){
            query = `INSERT INTO users (name, email) VALUES (?, ?)`;
            values = [name, email];

            [results] = await dbconnection.query(query, values);
            values = [results];

            query = `SELECT COUNT(email) as logged FROM users WHERE email = ?`;
            values = [email];

            var [results] = await dbconnection.query(query, values);
            var data = [results];

        }

        dbconnection.end();

        return NextResponse.json(data[0][0].logged);

    }catch(error){}
}
