import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import CardComponent from '../../components/card/card.component';

import './home.style.scss';

const HomePage = () => {
    const [items, setItems] = useState(null);
    const selector = useSelector((state) => state.product.products);

    useEffect(() => {
        let data = selector?.filter(e => e.price > 25000 && e.price < 80000);
        setItems(data);
    },[selector]);

    return(
        <div className="wrapper">
            <div className="item-wrapper">
                {
                    items ?
                        items.map(item => {
                            return (
                                <CardComponent key={`${item.id}-${item.sku}`} data={item}/>
                            )
                        })
                    :
                        null
                }
            </div>    
        </div>
    )
}

export default HomePage;