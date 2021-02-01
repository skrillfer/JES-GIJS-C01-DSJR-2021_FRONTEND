import { prosecutionsAPI } from "./config"
import axios from 'axios';
//axios.defaults.headers.post['Content-Type'] ='application/x-www-form-urlencoded';


export const getAllProsecution = async() => {
    return axios.get(prosecutionsAPI);
}


export const createProsecution = async(prosecutionObject: any) => {
    return axios.post(prosecutionsAPI, { ...prosecutionObject })
}

export const editProsecution = async (prosecutionObject: any) => {
    console.log(prosecutionObject)
    return axios.put(`${prosecutionsAPI}/${prosecutionObject.id}`, { ...prosecutionObject })
}

export const deleteProsecution = async (id: number) => {
    return axios.delete(`${prosecutionsAPI}/${id}`)
}
