import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import ReactNotification from "react-notifications-component";
import "react-notifications-component/dist/theme.css";



export default class index extends Component {
    constructor (props) {
        super(props)
        this.state = {

        }


    }

    render() {
        return (
            <div className="container py-4">
                <ReactNotification ref={this.notificationDOMRef}/>
                <ol className="breadcrumb pull-right">
                    <li className="breadcrumb-item"><Link to="">Inicio</Link></li>
                    <li className="breadcrumb-item active">Plan Estudio</li>
                </ol>
                <h1 className="page-header">Plan {this.props.match.params.id}</h1>
                <div className="row">
                    <div className="col-lg-12 mx-auto">
                        <ul className="nav nav-tabs">
                            <li className="nav-items">
                                <a href="#plan-tab-show" data-toggle="tab" className="nav-link active">
                                    <span className="d-sm-none">Plan de Estudios</span>
                                    <span className="d-sm-block d-none">Información del Plan de Estudios</span>
                                </a>
                            </li>
                            <li className="nav-items">
                                <a href="#plan-tab-1" data-toggle="tab" className="nav-link">
                                    <span className="d-sm-none">Dominios</span>
                                    <span className="d-sm-block d-none">Dominios del Plan</span>
                                </a>
                            </li>
                            <li className="nav-items">
                                <a href="#plan-tab-2" data-toggle="tab" className="nav-link">
                                    <span className="d-sm-none">Competencias</span>
                                    <span className="d-sm-block d-none">Competencias del Plan</span>
                                </a>
                            </li>
                            <li className="nav-items">
                                <a href="#plan-tab-3" data-toggle="tab" className="nav-link">
                                    <span className="d-sm-none">Nivel Competencias</span>
                                    <span className="d-sm-block d-none">Niveles de Competencias del Plan</span>
                                </a>
                            </li>
                        </ul>		
                    </div>
               </div>
            </div>

        );
    }
}