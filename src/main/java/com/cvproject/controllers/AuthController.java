package com.cvproject.controllers;

import com.cvproject.dao.UsuarioDao;
import com.cvproject.models.Usuario;
import com.cvproject.utils.JWTUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AuthController {

    @Autowired
    private UsuarioDao usuarioDao;
    @Autowired
    private JWTUtil jwtutil;

    @RequestMapping(value= "api/login/", method =  RequestMethod.POST)
    public String login(@RequestBody Usuario u){
        Usuario u2 = usuarioDao.obtenerUsuarioPorCredenciales(u);
        if(u2!=null){
            String token = jwtutil.create(String.valueOf(u2.getId()), u2.getEmail());
            return token;
        }else{
            return "OKNt";
        }
    }


    @RequestMapping(value = "api/cerrarSesion/", method = RequestMethod.POST)
    public void cerrarSesion(@RequestBody Usuario u){
        return;
    }


}
