import styled from 'styled-components'

const StyledLink = styled.a`
  color: #0366d6;
  text-decoration: none;
  font-weight: 500;
  &:hover {
    text-decoration: underline;
  }
`

export default function Link({ url, title }) {
  return (
    <StyledLink href={url} target="_blank" rel="noopener noreferrer">
      {title}
    </StyledLink>
  )
}
