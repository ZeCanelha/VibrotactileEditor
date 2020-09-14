import React from "react";
import { connect } from "react-redux";
import Col from "react-bootstrap/Col";
import Items from "./LibraryItem";

const mapStateToProps = (state) => ({
  patterns: state.library.patterns,
  query: state.library.searchQuery,
});

class LibraryFilter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
    };
  }
  componentDidMount() {
    this.setState({
      items: this.filterSearch(this.props.query),
    });
  }
  componentDidUpdate(prevProps) {
    if (prevProps.query !== this.props.query) {
      this.setState({
        items: this.filterSearch(this.props.query),
      });
    }
  }

  filterSearch(query) {
    return this.props.patterns.filter(function (item) {
      return item.name.toLowerCase().indexOf(query.toLowerCase()) > -1;
    });
  }

  render() {
    return (
      <Col className="libray-item-display">
        <Items patterns={this.state.items}></Items>
      </Col>
    );
  }
}

export default connect(mapStateToProps)(LibraryFilter);
