import styled from 'styled-components'

const ListWrapper = styled.section`
  margin: 16px 0;
`
const ListTitle = styled.h2`
  font-size: 1.2rem;
  font-family: sans-serif;
  margin-bottom: 8px;
`
const UnorderedList = styled.ul`
  list-style: none;
  padding: 0;
`
const ListItem = styled.li`
  margin: 6px 0;
  padding: 6px 8px;
  background: #f1f8ff;
  border-radius: 6px;
`

export default function List({ title, items }) {
  return (
    <ListWrapper>
      <ListTitle>{title}</ListTitle>
      <UnorderedList>
        {items.map((item, idx) => (
          <ListItem key={idx}>
            <strong>{item.label}:</strong> {item.value}
          </ListItem>
        ))}
      </UnorderedList>
    </ListWrapper>
  )
}
