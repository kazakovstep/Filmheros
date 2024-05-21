import React from 'react'
import ReactDOM from 'react-dom'
import {BrowserRouter, Route, Routes} from "react-router-dom"
import App from './pages/App'
import Login from './pages/Login'
import Advert from "./pages/advert/advert"
import Summary from "./pages/advert/summary"
import Catalog from "./pages/catalog/Catalog"
import AdvertCatalog from "./pages/catalog/advert"
import Register_reset from "./pages/password/Password_reset"
import Verify from "./pages/password/Verify"
import New_password from "./pages/password/new_password"
import Register from "./pages/register/Register"
import reportWebVitals from './reportWebVitals'
import './style/index.css'
import {persistor, store} from './redux/store'
import Account from "./pages/account/account";
import AccountArticles from "./pages/accountArticles/accountArticles";
import AccountFeatures from "./pages/accountFeatures/accountFeatures";
import AccountSettings from "./pages/accountSettings/accountSettings";
import {Provider} from "react-redux";
import {PersistGate} from "redux-persist/integration/react";

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <PersistGate persistor={persistor} loading={null}>
                <BrowserRouter>
                    <Routes>
                        <Route path={"/login"} element={<Login/>}/>
                        <Route path={"/register"} element={<Register/>}/>
                        <Route path={"/password_reset"} element={<Register_reset/>}/>
                        <Route path={"/password_reset/verify"} element={<Verify/>}/>
                        <Route path={"/password_reset/new_password"} element={<New_password/>}/>
                        <Route path={"/advert"} element={<Advert/>}/>
                        <Route path={"/catalog"} element={<Catalog/>}/>
                        <Route path={"/advert/summary"} element={<Summary/>}/>
                        <Route path={"/catalog/advert"} element={<AdvertCatalog/>}/>
                        <Route path={"/"} element={<App/>}/>
                        <Route path={"/lk"} element={<Account/>}/>
                        <Route path={"/lk/articles"} element={<AccountArticles/>}/>
                        <Route path={"/lk/features"} element={<AccountFeatures/>}/>
                        <Route path={"/lk/settings"} element={<AccountSettings/>}/>
                    </Routes>
                </BrowserRouter>
            </PersistGate>
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
