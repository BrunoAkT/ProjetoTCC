import { createContext, useState } from "react";

const AuthContext = createContext({});

function AuthProvider(props) {

    const [user, setUser] = useState({"BLE_cap": 0, "ansiedade_points": 20, "data_nasc": "03/12/2010", "email": "maria@teste.com.br", "id": 14, "img": "file:///data/user/0/com.brunoakt.ProjetoTCC/cache/ImagePicker/00c89a18-5473-48e8-ab01-a1b0d2a4de5b.jpeg", "nome": "nao", "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTQsImlhdCI6MTc1NzY4MjUyMSwiZXhwIjoxNzY3NjgyNTIwfQ.b89v-hGAe702PDZiW4Toal-FhPy7RuEaYPI1jd6gy5E"});

    return <AuthContext.Provider value={{ user, setUser }}>
        {props.children}
    </AuthContext.Provider>
}

export { AuthContext, AuthProvider }