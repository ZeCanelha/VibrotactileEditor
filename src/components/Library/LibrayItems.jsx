import React from "react";
import { connect } from "react-redux";
import Col from "react-bootstrap/Col";
import Items from "./Item";

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
      items: this.props.patterns,
    });
  }
  componentDidUpdate(prevProps) {
    if (prevProps.searchParameters !== this.props.searchParameters) {
      this.setState({
        items: this.filterSearch(this.props.searchParameters),
      });
    }
  }

  filterSearch(searchParameters) {
    console.log(searchParameters.rangeInput);
    return this.props.patterns.filter(function (item) {
      if (searchParameters.hasOwnProperty("patternName"))
        return (
          item.name
            .toLowerCase()
            .indexOf(searchParameters.patternName.toLowerCase()) > -1 &&
          Math.max.apply(
            Math,
            item.keyframes.map((d) => d.time)
          ) <= searchParameters.rangeInput
        );
      return item;
    });
  }

  render() {
    return (
      <Col className="libray-item-display">
        <Items {...this.props} patterns={this.state.items}></Items>
      </Col>
    );
  }
}

export default connect(mapStateToProps)(LibraryFilter);
