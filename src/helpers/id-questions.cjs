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

function addUniqueIds(questionsData) {
  for (let chapter in questionsData["questions_per_chapter"]) {
    questionsData["questions_per_chapter"][chapter].forEach((question) => {
      question.id = generateUniqueId(question.question); // Add unique ID based on the question text
    });
  }

  // Return the modified data
  return questionsData;
}

const updatedQuestionsData = addUniqueIds(questionsData);
console.log(updatedQuestionsData);

fs.writeFile(
  "updated_questions_data_2.json",
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
