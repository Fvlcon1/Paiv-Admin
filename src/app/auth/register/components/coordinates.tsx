import Text from "@styles/components/text"
import FormInput from "../../form input/formInput"
import { useFormik } from "formik"
import * as Yup from "yup";
import theme from "@styles/theme";
import { FaLocationCrosshairs } from "react-icons/fa6";
import Button from "@components/button/button";
import { useClickAway } from "react-use";
import { Dispatch, SetStateAction, useEffect, useRef } from "react";

const Coordinates = ({
    setDisplay,
    setCoodinatesInput,
    setCoordinates,
    coordinates,
    setLongitude,
    longitude,
    setLatitude,
    latitude,
    parentFormik
} : {
    setDisplay : Dispatch<SetStateAction<boolean>>
    setCoodinatesInput: (value: string) => void
    setCoordinates: Dispatch<SetStateAction<string>>
    coordinates: string
    setLongitude: Dispatch<SetStateAction<string>>
    longitude: string
    setLatitude: Dispatch<SetStateAction<string>>
    latitude: string
    parentFormik : any
}) => {
    const coordinatesRef = useRef<HTMLDivElement>(null);
    const validationSchema = Yup.object({
        longitude: Yup
            .string()
            .required("longitude is required."),
        latitude: Yup
            .string()
            .required("latitude is required."),
    });
    
    const formik = useFormik({
        initialValues: {
            longitude : longitude,
            latitude : latitude,
        },
        validationSchema,
        onSubmit: async (values) => {
            setCoodinatesInput(`${values.latitude}, ${values.longitude}`)
            setDisplay(false)
        },
    })

    useEffect(()=>{
        setLongitude(formik.values.longitude)
        setLatitude(formik.values.latitude)
        parentFormik.setFieldValue("latitude", formik.values.latitude)
        parentFormik.setFieldValue("longitude", formik.values.longitude)
        parentFormik.setFieldValue("manual", true)
    },[formik.values])

    useClickAway(coordinatesRef, () => {
        setDisplay(false);
     });

    return (
        <div ref={coordinatesRef} className="w-full flex flex-col gap-1">
            <div className="flex gap-2 px-2 py-2">
                <FormInput
                    value={formik.values.latitude}
                    handleChange={formik.handleChange}
                    handleBlur={formik.handleBlur as any}
                    touched={formik.touched.latitude}
                    error={formik.errors.latitude}
                    PreIcon={<FaLocationCrosshairs color={theme.colors.text.tetiary}/>}
                    name="latitude"
                    type="number"
                    placeholder="Eg: 00.0000000"
                    label="Latitude"
                />
                <FormInput
                    value={formik.values.longitude}
                    handleChange={formik.handleChange}
                    handleBlur={formik.handleBlur as any}
                    touched={formik.touched.longitude}
                    error={formik.errors.longitude}
                    PreIcon={<FaLocationCrosshairs color={theme.colors.text.tetiary}/>}
                    name="longitude"
                    type="number"
                    placeholder="Eg: 00.000000"
                    label="Longitude"
                />
            </div>
            <div className="w-full h-[1px] bg-bg-quantinary"></div>
            <div className="flex gap-2 px-2 py-2 w-full justify-end">
                <Button 
                    text="Cancel"
                    className="!bg-bg-quantinary hover:!bg-bg-secondary"
                    type="button"
                    onClick={()=>setDisplay(false)}
                />
                 <Button 
                    text="Save & Apply"
                    className="!bg-main-primary"
                    type="button"
                    onClick={(e:any)=>formik.handleSubmit(e)}
                />
            </div>
        </div>
    )
}
export default Coordinates