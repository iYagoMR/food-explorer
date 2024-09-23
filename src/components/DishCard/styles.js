import styled from 'styled-components';
import { Link } from "react-router-dom";
import { DEVICE_BREAKPOINTS } from '../../styles/deviceBreakpoints';

export const Container = styled.div`
    min-width: 190px;

    display: flex;
    flex-direction: column;
    position: relative;
    justify-content: flex-start;
    align-items: center;
    min-height: 240px;

    padding: 24PX;
    gap: 13.5px;
    border-radius: 16px;

    background: ${({ theme }) => theme.COLORS.DARK_200};

    > button:first-child {
        color: ${({ theme }) => theme.COLORS.LIGHT_300};
        position: absolute;
        top: 18px;
        right: 18px;

        border: none;
        background: none;
    }

    .title {
        display: flex;
        gap: 5px;
        align-items: center;
    }
    .title h3 {
        color: ${({ theme }) => theme.COLORS.LIGHT_300};
        font-weight: 500;
        font-family: 'Poppins', sans-serif;
        font-size: 14px;
    }
    .title svg {
        font-size: 10px;
        color: ${({ theme }) => theme.COLORS.LIGHT_300};
    }

    .price{
        color: ${({ theme }) => theme.COLORS.CAKE_200};
        font-weight: 400;
        font-family: 'Roboto', sans-serif;
        font-size: 1.6rem;
    }

    .quantity{
        display: flex;
        gap: 15px;
        justify-content: center;
    }
    .quantity h4{
        color: ${({ theme }) => theme.COLORS.LIGHT_300};
        font-weight: 400;
        font-family: 'Roboto', sans-serif;
        font-size: 16px;
    }
    .quantity button {
        border: none;
        background: none;
        color: ${({ theme }) => theme.COLORS.LIGHT_100};
    }

    .dish-desc{
        margin-bottom: auto;
        max-width: 80%;
        text-align: center;
        display: none;
        font-size: 1.1rem;
        color: ${({ theme }) => theme.COLORS.LIGHT_400};
    }

    @media (max-width: ${DEVICE_BREAKPOINTS.SM}){
        
    }

    @media (min-width: ${DEVICE_BREAKPOINTS.MD}){
        min-width: 230px;
        max-width: 230px;
        .dish-desc{
            display: block;
        }

    }

    @media (min-width: ${DEVICE_BREAKPOINTS.LG}){
        min-width: 248px;
        max-width: 280px;
        .price{
            margin-top: 5px;
            font-size: 1.6rem;
        }
    }

`

export const Button = styled.button`
    background: ${({ theme }) => theme.COLORS.TOMATO_100};
    border: none;
    padding: 10px 12px;
    border-radius: 5px;

    color: ${({ theme }) => theme.COLORS.LIGHT_100};
    font-family: 'Poppins', sans-serif;
    font-size: 14px;
    font-weight: 500;

    display: flex;
    gap: 10px;
    justify-content: center;
    align-items: center;

`

export const DishPicture = styled.button`
    margin-top: 40px;

    border: none;
    background: none;
    > img {
        width: 8.8rem;
        height: auto;
    }
    @media(min-width: ${DEVICE_BREAKPOINTS.MD}){
       > img{
        width: 9.6rem;
       }
    }


`

export const Title = styled.button`
    border: none;
    background: none;
    display: flex;
    gap: 5px;
    align-items: center;
    
    h3 {
        color: ${({ theme }) => theme.COLORS.LIGHT_300};
        font-weight: 500;
        font-family: 'Poppins', sans-serif;
        font-size: 1.4rem;
    }
    svg {
        font-size: 1.4rem;
        color: ${({ theme }) => theme.COLORS.LIGHT_300};
    }

    @media(min-width: ${DEVICE_BREAKPOINTS.MD}){
        h3, svg{
            font-weight: 700;
        }
    }
`