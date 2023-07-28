import { useEffect, useState } from "react";
import { QuestionModel } from "../../../../model/QuestionModel";
import "./QAResponse.css";
import { SpinnerLoading } from "../../../Utils/SpinnerLoading/SpinnerLoading";
import { useAuth0 } from "@auth0/auth0-react";

export const QAResponse = () => {
  const [questions, setQuestions] = useState<QuestionModel[]>();
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState("");

  const auth0 = useAuth0();

  useEffect(() => {
    const fetchQuestions = async () => {
      const url = `${process.env.REACT_APP_API}/questions/search/findByUserEmail?userEmail=${auth0.user?.email}&page=0&size=5`;
      const response = await fetch(url);
      if (!response.ok) {
        setIsLoading(false);
        setHttpError("Something went wrong");
        return;
      }
      const responseJson = await response.json();
      setQuestions(responseJson._embedded.questions);
      setIsLoading(false);
    };
    fetchQuestions();
  }, []);

  if (isLoading) {
    return (
      <SpinnerLoading />
    )
  }

  if (httpError) {
    return (
      <div className="http-error-container">
        <p>{httpError}</p>
      </div>
    );
  }

  return (
    <div className="q-a-response">
      <h3>Current Q/A</h3>
      {questions?.map(question =>
        <div className="question" key={question.id}>
          <h3>Case {question.id}: {question.title}</h3>
          <div><b>{question.userEmail}</b></div>
          <div>{question.question}</div>
          <hr />
          <h3>Response</h3>
          {question.response ?
            <div>{question.response}</div>
            :
            <div><i>Pending response from administration, please be patient.</i></div>
          }
        </div>
      )}
    </div>
  );
}