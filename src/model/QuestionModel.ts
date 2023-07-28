export class QuestionModel {
  id?: number;
  userEmail: string;
  title: string;
  question: string;
  response?: string;

  constructor(userEmail: string, title: string, question: string) {
    this.userEmail = userEmail;
    this.title = title;
    this.question = question;
  }
}