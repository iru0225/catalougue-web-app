import { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';

import './header2.style.scss';

import MenuComponent from './menu/menu.component';

const HeaderComponent = () => {
    const [menu, setMenu] = useState(null);
    const carts = useSelector(state => state.cart.carts);
    const history = useHistory();

    const categories = useSelector(state => state.category.categories);

    useEffect(() => {
        const data = categories?.children_data.filter(e => e.id < 7);
        setMenu(data);
    }, [categories])

    const cartClick = (e) => {
        history.push('/cart')
    }

    return(
        <header className="header">
            <p className="header-logo">
                <Link to="/">awal mula clone</Link>
            </p>
            <MenuComponent items={menu}/>
            <div className="cart" onClick={cartClick}>
                <div className="cart-button">
                    <div className="cart-number-round">{carts?.length}</div>
                    <i className="fas fa-shopping-cart"></i>
                </div>
            </div>
        </header>
    )
}

export default HeaderComponent;