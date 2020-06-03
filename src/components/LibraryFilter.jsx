import React from "react";
import { connect } from "react-redux";
import PatternDisplay from "./LibraryPatternDisplay";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

const mapStateToProps = (state) => ({
  customPatterns: state.library.customPatterns,
  presetPatterns: state.library.presetPatterns,
  query: state.library.searchQuery,
});

class LibraryFilter extends React.Component {
  filterCustomSearch(query) {
    return this.props.customPatterns.filter(function (item) {
      return item.name.toLowerCase().indexOf(query.toLowerCase()) > -1;
    });
  }
  filterPresetSearch(query) {
    return this.props.presetPatterns.filter(function (item) {
      return item.name.toLowerCase().indexOf(query.toLowerCase()) > -1;
    });
  }

  filteredPatterns(data) {
    let dataArray = [];
    for (let index = 0; index < data.length; index++) {
      dataArray.push(
        <Col key={data[index]._id} xs={6} md={4} style={{ padding: "5px" }}>
          <PatternDisplay
            key={data[index]._id}
            patternName={data[index].name}
            description={data[index].description}
            path={data[index].path}
          ></PatternDisplay>
        </Col>
      );
    }

    return dataArray;
  }

  render() {
    let customPatternsData = this.filterCustomSearch(this.props.query);
    let presetPatternsData = this.filterPresetSearch(this.props.query);

    const customPatternDisplay = this.filteredPatterns(customPatternsData);
    const presetPatternDisplay = this.filteredPatterns(presetPatternsData);

    return (
      <Container fluid className="mt-1 display-container">
        <Row noGutters className="display-row border rounded">
          {customPatternDisplay}
        </Row>
        <Row noGutters className="display-row border rounded">
          {presetPatternDisplay}
        </Row>
      </Container>
    );
  }
}

export default connect(mapStateToProps)(LibraryFilter);
