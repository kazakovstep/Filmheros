import React from 'react'
import { Footer } from "../../templates/Footer/Footer"
import { Header } from "../../templates/Header/Header"
import { Main } from "../../templates/Main/Main"
const MainPage = ({ children }) => {
  return (
    <>
      <Header />
      <Main type={"main"}>
        <div>{children}</div>
      </Main>
      <Footer />
    </>
  )
}

export const withMainLayout = function (Component) {
  return function withMainLayoutComponent(props) {
    return (
      React.createElement(MainPage, null,
        React.createElement(Component, props)
      )
    )
  }
}
