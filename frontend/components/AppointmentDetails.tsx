import { ViewStyle } from "react-native"

interface AppointmentDetailsProps{
  children: React.ReactNode
  style?: ViewStyle
  index?: number
}

const AppointmentDetails:React.FC<AppointmentDetailsProps>=()=>{
    return(
        <div>
            This is the appointment details of the patient
        </div>
    );
}