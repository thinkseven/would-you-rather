import {
  getUser,
  getUsersQuestions,
  saveQuestion,
  saveQuestionAnswer,
} from '../utils/API'
import fetchUsers, { addUserQuestion, addUserPoll } from '../actions/users'
import fetchQuestions, {
  addQuestion,
  addQuestionPoll,
} from '../actions/questions'
import login from '../actions/authentication'
import { showLoading, hideLoading } from 'react-redux-loading'

export default function AuthenticateUser(userid) {
  return dispatch => {
    dispatch(showLoading())
    return getUser(userid).then(user => {
      setTimeout(() => {
        if (user && user.id && user.id === userid) {
          return getUsersQuestions().then(({ users, questions }) => {
            dispatch(
              fetchUsers({
                ...users,
              }),
            )
            dispatch(
              fetchQuestions({
                ...questions,
              }),
            )
            dispatch(hideLoading())
            dispatch(login(user))
          })
        }
      }, 2000)
    })
  }
}

export function SubmitPoll({ authedUser, qid, answer }) {
  return dispatch => {
    dispatch(showLoading())
    saveQuestionAnswer({
      authedUser,
      qid,
      answer,
    }).then(() => {
      dispatch(
        addUserPoll({
          authedUser,
          questionId: qid,
          selectedOption: answer,
        }),
      )
      dispatch(
        addQuestionPoll({
          authedUser,
          questionId: qid,
          selectedOption: answer,
        }),
      )
      dispatch(hideLoading())
    })
  }
}

export function AddQuestion(question) {
  return dispatch => {
    dispatch(showLoading())
    saveQuestion(question).then(question => {
      dispatch(addQuestion(question))
      dispatch(addUserQuestion(question))
      dispatch(hideLoading())
    })
  }
}
