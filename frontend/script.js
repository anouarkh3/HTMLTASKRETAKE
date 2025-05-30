document.getElementById('status').addEventListener('change', async function () {
  const surveyDiv = document.getElementById('survey');
  surveyDiv.innerHTML = ''; // Clear old survey
  const id = this.value === 'Student' ? 1 : this.value === 'Bachelor' ? 2 : null;
  if (!id) return;

  const response = await fetch(`https://my-json-server.typicode.com/depth0/survey1/surveys/${id}`);
  const survey = await response.json();
  for (const questionId of survey.questions) {
    const qRes = await fetch(`https://my-json-server.typicode.com/depth0/survey1/questions/${questionId}`);
    const question = await qRes.json();
    const label = document.createElement('label');
    label.innerHTML = `${question.text}: <input type="text" name="q_${question.id}" required>`;
    surveyDiv.appendChild(label);
    surveyDiv.appendChild(document.createElement('br'));
  }
});

document.getElementById('feedbackForm').addEventListener('submit', function (e) {
  e.preventDefault();
  const formData = new FormData(this);
  const feedback = {};
  for (const [key, value] of formData.entries()) {
    feedback[key] = value;
  }

  // Display feedback locally
  const li = document.createElement('li');
  li.textContent = `${feedback.name} (${feedback.status}): ${feedback.comments}`;
  document.getElementById('feedbackList').appendChild(li);
});
