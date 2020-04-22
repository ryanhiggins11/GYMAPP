import React from 'react';
import '../../index.css';
import Card from 'react-bootstrap/Card';

// Displays the items available (title, image, description, price)

class MyStoreItem extends React.Component {
  render(){
    return (
        <div id="inner">
          <Card>
            <Card.Header id="itemTitle">{this.props.items.Name}</Card.Header>
            <Card.Body>
              <blockquote className="blockquote mb-0">
              <img src={this.props.items.Poster} id="itemImg"></img>
              <Card.Subtitle id="itemDesc">{this.props.items.Desc}</Card.Subtitle>
              <footer id="itemPrice">
                  {this.props.items.Price}
              </footer>
              </blockquote>
            </Card.Body>
          </Card>
        </div>
    );
  }
}

export default MyStoreItem;