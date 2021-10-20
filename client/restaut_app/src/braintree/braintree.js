


export const getBraintreeToken = (userId,token) => {
      return fetch(`http://localhost:2000/api/braintree/getToken/${userId}`, {
        method: "GET",
        headers: {
            "Accept":"application/json",
            "Content-Type":"application/json",
            "Authorization":`Bearer ${token}`
        }
    }).then(res => res.json())
}

export const processPayment = (userId,token,PaymentData) => {
    return fetch(`http://localhost:2000/api/braintree/purchase/${userId}`, {
        method: "POST",
        headers: {
            "Accept":"application/json",
            "Content-Type":"application/json",
            "Authorization":`Bearer ${token}`
        },body:JSON.stringify(PaymentData)
    }).then(res => res.json())
}

export const emptyCard = (callback) => {
       localStorage.removeItem('cart')
       callback()
}