import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import image404 from '../../assets/image/404.png';

import './card.style.scss';

const CardComponent = ({data}) => {
    const [imageUrl] = useState('https://www.awalmula.co.id/media/catalog/product');
    const history = useHistory();
    const dispatch = useDispatch();

    const openDetailItems = () => {
        history.push({
            pathname: `/detail/${data.name}`,
            state: {
                itemDetail: data
            }
        })
    }

    const addItem = () => {
        dispatch({type: 'ADD_ITEM', data:data})
    }

    return(
        <div className="item-container">
            <div>
                <div className="item-detail" onClick={openDetailItems}>
                    <img src={`${imageUrl}${data.media_gallery_entries[0].file}`} onError={(e) => e.target.src = image404} alt="" />
                    <span>{data.name}</span>
                </div>
                <div className="button-wrapper">
                    <span>{new Intl.NumberFormat('id-ID', {style: 'currency', currency: 'IDR'}).format(data.price)}</span>
                    <button onClick={addItem}>Add To Cart</button>
                </div>
            </div>
        </div>
    )
}

export default CardComponent;