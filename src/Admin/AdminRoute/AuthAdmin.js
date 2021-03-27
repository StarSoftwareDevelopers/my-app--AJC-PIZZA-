import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { validateAdmin } from "./route";

const mapState = ({ user }) => ({
  currentUser: user.currentUser,
});

const AuthAdmin = (props) => {
  const { currentUser } = useSelector(mapState);
  const history = useHistory();

  useEffect(() => {
    if (!validateAdmin(currentUser)) {
      history.push("/login");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser]);

  return currentUser;
};

export default AuthAdmin;
