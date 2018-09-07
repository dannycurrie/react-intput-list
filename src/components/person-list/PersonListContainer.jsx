import React, { Component } from 'react';
import PersonList from './PersonList';
import styled from 'styled-components';
import uuid from 'uuid';

const StyledPersonListContainer = styled.div`
  width: 200px;
`;

class PersonListContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      persons: [
        {
          firstName: 'Person',
          secondName: 'One',
          id: uuid(),
          newLine: false
        },
        {
          firstName: 'Person',
          secondName: 'Two',
          id: uuid(),
          newLine: false
        }
      ]
    };

    this.addNewLine = this.addNewLine.bind(this);
  }

  addNewLine(index) {
    // first unset any previous new lines
    let newPersons = this.state.persons.map(person => ({
      ...person,
      newLine: false
    }));
    // then add new person at desired index
    newPersons = [
      ...newPersons.slice(0, index + 1),
      {
        firstName: '',
        secondName: '',
        // id is important, enables the PersonList component correctly idenitfies
        // new / edited person entries
        // not sure how we can provision this?
        id: uuid(),
        newLine: true
      },
      ...newPersons.slice(index + 1)
    ];
    this.setState({ persons: newPersons });
  }

  render() {
    return (
      <StyledPersonListContainer>
        <PersonList persons={this.state.persons} addNewLine={this.addNewLine} />
      </StyledPersonListContainer>
    );
  }
}

export default PersonListContainer;
