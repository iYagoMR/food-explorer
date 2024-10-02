import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { remove, selectTotalPrice } from '../../store'
import { useNavigate } from 'react-router-dom';

import { Container } from './styles';
import { IoIosClose } from "react-icons/io";
import { Button } from '../Button';
import { OrderItem } from '../OrderItem';

import { IoIosArrowRoundForward } from "react-icons/io";

import defaultPhoto from '../../assets/plates/Mask-group-1.png';

export function Cart({ cartIsOpen, onCloseCart }){

    const totalPrice = useSelector(selectTotalPrice);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const todos = useSelector(store => {
        return store.todo
    })

    function handleRemoveDish(dish){
        dispatch(remove(dish))
    }

    return(
        <Container data-cart-is-open={ cartIsOpen }>

            <button className='close' onClick={onCloseCart}>
                <IoIosClose/>
            </button>
            <div>
                <h1>Your order</h1>
                <ul>
                    {
                        todos.map(dish => 
                            <OrderItem
                                key={dish.id}
                                name={dish.name}
                                picture={dish.picture}
                                price={dish.price}
                                quantity={dish.quantity}
                                user={dish.user_id}
                                onClick={() => handleRemoveDish(dish)}
                            />
                        )
                    }
                </ul>
            </div>
            <div>
                <p>Total price: $ {totalPrice.toFixed(2)}</p>
                <Button 
                    title="Choose payment method"
                    icon={IoIosArrowRoundForward}
                    onClick={() => navigate(`/order-checkout`)}
                />
            </div>
        </Container>
    )
}