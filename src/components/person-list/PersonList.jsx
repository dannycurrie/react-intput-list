import React from 'react';
import styled from 'styled-components';
import PersonInput from './PersonInput';

const StyledPersonList = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid black;
`;

const PersonList = ({ persons, handleKey }) => (
  <StyledPersonList>
    {persons.map(({ id, firstName, lastName, focus }, index) => (
      <PersonInput
        key={id}
        index={index}
        firstName={firstName}
        lastName={lastName}
        focus={focus}
        handleKey={handleKey}
      />
    ))}
  </StyledPersonList>
);

export default PersonList;
