import React, { Component } from 'react';
import Menu from './componentes/Menu';
import Rotas from './componentes/Rotas';
import './css/pure-min.css';
import './css/side-menu.css'; 

class App extends Component { 
   
  render() {  
    return (
     <div id="layout">
          <a href="#menu" id="menuLink" className="menu-link">
            <span></span>
          </a>
          <div>
            <Menu />
            <Rotas />
          </div>
          
      </div>     
    );
  }
}

export default App;
