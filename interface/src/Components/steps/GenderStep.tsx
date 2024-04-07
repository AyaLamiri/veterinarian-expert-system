import { useEffect, useState } from "react"
import { Select, SelectOptions } from "./Select"

const options = [
    {label : "Female", value : "Female"},
    {label : "Male", value : "Male"},
  ]

type GenderData = {
    gender: string
}

type GenderStepProps = GenderData & {
    updateFields: (fields: Partial<GenderData>) => void
}

export function GenderStep({gender, updateFields}: GenderStepProps) {
    const [value, setValue] = useState<SelectOptions | undefined>(options[0])
    
    useEffect(() => {
      updateFields({gender: value?.value })
    }, [value])
    return(
        <>
            <label>Gender</label>
            <Select options={options} value={value} onChange={o => setValue(o)}/>
        </>
    )
}
