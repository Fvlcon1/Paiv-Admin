import { TypographyBold, TypographySize } from "./style.types"

export const colors = {
	text: {
		primary: '#0A2540',
		secondary: '#425466',
		tetiary: '#8E98A3',
	},
	bg: {
		primary: '#FFFFFF',
		secondary: '#F7F7FA',
		tetiary: '#EDEDF2',
		quantinary: '#DADAE0',
	},
	border: {
		primary: '#E0E0E7',
		secondary: '#D0D0D8',
		tetiary: '#BDBDC7',
		quantinary: '#C6C6D0',
	},
	main: {
		primary: '#5c5bb8',
	},
};

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