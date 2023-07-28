import { useEffect, useState } from "react";
import { QuestionModel } from "../../../../model/QuestionModel";
import { SpinnerLoading } from "../../../Utils/SpinnerLoading/SpinnerLoading";
import { AdminQuestion } from "../AdminQuestion/AdminQuestion";

export const Questions = () => {
  const [questions, setQuestions] = useState<QuestionModel[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState("");

  const [isMessageResponded, setIsMessageResponded] = useState(false);

  useEffect(() => {
    const fetchQuestions = async () => {
      const url = `${process.env.REACT_APP_API}/questions/search/findByResponseIsNull?page=0&size=5`;
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
  }, [isMessageResponded]);

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
    <div>
      {questions.length > 0 ?
      <>
      <h3>Pending Q/A</h3>
      {questions?.map(question => <AdminQuestion question={question} setIsMessageResponded={setIsMessageResponded} key={question.id} />)}
      </>
      :
      <h3>No Pending Q/A</h3>
      }
      
    </div>
  );
};