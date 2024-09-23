import styled from 'styled-components';
import { DEVICE_WIDTH } from '../../styles/deviceWidth';
import { DEVICE_BREAKPOINTS } from '../../styles/deviceBreakpoints';

export const Container = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    overflow-x: hidden;
    align-items: center;

    > main {
        padding: 50px 24px;
        max-width: ${DEVICE_WIDTH.MAX};
        width: 100%;
        margin: 0 auto;
        display: flex;
        flex-direction: column;
        
        > .sections {
            display: flex;
            flex-direction: column;
            gap: 50px;
        }
    }
`;

export const Banner = styled.div`
    background: linear-gradient(to bottom, #091E26, #00131C);
    border-radius: 3px;
    
    display: flex;
    padding: 20px 17px 20px 15px;
    position: relative;
    min-height: 100px;


    > img {
        position: absolute;

        bottom: 0;
        left: -20px;
        width:190px;
        height: auto;
    }

    > div {
        display: flex;
        flex-direction: column;
        gap: 7px;
        margin-left: auto;
        justify-content: center;
    }

    h2 {
        color: ${({ theme }) => theme.COLORS.LIGHT_300};
        font-weight: 600;
        font-family: 'Poppins', sans-serif;
        font-size: 1.6rem;
    }

    p {
        color: ${({ theme }) => theme.COLORS.LIGHT_300};
        font-weight: 400;
        font-family: 'Poppins', sans-serif;
        font-size: 1rem;
        width: 190px;
    }
    @media (max-width: ${DEVICE_BREAKPOINTS.SM}){
        p{font-size: 0.8rem; width: 43vw;}
        h2{font-size: 1.4rem;}
        min-height: 60px;

        > img{
            width: 40vw;
        }
    }

    @media (min-width: 465px){
        p{
            width: 50vw;
        }
    }

    @media (min-width: 550px){
        padding: 30px 17px 30px 15px;
        margin-top: 20px;
        img{
            width: 230px;
        }

        h2{
            font-size: 1.8rem;
        }
        p{
            font-size: 1.2rem;
        }
    }

    @media (min-width: 690px){
        margin-top: 7vw;
        min-height: 19vw;
        img{
            width: 40vw;
        }

        h2{
            font-size: 1.8rem;
        }
        p{
            font-size: 1.2rem;
        }
    }

    @media (min-width: 900px){

        h2{
            font-size: 2.2rem;
        }
        p{
            font-size: 1.6rem;
        }
    }

    @media (min-width: 1200px){
        min-height: 200px;
        margin-top: 100px;
        
        >div {
            margin-right: 20px;
        }

        p{
            max-width: 596px;
        }
        img{
            max-width: 470px;
        }
    }

`

export const DishSection = styled.div`
    display: flex;
    flex-direction: column;

    gap: 25px;

    > h2 {
        color: ${({ theme }) => theme.COLORS.LIGHT_300};
        font-weight: 500;
        font-family: 'Poppins', sans-serif;
        font-size: 1.8rem;
    }

    > div {
        display: flex;
        gap: 20px;
        overflow-x: auto;
        padding-bottom: 20px;

        /* Scrollbar for WebKit browsers (Chrome, Safari) */
        ::-webkit-scrollbar {
            height: 10px; /* Height for horizontal scrollbars */
        }
        
        ::-webkit-scrollbar-thumb {
            background-color: ${({ theme }) => theme.COLORS.LIGHT_100};
            border-radius: 10px;
        }

        ::-webkit-scrollbar-track {
            background-color: ${({ theme }) => theme.COLORS.DARK_1000};
        }

        /* Scrollbar for Firefox */
        scrollbar-color: ${({ theme }) => theme.COLORS.LIGHT_700} ${({ theme }) => theme.COLORS.DARK_1000}; /* Thumb color Track color */
        scrollbar-width: thin; /* Thin scrollbar */

        > div{

            @media (min-width: 1200px){
                min-width: 248px;
                flex: 1;
            }
        }
    }
`