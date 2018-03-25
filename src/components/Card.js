import React from 'react';

const Card = (props) => {
  return (
    <li className="card">
      <h4>{props.title}</h4>
      <p>{props.description}</p>
      <h2>{props.number}</h2>
    </li>
  );
};

export default Card;
