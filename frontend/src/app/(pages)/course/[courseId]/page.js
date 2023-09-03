


export default async function courseId({params, searchParams}) {
    console.log(searchParams)
    // let res;
    // if(params.courseId == 1){
    //     res = 'welcom'
    // }else{
    //     res = params.courseId
    // }
    return (
        <>
        <h1>{searchParams.userId}</h1>
        </>
    )
}