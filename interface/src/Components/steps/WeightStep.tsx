import styles from "./input.module.css"

type WeightData = {
    weight: string
}

type WeightStepProps = WeightData & {
    updateFields: (fields: Partial<WeightData>) => void
}

export function WeightStep({weight, updateFields}: WeightStepProps) {
    return(
        <>
            <label>Weight</label>
            <input required className={styles.input} type="number" min={1} value={weight} onChange={e => updateFields({weight: e.target.value})}/>
        </>
    )
}