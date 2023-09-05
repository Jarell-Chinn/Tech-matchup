import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
// import { getMatchup, createVote } from '../utils/api';

// Uncomment import statements below after building queries and mutations
import { useQuery, useMutation } from "@apollo/client";
import { CREATE_VOTE } from "../utils/mutations";
import { QUERY_MATCHUPS } from "../utils/queries";
// import { createVote } from "../utils/api";

const Vote = () => {
  const [queryMatchups] = useQuery(QUERY_MATCHUPS);
  const [CreateVote] = useMutation(CREATE_VOTE);
  const [matchup, setMatchup] = useState({});
  let { id } = useParams();

  useEffect(() => {
    const getMatchupInfo = async () => {
      try {
        const res = await queryMatchups({
          variables: { input: id },
        });
        if (!res) {
          throw new Error("No matchup");
        }
        const matchup = res;
        setMatchup(matchup);
      } catch (err) {
        console.error(err);
      }
    };
    getMatchupInfo();
  }, [id]);

  const handleVote = async (techNum) => {
    try {
      const res = await CreateVote({
        variables: { _id: id, techNum: techNum },
      });

      if (!res) {
        throw new Error("Could not vote");
      }

      const matchup = res;
      console.log(matchup);
      setMatchup(matchup);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="card bg-white card-rounded w-50">
      <div className="card-header bg-dark text-center">
        <h1>Here is the matchup!</h1>
      </div>
      <div className="card-body text-center mt-3">
        <h2>
          {matchup.tech1} vs. {matchup.tech2}
        </h2>
        <h3>
          {matchup.tech1_votes} : {matchup.tech2_votes}
        </h3>
        <button className="btn btn-info" onClick={() => handleVote(1)}>
          Vote for {matchup.tech1}
        </button>{" "}
        <button className="btn btn-info" onClick={() => handleVote(2)}>
          Vote for {matchup.tech2}
        </button>
        <div className="card-footer text-center m-3">
          <br></br>
          <Link to="/">
            <button className="btn btn-lg btn-danger">View all matchups</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Vote;
