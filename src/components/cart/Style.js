import {makeStyles} from "@material-ui/core/styles"

export default makeStyles((theme) => ({

    toolbar:theme.mixins.toolbar,

    title:{
        marginTop:"5%",
        display:"flex",
        justifyContent:"center",
        [theme.breakpoints.down("xs")]:{
            fontSize:"28px",
            fontWeight:"500",
        },
    },
    cardDetails:{

        marginTop:"10%",
        width:"100%",
        display:"flex",
        justifyContent:"space-between",
    },

    emptyButton:{
        minWidth:"150px",
        [theme.breakpoints.down("xs")]:{
            marginBottom:"5px"
        },
        [theme.breakpoints.up("xs")]:{
            marginRight:"20px"
        },
    },

    checkOutButton:{
        minWidth:"150px",
    },
    
    link:{
        textDecoration:"none"
    }

}))
