import React from 'react';
import Icon from 'react-native-vector-icons/Octicons';

const ActionIcon = ({ name }) => {
  return (
    <Icon style={{ marginRight: 5 }} name={name} color='#fff' size={20} />
  );
};

export default ActionIcon;
