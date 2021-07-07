import { useEffect } from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';

import CardComponent from '../../components/card/card.component';

import './product.style.scss';

const ProductPage = ({location}) => {
    const data = location.state.fromMenu;
    const selector = useSelector(state => state.product.products);
    const [itemData, setItemData] = useState(null);

    console.log(data);
    
    useEffect(() => {
        let a = [];
        let products = null;

        if(data?.children_data.length > 0){
            data?.children_data.map(e =>{
                selector?.map(f => {
                    f?.extension_attributes.category_links.map(g => {
                        let newData = {};
                        if (g.category_id === e.id.toString()) {
                            newData.id = e.id;
                            newData.name = e.name;
                            newData.product = {...f};
                            a.push(newData);
                        }
                    })
                })
            });

            products = data?.children_data.map(e => {
                let temp = Object.assign({}, e)
                temp.items = a?.filter(f => f.id === e.id);
                return temp;
            });

        } else{
            selector?.map(f => {
                f?.extension_attributes.category_links.map(g => {
                    let newData = {};
                    if (g.category_id === data.id.toString()) {
                        newData = {...f};
                        a.push(newData);
                    }
                })
            });

            products = {...data, items:a};
        }
        

        setItemData(products);
    }, [selector, data]);

    return(
        <>
                {
                    itemData?.length > 0 ?
                        itemData?.map(e => {
                        return( e.items?.length > 0 ?
                            <div className="product-container" key={e.id}>
                                <p>{e.name}</p>
                                <div className="product-card">
                                    {
                                        e.items?.map(f => {
                                            return(
                                                <CardComponent key={f.product.sku} data={f.product}/>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                            :
                            null)
                        })
                    :
                        <div className="product-container">
                            <p>{itemData?.name}</p>
                                <div className="product-card">
                                    {
                                        itemData?.items?.map(f => {
                                            return(
                                                <CardComponent key={f.sku} data={f}/>
                                            )
                                        })
                                    }
                                </div>
                        </div>
                }
        </>
    )
}

export default ProductPage;