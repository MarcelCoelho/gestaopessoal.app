
import { TextField } from "@material-ui/core";
import styled from "styled-components";

export const Container = styled.div`
  
`;

export const Grid = styled.div`
    display: flex;
    flex-direction: column;    
    //width: 100%;
    border-radius: 0.4rem;    
    padding: 0.7rem;
    background: var(--shape);
    align-items: center;   
    justify-content: center;

    .corpoFormulario {
        display: flex;
        flex-direction: column;
        font-size: 0.7rem;        
        color: var(--text-body);
        width: 30rem;
        padding: 0.5rem;

      .campos {
          display: flex;
          flex-direction: column;          

          .tiposPagamento {
            display: flex;
            width: 30rem;
            margin-top:0.5rem;
          }

          input {
            margin-top: 0.3rem;
            //width: 70%;
            height: 2rem;
            border-radius: 0.25rem;
            border: none;
            outline: none;
            border-bottom: 0.1rem solid var(--border-botton);
          
            font-weight: 400;
            font-size: 0.8rem;

            &::placeholder {
              color: var(--text-body);
            }         
          }
      }

      .botoes {
          display: flex;
          width: 30rem;       
          justify-content: flex-end;
          gap: 0.5rem;
          padding: 0;

          button {            
            height: 2rem;
            padding: 0.5rem;
            background: var(--border-botton);
            //color: var(--border-botton);
            border-radius: 0.2rem;
            border: 0.1rem solid var(--text-body);
            font-size: 0.7rem;
            margin-top: 0.5rem;
            font-weight: 500;

          
            justify-content: flex-end;
            align-items: flex-end;

            transition: filter 0.2s;

            &:hover {
              filter: brightness(0.9);
            }          
          }
      }
    }    
`;

export const CssTextField = styled(TextField)({
  width: '30rem',
  fontSize: 8,

  '& label.Mui-focused': {
    color: '#e7e9ee',
  },
  '& .MuiInput-underline:after': {
    borderBottomColor: '#e7e9ee',
    fontSize: 8
  }
});