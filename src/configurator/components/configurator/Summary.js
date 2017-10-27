import React, {PropTypes} from 'react';
import {Link} from 'react-router';

const Summary = ({unitPrice, width, length}) => {
  return (
    <section>
      <div>Starting at</div>
      <div>${unitPrice}</div>
      <div>for {width.feet} feet by {length.feet} feet</div>
    </section>
  );
};

Summary.propTypes = {
  unitPrice: React.PropTypes.number.isRequired,
  width: React.PropTypes.object.isRequired,
  length: React.PropTypes.object.isRequired
};

export default Summary;