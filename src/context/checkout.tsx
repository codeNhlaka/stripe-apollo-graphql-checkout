import React, { ReactChildren, ReactChild, createContext, useState } from 'react';
 
interface Props {
  children: ReactChild | ReactChildren;
}

interface IncludeFunc {
    (state: boolean): boolean;
  }

export interface AppContextInterface {
    amount:  string;
    includeProduct: IncludeFunc;
}

const PaymentCtx = createContext<AppContextInterface | null>(null);

const PaymentProvider = ({ children }: any) => {
    const [productIncluded, setProductIncluded] = useState<boolean>(false);
    const [amount, setAmount] = useState<string>("$29.00+");

    function includeProduct(state: boolean) :boolean {
        if (state){
            setAmount("$40.00");
        } else {
            setAmount("$29.00+");
        }

        setProductIncluded(state);
        return true;
    }


    return (
        <PaymentCtx.Provider value={{amount, includeProduct}}>
            { children }
        </PaymentCtx.Provider>
    )
}

export {
    PaymentProvider,
    PaymentCtx
}

