import React, { Component } from 'react';

import Navigation from "../components/Navigation";
import './MainForm.css';

import { ExcelRenderer } from 'react-excel-renderer';
import * as firebase from 'firebase'

class MainForm extends Component {

    constructor(props) {
        super(props);

    }

    fileHandler = (event) => {
        let fileObj = event.target.files[0];

        ExcelRenderer(fileObj, (err, resp) => {
            if (err) {
                console.log(err);
            }
            else {
                //console.log(resp)
                try {
                    //console.log(resp.rows);
                    let cont = 0;
                    for (let i = 0; i < resp.rows.length; i++) {
                        let fila = resp.rows[i];

                        if (fila.length > 10 && fila[0] !== "Codigo") {
                            //console.log(fila);
                            cont++;
                            let dias = [false, false, false, false, false, false, false];
                            for (let j = 0; j < 7; j++) {
                                if (fila[j + 7] === "X") {
                                    dias[j] = true;
                                }
                            }
                            var decimalInicio = fila[5] * 24
                            var horaInicio = parseInt(decimalInicio)
                            var minutosInicio = Math.round((decimalInicio - horaInicio) * 60)
                            var stringInicio = horaInicio + ":" + minutosInicio
                            if (minutosInicio === 0) {
                                stringInicio = stringInicio + "0"
                            } else if (minutosInicio === 60) {
                                horaInicio = horaInicio + 1
                                stringInicio = horaInicio + ":00"
                            }
                            //console.log(horaInicio + ":" + minutosInicio)

                            var decimalFin = fila[6] * 24
                            var horaFin = parseInt(decimalFin)
                            var minutosFin = Math.round((decimalFin - horaFin) * 60)
                            var stringFin = horaFin + ":" + minutosFin
                            if (minutosFin === 0) {
                                stringFin = stringFin + "0"
                            } else if (minutosFin === 60) {
                                horaFin = horaFin + 1
                                stringFin = horaFin + ":00"
                            }

                            firebase.database().ref("Horario/001/" + cont).set({
                                codigo: fila[0],
                                nombre: fila[1].toString(),
                                seccion: fila[2].toString(),
                                edificio: fila[3].toString(),
                                salon: fila[4].toString(),
                                horaInicioDecimal: decimalInicio,
                                horaFinDecimal: decimalFin,
                                horaInicioCadena: stringInicio,
                                horaFinCadena: stringFin,
                                Lunes: dias[0],
                                Martes: dias[1],
                                Miercoles: dias[2],
                                Jueves: dias[3],
                                Viernes: dias[4],
                                Sabado: dias[5],
                                Domingo: dias[6],
                                catedratico: fila[14].toString()
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

        let allName = fileObj["name"]
        let name = allName.split(".xlsx")
        var date = new Date().getDate(); //Current Date
        var month = new Date().getMonth() + 1; //Current Month
        var year = new Date().getFullYear(); //Current Year
        var hours = new Date().getHours(); //Current Hours
        var min = new Date().getMinutes(); //Current Minutes
        var sec = new Date().getSeconds(); //Current Seconds

        firebase.database().ref("Historial/001/001").update({ //Universidad / Facultad
            nombre: name[0],
            dia: date + "-" + month + "-" + year,
            hora: hours + ":" + min + ":" + sec
        }).then(() => {
            console.log("HISTORIAL INSERTADO");
        }).catch((error) => {
            console.log(error);
        });



    }

    render() {
        return (

            <div className="App">
                <hr></hr>
                <div className="card-header">
                    <h3>THE BEST SCHEDULE</h3>
                </div>
                <hr></hr>
                <div className="container">
                    <div className="d-flex justify-content-center h-100">
                        <div className="card">
                            <div className="card-header">
                                <h3>Subir Horario</h3>
                            </div>
                            <div className="card-body">

                                <input type="file" onChange={this.fileHandler.bind(this)} className="center"></input>

                            </div>
                        </div>
                    </div>
                </div>

            </div>

        );
    }
}

export default MainForm;
