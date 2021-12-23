import { useContext, useRef, useState } from "react";
import { PaymentCtx, AppContextInterface } from "../context/checkout";
import { useFormik } from 'formik';
import { Spinner } from "../components/spinner.component";
import { Success } from "../components/success.component";


function ProductDescription(){
    const data: AppContextInterface | null = useContext(PaymentCtx);
    const [productAdded, setAddProduct] = useState<boolean>(false);




    function addProduct(){
        data?.includeProduct(!productAdded);
        return setAddProduct(!productAdded);
    }

    return (
        <div className="product">
            <div className="product-name-price">
                <h1>Erbology Hemp Seed</h1>
                <p className="product-price">{productAdded ? "$40.00" : "$29.00+"}</p>
            </div>
            <div className="product-images slider">
                <div className="frame inner-slider">
                    <div className="product-image"></div>

                </div>
            </div>
            <div className="product-about">
                <p>These mushrooms are known to help with immunity, fight inflammation and also improve sports performance as they provide more energy to the cells.</p>
            </div>
            <div className={productAdded ? "product-addon product-addon-enabled" : "product-addon product-addon-disabled"} onClick={addProduct}>
                <div className="selector">
                    <div className="input-container">
                        <input type="checkbox" checked={productAdded}/>
                    </div>
                </div>
                <div className="addon-information">
                    <h1 className="product-name">Organic Cordyceps Mushroom Powder</h1>
                    <p className="product-information">50 servings</p>
                </div>
                <div className="addon-price"></div>
            </div>
        </div>
    )
}

function PaymentDetails(){
    const [isSubmitting, setSubmitting] = useState<boolean>(false);
    const [submitSuccess, setSubmitSuccess] = useState<boolean>(false);

    const data: AppContextInterface | null = useContext(PaymentCtx);

    const formik = useFormik({
        initialValues: {
          cardName: '',
          cvv: '366',
          cardNum: '4242 4242 4242 4242',
          cardExp:'09/25',
        },
        onSubmit: values => {
          setSubmitting(true);

          setTimeout(() => {
              setSubmitting(false);

              // show success icon...
              setSubmitSuccess(true);

              // hide success icon
              
              setTimeout(() => {
                setSubmitSuccess(false);
              }, 1500);

          }, 3000);
        },
      });

    return (
        <div className="payment-details">
            <div className="form-container">
                <h1>Payment Details</h1>
                <p>To complete your purchase, please fill in your details.</p>
                <div className="form-section">
                    <form onSubmit={formik.handleSubmit}>
                        <div className="input">
                            <input
                                id="cardName"
                                placeholder="name"
                                type="text"
                                name="cardName"
                                onChange={formik.handleChange}
                                autoComplete="off"
                            />
                        </div>
                        <div className="input">
                            <input
                                id="cardNum"
                                placeholder="card number"
                                type="text"
                                name="cardNum"
                                onChange={formik.handleChange}
                                autoComplete="off"
                                value={formik.values.cardNum}
                                
                            />
                        </div>
                        <div className="input">
                            <input
                                id="cvv"
                                placeholder="cvv"
                                type="text"
                                name="cvv"
                                maxLength={3}
                                onChange={formik.handleChange}
                                autoComplete="off"
                                value={formik.values.cvv}
                            />
                        </div>
                        <div className="input">
                            <input
                                id="cardExp"
                                placeholder="09/22"
                                type="text"
                                name="cardExp"
                                maxLength={5}
                                onChange={formik.handleChange}
                                autoComplete="off"
                                value={formik.values.cardExp}
                            />
                        </div>
                        <button disabled={ isSubmitting || submitSuccess } type="submit">{submitSuccess ? <Success/> : isSubmitting ? <Spinner/> : `Pay ${data?.amount}`}</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default function Payment(){
    const data = useContext(PaymentCtx);

    return(
        <div className="main"> 
            <ProductDescription/>
            <PaymentDetails/>
        </div>
    )
}