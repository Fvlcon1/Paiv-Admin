import { TypographyBold, TypographySize } from "./style.types"

export const colors = {
	text: {
        primary: '#3D3D3D',
        secondary: '#292929',
        tetiary: '#A6A6A6',
        danger: '#b93b36',
        success: '#29a333',
    },
    bg: {
        primary: '#FFFFFF',
        primaryLighter : '#FBFBFB',
        secondary: '#F4F4F4',
        tetiary: '#EBEBEB',
        quantinary: "#D0D0D0",
		sidebar : "#022C56"
    },
    border: {
        primary: "#E8EDEF",
        secondary: '#C4D2D9',
        tetiary: '#DDDDDD',
        quantinary: '#C6C6D0',
    },
    main: {
        primary: '#3F6D84'
    }
};

export const theme = {
	colors,
	typography: {
		size: {
            xs: TypographySize.xs,
            xs2: TypographySize.xs2,
            body: TypographySize.body,
            body2: TypographySize.body2,
            HL: TypographySize.HL,
            HM: TypographySize.HM,
            HM2: TypographySize.HM2,
        },
        bold: {
            sm: TypographyBold.sm,
            sm2: TypographyBold.sm2,
            md: TypographyBold.md,
            lg: TypographyBold.lg,
            md2: TypographyBold.md2,
        },
	},
}

export default theme