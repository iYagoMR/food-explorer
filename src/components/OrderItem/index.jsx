import { Container } from './styles';

import picturePlaceholder from "../../assets/plates/Mask-group-1.png";

import { api } from '../../services/api';

export function OrderItem({picture, name, quantity, price, onClick, user}){


    let pictureUrl;
    if(user == null){
        pictureUrl = `/src/${picture}`;
    }
    else{
        pictureUrl = data.picture ? `${api.defaults.baseURL}/files/${picture}` : picturePlaceholder;
    }
    
    return(
        <Container>
            <img src={pictureUrl} alt={`${name} picture`} />
            <div>
                <div className='order-description'>
                    <h3>{quantity}x {name}</h3> <span>$ {price}</span>
                </div>
                <button onClick={onClick}>Remove</button>
            </div>
        </Container>
    )
}