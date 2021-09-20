import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function ButtonLink({ link, Children, classes, type, theme }) {
  return (
    <Button as={Link} to={link} className={classes} type={type} theme={theme}>
      {Children}
    </Button>
  );
}
