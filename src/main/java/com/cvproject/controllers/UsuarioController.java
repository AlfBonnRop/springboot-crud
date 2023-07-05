package com.cvproject.controllers;

import com.cvproject.dao.UsuarioDao;
import com.cvproject.utils.JWTUtil;
import de.mkammerer.argon2.Argon2;
import de.mkammerer.argon2.Argon2Factory;
import io.jsonwebtoken.MalformedJwtException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.cvproject.models.Usuario;


import java.util.ArrayList;
import java.util.List;

@RestController
public class UsuarioController{

    @Autowired
    private UsuarioDao usuarioDao;
    @Autowired
    private JWTUtil jwt;

    @RequestMapping(value= "api/usuarios/{id}", method = RequestMethod.GET)
    public Usuario getUsuario(){
        Usuario usr = new Usuario();
        usr.setNombre("Juan Alfonso");
        usr.setApellidos("Garduno Solis");
        usr.setEmail("juandeavia@gmail.com");
        usr.setTelefono("5563754400");
        usr.setId(2411);
        usr.setPassword("12345678");
        return usr;
    }

    public String sesionActiva(String token){
        try{
            String s = jwt.getKey(token);
            return s;
        }catch (MalformedJwtException ex){
            return null;
        }

    }

    @RequestMapping(value= "api/usuario/", method = RequestMethod.GET)
    public Usuario getUsuario(@RequestHeader(value="Autorization") String token){
        String id =sesionActiva(token);
        if (id != null){
            return usuarioDao.getUsuario(id);
        }else{
            return null;
        }

    }

    @RequestMapping(value="api/actualizanombre/", method = RequestMethod.POST)
    public void actualizaUsuario(@RequestHeader(value="Autorization") String token, @RequestBody Usuario u){
        try{
            Usuario uOriginal = getUsuario(token);
            uOriginal.setNombre(u.getNombre());
            usuarioDao.actualizarUsuario(uOriginal);
        }catch (MalformedJwtException ex){
            System.out.println("No hay sesion iniciada");
        }
    }

    @RequestMapping(value="api/actualizaapellidos/", method = RequestMethod.POST)
    public void actualizaApellidos(@RequestHeader(value="Autorization") String token, @RequestBody Usuario u){
        try{
            Usuario uOriginal = getUsuario(token);
            uOriginal.setApellidos(u.getApellidos());
            usuarioDao.actualizarUsuario(uOriginal);
        }catch (MalformedJwtException ex){
            System.out.println("No hay sesion iniciada");
        }
    }

    @RequestMapping(value="api/actualizatelefono/", method = RequestMethod.POST)
    public void actualizaTelefono(@RequestHeader(value="Autorization") String token, @RequestBody Usuario u){
        try{
            Usuario uOriginal = getUsuario(token);
            uOriginal.setTelefono(u.getTelefono());
            usuarioDao.actualizarUsuario(uOriginal);
        }catch (MalformedJwtException ex){
            System.out.println("No hay sesion iniciada");
        }
    }

    @RequestMapping(value="api/actualizapassword/", method = RequestMethod.POST)
    public boolean actualizaPassword(@RequestHeader(value="Autorization") String token, @RequestBody Usuario u){
        try{
            String actual=u.getNombre();
            String nueva =u.getPassword();
            Usuario uOriginal = getUsuario(token);
            System.out.println(uOriginal.getPassword());
            Argon2 ar = Argon2Factory.create(Argon2Factory.Argon2Types.ARGON2id);
            boolean cambio =ar.verify(uOriginal.getPassword(),actual);
            if(cambio){
                uOriginal.setPassword(ar.hash(2,1024, 1, nueva));
                usuarioDao.actualizarUsuario(uOriginal);
                return cambio;
            }
            return cambio;
        }catch (MalformedJwtException ex){
            System.out.println("No hay sesion iniciada");
            return false;
        }
    }


    @RequestMapping(value= "api/eliminaUsuario/{id}", method = RequestMethod.DELETE)
    public void eliminarUsuario(@PathVariable int id){
        usuarioDao.deleteUsuario(id);
    }

    @RequestMapping(value= "api/usuarios/", method =  RequestMethod.GET)
    public List<Usuario> getUsuarios(@RequestHeader(value="Autorization") String token){
        String usrId = sesionActiva(token);
        if (usrId == null){
            return new ArrayList<>();
        }
        return usuarioDao.getUsuarios();
    }

    @RequestMapping(value= "api/usuarios/", method = RequestMethod.POST)
    public void registrarUsuario(@RequestBody Usuario u){
        Argon2 ar = Argon2Factory.create(Argon2Factory.Argon2Types.ARGON2id);
        u.setPassword(ar.hash(2,1024, 1, u.getPassword()));
        usuarioDao.registrarUsuario(u);
    }

}

