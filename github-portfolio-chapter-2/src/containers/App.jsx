import React, { Component } from 'react'
import styled, { createGlobalStyle } from 'styled-components'
import Header from '../components/Header/Header'
import Profile from './Profile'

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    font-family: 'Segoe UI', 'Roboto', sans-serif;
    background: #f6f8fa;
    color: #24292e;
  }
`

const AppWrapper = styled.div`
  max-width: 600px;
  margin: 32px auto;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(36,41,46,0.1);
  padding: 32px;
`

export default class App extends Component {
  render() {
    return (
      <>
        <GlobalStyle />
        <AppWrapper>
          <Header />
          <Profile />
        </AppWrapper>
      </>
    )
  }
}
