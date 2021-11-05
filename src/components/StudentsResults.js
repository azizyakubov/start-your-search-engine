import StudentsCard from "./StudentsCard";
import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const StudentsResults = ({ students, loading }) => {
  return (
    <div className="students-results">
      {loading ? (
        <h3>Loading...</h3>
      ) : (
        <Container>
          <Row xs={1} sm={2} md={3}>
            {students.map((student, index) => (
              <Col key={index}>
                <StudentsCard {...student} />
              </Col>
            ))}
          </Row>
        </Container>
      )}
    </div>
  );
};

export default StudentsResults;
