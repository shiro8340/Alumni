import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import './Login.css';
import {Helmet} from "react-helmet";
import Login from './Login.js'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Link } from "react-router-dom";
import axios from "axios";

const Signup = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        mobile: '',
        password: '',
        confirmpassword: ''
    });
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const validateForm = () => {
        const newErrors = {};
        if(!formData.name)
            newErrors.name='Name is required';
        else if(!/^[a-zA-Z\s]+$/.test(formData.name))
            newErrors.name='Please enter a valid name';
        else if(formData.name.length<2)
            newErrors.name='Name must be at least 2 characters';

        if (!formData.email) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Please enter a valid email';
        }

        if(!formData.mobile)
            newErrors.mobile='Mobile number is required';
        else if(!/^[0-9]+$/.test(formData.mobile))
            newErrors.mobile='Please enter valid mobile number';
        else if(formData.mobile.length!==10)
            newErrors.mobile='Mobile number must be exactly 10 digits long';
        
        if (!formData.password) {
            newErrors.password = 'Password is required';
        } else if (formData.password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters';
        }

        if(!formData.confirmpassword)
            newErrors.confirmpassword='Password is required';
        else if(formData.password!==formData.confirmpassword)
            newErrors.confirmpassword='Password must be same';
        
        return newErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newErrors = validateForm();
        
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }
        
        setIsLoading(true);
        
        try {
            const { Full_Name, Email, Mobile_Number, Password } = formData;
            const response = await axios.post("http://localhost:8080/sign_up", {
                name: formData.name,
                email: formData.email,
                mobile: formData.mobile,
                password: formData.password
              });

            alert(response.data.message);
        } catch (error) {
            console.error("Error saving user:", error);
        }
    };

    return (
        <>
            <Helmet>
                <title>Sign Up</title>
            </Helmet>
      
        <div className="login-container">
            <div className="login-box">
                <div className="login-header">
                    <div className="login-img">
                        <img src="./OLDC-logo.png" alt="logo"  width={120} height={120}/>
                    </div>
                    <h1>Alumni Sign Up</h1>
                </div>
                <form onSubmit={handleSubmit}>

                <div className="form-group">
                        <input
                            type="name"
                            name="name"
                            placeholder="Full Name"
                            value={formData.name}
                            onChange={handleChange}
                            className={errors.name ? 'error' : ''}
                            disabled={isLoading}
                        />
                        {errors.name && <span className="error-message">{errors.name}</span>}
                    </div>

                    <div className="form-group">
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={formData.email}
                            onChange={handleChange}
                            className={errors.email ? 'error' : ''}
                            disabled={isLoading}
                        />
                        {errors.email && <span className="error-message">{errors.email}</span>}
                    </div>

                    <div className="form-group">
                        <input
                            type="number"
                            name="mobile"
                            placeholder="Mobile Number"
                            value={formData.mobile}
                            onChange={handleChange}
                            className={errors.mobile ? 'error' : ''}
                            disabled={isLoading}
                        />
                        {errors.mobile && <span className="error-message">{errors.mobile}</span>}
                    </div>

                    <div className="form-group">
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={formData.password}
                            onChange={handleChange}
                            className={errors.password ? 'error' : ''}
                            disabled={isLoading}
                        />
                        {errors.password && <span className="error-message">{errors.password}</span>}
                    </div>

                    <div className="form-group">
                        <input
                            type="confirmpassword"
                            name="confirmpassword"
                            placeholder="Confirm Password"
                            value={formData.confirmpassword}
                            onChange={handleChange}
                            className={errors.confirmpassword ? 'error' : ''}
                            disabled={isLoading}
                        />
                        {errors.confirmpassword && <span className="error-message">{errors.confirmpassword}</span>}
                    </div>

                    {errors.submit && <div className="error-message">{errors.submit}</div>}
                    <button 
                        type="submit" 
                        className={`login-button ${isLoading ? 'loading' : ''}`}
                        disabled={isLoading}
                    >
                        {isLoading ? '' : 'SIGN UP'}
                    </button>
                    <div className="additional-links">
                        <a href="/Login" className="existing-link">Existing User ?</a>
                        
                    </div>
                </form>
            </div>
        </div>
        </>
    );
};

export default Signup; 


