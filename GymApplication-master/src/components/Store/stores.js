import React from 'react';
import '../../index.css';
import MyStoreItem from './mystoreitem';

class Stores extends React.Component {

  render() {
    return this.props.myItems.map((items) =>
    {
        return <MyStoreItem items={items}></MyStoreItem>
    });
  }
}

export default Stores;