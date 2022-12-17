-- QUIESTIONNAIREID = είναι η παράμετρος ID του ερωτηματολογίου για το οποίο θέλουμε να δούμε τα στοιχεία
select questionnaire_id, title 
from Questionnaire
where questionnaire_id = QUESTIONNAIREID;

select keyword_text
from Keyword
where Questionnaire_questionnaire_id = QUIESTIONNAIREID;

select question_id, question_text, required, type
from Question
where Questionnaire_questionnaire_id = QUIESTIONNAIREID;