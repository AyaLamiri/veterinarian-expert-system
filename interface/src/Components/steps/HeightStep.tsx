import styles from "./input.module.css"

type HeightData = {
    height: string
}

type HeightStepProps = HeightData & {
    updateFields: (fields: Partial<HeightData>) => void
}

export function HeightStep({height, updateFields}: HeightStepProps) {
    return(
        <>
            <label>Height</label>
            <input required className={styles.input} type="number" min={100} value={height} onChange={e => updateFields({height: e.target.value})}/>        
        </>
    )
}