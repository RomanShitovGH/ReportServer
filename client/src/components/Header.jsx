import React from "react";


export default function Header () {

    return (
        <header>
            <div className="container-fluid">
            <div className="row align-items-center flex-xl-nowrap border">

                <div className="col-2">
                    <nav className="navbar" >
                        <a className="navbar-brand" href="#">
                        <img src="logo.png" width="143" height="19"
                                     className="d-inline-block align-items-center" alt="" loading="lazy"/>
                        </a>
                    </nav>
                </div>

                <div className="col-10">

                    <ul className="nav nav-pills">
                        <li className="nav-item">
                            <a className="nav-link active" aria-current="page" href="/">Отчеты</a>
                        </li>
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" data-toggle="dropdown" href="#" role="button"
                               aria-expanded="false">Dropdown</a>
                            <ul className="dropdown-menu">
                                <li><a className="dropdown-item" href="#">Action</a></li>
                                <li><a className="dropdown-item" href="#">Another action</a></li>
                                <li><a className="dropdown-item" href="#">Something else here</a></li>
                                <li>
                                    <hr className="dropdown-divider"/>
                                </li>
                                <li><a className="dropdown-item" href="#">Separated link</a></li>
                            </ul>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">Link</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link disabled" href="#" tabIndex="-1" aria-disabled="true">Disabled</a>
                        </li>
                    </ul>

                </div>
            </div>
            </div>
        </header>
    )
}