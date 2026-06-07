// src/pages/auth/LoginPage.jsx
import { useState } from "react";
import { useLogin } from "../../Hooks/useLogin";
import "../../styles/user/form.css";

function LoginPage() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const { login, loading, error } = useLogin();

    const submitHandler = async (e) => {
        e.preventDefault();

        if (!email || !password) {
            alert("Email aur Password dono zaroori hain");
            return;
        }

            await login(email, password);
    };

    return (
        <div className="form-container">
            <form onSubmit={submitHandler}>
                <h1>Login</h1>

                {error && <p className="error-message">{error}</p>}

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
                    {loading ? "Logging in..." : "Login"}
                </button>
            </form>
        </div>
    );
}

export default LoginPage;