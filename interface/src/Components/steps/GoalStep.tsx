import { useEffect, useState } from "react"
import { Select, SelectOptions } from "./Select"

type GoalData = {
    goal: string
}

type GoalStepProps = GoalData & {
    updateFields: (fields: Partial<GoalData>) => void
}

const options = [
    {label : "Weight Loss", value : "Weight Loss"},
    {label : "Muscle Gain", value : "Muscle Gain"},
    {label : "Weight Maintenance", value : "Weight Maintenance"},
  ]

export function GoalStep({goal, updateFields}: GoalStepProps) {
    const [value, setValue] = useState<SelectOptions | undefined>(options[0])
    
    useEffect(() => {
      updateFields({goal: value?.value })
    }, [value])
    return(
        <>
            <label>Goal</label>
            <Select options={options} value={value} onChange={o => setValue(o)}/>
        </>
    )
}