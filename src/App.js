import react from 'react'

import Navbar from './Components/Navbar'
import Footer from './Components/Footer'
import LandingPages from './Pages/Landing-pages'
import Register from './Pages/Register'
import CreatePassword from './Pages/CreatePassword'
import CatalogProduct from './Pages/CatalogProduct'
import DetailProduct from './Pages/DetailProduct'
import Cart from './Pages/Cart'
import Checkout from './Pages/Checkout'
import UserProfile from './Pages/UserProfile'

// admin page
import ProductManagement from './Pages/Admin/ProductManagement'
import ProductManagementDetail from './Pages/Admin/ProductManagementDetail'

// css
import './Support/Stylesheets/LandingPages.css'
import './Support/Stylesheets/Utils.css'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

// redux
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import allReducer from './Redux/Reducers/index'




const store = createStore(allReducer, applyMiddleware(thunk))


class App extends react.Component{
  render(){
    return(
      <div>
        <Provider store={store}>
          <BrowserRouter>
            <Navbar/>
              <Switch>
                <Route exact path='/' component={LandingPages} />
                <Route path='/register' component={Register} />
                <Route path='/create-password' component={CreatePassword} />
                <Route path='/products' component={CatalogProduct} />
                <Route path='/detail-product/:idProduct' component={DetailProduct} />
                <Route path='/cart' component={Cart} />
                <Route path='/checkout' component={Checkout} />
                <Route path='/user-profile' component={UserProfile} />
                <Route path='/product-management' component={ProductManagement} />
                <Route path='/product-management-detail/:idProduct' component={ProductManagementDetail} />
              </Switch>   
            <Footer/>
          </BrowserRouter>
        </Provider>
        
      </div>
    )
  }
}

export default App;
