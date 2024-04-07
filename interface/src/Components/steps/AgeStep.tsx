import styles from "./input.module.css"
type AgeData = {
    age: string
}

type AgeStepProps = AgeData & {
    updateFields: (fields: Partial<AgeData>) => void
}

export function AgeStep({age, updateFields}: AgeStepProps) {
    return(
        <>
        <label>Age</label>
        <input required className={styles.input} type="number" value={age} onChange={e => updateFields({age: e.target.value})} min={1} />
        </>
    )
}