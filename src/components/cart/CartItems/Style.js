import {makeStyles} from "@material-ui/core/styles"




export default makeStyles((theme) => ({
    root:{
       
        backgroundColor: theme.palette.background.default,
    },
    cardMedia:{
        height: "260px",
    },
    cardContent:{
        display:"flex",
        justifyContent:"space-between",
    },
    cardActions:{
        display:"flex",
        justifyContent:"space-between",
    },
    button:{
        display:"flex",
        alignItems:"center"
    }

}))