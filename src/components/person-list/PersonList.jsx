import React from 'react';
import styled from 'styled-components';

const StyledPersonList = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid black;
`;

const StyledListInput = styled.input`
  border: 0px;
  padding: 2px;
`;

const PersonList = ({ persons, addNewLine }) => (
  <StyledPersonList>
    {persons.map((person, index) => (
      <StyledListInput
        key={person.id}
        type="text"
        defaultValue={`${person.firstName} ${person.secondName}`}
        autoFocus={person.newLine}
        onKeyUp={e => (e.keyCode === 13 ? addNewLine(index) : null)}
      />
    ))}
  </StyledPersonList>
);

export default PersonList;
