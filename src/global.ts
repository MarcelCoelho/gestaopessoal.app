import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  
  :root {
    --background: #f0f2f5;
    --red: #E52E4D;
    --green: #33CC95;
    --blue: #5429CC;
    --blue-light: #6933FF;
    --text-title: #363F5F;
    --text-body: #969CB3;
    --shape: #FFFFFF;
    --border-botton: #d7d7d7;
    --green-light: #3CB371;
    --red-tomato: #FF6347;
    --black: #000;
    --cinza: gray;
  }
  
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

 // padrão font aplicação 16px (ideal Desktop);
 html {
   @media (max-width: 1080px) {
     font-size: 93.75%; // 15px
   }

   @media (max-width: 920px) {
     font-size: 87.5%; // 14px    
    
    }
 }

  body {
    padding: 0 2rem;
    background: var(--background);
    -webkit-font-smoothing: antialiased;
  }

  body, input, textarea, button {
    //background: linear-gradient(90deg, rgba(144,124,203,1) 0%, rgba(9,9,121,1) 35%, rgba(255,255,255,1) 100%);
    font-family: 'Poppins', sans-serif;
    font-weight: 400;
  }

  h1, h2, h3, h4, h5, h6, strong {
    font-weight: 600;
  }

  button {
    cursor: pointer;
  }

[disabled] {
  opacity: 0.6;
  cursor: not-allowed;
}

`;
