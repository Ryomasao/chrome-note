import React, { Component } from 'react';
import styled from 'styled-components'
import NoteForm from './components/NoteForm'

class App extends Component {
  render() {
    return (
      <Wrapper>
        <NoteForm />
      </Wrapper>
    );
  }
}

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
`

export default App;
