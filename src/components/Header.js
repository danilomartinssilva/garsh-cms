import React, {Component} from 'react';
import {Link } from 'react-router-dom';


const Header = () =>{
    return (
  <nav className="navbar navbar-expand-lg navbar-light ">
  
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>

  <div className="collapse navbar-collapse" id="navbarSupportedContent">
    <ul className="navbar-nav mr-auto">
      <li className="nav-item active">
      <Link to ="/home" className="nav-link">Home</Link>
      </li>
      <li className="nav-item">        
        
        <Link to ="/add" className="nav-link">Adicionar Empresa</Link>
      </li>
      <li className="nav-item">        
        
        <Link to ="/list" className="nav-link">Listar Empresas</Link>
      </li>
      
   
    </ul>
    
  </div>
</nav>
    );
}
export default Header;