import QuizMockService from './QuizMockService.js'

const example = {
  'quizModule': 'Fruits and the UK!',
  'questions': [
    { 
      'body': 'Are bananas delicious?',
      'choices': [
        {
          'choiceId': 1,
          'body': 'Yes'
        },
        {
          'choiceId': 2,
          'body': 'No'
        }
      ]
    },
    { 
      'body': 'Select the correct statement:',
      'choices': [
        {
          'choiceId': 3,
          'body': 'The UK was part of the European Union.'
        },
        {
          'choiceId': 4,
          'body': 'The UK is not part of the European Union.'
        },
        {
          'choiceId': 5,
          'body': 'The UK is an empire.'
        },
        {
          'choiceId': 6,
          'body': '(a) and (b).'
        },
        {
          'choiceId': 7,
          'body': 'None of these options.'
        },
      ]
    },
  ],
  'answerKey': [
    {
      'questionId': 1,
      'choiceId': 1
    },
    {
      'questionId': 2,
      'choiceId': 6
    }
  ]
};

test('Validate a quiz json payload for proper members', () => {
  const json = JSON.stringify(example);
  const valid = QuizMockService._validateQuizPayload(json);
  expect(valid).toBe(true);
});

test('Add a new quiz', async () => {
  const quizSvc = new QuizMockService();
  let jsonString = await quizSvc.getQuizList();
  const beforeAdd = JSON.parse(jsonString);
  expect(beforeAdd.length).toBe(0);

  jsonString = await quizSvc.addQuiz(JSON.stringify(example));

  jsonString = await quizSvc.getQuizList();
  const afterAdd = JSON.parse(jsonString);
  expect(afterAdd.length).toBe(1);
});

test('Get all quizzes and they have ids', async () => {
  const quizSvc = new QuizMockService();
  const modules = [ 
    'Fruits and the UK!',
    'Supernatural fun facts!',
    'Marvels of the superhero universe!',
    'Spacious anecdotes about space!'
  ];
  modules.forEach(async (m) => {
    example.quizModule = m;
    await quizSvc.addQuiz(JSON.stringify(example));
  });

  let jsonString;
  jsonString = await quizSvc.getQuizList();
  const listOfQuizzes = JSON.parse(jsonString);
  expect(listOfQuizzes.length).toBe(4);
  listOfQuizzes.forEach((element, index) => {
    expect(element.quizId).toBe(index+1);
  });
  expect(listOfQuizzes[1].quizId).toBe(2);
  expect(listOfQuizzes[1].quizModule).toEqual('Supernatural fun facts!');
});

test('Add multiple quizzes simultaneously', async () => {
  const quizSvc = new QuizMockService();
  const modules = [ 
    'Fruits and the UK!',
    'Supernatural fun facts!',
    'Marvels of the superhero universe!',
    'Spacious anecdotes about space!'
  ];
  let examples = [];
  modules.forEach(m => {
    let newExample = {...example};
    newExample.quizModule = m;
    examples.push(newExample);
  });

  let jsonString;
  await quizSvc.addManyQuizzes(JSON.stringify(examples));
  jsonString = await quizSvc.getQuizList();
  const listOfQuizzes = JSON.parse(jsonString);
  expect(listOfQuizzes.length).toBe(4);
  listOfQuizzes.forEach((element, index) => {
    expect(element.quizId).toBe(index+1);
  });
  expect(listOfQuizzes[1].quizId).toBe(2);
  expect(listOfQuizzes[1].quizModule).toEqual('Supernatural fun facts!');
});

test('Get one quiz by id', async () => {
  const quizSvc = new QuizMockService();
  const modules = [ 
    'Fruits and the UK!',
    'Supernatural fun facts!',
    'Marvels of the superhero universe!',
    'Spacious anecdotes about space!'
  ];
  let examples = [];
  modules.forEach(m => {
    let newExample = {...example};
    newExample.quizModule = m;
    examples.push(newExample);
  });

  let jsonString;
  await quizSvc.addManyQuizzes(JSON.stringify(examples));
  jsonString = await quizSvc.getQuizList();
  const listOfQuizzes = JSON.parse(jsonString);
  expect(listOfQuizzes.length).toBe(4);
  jsonString = await quizSvc.getQuizById(3);
  const theQuiz = JSON.parse(jsonString);
  expect(theQuiz.quizId).toBe(3);
  expect(theQuiz.quizModule).toEqual('Marvels of the superhero universe!');
});

test('Throws error if new quiz isn\'t in the right format', async() => {
  const quizSvc = new QuizMockService();
  let jsonString = await quizSvc.addQuiz('{ "quizModule": "An incomplete quiz" }');
  const createResult = JSON.parse(jsonString)
  expect(createResult).toHaveProperty('errorCode');
  expect(createResult.errorCode).toBe(422);

  jsonString = await quizSvc.getQuizList();
  const afterAdd = JSON.parse(jsonString);
  expect(afterAdd.length).toBe(0);
});

test('Throws error if any new quiz isn\'t in the right format', async() => {
  const quizSvc = new QuizMockService();
  const modules = [ 
    'Fruits and the UK!',
    'Supernatural fun facts!',
    'Marvels of the superhero universe!',
    'Spacious anecdotes about space!'
  ];
  let examples = [];
  modules.forEach(m => {
    let newExample = { quizModule: m };
    newExample.quizModule = m;
    examples.push(newExample);
  });

  let jsonString;
  jsonString = await quizSvc.addManyQuizzes(JSON.stringify(examples));
  const createResult = JSON.parse(jsonString)
  expect(createResult).toHaveProperty('errorCode');
  expect(createResult.errorCode).toBe(422);
});