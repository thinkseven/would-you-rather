import {
  FETCH_USERS,
  ADD_USER_QUESTION,
  ADD_USER_POLL,
  RESET_USERS,
} from '../actions/users'

export default function users(state = {}, action) {
  switch (action.type) {
    case FETCH_USERS:
      return {
        ...state,
        ...action.users,
      }
    case ADD_USER_QUESTION:
      return {
        ...state,
        [action.question.author]: {
          ...state[action.question.author],
          questions: [
            ...state[action.question.author].questions,
            action.question.id,
          ],
        },
      }
    case ADD_USER_POLL:
      return {
        ...state,
        [action.poll.authedUser]: {
          ...state[action.poll.authedUser],
          answers: {
            ...state[action.poll.authedUser].answers,
            [action.poll.questionId]: action.poll.selectedOption,
          },
        },
      }
    case RESET_USERS:
      return {}
    default:
      return state
  }
}
