// src/pages/auth/RegisterPage.jsx
import { useState } from "react";
import { useRegister } from "../../Hooks/useRegister.js";
import "../../styles/user/form.css";
import AddressModal from "../../components/user/AddressModal";

function RegisterPage() {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const { register, loading, error } = useRegister();

    const submitHandler = async (e) => {
        e.preventDefault();

        if (!name || !email || !password) {
            alert("Sab fields bharna zaroori hai");
            return;
        }

        await register(name, email, password);

    };

    return (
        <div className="form-container">
            <form onSubmit={submitHandler}>
                <h1>Register</h1>

                {error && <p className="error-message">{error}</p>}

                <input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />

                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />

                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />

                <button type="submit" disabled={loading}>
                    {loading ? "Registering..." : "Register"}
                </button>
            </form>
        </div>
    );
}

export default RegisterPage;