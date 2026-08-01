document.getElementById('submit-btn').addEventListener('click', function () {
  // 1. user inputs
  const daySelect = document.getElementById('day-input').value;
  const monthSelect = document.getElementById('month-select').value;
  const yearInput = document.getElementById('year-input').value;
  const genderSelect = document.getElementById('gender-select').value;
  const resultDiv = document.getElementById('result');

  // Convert string inputs to integers
  const day = parseInt(daySelect);
  const month = parseInt(monthSelect);
  const year = parseInt(yearInput);

  // 2. Input validation
  if (isNaN(day) || day < 1 || day > 31) {
    resultDiv.textContent = "Please select or enter a valid day between 1 and 31.";
    resultDiv.style.color = "red";
    return;
  }

  if (isNaN(month) || month < 1 || month > 12) {
    resultDiv.textContent = "Please select a valid month between 1 and 12.";
    resultDiv.style.color = "red";
    return;
  }

  if (isNaN(year) || yearInput.length !== 4) {
    resultDiv.textContent = "Please enter a valid 4-digit year (e.g., 1998).";
    resultDiv.style.color = "red";
    return;
  }

  if (!genderSelect) {
    resultDiv.textContent = "Please select your gender.";
    resultDiv.style.color = "red";
    return;
  }

  // 3. Extract CC (Century) and YY (Year) for the formula
  const CC = Math.floor(year / 100); // First two digits (e.g., 19 for 1989)
  const YY = year % 100;             // Last two digits (e.g., 89 for 1989)
  const DD = day;
  const MM = month;

  // 4. Calculate day of the week using the provided formula:
  // d = (((CC/4) - 2*CC - 1) + ((5*YY)/4) + ((26*(MM+1))/10) + DD) mod 7
  let d = (
    Math.floor(CC / 4) - (2 * CC) - 1 +
    Math.floor((5 * YY) / 4) +
    Math.floor((26 * (MM + 1)) / 10) +
    DD
  ) % 7;

  // 5. Akan names mapping (0 = Sunday, 1 = Monday, ..., 6 = Saturday)
  const akanNames = {
    male: ["Kwasi", "Kwadwo", "Kwabena", "Kwaku", "Yaw", "Kofi", "Kwame"],
    female: ["Akosua", "Adwoa", "Abenaa", "Akua", "Yaa", "Afua", "Ama"]
  };

  const daysOfWeek = [
    "Sunday", "Monday", "Tuesday", "Wednesday", 
    "Thursday", "Friday", "Saturday"
  ];

  // 6. Match calculated day to the corresponding Akan name
  const akanName = akanNames[genderSelect][d];
  const dayName = daysOfWeek[d];

  // 7. Display the result on the webpage//
  resultDiv.style.color = "blue"
  resultDiv.innerHTML = `You were born on a <strong>${dayName}</strong>.<br>Your Akan name is: <strong>${akanName}</strong>!`;
});