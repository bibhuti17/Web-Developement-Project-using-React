import styled from 'styled-components'
import GitHubLogo from '../../assets/GitHub-Mark-Light-64px.png'

const HeaderBar = styled.header`
  display: flex;
  align-items: center;
  background: #24292e;
  color: #ffffff;
  padding: 16px;
`
const Logo = styled.img`
  height: 40px;
  margin-right: 12px;
`
const Title = styled.h1`
  font-size: 1.5rem;
  font-family: sans-serif;
  font-weight: bold;
`

export default function Header() {
  return (
    <HeaderBar>
      <Logo src={GitHubLogo} alt="GitHub Logo" />
      <Title>My Github Portfolio</Title>
    </HeaderBar>
  )
}
