import React, { useState } from 'react';
import Reveal from '../../utils/Reveal';
import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt, FaGithub, FaLinkedin, FaYoutube, FaPaperPlane } from 'react-icons/fa';
import '../assets/css/Home_Contact.css';

const contactData = {
    email: "rsujan140.in@gmail.com",
    phone: "+977 9805376861",
    address: "Morang, Nepal",
    social: {
        github: "https://github.com/Sujan-Rai-426",
        linkedin: "https://www.linkedin.com/in/er-sujan-rai-18a07b2a6/",
        youtube: "https://www.youtube.com/@CodeVora140"
    }
};

const Home_Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });
    const [isSending, setIsSending] = useState(false);
    const [statusMessage, setStatusMessage] = useState(''); // success/error text

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsSending(true);
        setStatusMessage('Sending...');

        // Prepare form data
        const formPayload = new FormData();
        formPayload.append('name', formData.name);
        formPayload.append('email', formData.email);
        formPayload.append('message', formData.message);
        
        // IMPORTANT: Add your Web3Forms access key (create a .env file)
        const accessKey = import.meta.env.VITE_EMAIL_ACCESS_KEY;
        if (!accessKey) {
            setStatusMessage('❌ Missing access key. Please set VITE_EMAIL_ACCESS_KEY in .env');
            setIsSending(false);
            return;
        }
        formPayload.append('access_key', accessKey);

        try {
            const response = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                body: formPayload
            });
            const data = await response.json();
            if (data.success) {
                setStatusMessage('✅ Message sent successfully!');
                setFormData({ name: '', email: '', message: '' }); // clear form
                setTimeout(() => setStatusMessage(''), 3000);
            } else {
                setStatusMessage(`❌ Failed: ${data.message}`);
                setTimeout(() => setStatusMessage(''), 4000);
            }
        } catch (err) {
            setStatusMessage('❌ Network error. Please try again.');
            setTimeout(() => setStatusMessage(''), 4000);
        } finally {
            setIsSending(false);
        }
    };

    return (
        <section className="contact-section" id="contact">
            <div className="contact-container">
                <Reveal direction="up" delay="0.1s">
                    <h2 className="contact-title">Get In Touch</h2>
                </Reveal>

                <div className="contact-grid">
                    {/* Left: Contact Info */}
                    <div className="contact-info">
                        <Reveal direction="left" delay="0.2s">
                            <div className="info-card">
                                <h3>Let's talk</h3>
                                <p>Have a project in mind? I'd love to hear from you.</p>
                                <div className="info-details">
                                    <div className="info-item">
                                        <FaEnvelope className="info-icon" />
                                        <div>
                                            <h4>Email</h4>
                                            <a href={`mailto:${contactData.email}`}>{contactData.email}</a>
                                        </div>
                                    </div>
                                    <div className="info-item">
                                        <FaPhoneAlt className="info-icon" />
                                        <div>
                                            <h4>Phone</h4>
                                            <a href={`tel:${contactData.phone}`}>{contactData.phone}</a>
                                        </div>
                                    </div>
                                    <div className="info-item">
                                        <FaMapMarkerAlt className="info-icon" />
                                        <div>
                                            <h4>Location</h4>
                                            <p>{contactData.address}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="social-links">
                                    <a href={contactData.social.github} target="_blank" rel="noopener noreferrer"><FaGithub /></a>
                                    <a href={contactData.social.linkedin} target="_blank" rel="noopener noreferrer"><FaLinkedin /></a>
                                    <a href={contactData.social.youtube} target="_blank" rel="noopener noreferrer"><FaYoutube /></a>
                                </div>
                            </div>
                        </Reveal>
                    </div>

                    {/* Right: Contact Form */}
                    <div className="contact-form-wrapper">
                        <Reveal direction="right" delay="0.2s">
                            <div className="form-card">
                                <h3>Send me a message</h3>
                                <form onSubmit={handleSubmit}>
                                    <div className="input-group">
                                        <input
                                            type="text"
                                            name="name"
                                            placeholder="Your Name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                    <div className="input-group">
                                        <input
                                            type="email"
                                            name="email"
                                            placeholder="Your Email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                    <div className="input-group">
                                        <textarea
                                            name="message"
                                            rows="5"
                                            placeholder="Your Message"
                                            value={formData.message}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                    <button type="submit" className="submit-btn" disabled={isSending}>
                                        <FaPaperPlane /> {isSending ? 'Sending...' : 'Send Message'}
                                    </button>
                                    {/* {statusMessage && <p className="status-msg">{statusMessage}</p>} */}
                                </form>
                            </div>
                        </Reveal>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Home_Contact;