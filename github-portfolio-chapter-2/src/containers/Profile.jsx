import React, { Component } from 'react'
import styled from 'styled-components'
import List from '../components/List/List'
import Link from '../components/Link/Link'

const Avatar = styled.img`
  width: 120px;
  height: 120px;
  border-radius: 60px;
  margin: 16px 0;
  border: 4px solid #0366d6;
`

export default class Profile extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: {},
      repositories: [],
      loading: true,
      error: ''
    }
  }

  async componentDidMount() {
    try {
      const profileRes = await fetch('https://api.github.com/users/bibhuti17')
      if (!profileRes.ok) throw new Error('Profile fetch failed')
      const profileData = await profileRes.json()

      const reposRes = await fetch(profileData.repos_url)
      if (!reposRes.ok) throw new Error('Repos fetch failed')
      const repoData = await reposRes.json()

      this.setState({
        data: profileData,
        repositories: repoData,
        loading: false,
        error: ''
      })
    } catch (err) {
      this.setState({ error: err.message, loading: false })
    }
  }

  render() {
    const { data, repositories, loading, error } = this.state

    if (loading) return <div>Loading...</div>
    if (error) return <div>{error}</div>

    // Prepare profile items
    const profileItems = [
      { label: 'Name', value: data.name || data.login },
      { label: 'Bio', value: data.bio || 'N/A' },
      { label: 'Location', value: data.location || 'N/A' },
      { label: 'Followers', value: data.followers },
      { label: 'Following', value: data.following },
      { label: 'GitHub', value: <Link url={data.html_url} title={data.html_url} /> }
    ]

    // Prepare repo items (limited to top 5 for better display)
    const repoItems = repositories.slice(0, 5).map(repo => ({
      label: repo.name,
      value: <Link url={repo.html_url} title={repo.description || repo.html_url} />
    }))

    return (
      <div style={{ textAlign: 'center' }}>
        <Avatar src={data.avatar_url} alt={data.login} />
        <List title="Profile" items={profileItems} />
        <List title="Projects" items={repoItems} />
      </div>
    )
  }
}
