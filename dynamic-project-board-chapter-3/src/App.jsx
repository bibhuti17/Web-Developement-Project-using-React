import React from "react";
import GlobalStyle from "./styles/GlobalStyles";
import Board from "./components/Board/Board";

const App = () => {
  return (
    <>
      <GlobalStyle />
      <Board />
    </>
  );
};

export default App;