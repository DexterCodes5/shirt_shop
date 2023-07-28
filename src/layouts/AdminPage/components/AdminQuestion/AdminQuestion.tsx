import { useState } from "react";
import { QuestionModel } from "../../../../model/QuestionModel";
import { useAuth0 } from "@auth0/auth0-react";

export const AdminQuestion: React.FC<{ 
  question: QuestionModel, setIsMessageResponded: React.Dispatch<React.SetStateAction<boolean>>
 }> = (props) => {
  const [messageResponse, setMessageResponse] = useState("");
  const [error, setError] = useState("");

  const auth0 = useAuth0();

  const changeMessageResponse = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessageResponse(e.target.value);
  }

  const submitResponse = async () => {
    if (!messageResponse) {
      setError("Response is empty");
      return;
    }

    const url = `${process.env.REACT_APP_API}/question/secure`;
    const accessToken = await auth0.getAccessTokenSilently();
    props.question.response = messageResponse;
    const requestOptions = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(props.question)
    };
    const response = await fetch(url, requestOptions);
    if (!response.ok) {
      setError("Something went wrong");
      return;
    }
    props.setIsMessageResponded(prevValue => !prevValue);
  };

  return (
    <div className="question">
      <h3>Case {props.question.id}: {props.question.title}</h3>
      <div><b>{props.question.userEmail}</b></div>
      <div>{props.question.question}</div>
      <hr />
      <h3 style={{ marginBottom: "1rem" }}>Response</h3>
      {error &&
        <div className="card-alert-danger">
          {error}
        </div>
      }
      <textarea className="input" rows={3} value={messageResponse} onChange={changeMessageResponse}></textarea>
      <div>
        <button className="card-submit-btn" onClick={submitResponse}>Submit Response</button>
      </div>
    </div>
  );
};