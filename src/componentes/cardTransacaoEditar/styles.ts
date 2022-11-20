import styled from "styled-components";

export const Container = styled.div``;

export const Grid = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;

    width: 60rem;

    border-radius: 0.4rem;
    
    padding: 0.3rem;
    background: var(--shape);
    

    form {
        font-size: 0.7rem;        
        color: var(--text-body);

        td {         
          
        }

        input {
          text-align: left;
          width: 8rem;    
          flex-wrap: wrap;
          padding: 0.1rem;
          height: 2rem;
          border-radius: 0.25rem;

          border: 0.1rem solid var(--border-botton);
          background: #e7e9ee;

          font-weight: 400;
          font-size: 0.8rem;

          &::placeholder {
            color: var(--text-body);
          } 
        }
        .datapicker {          
          
        }
        .produto {
          width: 10rem;         
        }
        .loja{
          
        }
        .numeroParcela {
          text-align: end;
          width: 2rem;
        }
        .quantidadeParcelas {
          text-align: end;
          width: 2.5rem;
        }
        .observacao {
          width: 11rem;
        }
        .valor {
          width: 5rem;
          text-align: end;
        }

        button[type="submit"] {
          width: 100%;
          padding: 0.5rem;
          height: 2rem;
          background: var(--green);
          
          border-radius: 0.25rem;
          border: none;
          
          font-size: 0.8rem;
          transition: filter 0.2s;

          &:hover {
            filter: brightness(0.8);
            border: 1px solid #04d361;
          }
        }
    }   
`;

export const Info = styled.div`
    display: flex;

    font-size: 0.7rem;
    border-radius: 0.4rem;    
    padding: 0.4rem;
    background: var(--shape);
    visibility: hidden;
    position: absolute;    
    margin-left: 37.5%;
    color: var(--text-body);    
    border: 2px solid #969CB3;
    max-width: 14rem;

    transition: visibility 0s, opacity 0.5s linear;

  `;