import React, { Component } from 'react';
import PersonList from './PersonList';
import styled from 'styled-components';
import uuid from 'uuid';

const StyledPersonListContainer = styled.div`
  width: 200px;
`;

// util functions
const focusPerson = person => ({ ...person, focus: true });
const defocusPerson = person => ({ ...person, focus: false });
const clearFocus = personsList => personsList.map(defocusPerson);
const newPerson = () => ({
  firstName: '',
  lastName: '',
  // id is important, ensures the PersonList component correctly idenitfies
  // new / edited person entries
  id: uuid(),
  focus: false
});

class PersonListContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      persons: [
        {
          firstName: 'Person',
          lastName: 'One',
          id: uuid(),
          focus: false
        },
        {
          firstName: 'Person',
          lastName: 'Two',
          id: uuid(),
          focus: false
        }
      ]
    };

    this.addNewLine = this.addNewLine.bind(this);
    this.handleKey = this.handleKey.bind(this);
  }

  handleKey(e, index) {
    const newPersons = clearFocus(this.state.persons);
    switch (e.keyCode) {
      // ENTER
      case 13:
        this.addNewLine(newPersons, index + 1);
        break;
      // UP ARROW
      case 38:
        this.setFocus(newPersons, index - 1);
        break;
      // DOWN ARROW
      case 40:
        this.setFocus(newPersons, index + 1);
        break;
    }
  }

  setFocus(persons, index) {
    const newPersons = persons.map(
      (p, i) => (i === index ? focusPerson(p) : defocusPerson(p))
    );
    this.setState({ persons: newPersons });
  }

  addNewLine(persons, index) {
    // add new person at desired index, giving focus
    const newPersons = [
      ...persons.slice(0, index),
      {
        ...focusPerson(newPerson())
      },
      ...persons.slice(index)
    ];
    this.setState({ persons: newPersons });
  }

  render() {
    return (
      <StyledPersonListContainer>
        <PersonList persons={this.state.persons} handleKey={this.handleKey} />
      </StyledPersonListContainer>
    );
  }
}

export default PersonListContainer;
