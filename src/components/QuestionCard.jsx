function QuestionCard({ question }) {
  return (
    <div className="question-card">
      <h2>What is this?</h2>

      <img
        src={question.image}
        alt="Identify the pictured animal"
      />
    </div>
  )
}

export default QuestionCard
