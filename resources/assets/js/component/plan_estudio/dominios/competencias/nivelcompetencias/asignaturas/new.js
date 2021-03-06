import React, { useState } from 'react';
import Autosuggest from 'react-autosuggest';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';


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





export default function NewAsignatura({ openNew, handleCloseNew, nivel_competencia, nivel_competencia_generica, asignaturas, handleAddElement, addNotification }) {
    const classes = useStyles();
    const [value, setvalue] = useState('');
    const [suggestions, setsuggestions] = useState([]);
    const [existeasoc, setexisteasoc] = useState(false);
    
    const filtrarsugerencias = [];
    nivel_competencia ?
        nivel_competencia.nivel_competencia_asignaturas.map((nivel_competencia_asignatura, i) =>
            filtrarsugerencias[i] = nivel_competencia_asignatura.asignatura.id
        )
        :
        nivel_competencia_generica &&
        nivel_competencia_generica.nivel_genericas[0].nivel_generica_asignaturas.map((nivel_generica_asignatura, i) =>
            filtrarsugerencias[i] = nivel_generica_asignatura.asignatura.id
        );
    const sugerencias = asignaturas.filter(asignatura => !filtrarsugerencias.includes(asignatura.id));


    function escapeRegexCharacters(str) {
        return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    }

    function getSuggestions(value) {
        const escapedValue = escapeRegexCharacters(value.trim());

        if (escapedValue === '') {
            return [];
        }
        const regex = new RegExp('^' + escapedValue, 'i');
        return sugerencias.filter(sugerencia => regex.test(sugerencia.nombre));
    }

    function getSuggestionValue(suggestion) {
        return suggestion.nombre;
    }

    function renderSuggestion(suggestion) {
        return (
            <span>{suggestion.nombre}</span>
        );
    }
    function onChange(event, { newValue, method }) {
        setvalue(newValue);
    };

    function onSuggestionsFetchRequested({ value }) {
        let aux = false;
        filtrarsugerencias.map(filtrarsugerencia => {
            if (asignaturas.find(asignatura => asignatura.id == filtrarsugerencia).nombre == value) {
                aux = true;
            }
        })
        setexisteasoc(aux);

        setsuggestions(getSuggestions(value));
    };

    function onSuggestionsClearRequested() {
        setsuggestions([]);

    };
    function addElemento() {
        let form = {};        
        let variable = '';
        let existe = false;
        let idAsignatura = 0;
        asignaturas.map(asignatura => {
            if (asignatura.nombre == value) {
                existe = true;
                idAsignatura = asignatura.id;
            }
        })
        if (existe) {
            if (nivel_competencia) {
                variable = 'nivel_competencia_asignaturas';
                form = {
                    nivel_competencia_id: nivel_competencia.id,
                    asignatura_id: idAsignatura
                }
            }
            else {
                if (nivel_competencia_generica) {
                    variable = 'nivel_generica_asignaturas';
                    form = {
                        nivel_generica_id: nivel_competencia_generica.nivel_genericas[0].id,
                        asignatura_id: idAsignatura
                    }
                }
            }
        }
        if (!existe) {
            variable = 'asignaturas';
            if (nivel_competencia) {
                form = {
                    nivel_competencia_id: nivel_competencia.id,
                    nombre: value
                }
            }
            else {
                {
                    variable = 'asignaturas';
                    form = {
                        nivel_generica_id: nivel_competencia_generica.nivel_genericas[0].id,
                        nombre: value
                    }
                }
            }
        }

        fetch(`/api/${variable}/`, {

            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
            ,
            body: JSON.stringify(
                form
            )
        })
            .then(function (response) {
                if (response.ok) {
                    return response.json();
                } else {
                    throw "Error en la llamada Ajax";
                }

            })
            .then(function (data) {
                if (existe) {
                    if (data.nivel_competencia_id) {
                        handleAddElement(variable, data);
                        addNotification();
                        handleCloseNew();
                        setvalue("");
                    }
                    else {
                        if (data.nivel_generica_id) {
                            handleAddElement(variable, data);
                            addNotification();
                            handleCloseNew();
                            setvalue("");
                        }
                    }
                }
                else {
                    if (data[1].nivel_competencia_id) {
                        handleAddElement(variable, data);
                        addNotification();
                        handleCloseNew();
                        setvalue("");
                    }
                    else {
                        if (data[1].nivel_generica_id) {
                            handleAddElement(variable, data);
                            addNotification();
                            handleCloseNew();
                            setvalue("");
                        }
                    }
                }
            }
            )
            .catch(function (error) {
                console.log('Hubo un problema con la petición Fetch:' + error.message);
            })
    }
    const inputProps = {
        placeholder: "Type 'c'",
        value,
        onChange: onChange
    };

    return (
        <div>
            <Dialog open={openNew} onClose={handleCloseNew} scroll='body' disableEscapeKeyDown>
                <DialogTitle id="form-dialog-title">Asociar Asignatura</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Ingrese un nuevo nombre de asignatura para asociar o utilice una de las existentes.
                    </DialogContentText>
                    <Autosuggest
                        suggestions={suggestions}
                        onSuggestionsFetchRequested={onSuggestionsFetchRequested}
                        onSuggestionsClearRequested={onSuggestionsClearRequested}
                        getSuggestionValue={getSuggestionValue}
                        renderSuggestion={renderSuggestion}
                        inputProps={inputProps}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseNew} color="primary">
                        Cancel
                    </Button>
                    {
                        existeasoc || value == "" ?
                        <Button disabled onClick={() => addElemento()} color="primary">
                            Asociar
                        </Button>
                        :
                        <Button onClick={() => addElemento()} color="primary">
                            Asociar
                        </Button>
                    }
                    
                </DialogActions>
            </Dialog>
        </div>
    );
}