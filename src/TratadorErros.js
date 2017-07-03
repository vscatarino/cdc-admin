import PubSub from 'pubsub-js';

export default class Tratadorerros{
    publicaErros(erros){
        for(var i =0; i < erros.errors.length; i++){
            var error = erros.errors[i];
            PubSub.publish("erro-validacao", error);
        }
    }
}