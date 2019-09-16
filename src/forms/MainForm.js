import React, { Component } from 'react';

import Navigation from "../components/Navigation";
import './MainForm.css';

import { ExcelRenderer } from 'react-excel-renderer';
import * as firebase from 'firebase'

class MainForm extends Component {

    /*constructor(props) {
        super(props);

    }
*/
    onChange(file) {


    }

    fileHandler = (event) => {
        let fileObj = event.target.files[0];

        ExcelRenderer(fileObj, (err, resp) => {
            if (err) {
                console.log(err);
            }
            else {
                try {
                    console.log(resp.rows);
                    let cont = 0;
                    for (let i = 0; i < resp.rows.length; i++) {
                        let fila = resp.rows[i];

                        if (fila.length > 10 && fila[0] !== "Codigo") {
                            console.log(fila);
                            cont++;
                            let dias = [false, false, false, false, false, false, false];
                            for (let j = 0; j < 7; j++) {
                                if (fila[j + 7] === "X") {
                                    dias[j] = true;
                                }
                            }
                            firebase.database().ref("Horario/001/" + cont).set({
                                codigo: fila[0],
                                nombre: fila[1],
                                seccion: fila[2],
                                edificio: fila[3],
                                salon: fila[4],
                                horaInicio: fila[5],
                                horaFin: fila[6],
                                Lunes: dias[0],
                                Martes: dias[1],
                                Miercoles: dias[2],
                                Jueves: dias[3],
                                Viernes: dias[4],
                                Sabado: dias[5],
                                Domingo: dias[6],
                                catedratico: fila[14]
                            }).then(() => {
                                console.log("Insertado");
                            }).catch((error) => {
                                console.log(error);
                            });
                        }

                    }
                } catch (error) {
                    console.log(error);
                }
            }
        });
    }

    render() {
        return (
            <div className="App">
                <Navigation title="Administración:" />

                <div>
                    <h1>THE BEST SCHEDULE</h1>

                    <h1>Subir horario:</h1>
                    <input type="file" onChange={this.fileHandler.bind(this)} style={{ "padding": "10px" }} />

                </div>
            </div>

        );
    }
}

export default MainForm;
