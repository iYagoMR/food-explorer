import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { add } from '../../store';

import { Container, Button, Title, DishPicture } from './styles';

import { MdFavoriteBorder, MdFavorite } from "react-icons/md";
import { IoIosArrowForward } from "react-icons/io";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import { IoCart } from "react-icons/io5";
import { GoPencil } from "react-icons/go";

import picturePlaceholder from "../../assets/plates/Mask-group-1.png";

import { USER_ROLE } from '../../utils/roles';
import { useAuth } from '../../hooks/auth';
import { api } from '../../services/api';

export function DishCard({isAdmin, data, addFavBtn, ...rest}){

    const {user} = useAuth();
    const [ quantity, setQuantity ] = useState(1);
    const [ isFavorite, setIsFavorite ] = useState();

    const navigate = useNavigate();
    const dispatch = useDispatch();

    let pictureUrl;
    if(data.user_id == null){
        pictureUrl = `/${data.picture}`;
    }
    else{
        pictureUrl = data.picture ? `${api.defaults.baseURL}/files/${data.picture}` : picturePlaceholder;
    }

    //handle add new dish to the cart
    function handleAddToCart(dish){
        dispatch(add(dish));
    }

    function handleDetails(id){
        navigate(`/dish-details/${id}`)
    }

    function handleEdit(id){
        navigate(`/edit-dish/${id}`)
    }

    function addQuantity(){
        setQuantity(prevQuantity => prevQuantity + 1);
    }

    function removeQuantity(){
        setQuantity(prevQuantity => Math.max(prevQuantity - 1, 0));
    }

    const handleToggleFavorite = () => {
        setIsFavorite((prevFavorite) => !prevFavorite); // Toggle the state\
        addFavBtn();
    };

    useEffect(() => {
        async function fetchDish(){

            let response;
            try{
                response = await api.get(`userFavorites/${data.id}`);
            }
            catch(error){
                // Handle the 404 error specifically
                if (error.response && error.response.status === 404) {
                    response = null; // If dish is not found, set favDish to null
                } else {
                    throw error; // Re-throw other errors to be handled by the outer catch
                }
            }

            if(response){
                setIsFavorite(true);
            }
            else{
                setIsFavorite(false);
            }
        }
        fetchDish();
    }, [data.id]);

    const formattedQuantity = String(quantity).padStart(2, '0');

    return(
        <Container isAdmin={isAdmin} {...rest}>
            {[USER_ROLE.CUSTOMER].includes(user.role) && <button onClick={handleToggleFavorite}>
                {
                    isFavorite ? (
                        <MdFavorite size="2.3rem" />
                    ) : (
                        <MdFavoriteBorder size="2.3rem" />
                    )
                }
            </button>}

            {[USER_ROLE.ADMIN].includes(user.role) && <button onClick={() => handleEdit(data.id)}>
                <GoPencil size="2.3rem"/>
            </button>}
            
            <DishPicture onClick={() => handleDetails(data.id)}>
                <img src={pictureUrl} alt={`${data.name}'s picture`} />
            </DishPicture>
            
            <Title onClick={() => handleDetails(data.id)}>
                <h3>{data.name}</h3>
                <IoIosArrowForward/>
            </Title>
            <p className='dish-desc'>{data.description}</p>
            <h4 className='price'>${data.price}</h4>
            {
                user?.role === USER_ROLE.CUSTOMER &&
                <>
                    <div className='quantity'>
                        <button onClick={removeQuantity}><AiOutlineMinus size={20}/></button>
                        <h4>{formattedQuantity}</h4>
                        <button onClick={addQuantity}><AiOutlinePlus size={20}/></button>
                    </div>
                    <Button onClick={() => handleAddToCart({ ...data, quantity })}>
                        <IoCart size={15}/>
                        Add item
                    </Button>
                </>
            }
        </Container>
    )
}