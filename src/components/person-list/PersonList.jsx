import React, { Component } from 'react';
import PersonInput from './PersonInput';
import styled from 'styled-components';
import uuid from 'uuid';

const StyledPersonList = styled.div`
  width: 200px;
  display: flex;
  flex-direction: column;
  border: 1px solid black;
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
      // persons should be passed down as props
      // probably run through some formatting function
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
      default:
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
      focusPerson(newPerson()),
      ...persons.slice(index)
    ];
    this.setState({ persons: newPersons });
  }

  render() {
    return (
      <StyledPersonList>
        {this.state.persons.map(({ id, firstName, lastName, focus }, index) => (
          <PersonInput
            key={id}
            id={id}
            index={index}
            firstName={firstName}
            lastName={lastName}
            focus={focus}
            handleKey={this.handleKey}
          />
        ))}
      </StyledPersonList>
    );
  }
}

export default PersonListContainer;
