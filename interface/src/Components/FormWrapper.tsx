import { ReactNode } from "react"
import React from "react"

type FormWrapperProps = {
    children : ReactNode
}

export function FormWrapper({children} : FormWrapperProps) {
    const childrenStyle : React.CSSProperties = {
        textAlign : 'center',
        marginBottom : "2rem",
        display: "grid",
        gap: "1rem .5rem",
        justifyContent: "flex-start",
        gridTemplateColumns: "auto minmax(auto, 400px)",
        marginTop: '125px'
    }
    return(
        <>
            <div style={childrenStyle}>{children}</div>
        </>
    )
}