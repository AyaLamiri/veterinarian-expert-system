import { useEffect, useState } from "react"
import { Select, SelectOptions } from "./Select"

type FoodAllergiesData = {
    foodAllergies: string[]
}

type FoodAllergiesStepProps = FoodAllergiesData & {
    updateFields: (fields: Partial<FoodAllergiesData>) => void
}

const options = [
    { label: "Nuts", value: "Nuts" },
    { label: "Dairy", value: "Dairy" },
    { label: "Seafood", value: "Seafood" },
    { label: "Eggs", value: "Eggs" },
    { label: "Wheat", value: "Wheat" }
  ]

export function FoodAllergiesStep({foodAllergies, updateFields}: FoodAllergiesStepProps) {
    const [value,setValue] = useState<SelectOptions[]>([options[0]])

    useEffect(() => {
      const selectedValues = value.map(option => option.value as string);
      updateFields({ foodAllergies: selectedValues })
  }, [value])
  
    return (
      <>
      <label>Food Allergies</label>
      <Select multiple={true} options={options} value={value} onChange={o => setValue(o)}/>
      </>
    )
}