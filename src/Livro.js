import React, {Component} from 'react';
import InputCustomizado from './componentes/InputCustomizado'
import InputSubmit from './componentes/InputSubmit'
import $ from 'jquery';
import PubSub from 'pubsub-js';
import TratadorErros from './TratadorErros';

class FormularioLivro extends Component{
     constructor(props){
        super(props);
        this.state = { titulo:'', preco:'', autorId:''};
        this.enviaForm = this.enviaForm.bind(this);        
    }

    enviaForm(evento){
        evento.preventDefault();  
        console.log(this);  
        $.ajax({
            url:'http://cdc-react.herokuapp.com/api/livros',
            contentType:'application/json',
            dataType:'json',
            type:'post',
            data: JSON.stringify({titulo:this.state.titulo,preco:this.state.preco,autorId:this.state.autorId}),
            success: function(novaListagem){
                PubSub.publish('atualiza-lista-livros',novaListagem);
                this.setState({titulo:'',preco:'',autorId:''});
            }.bind(this),
            error: function(resposta){
                if(resposta.status === 400){
                    new TratadorErros().publicaErros(resposta.responseJSON);
                }                 
            }, 
            beforeSend:function(){
                PubSub.publish("limpa-erros", []);
            }    
        });
    }

    salvaAlteracao(nomeInput,evento){   
        var campoSendoAlterado = {};
        campoSendoAlterado[nomeInput] = evento.target.value;    
        this.setState(campoSendoAlterado);   
    }

    render(){
        console.log(this.props.autores.nome);
        return(
            <div className="pure-form pure-form-aligned">
                <form className="pure-form pure-form-aligned" onSubmit={this.enviaForm}>
                  
                  <InputCustomizado id="titulo" type="text" name="titulo"   value={this.state.titulo}   onChange={this.salvaAlteracao.bind(this, 'titulo')}   label = "Título"/>
                  <InputCustomizado id="preco"  type="text" name="preco"    value={this.state.preco}    onChange={this.salvaAlteracao.bind(this, 'preco')}    label = "Preço"/>
                    
                    <div className="pure-control-group">
                        <label htmlFor="autorId">Autor</label> 
                            <select name="autorId" id="autorID" onChange={this.salvaAlteracao.bind(this, 'autorId')}>
                                <option value="">Selecione o autor</option>
                                {
                                    
                                    this.props.autores.map(autor=>{
                                        return(<option value={autor.id}>{autor.nome}</option>)                                    })     
                                }
                                </select>             

                    </div>
                  
                  <InputSubmit label="Gravar"/>
                  
                </form> 
            </div>    
        );
    }
}

class TabelaLivros extends Component {

    render(){
        return(
            <div>            
                <table className="pure-table">
                  <thead>
                    <tr>
                      <th>Título</th>
                      <th>Autor</th>
                      <th>Preço</th>                      
                    </tr>
                  </thead>
                  <tbody>                    
                      {
                        this.props.lista.map(livro=>{
                          return(
                            <tr key = {livro.id}>
                              <td>{livro.titulo}</td>
                              <td>{livro.autor.nome}</td>
                              <td>{livro.preco}</td>                              
                            </tr>
                          );
                        })
                       }              
                    
                  </tbody>
                </table> 
            </div> 
        );
    }

}


export default class LivroBox extends Component{

    constructor(){
        super();
        this.state = {lista : [], autores : []};
        
    }

    componentDidMount(){
        $.ajax({
            url:'http://cdc-react.herokuapp.com/api/livros',
            dataType:'json',
            success:function(resposta){            
                this.setState({lista:resposta});
            }.bind(this)
        });
   

        $.ajax({
            url:"http://cdc-react.herokuapp.com/api/autores",
            dataType: 'json',
            sucess:function(resposta){
                this.setState({autores:resposta});
            }.bind(this)
        });

        PubSub.subscribe('atualiza-lista-livros', function(topico,lista){
            this.setState({lista:lista});
        }.bind(this));    
    
    }  

    render(){
        console.log(this.state.autores);
        return(
            <div>
                <div id="main">
                    <div className="header">
                        <h1>Cadastro de Livros</h1>            
                    </div>        
                    <div className="content" id="content">
                        <FormularioLivro autores={this.state.autores} />
                        <TabelaLivros lista={this.state.lista}/>
                    </div>
                </div>                
            </div>
        );
    }
}