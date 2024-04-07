import React, { useState } from 'react'
import { FormEvent} from 'react'
import './App.css'
import { FormWrapper } from './Components/FormWrapper'
import { AgeStep } from './Components/steps/AgeStep'
import { GenderStep } from './Components/steps/GenderStep'
import { userMultiStepForm } from './Components/userMultiStepForm'
import { WeightStep } from './Components/steps/WeightStep'
import { HeightStep } from './Components/steps/HeightStep'
import { GoalStep } from './Components/steps/GoalStep'
import { ActivityLevelStep } from './Components/steps/ActivityLevelStep'
import { DietaryPreferencesStep } from './Components/steps/DietaryPreferencesStep'
import { FoodAllergiesStep } from './Components/steps/FoodAllergiesStep'

type FormData = {
  gender: string
  age: string
  height: string
  weight: string
  goal: string
  activityLevel: string
  dietaryPreferences: string[]
  foodAllergies: string[]
}

const Initial_Data: FormData = {
  gender: "",
  age: "",
  height: "",
  weight: "",
  goal: "",
  activityLevel: "",
  dietaryPreferences: [],
  foodAllergies: []
}

function App() {
  const [data, setData] = useState(Initial_Data)
  function updateFields(fields: Partial<FormData>){
    setData(prev => {
      return {...prev, ...fields}
    })
  }

  const {steps, currentStepIndex, step, isFirstStep, isLastStep, back, next} = userMultiStepForm([
  <><FormWrapper> <AgeStep {...data} updateFields={updateFields}/> </FormWrapper> </>,
  <><FormWrapper> <GenderStep {...data} updateFields={updateFields}/> </FormWrapper> </>,
  <><FormWrapper> <WeightStep {...data} updateFields={updateFields}/> </FormWrapper> </>,
  <><FormWrapper> <HeightStep {...data} updateFields={updateFields}/> </FormWrapper> </>,
  <><FormWrapper> <GoalStep {...data} updateFields={updateFields}/> </FormWrapper> </>,
  <><FormWrapper> <ActivityLevelStep {...data} updateFields={updateFields}/> </FormWrapper> </>,
  <><FormWrapper> <DietaryPreferencesStep {...data} updateFields={updateFields}/> </FormWrapper> </>,
  <><FormWrapper> <FoodAllergiesStep {...data} updateFields={updateFields}/> </FormWrapper> </>
])

  function onSubmit(e: FormEvent) {
    e.preventDefault()
    if(!isLastStep){
      next()
    } else {
      alert("Your account has been successfully created")
      console.log(data)
    } 
  }

  return (
    <div className='container'>
      <div style={{position:'absolute'}}>
        <h2>Enter your info</h2>
      </div>
      <form onSubmit={onSubmit}>
        <div style={{
          position: 'absolute',
          top: '.5rem',
          right: '.5rem',
        }}>
          {currentStepIndex + 1} / {steps.length}
        </div>
        {step}
        <div>
          {!isFirstStep && <button className='btn btn-back' type="button" onClick={back} >Back</button>}
          {!isLastStep ? <button className='btn btn-next' type="submit">Next</button>
                       : <button className='btn btn-submit' type="submit">Submit</button>}
        </div>
      </form>
    </div>
  )
}

export default App
