import { raiseError } from '../../actions/error';

export const showError = (error) => {
  let {response} = error;
  let message = ''
  if(typeof error === 'string'){
    message = error
  } else if(response === undefined){
    message = error.toString();
  } else {
    switch( response.status ){
      case 404: message = "Ruta no encontrada";
      break;
      case 401: message = "Peticion no valida";
      break;
      case 409:
      case 422:
      case 500: message = response.data.message;
      break;
      default: message = "Error en la petición";
    }
  }
  return raiseError(message);
}
