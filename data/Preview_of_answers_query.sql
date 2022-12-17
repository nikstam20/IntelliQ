-- SID = session ID of the User for this questionnaire
select Questionnaire_questionnaire_id 
from Session_
where session_id = SID;

select Answer_question_id, answer_id
from Answer 
where Session_session_id = SID