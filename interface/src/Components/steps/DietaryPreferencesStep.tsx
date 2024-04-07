import { useEffect, useState } from "react"
import { Select, SelectOptions } from "./Select"

type DietaryPreferencesData = {
    dietaryPreferences: string[]
}

type DietaryPreferencesStepProps = DietaryPreferencesData & {
    updateFields: (fields: Partial<DietaryPreferencesData>) => void
}

const options = [
    {label : "Vegan", value : "Vegan"},
    {label : "Vegetarian", value : "Vegetarian"},
    {label : "Gluten Free", value : "Gluten Free"},
  ]

export function DietaryPreferencesStep({dietaryPreferences, updateFields}: DietaryPreferencesStepProps) {
    // const [value,setValue] = useState<SelectOptions | undefined>(options[0])
    const [value,setValue] = useState<SelectOptions[]>([options[0]])

    useEffect(() => {
      const selectedValues = value.map(option => option.value as string);
      updateFields({ dietaryPreferences: selectedValues })
  }, [value])
  
    return (
      <>
      {/* <Select options={options} value={value} onChange={o => setValue(o)}/> */}
      <label>Dietary Preferences</label>
      <Select multiple={true} options={options} value={value} onChange={o => setValue(o)}/>
      </>
    )
}