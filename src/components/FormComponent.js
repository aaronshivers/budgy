import React, { useState, useReducer, useEffect } from 'react'
import { Form, FormControl, Button } from 'react-bootstrap'

const reducer = (state, action) => {
  console.log(action, 'state:', state)
  switch(action.type) {
    case 'POPULATE_BUDGET':
      return action.budget
    case 'UPDATE_BUDGET':
      return { budget: action.budget }
    default:
      return state
  }
}

const FormComponent = () => {
  const [ state, dispatch ] = useReducer(reducer, {})
  const [ income, setIncome ] = useState('')
  const [ rent, setRent ] = useState('')

  const handleUpdateBudget = e => {
    e.preventDefault()
    const budget = {
      income,
      rent
    }
    dispatch({ type: 'UPDATE_BUDGET', budget })
  }

  const sanitizeString = string => {
    return string.split('').filter(char => char.match(/\d/)).join('')
  }

  useEffect(() => {
    const budget = JSON.parse(localStorage.getItem('budgy'))
    if (budget) dispatch({ type: 'POPULATE_BUDGET', budget })
  }, [])

  useEffect(() => {
    console.log(state)
    localStorage.setItem('budgy', JSON.stringify(state))
  }, [state])

  useEffect(() => console.log(income), [income])

  return (
    <div>
      <form onSubmit={ handleUpdateBudget }>
        <Form.Group>
          <Form.Label>Income</Form.Label>
          <Form.Control
            value={ income }
            onChange={ e => setIncome(sanitizeString(e.target.value)) }
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Rent</Form.Label>
          <Form.Control
            value={ rent }
            onChange={ e => setRent(sanitizeString(e.target.value)) }
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
