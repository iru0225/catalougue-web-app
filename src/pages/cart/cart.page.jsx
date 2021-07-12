import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';

import image404 from '../../assets/image/404.png';
import cartEmpty from '../../assets/image/cart-empty.png';

import './cart.style.scss';

const CartPage = () => {
    const selector = useSelector(state => state.cart.carts);
    const dispatch = useDispatch();
    const [item, setItems] = useState([]);
    const [imageUrl] = useState('https://www.awalmula.co.id/media/catalog/product');

    useEffect(() => {
        setItems(selector);
    }, [selector]);

    return(
        <div className="cart-wrapper">
            {
                item?.length > 0 ?
                    <div className="cart-item-container">
                        <div className="cart-item-list">
                        {
                                item.map(e => {
                                    return(
                                        <div className="cart-item-detail" key={e.id}>
                                            <img src={`${imageUrl}${e.media_gallery_entries[0].file}`} onError={f => f.target.src = image404} alt="" />
                                            <div className="cart-name-price">
                                                <span>{e.name}</span>
                                                <span>{new Intl.NumberFormat('id-ID', {style: 'currency', currency: 'IDR'}).format(e.price)}</span>
                                            </div>
                                            <div className="cart-item-button">
                                                <span><i className="fas fa-minus" onClick={() => dispatch({type: 'REDUCE_ITEM', data: e})}></i></span>
                                                <span>{e.qty}</span>
                                                <span><i className="fas fa-plus" onClick={() => dispatch({type: 'ADD_ITEM', data: e})}></i></span>
                                                <span><i className="fas fa-trash-alt" onClick={() => dispatch({type: 'REMOVE_ITEM', data: e})}></i></span>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                        <div className="cart-summary">
                            <h3>Ringkasan Belanja</h3>
                            <div className="cart-price">
                                <div className="price-detail">
                                    <span>Total Harga ({item.reduce((item, index) => item + (index['qty'] || 0), 0)} barang)</span>
                                    <span>{new Intl.NumberFormat('id-ID', {style: 'currency', currency: 'IDR'}).format(item.reduce((item, index) => item +(index['qty'] * index['price'] || 0), 0))}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                :
                    <div className="cart-empty">
                        <img src={cartEmpty} alt="" />
                        <h1>Cart Is Empty</h1>
                    </div>
            }
        </div>
    )
}

export default CartPage;