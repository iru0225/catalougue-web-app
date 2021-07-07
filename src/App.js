import { useEffect, useState } from 'react';
import {Route, Switch} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import axios from 'axios';

import HeaderComponent from './components/header2/header2.component';
import HomePage from './pages/home/home.page';
import DetailPage from './pages/detail/detail.page';
import ProductPage from './pages/product/product.page';
import CartPage from './pages/cart/cart.page';

function App() {
  const [categories] = useState(JSON.parse(localStorage.getItem('categories')));
  const dispatch = useDispatch();
  const cart = JSON.parse(localStorage.getItem('carts'));

  useEffect(() => {

  }, [cart])

  useEffect(() => {
    axios({
      method: 'GET',
      url: 'https://staging.awalmula.co.id/rest/default/V1/products?searchCriteria%5bpageSize%5d=24',
      headers: {
        'Content-Type': 'application/xml'
      }
    }).then(res => {
      dispatch({type: 'PRODUCTS', data:  res.data.items});
    });

    if (!categories) {
      axios({
        method: 'GET',
        url: 'https://staging.awalmula.co.id/rest/default/V1/categories',
        headers: {
          'Content-Type': 'application/xml'
        }
      }).then(res => {
        dispatch({type: 'CATEGORIES', data: res.data});
      })
    }

    if (cart) {
      dispatch({type: 'SET_ITEM', data: cart});
    }
    
    dispatch({type: 'CATEGORIES', data: categories});
  }, [dispatch, categories]);

  return (
    <>
      <HeaderComponent/>
      <Switch>
        <Route exact path="/" component={HomePage}/>
        <Route path="/product" component={ProductPage}/>
        <Route path="/detail/" component={DetailPage}/>
        <Route path="/cart" component={CartPage}/>
      </Switch>
    </>
  );
}

export default App;
