import { createGlobalStyle } from "styled-components";

//Demonstrar Style component Apenas!
//Quem usa, deve se preocupar com a os 13k de import em cada Arquivo
// Levo em consideração o tamanho de cada import no meu código
export default createGlobalStyle`
*{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

*html,
body,
#root {
  min-height: 100%;
}
*:focus {
    outline: 0;
}
body {
    font: 14px;
    background-color: #FFF;
    -webkit-font-smoothing: antialiased !important;
  
}
body,input,button {
    font: 14px Arial,Helvetica,sans-serif;
}
a {
    text-decoration: none;
    color: gray
}
  
ul {
    list-style: none;
}
  
button {
    cursor: pointer;
}
  
small {
    color: #f03d1d;
    margin-left: 10px;
}
/*Ajusta title com header*/
.content {
    width: calc(100% - 200px);
    padding: 18px 15px;
}

@media only screen and (min-width: 320px) and (max-width:428px) {
    .container {
      display: flex;
      justify-content: center;
      flex-direction:column;
      margin:18%;
      overflow: hidden;
    }
    .sidebar {
      min-width: 98%;
      height: 10%;
      flex-direction: row-reverse;
      margin: 1% auto;
    }
  
    .sidebar div {
      width: 17%;
      height: 50%;
      display: flex;
      justify-content: flex-end;
    }
  
    .sidebar div img {
      display: none;
    }
  
    .sidebar a {
      font-size: 0px;
      width: 20%;
      height: 20%;
      margin: 0 auto;
      margin-left: 1px;
      display: flex;
      justify-content: center;
  
    }
  
    .sidebar a+button {
      font-size: 0px;
      width: 20%;
      height: 20%;
      margin: 0 auto;
      display: flex;
      justify-content: center;
    } 
  
  
   
    .sidebar button svg {
      margin-left: 0.2em;
      width: 15px;
      height: 15px; 
    }
  
    .sidebar a:hover {
      background-color: #ffffff;
      border: 1px solid #f59a4f;
      color: #f59a4f;
      font-size: 0px;
      width: 21%;
    }
  
    .sidebar a+button:hover {
      background-color: #ffffff;
      border: 1px solid #f59a4f;
      color: #f59a4f;
      font-size: 0px;
      width: 21%;
    }
    .content {
      margin-right: 200px;
      padding: 15% 15px;
      width: 100%;
    }
  
    .griddashboard{
      display: block;
    }
    .fazer{
      margin-top: 5%;
    }
   
    .modal{
      min-width: 25em;
    }

`;