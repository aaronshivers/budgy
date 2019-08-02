import React, { useState, useReducer, useEffect } from 'react'
import { Form, FormControl, Button } from 'react-bootstrap'

const reducer = (state, action) => {
  switch(action.type) {
    case 'POPULATE_BUDGET':
      return action.budget
    case 'SET_INCOME':
      return { income: action.income }
    default:
      return state
  }
}

const FormComponent = () => {
  const [ state, dispatch ] = useReducer(reducer, {})
  const [ income, setIncome ] = useState('')

  const handleUpdateBudget = e => {
    e.preventDefault()
    dispatch({ type: 'SET_INCOME', income })
  }

  const handleSetIncome = e => {
    const inc = e.target.value.split('').filter(char => char.match(/\d/)).join('')

    setIncome(inc)
  }

  useEffect(() => {
    const budget = JSON.parse(localStorage.getItem('budget'))
    if (budget) dispatch({ type: 'POPULATE_BUDGET', budget })
  }, [])

  useEffect(() => {
    console.log(state)
    localStorage.setItem('budget', JSON.stringify(state))
  }, [state])

  useEffect(() => console.log(income), [income])

  return (
    <div>
      <form onSubmit={ handleUpdateBudget }>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Income</Form.Label>
          <Form.Control
            value={ income }
            onChange={ handleSetIncome }
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </form>
    </div>
  )
}

export default FormComponent
