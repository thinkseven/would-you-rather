import React, { Component } from 'react'
import { connect } from 'react-redux'
import Navigation from './Navingation'

class Question extends Component {
  render() {
    const { name, avatarURL, questionId, options } = this.props
    return (
      <div>
        <div>
          <Navigation />
        </div>
        <div className="wrapper">
          <div className="top">
            <div className="main">
              <div>
                <h3>{`${name} asks:`}</h3>
              </div>
            </div>
          </div>
          <div className="bottom">
            <div className="left">
              <div>
                <img src={avatarURL} alt={name} />
              </div>
            </div>
            <div className="seperator" />
            <div className="right">
              <div>
                <h3>Would You Rather ...</h3>
              </div>
              {options.map(option => {
                const { text } = option
                return (
                  <div>
                    <input type="radio" name={questionId} checked />
                    <label for={text}>{text}</label>
                  </div>
                )
              })}
              <div>
                <button name="submit" type="submit">
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({ users, questions }, { match }) => {
  const id = match.params.id

  const formatOption = (option, questionId) => ({
    questionId: questionId,
    text: option.text,
  })

  const getOptions = (question, questionId) => {
    const options = []
    options.push(formatOption(question.optionOne, questionId))
    options.push(formatOption(question.optionTwo, questionId))
    return options
  }

  return {
    name: users[questions[id].author].name,
    avatarURL: users[questions[id].author].avatarURL,
    questionId: id,
    options: getOptions(questions[id], id),
  }
}

export default connect(mapStateToProps)(Question)
