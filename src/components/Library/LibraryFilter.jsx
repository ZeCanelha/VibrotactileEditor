import React from "react";
import { connect } from "react-redux";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Items from "./LibraryItem";

const mapStateToProps = (state) => ({
  patterns: state.library.patterns,
  query: state.library.searchQuery,
});

class LibraryFilter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      customPatternsData: [],
      presetPatternsData: [],
    };
  }
  componentDidMount() {
    this.setState({
      customPatternsData: this.filterCustomSearch(this.props.query),
      presetPatternsData: this.filterPresetSearch(this.props.query),
    });
  }
  componentDidUpdate(prevProps) {
    if (prevProps.query !== this.props.query) {
      this.setState({
        customPatternsData: this.filterCustomSearch(this.props.query),
        presetPatternsData: this.filterPresetSearch(this.props.query),
      });
    }
  }

  filterCustomSearch(query) {
    return this.props.patterns.filter(function (item) {
      return (
        item.patternType === "custom" &&
        item.name.toLowerCase().indexOf(query.toLowerCase()) > -1
      );
    });
  }
  filterPresetSearch(query) {
    return this.props.patterns.filter(function (item) {
      return (
        item.patternType === "preset" &&
        item.name.toLowerCase().indexOf(query.toLowerCase()) > -1
      );
    });
  }

  render() {
    return (
      <Container fluid className="mt-1 display-container">
        <Row noGutters className="display-row border rounded">
          <Items
            patterns={this.state.customPatternsData}
            openDetails={this.props.openDetails}
          ></Items>
        </Row>
        <Row noGutters className="display-row border rounded">
          <Items
            patterns={this.state.presetPatternsData}
            openDetails={this.props.openDetails}
          ></Items>
        </Row>
      </Container>
    );
  }
}

export default connect(mapStateToProps)(LibraryFilter);
