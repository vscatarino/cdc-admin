import React, {Component} from 'react';
import {Link} from 'react-router-dom';

export default class Menu extends Component{
  render(){
    return(
      <div>
        <div id="menu">
            <div className="pure-menu">
                <a className="pure-menu-heading" href="1">Company</a>
                <ul className="pure-menu-list">
                    <li className="pure-menu-item"><Link to="/" className="pure-menu-link">Home</Link></li>
                    <li className="pure-menu-item"><Link to="/autor" className="pure-menu-link">Autor</Link></li>
                    <li className="pure-menu-item"><Link to="/livro" className="pure-menu-link">Livro</Link></li>
                </ul>
            </div>
          </div>
      </div>
    );
  }
}