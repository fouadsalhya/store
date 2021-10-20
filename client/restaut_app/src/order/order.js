

export const createOrder = (userId,token,orderData) => {
    return fetch(`http://localhost:2000/api/orders/create/${userId}`, {
        method: "POST",
        headers: {
            "Accept":"application/json",
            "Content-Type":"application/json",
            "Authorization":`Bearer ${token}`
        },body:JSON.stringify(orderData)
    }).then(res => res.json())
}