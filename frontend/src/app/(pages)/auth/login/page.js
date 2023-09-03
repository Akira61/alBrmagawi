// "use client"

import axios from "axios";

export default async function Login(){
    console.log('hi')
    const {data} = await axios.get('https://jsonplaceholder.typicode.com/posts/1');
    console.log(data)
    return (
        <>
        <h1>Login</h1>
        <p>{JSON.stringify(data)}</p>
        </>
    )
}