"use client"

import * as React from "react"
import * as LabelPrimitive from "@radix-ui/react-label"

interface TextInnerHtmlProps {
    data: string; // Define la propiedad `data` como un string
    className?: string; // Propiedad opcional para clases CSS
}

function TextInnerHtml({
    className,
    data,
    ...props
}: TextInnerHtmlProps) {
    return (
        <div
            className={` ${className}`}
            dangerouslySetInnerHTML={{ __html: data }}
        />
    )
}

export { TextInnerHtml }
