import React, { createContext } from "react";
import { useSingleMeetingState } from "../hooks/useMeetingState";


const initialMeeting = {
    meetingId: 1,
    meetingName: "",
    meetingURL: "",
    transcript: "",
    startTime: "Sept 10, 2020",
    endTime: "",
    progress: 0,
    completed: false,
    summary: {
      start: new Date(),
      text: "This is good",
      interval: 1,
    },
  };
  export const SingleMeetingContext = createContext();

  export const InitialMeeting = initialMeeting;
  
  export function SingleMeetingProvider(props) {
    const meetingStuff = useSingleMeetingState(initialMeeting);
    return (
      <SingleMeetingContext.Provider value={meetingStuff}>
        {props.children}
      </SingleMeetingContext.Provider>
    );
  }
  