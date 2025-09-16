'use client'
import theme, { colors } from "@styles/theme";
import { ButtonProps } from "@/utils/@types";
import Text from "@styles/components/text";
import { useState } from "react";
import { TypographyBold } from "@styles/style.types";

const Button = ({
	className,
	id,
	color,
	background,
	border,
	type,
	onClick,
	radius,
	maxWidth,
	size,
	textSize,
	textBold,
	padding,
	loading,
	disabled,
	hover,
	text,
	icon,
	PreIcon,
	PostIcon,
	loadingColor
}: ButtonProps) => {

	const [onHover, setOnHover] = useState<boolean>(false)
	const [onPress, setOnPress] = useState<boolean>(false)

	const getBackground = () => {
		return (onHover && !disabled)
			? hover?.background
			?? background
			?? theme.colors.main.primary
			: background
			?? theme.colors.main.primary
	}

	const getOpacity = () => {
		return (onHover && !disabled)
			? hover?.opacity
			?? 0.8
			: disabled
				? 0.5 : 1
	}

	const getTextColor = () => {
		return onHover ? hover?.color
			? hover.color
			: color ?? theme.colors.bg.primary
			: color ?? theme.colors.bg.primary
	}

	const getButtonStyle = () => {
		return {
			background: getBackground(),
			padding: padding ?? '6px 12px',
			border: border,
			borderRadius: radius ? `${radius}px` : '8px',
			maxWidth,
			width: size?.width ?? 'fit-content',
			height: size?.height ?? '35px',
			opacity: getOpacity(),
			transform: `scale(${onPress ? 0.97 : 1})`
		}
	}

	const loader = (
		<div
			className={`normal-loader !w-[20px]`}
			style={{
				backgroundColor: loadingColor ?? theme.colors.bg.primary
			}}
		/>
	)

	const buttonText = (
		<div
			className="flex w-fit gap-[6px] items-center"
			style={{
				color: getTextColor()
			}}
		>
			{loading ? loader : (icon || PreIcon)}
			<Text
				size={textSize}
				bold={textBold ?? TypographyBold.md}
				textColor={getTextColor()}
				maxLines={1}
				ellipsis
				whiteSpace="nowrap"
			>
				{text ?? 'Button'}
			</Text>
			{
				loading 
					? (icon || PreIcon) 
					? null 
					: PreIcon ? loader : null 
					: PostIcon
			}
		</div>
	)

	return (
		<button
			style={getButtonStyle()}
			onClick={onClick}
			onMouseOver={() => setOnHover(true)}
			onMouseLeave={() => setOnHover(false)}
			onMouseDown={() => setOnPress(true)}
			onMouseUp={() => setOnPress(false)}
			className={`${className} duration-200 ${disabled && 'cursor-not-allowed'} ${loading && 'cursor-wait'} cursor-pointer`}
			disabled={disabled ?? loading}
			type={type ?? 'submit'}
			id={id}
		>
			<div className="w-full justify-center items-center flex gap-[8px]">
				{buttonText}
			</div>
		</button>
	)
}

export default Button