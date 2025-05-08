import {TextField} from "@mui/material/";
type Props ={
    name: string;
    type:string;
    label:string;
}

const CustomizedInput = (props: Props)=>{
    
    return (
        <TextField margin="normal"
        slotProps={{ inputLabel: { style: { color: "black" } }, 
        htmlInput:{style:{width:"400px", BorderRadius:10, fontSize:20, color:"white"}} }}  
        name={props.name} type={props.type} label={props.label} 
        />
    );  
};
export default CustomizedInput;