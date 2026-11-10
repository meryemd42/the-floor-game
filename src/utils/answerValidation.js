export function normalizeAnswer(answer) {
  return answer.trim().toLowerCase().replace(/\s+/g, ' ')
}

export function isCorrectAnswer(userAnswer, acceptedAnswers) {
  const normalizedUserAnswer = normalizeAnswer(userAnswer)

  return acceptedAnswers.some((answer) => {
    return normalizeAnswer(answer) === normalizedUserAnswer
  })
}
