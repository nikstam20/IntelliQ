-- QUIESTIONID = ID of the question we want information about
-- QUIESTIONNAIREID = ID of the quiestionnaire which includes the question above

select Question.Questionnaire_questionnaire_id, Question.question_id, Question.question_text, Question.required, Question.type, Option.option_id, Option.option_text
from Question
inner join Option ON Question.question_id = Option.question_id
where (Question.Questionnaire_questionnaire_id = QUESTIONNAIREID AND Question.question_id = QUIESTIONID);