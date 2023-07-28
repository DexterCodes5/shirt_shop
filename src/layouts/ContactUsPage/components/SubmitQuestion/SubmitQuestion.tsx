import { useState } from "react";
import "./SubmitQuestion.css";
import { QuestionModel } from "../../../../model/QuestionModel";
import { useAuth0 } from "@auth0/auth0-react";
import { SpinnerLoadingAbsolute } from "../../../Utils/SpinnerLoadingAbsolute/SpinnerLoadingAbsolute";

export const SubmitQustion = () => {
  const auth0 = useAuth0();

  const [question, setQuestion] = useState<QuestionModel>(new QuestionModel(auth0.user?.email!, "", ""));
  const [error, setError] = useState("");
  const [displaySuccess, setDisplaySuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const changeQuestion = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setQuestion({ ...question, [name]: value });
  };

  const submitQuestion = async () => {
    if (!question.title || !question.question) {
      setError("All field must be filled out");
      return;
    }
    setIsLoading(true);
    const url = `${process.env.REACT_APP_API}/question/secure`;
    const accessToken = await auth0.getAccessTokenSilently();
    const requestOptions = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(question)
    };
    const response = await fetch(url, requestOptions);
    if (!response.ok) {
      setDisplaySuccess(false);
      setError("Something went wrong");
      return;
    }
    setQuestion(new QuestionModel(auth0.user?.email!, "", ""));
    setIsLoading(false);
    setError("");
    setDisplaySuccess(true);
  };
  
  return (
    <div className="card" style={{ marginTop: "3rem", marginBottom: "3rem" }}>
      <div className="card-top">
        Ask a qustion to the Customer Service
      </div>
      <div className="card-middle">
        {displaySuccess &&
          <div className="card-alert-success">
            Question added successfully
          </div>
        }
        {error &&
          <div className="card-alert-danger">
            {error}
          </div>
        }
        <div className="card-row">
          <div className="card-label">Title</div>
          <input className="input" name="title" value={question.title} onChange={changeQuestion} />
        </div>
        <div className="card-row">
          <div className="card-label">Question</div>
          <textarea className="input" rows={3} name="question" value={question.question} onChange={changeQuestion} />
        </div>
        <div>
          <button className="card-submit-btn" onClick={submitQuestion}>Submit Qustion</button>
        </div>
      </div>
      {isLoading &&
        <SpinnerLoadingAbsolute />
      }
    </div>
  );
};