import React, {Component} from 'react';
import AutorBox from '/home/vinicius/cdc-admin/src/Autor';
import LivroBox from '/home/vinicius/cdc-admin/src/Livro';
import Home from './Home';
import {Switch, Route}from 'react-router-dom';


export default class Rotas extends Component{
    render(){
        return(
            <div>              
                <Switch>
                    <Route exact path='/' component={Home} />
                    <Route exact path='/autor' component={AutorBox}/>
                    <Route path='/livro' component={LivroBox}/>                    
                </Switch>
            </div>
        );
    }
}