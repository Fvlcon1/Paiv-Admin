import { TypographyBold, TypographySize } from "./style.types"

export const colors = {
    text : {
        primary : '#E7E7EB',
        secondary : '#C6C6C8',
        tetiary : '#7C7C88',
    },
    bg : {
        primary : '#15151F',
        secondary : '#191923',
        tetiary : '#25252E',
        quantinary : "#32323e"
    },
    border : {
        primary : "#272737",
        secondary : '#2C2C3F',
        tetiary : '#3A3A46',
        quantinary : '#2f2f39'
    },
    main : {
        primary : '#6060D0'
    }
}

export const cssColors = {
    text : {
        primary : 'var(--text-primary)',
        secondary : 'var(--text-secondary)',
        tetiary : 'var(--text-tetiary)',
    },
    bg : {
        primary : 'var(--bg-primary)',
        secondary : 'var(--bg-secondary)',
        tetiary : 'var(--bg-tetiary)',
        quantinary : 'var(--bg-quantinary)',
    },
    border : {
        primary : "var(--border-primary)",
        secondary : "var(--border-primary)",
        tetiary : "var(--border-primary)",
        quantinary : "var(--border-quantinary)"
    },
    main : {
        primary : 'var(--main-primary)'
    }
}

export const theme = {
    colors,

    typography: {
        size: { 
            body: TypographySize.body,
            HL: TypographySize.HL,
            HM: TypographySize.HM,
        },
        bold: { sm: TypographyBold.sm, md: TypographyBold.md, lg: TypographyBold.lg },
      },
}

export default theme