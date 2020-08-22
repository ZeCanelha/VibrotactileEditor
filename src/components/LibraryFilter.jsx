import React from "react";
import { connect } from "react-redux";
import Display from "./DisplayPattern";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

const mapStateToProps = (state) => ({
  patterns: state.library.patterns,
  query: state.library.searchQuery,
});

class LibraryFilter extends React.Component {
  customPatternsData = this.filterCustomSearch(this.props.query);
  presetPatternsData = this.filterPresetSearch(this.props.query);

  customPatternDisplay = null;
  presetPatternDisplay = null;

  componentDidMount() {
    this.customPatternDisplay = this.filteredPatterns(this.customPatternsData);
    this.presetPatternDisplay = this.filteredPatterns(this.presetPatternsData);

    this.forceUpdate();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.query !== this.props.query) {
      this.customPatternsData = this.filterCustomSearch(this.props.query);
      this.presetPatternsData = this.filterPresetSearch(this.props.query);

      this.customPatternDisplay = this.filteredPatterns(
        this.customPatternsData
      );
      this.presetPatternDisplay = this.filteredPatterns(
        this.presetPatternsData
      );

      this.forceUpdate();
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

  filteredPatterns(data) {
    let dataArray = [];
    for (let index = 0; index < data.length; index++) {
      dataArray.push(
        <Col className="library-display" key={data[index]._id} xs={6} md={4}>
          <Display
            key={data[index]._id}
            id={data[index]._id}
            path={data[index].path}
          ></Display>
        </Col>
      );
    }

    return dataArray;
  }

  render() {
    return (
      <Container fluid className="mt-1 display-container">
        <Row noGutters className="display-row border rounded">
          {this.customPatternDisplay}
        </Row>
        <Row noGutters className="display-row border rounded">
          {this.presetPatternDisplay}
        </Row>
      </Container>
    );
  }
}

export default connect(mapStateToProps)(LibraryFilter);
