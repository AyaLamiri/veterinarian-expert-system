import { useEffect, useState } from "react"
import { Select, SelectOptions } from "./Select"

type ActivityLevelData = {
    activityLevel: string
}

type ActivityLevelStepProps = ActivityLevelData & {
    updateFields: (fields: Partial<ActivityLevelData>) => void
}

const options = [
    {label : "Inactive", value : "Inactive"},
    {label : "Casual", value : "Casual"},
    {label : "Moderate", value : "Moderate"},
    {label : "Active", value : "Active"},
    {label : "Very Active", value : "Very Active"},
  ]

export function ActivityLevelStep({activityLevel, updateFields}: ActivityLevelStepProps) {
    const [value, setValue] = useState<SelectOptions | undefined>(options[0])
    
    useEffect(() => {
      updateFields({activityLevel: value?.value })
    }, [value])
    return(
        <>
            <label>Activity Level</label>
            <Select options={options} value={value} onChange={o => setValue(o)}/>
        </>
    )
}