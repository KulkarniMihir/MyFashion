import React, {useEffect, useState} from 'react'
import { Link } from 'react-router-dom';
import { cartEmpty, loadCart } from './helper/cartHelper';
import {getmeToken, processPayment} from './helper/paymentbHelper';
import {createOrder} from './helper/orderHelper';
import { isAuthenticated } from '../auth/helper';
import DropIn from 'braintree-web-drop-in-react';


const Paymentb = ({ products, setReload = f => f, reload = undefined }) => {
    const [info, setInfo] = useState({
      loading: false,
      success: false,
      clientToken: null,
      error: "",
      instance: {}
    });
  
    const userId = isAuthenticated() && isAuthenticated().user._id;
    const token = isAuthenticated() && isAuthenticated().token;
  
    const getToken = (userId, token) => {
      getmeToken(userId, token).then(info => {
        console.log("INFORMATION", info);
        if (info && info.error) {
          setInfo({ ...info, error: info.error });
        } else {
          const clientToken = info.clientToken;
          setInfo({ clientToken });
        }
      });
    };

    const showbtdropIn = () => {
        return(
            <div>
                {info.clientToken !== null && products.length > 0 ? (
                    <div>
                        <DropIn
                        options={{ authorization: info.clientToken }}
                        onInstance={(instance) => (info.instance = instance)}
                        />
                        <button className="btn btn-block btn-success" onClick={onPurchase}>Buy</button>
                    </div>
                ) : (
                    <h3>Please Log in or add something to cart</h3>
                )}
            </div>
        );
    };

    useEffect(() => {
        getToken(userId, token);
    }, []);

    const onPurchase = () => {
        setInfo({loading: true})
        let nonce;
        let getNonce = info.instance.requestPaymentMethod().then(data => {
                nonce=data.nonce
                const paymentData = {
                    paymentMethodNonce: nonce,
                    amount: getAmount()
                };
                processPayment(userId, token, paymentData)
                .then(response => {
                    setInfo({...info, success: response.success, loading: false})
                    console.log("Payment success")
                    const orderData = {
                        products: products,
                        transaction_id: response.transaction.id,
                        amount: response.transaction.amount
                    }
                    createOrder(userId, token, orderData);
                    //empty cart
                    cartEmpty(() => {
                        console.log("Did we get a crash");
                    });
                    setReload(!reload);
                    //force reload
                })
            })
            .catch(err => {
                setInfo({loading: false, success: false})
                console.log("Payment fail")
            })
    };   

    const getAmount = () => {
        let amount=0
        products.map(p => {
            amount=amount+p.price;
        })
        return amount;
    };

    return (
        <div>
            <h3 className="text-white">Your Bill Amount: {getAmount()} $</h3>
            {showbtdropIn()}
        </div>
    )
}

export default Paymentb;
