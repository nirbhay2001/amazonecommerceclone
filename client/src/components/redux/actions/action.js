// export const getProducts = () => async(dispatch) => {
//     // api ko call karenge yaha se 
//     try{
//         const data = await fetch("http://localhost:5007/getproducts",{
//             method:"GET",
//             headers:{
//                 "Content-Type": "application/json"
//             }
//         })
//         const res = await data.json();
//         console.log(res);
//         dispatch({type:"SUCCESS_GET_PRODUCTS",payload:res})
//     }catch(error){
//         dispatch({type:"FAIL_GET_PRODUCTS",payload:error.response})
//     }
// }



export const getProducts = () => async(dispatch) => {
    // api ko call karenge yaha se 
    try{
        const data = await fetch("/getproducts",{
            method:"GET",
            headers:{
                "Content-Type": "application/json"
            }
        })
        const res = await data.json();
        console.log(res);
        dispatch({type:"SUCCESS_GET_PRODUCTS",payload:res})
    }catch(error){
        dispatch({type:"FAIL_GET_PRODUCTS",payload:error.response})
    }
}


// "proxy":"http://localhost:5007/", --> esko json file me set kar diya hai