package com.cvproject.dao;

import com.cvproject.models.Usuario;
import java.util.List;
public interface UsuarioDao {
    List<Usuario> getUsuarios();
    void deleteUsuario(int id);
    void registrarUsuario(Usuario u);
    Usuario obtenerUsuarioPorCredenciales(Usuario u);
    Usuario getUsuario(String id);
    void actualizarUsuario(Usuario u);
}
