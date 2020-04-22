import React from 'react';
import '../../index.css';
import Stores from './stores';

// Here the user can purchase things from our store

// to do: allow user to select item and buy it (PayPal)

class Store extends React.Component {
  
  // array of items
  state = {
    myItems:[
      {
        "Name": "Grenade Carb Killa High Protein and Low Carb Bar",
        "Desc": "12 x 60g - Selection Box",
        "Price": "€20.99",
        "Type": "store",
        "Poster": "https://m.media-amazon.com/images/I/71uaB4yEtOL._AC_UL480_FMwebp_QL65_.jpg"
      },
      {
        "Name": "Nature Valley Protein Peanut & Chocolate Gluten Free Cereal Bars",
        "Desc": "40g (Pack of 26 Bars)",
        "Price": "€14.99",
        "Type": "store",
        "Poster": "https://m.media-amazon.com/images/I/716tPYBWCzL._AC_UL480_FMwebp_QL65_.jpg"
      },
      {
        "Name": "USN 100% Premium Whey Protein Shake Powder",
        "Desc": "2.28 kg, Chocolate, 2.25 kg",
        "Price": "€42.99",
        "Type": "store",
        "Poster": "https://cdn.shopify.com/s/files/1/0049/2951/9689/products/USN_100_Premium_Whey_2.28kg_e2d44367-a664-496a-8b36-ed0ef373fa1a_720x.png?v=1583143108"
      },
      {
        "Name": "Lightweight Protein Shaker",
        "Desc": "400ml Capacity | Dishwasher, Microwave and Freezer Safe",
        "Price": "€10.99",
        "Type": "store",
        "Poster": "https://d213pbqwzzhx10.cloudfront.net/-/media/16e7ae3edac64df987a9558ed528cf67.png?sc_revision=cbc291efab76452a9eacfa6693e2f7fd?mw=1000&mh=1000&hash=00CCC051D7166CC5AC0CA392FB0DB74993E89123"
      }
                  
    ]
  }

  // store items displayed
  render() {
    return(
      <div className="App" id="outer">
        <div id="store">
          <h1>Our Store</h1>
          <Stores myItems={this.state.myItems}></Stores>
        </div>
      </div>
    );
  }
}

export default Store;