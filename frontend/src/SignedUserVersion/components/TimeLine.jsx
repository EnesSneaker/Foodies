import { useState, useEffect } from "react";
import TimelineCard from "./TimelineCard.jsx";
import {Button} from "flowbite-react";
import api from "../../config/api";

const fetchTimeline = async (token, choice) => {
  const authString = `Bearer ${token}`;
  const response = await fetch(`${api.BACKEND.getUrl}/timeline/${choice}`, {
    method: "GET",
    headers: {
      Authorization: authString,
    },
    credentials: "include",
  });

  return await response.json();
};



function TimeLine(props) {
  const [timelineData, setTimelineData] = useState([]);

  const [timelineChoice, setTimelineChoice] = useState("");

  useEffect(() => {
    if (props.user !== null) {
      console.log("fetching timeline, token:" + props.user);
      fetchTimeline(props.user, timelineChoice).then((data) => setTimelineData(data));
    }
  }, [props.user, timelineChoice]);

  const handleChoiceButton = () => {
    if(timelineChoice === ""){
      setTimelineChoice("all")
    }
    else(setTimelineChoice(""))

    //fetchTimeline(props.user, timelineChoice).then((data) => setTimelineData(data))
  }
  console.log(timelineData);

  return (
    <div>
      <Button onClick={handleChoiceButton}>{timelineChoice === "" ? "Friends&You" : "Everyone"}</Button>
      {timelineData.map((recipe) => {
        return (
          <TimelineCard
            recipeName={recipe.name}
            recipeUsername={recipe.userName}
            recipeFlavourtype={recipe.flavourType}
            user={props.user}
            followable={timelineChoice === "all" ? true : false}
            key={recipe.id}
          />
        );
      })}
    </div>
  );
}

export default TimeLine;
