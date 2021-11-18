import React, { createContext, useContext, useState } from 'react'

const PaymentContext = createContext()

export function usePayment() {
    return useContext(PaymentContext)
}

export function PaymentProvider({children}) {

    const [totalAmount, setTotalAmount] = useState(0);
    const [tax, setTax] = useState(0);
    const [cost, setCost] = useState(0);

    const value = {
        cost,
        tax,
        totalAmount,

        setCost,
        setTax,
        setTotalAmount
    }

    return (
        <PaymentContext.Provider value={value}>
            {children}
        </PaymentContext.Provider>
    )
}

