import React, { Component } from 'react'

class Score extends Component {
  render() {
    const {
      answeredQuestionsCount,
      avatarURL,
      createdQuestionsCount,
      name,
      score,
    } = this.props.user
    return (
      <div className="score">
        <div className="avatar">
          <img src={avatarURL} alt={name} />
        </div>
        <div className="summary">
          <div>
            <h2>{name}</h2>
          </div>
          <div>
            <p>{`Answered questions: ${answeredQuestionsCount}`}</p>
          </div>
          <div>
            <p>{`Created questions: ${createdQuestionsCount}`}</p>
          </div>
        </div>
        <div className="scoreItem">
          <div>
            <h2>Score</h2>
          </div>
          <div>
            <h2>{`${score}`}</h2>
          </div>
        </div>
      </div>
    )
  }
}

export default Score
