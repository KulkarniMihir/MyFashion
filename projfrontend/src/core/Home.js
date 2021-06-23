import React, { useState, useEffect } from 'react'
import "../styles.css";
import {API} from '../backend';
import Base from './Base';
import Card from './Card';

import { getProducts } from "./helper/coreapicalls";

export default function Home() {
    
    const [products, setProducts] = useState([])
    const [error, setError] = useState(false)

    const loadAllproduct = () => {
        getProducts().then((data) => {
            if(error){
                setError(data.error);
            }else{
                setProducts(data);
            }
        })
    }

    useEffect(() => {
        loadAllproduct();
    }, [])

    return (
        <Base title="MyFashion" description="Define your own style">
            <div className="row text-center">
                <h1 className="text-white">All of tshirts</h1>
                    <div className="row">
                        {products.map((product, index) => {
                            return(
                                <div key={index} className="col-4 mb-4">
                                    <Card product={product}/>
                                </div>    
                            );
                        })}
                    </div>
            </div>
        </Base>
    )
}
