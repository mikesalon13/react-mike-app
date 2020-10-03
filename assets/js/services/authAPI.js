import axios from "axios"
import jwtDecode from "jwt-decode"
import { LOGIN_API } from "../config"

/**
 * [logout description]
 *
 * Déconnexion ( suppression du localStorage et sur Axios)
 * 
 */
function logout(){
    window.localStorage.removeItem("authToken")
    delete axios.defaults.headers["Authorization"]
}


/**
 * Requête HTTP d'authentification et stockage du token dans le localStorage et sur Axios
 *
 * @param   {object}  credentials  [credentials description]
 *
 */
function authenticate(credentials){
    axios
        .post(LOGIN_API, credentials)
        .then(response => response.data.token)
        .then(token => {
            //je stock le token dans mon localStorage
            window.localStorage.setItem("authToken", token)
            setAxiosToken(token)
        })
       
}

/**
 * Positionne le token JWT sur Axios
 *
 * @param   {string}  token  Le token JWT
 */
function setAxiosToken(token){
    // On prévient Axios qu'on a maintenant un header par défaut sur toutes nos futures requêtes HTTP
    axios.defaults.headers["Authorization"] = "Bearer " + token
}


/**
 * Mise en place lors du chargement de l'application
 *
 * @return  {void}  [return description]
 */
function setup(){
    const token = window.localStorage.getItem("authToken")
    if (token) {
        const {exp: expiration} = jwtDecode(token)
        if (expiration * 1000 > new Date().getTime()) {
            setAxiosToken(token)
        }
    }
}

/**
 * Permet de savoir si on est authentifié ou non
 *
 */
function isAuthenticated(){
    const token = window.localStorage.getItem("authToken")
    
    if (token) {
        const {exp: expiration} = jwtDecode(token)
        if (expiration * 1000 > new Date().getTime()) {
            return true
        }
        return false
    }
    return false
}

export default {
    authenticate,
    logout,
    setup,
    isAuthenticated
}