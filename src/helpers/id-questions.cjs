const fs = require("fs");
const crypto = require("crypto");
const questionsData = require("../data/questions.json");

function generateUniqueId(questionText) {
  return crypto
    .createHash("sha256")
    .update(questionText)
    .digest("hex")
    .slice(0, 10);
}

function addIdsToQuestions(data) {
  data.questions_mixed = data.questions_mixed.map((question, index) => ({
    ...question,
    id: generateUniqueId(`${index}-${question.question}`),
  }));

  for (const chapter in data.questions_per_chapter) {
    data.questions_per_chapter[chapter] = data.questions_per_chapter[
      chapter
    ].map((question, index) => ({
      ...question,
      id: generateUniqueId(`${chapter}-${index}-${question.question}`),
    }));
  }

  return data;
}

const updatedQuestionsData = addIdsToQuestions(questionsData);

fs.writeFile(
  "updated_questions_data.json",
  JSON.stringify(updatedQuestionsData, null, 2),
  (err) => {
    if (err) {
      console.error("Error writing to file", err);
    } else {
      console.log(
        "Updated questions data written to updated_questions_data.json"
      );
    }
  }
);
