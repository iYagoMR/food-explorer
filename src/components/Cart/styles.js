import styled from 'styled-components';

export const Container = styled.aside`
    position: fixed;
    width: 100%;
    height: 100%;
    z-index: 999;
    background-color: ${({ theme }) =>  theme.COLORS.DARK_400};
    
    padding: 20px 30px;

    flex-direction: column;
    gap: 35px;

    transform: translateX(100%);
    right: 0;
    transition: transform 0.3s ease-in-out;

    .close{
        width: fit-content;

        border: none;
        background: none;
        color: ${({ theme }) =>  theme.COLORS.LIGHT_100};

        >svg{
            margin-left: -5px;
            font-size: 3.5rem;
        }
    }

    > div:nth-child(2) {
        display: flex;
        flex-direction: column;
        gap: 35px;
        > h1{
            color: ${({ theme }) =>  theme.COLORS.LIGHT_100};
            font-weight: 500;
        }
        >ul{
            display: flex;
            flex-direction: column;
            gap: 30px;

            height: fit-content;
            overflow-y: scroll;
            max-height: 380px;
        }

    }

    >div:nth-child(3){
        display: flex;
        flex-direction: column;
        gap: 20px;
        margin-top: auto;

        >p{
            color: ${({ theme }) =>  theme.COLORS.LIGHT_100};
            font-weight: 500;
            font-size: 22px;
        }

        > button{
            flex-direction: row-reverse;
        }
    }

    &[data-cart-is-open="true"]{
        display: flex;

        transform: translateX(0);
    }

`