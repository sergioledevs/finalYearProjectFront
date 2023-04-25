import styled from 'styled-components';
import food_background from '../../media/food_background.jpg'


export const Container= styled.div`
background-color: rgba(219, 234, 239, 1);
`

export const Slogan= styled.h1`
color: black;
font-size: 4.5em;
font-family: "InterBold", sans-serif;
margin-bottom: 30px;
`

export const BigDiv= styled.div`
display: flex;
flex-direction: column;
background-image:url(${food_background});
background-size: 150% auto;
background-position: right 70% top 69%;
background-repeat: no-repeat;
align-items: center;
justify-content: center;
height: 100vh;
`


export const GradientOverlay = styled.div`
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(rgba(255, 255, 255, 0) 65%, rgba(219, 234, 239, 1) 100%);
  z-index: 1;
`;

export const SloganDescription= styled.h3`
color: black;
font-size: 1.5em;
font-family: "InterMedium", sans-serif;
text-align: center;
margin-bottom: 40px;
`

export const Content = styled.div`
  position: relative;
  z-index: 2;
  display: flex;
  align-items: center;
justify-content: center;
flex-direction: column;
  /* Add your content styles here */
`;

export const GradientButton = styled.button`
  background: linear-gradient(to bottom right, #ff5f6d, #ffc371);
  border-radius: 20px;
  color: #fff;
  font-size: 16px;
  padding: 10px 20px;
  border: none;
  outline: none;
  cursor: pointer;
  transition: all 0.3s ease-in-out;

  &:hover {
    transform: scale(1.05);
  }

  &:active {
    transform: scale(0.95);
  }
`;

