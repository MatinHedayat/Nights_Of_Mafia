export default function randomNumbers(playersLength) {
  const randomNumbers = [];
  let iterationCount = playersLength;

  for (let number = 0; number < iterationCount; number++) {
    const randomNumber = Math.floor(Math.random() * playersLength);
    const numberIsExist = randomNumbers.includes(randomNumber);

    if (!numberIsExist) {
      randomNumbers.push(randomNumber);
    } else iterationCount++;
  }

  return randomNumbers;
}
