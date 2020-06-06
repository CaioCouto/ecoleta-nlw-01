import React from "react"
import {Link} from "react-router-dom"
import {FiArrowLeft} from "react-icons/fi"

import "./styles.css"
import logo from "../../assets/logo.svg"

const ListPoints = () => {
    return(
        <div id="page-list-points">
            <header>
                <img src={logo} alt="Ecoleta"/>

                <Link to="/">
                    <FiArrowLeft />
                    Voltar para home
                </Link>
            </header>
        </div>
    )
}

export default ListPoints