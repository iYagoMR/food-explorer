import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { Container } from './styles';

import { PageSection } from '../../components/PageSection';
import { IngredientTag } from '../../components/IngredientTag';
import { Button } from '../../components/Button';
import { Header } from '../../components/Header';
import { Bottom } from '../../components/Bottom';
import { Cart } from '../../components/Cart';
import { add } from '../../store';

import picturePlaceholder from '../../assets/plates/Mask-group-11.png';

import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import { PiReceipt } from "react-icons/pi";

import { USER_ROLE } from '../../utils/roles';
import { useAuth } from '../../hooks/auth';
import { api } from '../../services/api';

export function DishDetails(){

    const {user} = useAuth();
    const [ data, setData ] = useState(null);
    const [ cartIsOpen, setCartIsOpen ] = useState(false);
    const [ quantity, setQuantity ] = useState(1);

    

    const navigate = useNavigate();
    const params = useParams();
    const dispatch = useDispatch();

    let pictureUrl = picturePlaceholder;
    if (data) { // Ensure data is not null or undefined
    
        if (data.user_id == null) {
            pictureUrl = data.picture ? data.picture : picturePlaceholder; // Handle null data.picture too
        } else {
            pictureUrl = data.picture ? `${api.defaults.baseURL}/files/${data.picture}` : picturePlaceholder;
        }
    }

    //handle add new dish to the cart
    function handleAddToCart(dish){
        dispatch(add(dish));
    }

    function handleEdit(id){
        navigate(`/edit-dish/${id}`)
    }

    function addQuantity(){
        setQuantity(prevQuantity => prevQuantity + 1);
        console.log(quantity);
    }

    function removeQuantity(){
        setQuantity(prevQuantity => Math.max(prevQuantity - 1, 0));
        console.log(quantity);
    }

    useEffect(() => {
        async function fetchDish(){
          const response = await api.get(`/dishes/${params.id}`);
          setData(response.data);
          
        }
    
        fetchDish();
    }, [params.id]);

    const formattedQuantity = String(quantity).padStart(2, '0');

    return(
        <Container>
            <Cart 
                cartIsOpen={cartIsOpen} 
                onCloseCart={() => setCartIsOpen(false)}
            />
            <Header onOpenCart={() => setCartIsOpen(true)}/>
            {
            data &&
            <main>
                <PageSection/>
                <div className='wrapper'>
                    <img src={`/` + pictureUrl} alt="dish picture" />
                    <div className='dish-description'>
                        <h1>{data.name}</h1>
                        <p>
                            {data.description}
                        </p>
                        <div className='ingredients'>
                        {
                            data.ingredients && data.ingredients.map(ingredients => (
                                <IngredientTag 
                                    key={String(ingredients.id)}
                                    data={ingredients}
                                />
                            ))
                        }
                        </div>

                        {[USER_ROLE.CUSTOMER].includes(user.role) &&
                            <div>
                                <div className='quantity'>
                                    <button onClick={removeQuantity}><AiOutlineMinus size={23}/></button>
                                    <h4>{formattedQuantity}</h4>
                                    <button onClick={addQuantity}><AiOutlinePlus size={23}/></button>
                                </div>
                                <Button 
                                    title="Add"
                                    icon={PiReceipt}
                                    price={data.price}
                                    onClick={() => handleAddToCart({ ...data, quantity })}
                                />
                            </div>
                        }
                        {[USER_ROLE.ADMIN].includes(user.role) &&
                            <Button 
                                title="Edit dish"
                                onClick={() => handleEdit(data.id)}
                            />
                        }
                    </div>
                </div>
            </main>
            }
            <Bottom/>
        </Container>
    )
}