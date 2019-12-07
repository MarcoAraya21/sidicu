import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import Edit from './edit';


// --------------------------------------------

import TextField from '@material-ui/core/TextField';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';



const useStyles = makeStyles(theme => ({
  appBar: {
    position: 'relative',
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
    color: '#fff'
  },
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: 'inline',
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function Logros({open, handleClose, nivel_competencia, nivel_competencia_generica, handleInputArrays, borrarElemento, handleAddElement}) {
  const classes = useStyles();

  
  function addElemento(variable){
    //e.preventDefault();
    fetch(`/api/${variable}/`, {
        method: 'post',
        headers: {
            'Accept': 'application/json',
            'Content-Type':'application/json'
        }
        ,
        body: JSON.stringify(
            {nivel_competencia_id: nivel_competencia.id}
        )
    })
    .then(function(response) {
        if(response.ok) {
            return response.json();
        } else {
            throw "Error en la llamada Ajax";
        }
     
     })
     .then( data => handleAddElement(variable, data));
     
    
}

  return (
    <div>
        <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
            <AppBar className={classes.appBar}>
            <Toolbar>
                <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
                <CloseIcon />
                </IconButton>
                <Typography variant="h6" className={classes.title}>
                {nivel_competencia ? nivel_competencia.descripcion
                : nivel_competencia_generica ? nivel_competencia_generica.descripcion
                : "Sin Nombre"}
                </Typography>
                
            </Toolbar>
            </AppBar>
            <DialogContent>
              {!nivel_competencia_generica
              ?
                <div className="border p-3 mb-3">
                    {
                        nivel_competencia.logro_aprendizajes && nivel_competencia.logro_aprendizajes.length > 0 ?
                        nivel_competencia.logro_aprendizajes.map((logro_aprendizaje,i) =>
                            <Edit key={logro_aprendizaje.id}
                            logro_aprendizaje = {logro_aprendizaje}
                            i={i}
                            handleInputArrays = {handleInputArrays}
                            borrarElemento={borrarElemento}/>
                            )
                        :
                        <p>No posee ningun logro de aprendizaje</p>
                    }
                        <div align="right" className="mt-2 mb-1">
                            <button type="button" className="btn btn-primary" onClick={()=>{addElemento('logro_aprendizajes')}}>      
                                <i className="fas fa-plus p-r-5" ></i>Crear Logro de Aprendizaje
                            </button>                    
                        </div>
                </div>
                :
                <div className="border p-3 mb-3">
                    {
                        nivel_competencia_generica.logro_aprendizajes.map((logro_aprendizaje_generico,i) =>
                            <Edit key={logro_aprendizaje_generico.id}
                            logro_aprendizaje_generico = {logro_aprendizaje_generico}
                            i={i}/>
                            )
                    }
                </div>
              }
            </DialogContent>
        </Dialog>
    </div>
  );
}