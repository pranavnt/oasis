import { withRouter } from "react-router-dom";
import firebase from "../data/firebase";
import { useState } from "react";
import { Helmet } from "react-helmet";
import Navbar from "./Navbar";
import "../style/Project.css";

function Project(props) {
  const db = firebase.firestore();
  const [project, setProject] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const name = props.match.params.name;
  const owner = props.match.params.owner;
  var docRef = db
    .collection("repos")
    .where("name", "==", name)
    .where("owner", "==", owner);

  docRef.get().then(querySnapshot => {
    const empty = querySnapshot.empty;

    if (empty) {
      window.location = `/new?repo=https://github.com/${props.match.params.owner}/${props.match.params.name}`;
    } else {
      querySnapshot.forEach(doc => {
        const projectData = doc.data();
        setProject(projectData);
        setIsLoading(false);
      });
    }
  });

  return (
    <div>
      {isLoading ? (
        <p class="center">fetching</p>
      ) : (
        <div>
          <Helmet>
            <title>
              Oasis: {project.owner}/{project.name}
            </title>
          </Helmet>

          <Navbar />

      
        </div>
      )}
    </div>
  );
}

export default withRouter(Project);
