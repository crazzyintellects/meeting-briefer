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
    summary: [
      {
        start: new Date('August 19, 2020 9:30:00'),
        text: "software testing can also provide an objective , independent view of the software to allow the business to appreciate and understand the risks of software implementation . test techniques include the process of executing a program or application with the intent of finding software bugs ( errors or other defects ) .\n",
        interval: 1,
      },
      {
        start: new Date('August 19, 2020 9:40:00'),
        text: "the job of testing is an iterative process as when one bug is fixed . the job of testing is an iterative process as when one bug is fixed , it can illuminate other , deeper bugs , or create new ones . software testing can be conducted as soon as executable software ( even if partially complete ) exists .\n",
        interval: 2,
      },
      {
        start: new Date('August 19, 2020 9:50:00'),
        text: "testing can be conducted as soon as executable software ( even if testing is conducted . for example , most testing occurs after system requirements have been defined and then implemented in testable programs . in a phased process , most testing occurs after system requirements have been defined and then implemented in testable programs . in a phased process , most testing occurs after system requirements have been defined and then implemented in testable",
        interval: 3,
      },
      {
        start: new Date('August 19, 2020 10:00:00'),
        text: "the number of defects in a software product can be very large and defects that occur infrequently are difficult to find in testing . more significantly , non-functional dimensions of quality ( how it is supposed to be versus what it is supposed to be versus what it is supposed to do ) —usability , scalability , scalability , performance , compatibility , reliability—can be highly subjective; something that constitutes sufficient value to one person may be intolerable to another .\n",
        interval: 4,
      },
      ],
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
  