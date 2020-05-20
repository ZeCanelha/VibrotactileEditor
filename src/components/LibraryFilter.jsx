import React from "react";
import { connect } from "react-redux";
import PatternDisplay from "./LibraryPatternDisplay";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

const mapStateToProps = (state) => ({
  customPatterns: state.library.customPatterns,
  query: state.library.searchQuery,
  size: state.library.displayRowSize,
});

class LibraryFilter extends React.Component {
  filterSearch(query) {
    return this.props.customPatterns.filter(function (item) {
      return item.name.toLowerCase().indexOf(query.toLowerCase()) > -1;
    });
  }

  render() {
    console.log(this.props);

    let data = this.filterSearch(this.props.query);
    console.log(data);

    const customPatternDisplay = [];
    for (let index = 0; index < data.length; index++) {
      customPatternDisplay.push(
        <Col xs={6} md={4} style={{ padding: "5px" }}>
          <PatternDisplay
            key={data[index].pattern_id}
            patternName={data[index].name}
            path={data[index].path}
            width={this.props.size.width}
            height={this.props.size.height}
          ></PatternDisplay>
        </Col>
      );
    }
    return (
      <Container fluid className="mt-3 display-container">
        <Row noGutters className="display-row border rounded mb-1">
          {customPatternDisplay}
        </Row>
        <Row noGutters className="display-row border rounded mt-1"></Row>
      </Container>
    );
  }
}

export default connect(mapStateToProps)(LibraryFilter);
