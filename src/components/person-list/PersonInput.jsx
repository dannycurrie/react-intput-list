import React, { Component } from 'react';
import styled from 'styled-components';

const StyledPersonInput = styled.input`
  border: 0px;
  padding: 2px;
`;

// making this a class component to leverage lifecycle handlers
class PersonInput extends Component {
  componentDidUpdate() {
    // we can't rely on autoFocus, as that only applies to newly rendered inputs
    if (this.props.focus) {
      this.input.focus();
    }
  }

  render() {
    const { id, firstName, lastName, focus, handleKey, index } = this.props;
    return (
      <StyledPersonInput
        key={id}
        type="text"
        defaultValue={`${firstName} ${lastName}`}
        autoFocus={focus}
        onKeyUp={e => handleKey(e, index)}
        innerRef={c => (this.input = c)}
      />
    );
  }
}

export default PersonInput;
