USE `mydb` ;

INSERT INTO questionnaire(questionnaire_id, title)
VALUES (1, "Questionnairo Numero Uno"); 
INSERT INTO question(question_id, question_text, required, type, Questionnaire_questionnaire_id)
VALUES (1, "Your name", 'false', "question", 1);  
INSERT INTO question(question_id, question_text, required, type, Questionnaire_questionnaire_id)
VALUES (2, "Your mum", 'true', "question", 1);  
INSERT INTO question(question_id, question_text, required, type, Questionnaire_questionnaire_id)
VALUES (3, "Your dad", 'false', "question", 1);  


INSERT INTO mydb.option(option_id, option_text, Question_nextquestion_id, Question_Questionnaire_questionnaire_id1, Question_question_id, Question_Questionnaire_questionnaire_id)
VALUES (1, "Athina", 2, 1, 1, 1);  
INSERT INTO mydb.option(option_id, option_text, Question_nextquestion_id, Question_Questionnaire_questionnaire_id1, Question_question_id, Question_Questionnaire_questionnaire_id)
VALUES (2, "Giorgos", 3, 1, 1, 1);   
INSERT INTO mydb.option(option_id, option_text, Question_nextquestion_id, Question_Questionnaire_questionnaire_id1, Question_question_id, Question_Questionnaire_questionnaire_id)
VALUES (3, "Nikolas", 2, 1, 1, 1); 

INSERT INTO mydb.option(option_id, option_text, Question_nextquestion_id, Question_Questionnaire_questionnaire_id1, Question_question_id, Question_Questionnaire_questionnaire_id)
VALUES (4, "Natalia", 3, 1, 2, 1);  
INSERT INTO mydb.option(option_id, option_text, Question_nextquestion_id, Question_Questionnaire_questionnaire_id1, Question_question_id, Question_Questionnaire_questionnaire_id)
VALUES (5, "Veskoukis", 3, 1, 2, 1);  

INSERT INTO mydb.option(option_id, option_text, Question_nextquestion_id, Question_Questionnaire_questionnaire_id1, Question_question_id, Question_Questionnaire_questionnaire_id)
VALUES (6, "Edward", null, 1, 3, 1);  
INSERT INTO mydb.option(option_id, option_text, Question_nextquestion_id, Question_Questionnaire_questionnaire_id1, Question_question_id, Question_Questionnaire_questionnaire_id)
VALUES (7, "Alphonse", null, 1, 3, 1);  

INSERT INTO mydb.session(session_id, Questionnaire_questionnaire_id)
VALUES (20, 1);

INSERT INTO mydb.answer(answer_id, answer_text, Option_option_id, Option_questionnaire_id, Option_question_id, Session_session_id)
VALUES (21, "hey", 1, 1, 1, 20);
INSERT INTO mydb.answer(answer_id, answer_text, Option_option_id, Option_questionnaire_id, Option_question_id, Session_session_id)
VALUES (22, "hey", 1, 1, 2, 20);

INSERT INTO keyword(keyword_id, keyword_text, Questionnaire_questionnaire_id)
VALUES (300, "Sports", 1);
INSERT INTO keyword(keyword_id, keyword_text, Questionnaire_questionnaire_id)
VALUES (400, "Politics", 1);
INSERT INTO keyword(keyword_id, keyword_text, Questionnaire_questionnaire_id)
VALUES (500, "Social", 1);

