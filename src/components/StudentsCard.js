import { Card } from "react-bootstrap";

const StudentCard = (student) => {
  return (
    <Card className="student mb-4">
      <Card.Img
        variant="top"
        src={student.pic}
        className="student-img"
        alt={student.firstName}
      ></Card.Img>
      <Card.Body>
        <Card.Title className="student-name">
          {student.firstName} {student.lastName}
        </Card.Title>
        <Card.Text className="student-info">Email: {student.email}</Card.Text>
        <Card.Text>Company: {student.company || "none"}</Card.Text>
        <Card.Text>Classes: {student.classes.join(", ") || "none"}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default StudentCard;
