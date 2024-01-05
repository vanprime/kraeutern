CREATE TABLE public.questions (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  created_by uuid DEFAULT NULL, -- Assuming you have a users table
  category TEXT DEFAULT NULL,
  value TEXT DEFAULT NULL,
  question TEXT NOT NULL,
  question_type TEXT DEFAULT 'quiz', -- Question type for rendering logic
  hints JSONB DEFAULT NULL, -- Store multiple hints in a structured format
  choices JSONB DEFAULT NULL, -- For multiple choice questions
  solution TEXT NOT NULL,
  media TEXT DEFAULT NULL, -- Link to bucket storage
  solution_detail TEXT DEFAULT NULL, -- For additional explanation
  CONSTRAINT questions_pkey PRIMARY KEY (id),
  constraint questions_created_by_fkey foreign key (created_by) references auth.users (id) on update cascade on delete set null
);



UPDATE public.questions
SET created_by = 'ba0fef64-e99e-493d-88b2-47636367d31a' WHERE created_by IS NULL,

UPDATE public.questions
SET category = NULL WHERE category = 'NULL',
    value = NULL WHERE value::TEXT = 'NULL',
    question = NULL WHERE question = 'NULL',
    question_type = NULL WHERE question_type = 'NULL',
    solution = NULL WHERE solution = 'NULL',
    media = NULL WHERE media = 'NULL',
    solution_detail = NULL WHERE solution_detail = 'NULL';


INSERT INTO public.game_question_mapping (game_id, question_id, order_number)
SELECT '4db4b15f-38f3-4514-aa6c-b42e050611ce', id, ROW_NUMBER() OVER (ORDER BY created_at) 
FROM public.questions
WHERE question_type = 'jeopardy';

INSERT INTO public.game_question_mapping (game_id, question_id, order_number)
SELECT '8c4ea68f-8015-4b7b-88bc-36c12e14e0dd', id, ROW_NUMBER() OVER (ORDER BY created_at) 
FROM public.questions
WHERE question_type = 'emoji';

INSERT INTO public.game_question_mapping (game_id, question_id, order_number)
SELECT '19eb4c0a-3521-4d5e-8c57-0dc52bc9aff6', id, ROW_NUMBER() OVER (ORDER BY created_at) 
FROM public.questions
WHERE question_type = 'quiz';

INSERT INTO public.game_question_mapping (game_id, question_id, order_number)
SELECT '52425c00-0fc1-4d7b-8d7c-c04968731f36', id, ROW_NUMBER() OVER (ORDER BY created_at) 
FROM public.questions
WHERE question_type = 'image';

INSERT INTO public.game_question_mapping (game_id, question_id, order_number)
SELECT 'b540149f-5605-4450-8efe-386b19cae734', id, ROW_NUMBER() OVER (ORDER BY created_at) 
FROM public.questions
WHERE question_type = 'audio';


