import React, { Component } from 'react';
import PubSub from 'pubsub-js';

export default class Inputcustomizado extends Component{
    constructor(){
        super();
        this.state = {msgError:''};
    }

    componentWillMount(){
        PubSub.subscribe("erro-validacao", function(topio, error){
            if(error.field === this.props.name){
                this.setState({msgError: error.defaultMessage});
            }            
        }.bind(this));

        PubSub.subscribe("limpa-erros",function(topico){                        
         this.setState({msgError:''});                        
     }.bind(this));
    }

    render(){
        return(
            <div className="pure-control-group">
                    <label htmlFor={this.props.id}>{this.props.label}</label> 
                    <input {...this.props}/>                  
                    <span className="error">{this.state.msgError}</span>
            </div>
        );
    }
}