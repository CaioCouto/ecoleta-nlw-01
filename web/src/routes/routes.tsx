import React from "react"
import {Route, BrowserRouter} from "react-router-dom"
import Home from "../pages/home"
import CreatePoint from "../pages/createPoint"
import ListPoints from "../pages/listPoints"

const Routes = () => {
    return(
        <BrowserRouter>
            <Route component={Home} path="/" exact />
            <Route component={CreatePoint} path="/create-point" />
            <Route component={ListPoints} path="/list-point" />
        </BrowserRouter>
    )
}

export default Routes