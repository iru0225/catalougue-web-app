import {useState, useLayoutEffect} from 'react';
import {Link} from 'react-router-dom';

import './menu.style.scss';

const MenuComponent = ({items}) => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [width, setWidth] = useState(0);

    useLayoutEffect(() => {
        const updateWidth = () => {
            setWidth(window.innerWidth);
            setMenuOpen(false);

            if (window.innerWidth < 769) {
                document.querySelector('.menu-items').classList.add('mobile');
            } else {
                document.querySelector('.menu-items').classList.remove('mobile');
            }

            let submenu = document.querySelectorAll('.submenu');
            let childmenu = document.querySelectorAll('.childmenu');

            for (let i = 0; i < childmenu.length; i++) {
                if (childmenu[i].classList.contains('open')) {
                    childmenu[i].classList.remove('open')
                }
            }

            for (let i = 0; i < submenu.length; i++) {
                if (submenu[i].classList.contains('open')) {
                    submenu[i].classList.remove('open')
                }
            }

        }

        window.addEventListener('resize', updateWidth);
        updateWidth();

        return () => window.removeEventListener('reset', updateWidth)
    }, [])
    
    const openMenu = () => {
        if(width <= 769){
        setMenuOpen(!menuOpen);
            let submenu = document.querySelectorAll('.submenu');
            let childmenu = document.querySelectorAll('.childmenu');

            for (let i = 0; i < childmenu.length; i++) {
                if (childmenu[i].classList.contains('open')) {
                    childmenu[i].classList.remove('open')
                }
            }

            for (let i = 0; i < submenu.length; i++) {
                if (submenu[i].classList.contains('open')) {
                    submenu[i].classList.remove('open')
                }
            }
        }
    }

    const closeMenu = () => {
        if(width <= 769){
            setMenuOpen(false);
            let submenu = document.querySelectorAll('.submenu');
            let childmenu = document.querySelectorAll('.childmenu');

            for (let i = 0; i < childmenu.length; i++) {
                if (childmenu[i].classList.contains('open')) {
                    childmenu[i].classList.remove('open')
                }
            }

            for (let i = 0; i < submenu.length; i++) {
                if (submenu[i].classList.contains('open')) {
                    submenu[i].classList.remove('open')
                }
            }
        }
    }

    const openSubmenu = (e) => {
        let elem = e.target;
        console.log(e.target.classList.contains("open"))

        let notOpen = document.querySelectorAll('.submenu');
        let childmenu = document.querySelectorAll('.childmenu');

        if(width <= 769){
            for (let i = 0; i < notOpen.length; i++) {
                if (notOpen[i].classList.contains('open')) {
                    notOpen[i].classList.remove('open')
                }
            }

            for (let i = 0; i < childmenu.length; i++) {
                if (childmenu[i].classList.contains('open')) {
                    childmenu[i].classList.remove('open')
                }
            }
            
            if (elem.classList.contains('open')) {
                return elem.classList.remove('open');
            }
            elem.classList.add('open');
        }
    }

    const openChildMenu = (e) => {
        let elem = e.target;


        let notOpen = document.querySelectorAll('.childmenu');

        if(width <= 769){
            for (let i = 0; i < notOpen.length; i++) {
                if (notOpen[i].classList.contains('open')) {
                    notOpen[i].classList.remove('open')
                }
            }
            
            if (elem.classList.contains('open')) {
                return elem.classList.remove('open');
            }
            elem.classList.add('open');
        }
    }
    
    return(
        <>
            <div className={`menu-btn ${menuOpen ? 'open' : ''}`} onClick={openMenu}>
                <div className="menu-btn__lines"></div>
            </div>
            
            <ul className={`menu-items ${menuOpen ? 'open' : ''}`}>
            {
                items ? 
                    items.map(e => (
                        <li className={`${e.children_data.length > 0 ? 'dropdown' : ''}`} key={e.id}>
                            {
                                e.children_data.length === 0 ?
                                <Link
                                    to={{
                                        pathname: '/product',
                                        state: {
                                            fromMenu: e
                                        }
                                    }}

                                    onClick={closeMenu}
                                >
                                    {e.name.toUpperCase()}
                                </Link>
                                :
                                <span
                                    className="menu-item expand-btn submenu"
                                    onClick={openSubmenu}
                                >
                                    {e.name.toUpperCase()}
                                    <i className="fas fa-chevron-down"></i>
                                </span>
                            }
                            {
                                e.children_data ? 
                                <ul className="dropdown-menu expandable">
                                    {
                                        e.children_data.map(f => (
                                            f.children_data.length > 0 ?
                                                <li className="dropdown dropdown-right" key={f.id}>
                                                    <span
                                                        className="menu-item expand-btn childmenu"
                                                        onClick={openChildMenu}
                                                    >
                                                        {f.name}
                                                        <i className="fas fa-chevron-down"></i>
                                                    </span>
                                                    {
                                                        f.children_data ?
                                                        <ul className="menu-right expandable">
                                                            {
                                                                f.children_data.map(g => (
                                                                    <li key={g.id}>
                                                                        <Link
                                                                            to={{
                                                                                pathname: '/product',
                                                                                state:{
                                                                                    fromMenu: g
                                                                                }
                                                                            }}
                                                                            onClick={closeMenu}
                                                                        >
                                                                            {g.name}
                                                                        </Link>
                                                                    </li>
                                                                ))
                                                            }
                                                        </ul>
                                                        :
                                                            null
                                                    }
                                                </li>
                                            :
                                                <li key={f.id}>
                                                    <Link
                                                        className="menu-item expand-btn"
                                                        to={{
                                                            pathname: '/product',
                                                            state: {
                                                                fromMenu: f
                                                            }
                                                        }}
                                                        onClick={closeMenu}
                                                    >
                                                        {f.name}
                                                    </Link>
                                                </li>
                                        ))
                                    }
                                </ul>
                                :
                                    null
                            }
                        </li>
                    ))

                :
                    null
            }
        </ul>
        </>
    )
}

export default MenuComponent