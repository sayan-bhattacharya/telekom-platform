// src/pages/ApplicationForm.jsx
import { useState } from 'react';
import axios from 'axios';

function ApplicationForm() {
const [formData, setFormData] = useState({
studentName: '',
email: '',
message: '',
disability: false,
video: null,
cv: null,
});
const [submitting, setSubmitting] = useState(false);

const handleDisabilityChange = (e) => {
setFormData({ ...formData, disability: e.target.checked });
};

const handleChange = (e) => {
setFormData({ ...formData, [e.target.name]: e.target.value });
};

const handleFileChange = (e) => {
setFormData({ ...formData, [e.target.name]: e.target.files[0] });
};

const handleSubmit = async (e) => {
e.preventDefault();
setSubmitting(true);

const formDataToSend = new FormData();
formDataToSend.append('studentName', formData.studentName);
formDataToSend.append('email', formData.email);
formDataToSend.append('message', formData.message);
formDataToSend.append('disability', formData.disability);
formDataToSend.append('video', formData.video);
formDataToSend.append('cv', formData.cv);

try {
    await axios.post('http://localhost:5001/api/applications', formDataToSend, {
    headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
    });
    alert('Application submitted successfully!');
} catch (error) {
    alert('Error submitting application. Please try again.');
} finally {
    setSubmitting(false);
}
};

return (
<form onSubmit={handleSubmit}>
    <label>
    Full Name:
    <input type="text" name="studentName" onChange={handleChange} required />
    </label>

    <label>
    Email:
    <input type="email" name="email" onChange={handleChange} required />
    </label>

    <label>
    Disability Status:
    <input type="checkbox" checked={formData.disability} onChange={handleDisabilityChange} />
    </label>

    {formData.disability ? (
    <label>
        Cover Letter (Required for Students with Disabilities):
        <textarea name="message" onChange={handleChange} required />
    </label>
    ) : (
    <>
        <label>
        Cover Letter (Optional):
        <textarea name="message" onChange={handleChange} />
        </label>
        <label>
        Video (Mandatory):
        <input type="file" name="video" accept="video/*" onChange={handleFileChange} required />
        </label>
    </>
    )}

    <label>
    CV (Mandatory for All):
    <input type="file" name="cv" accept=".pdf,.doc,.docx" onChange={handleFileChange} required />
    </label>

    <button type="submit" disabled={submitting}>
    {submitting ? 'Submitting...' : 'Submit Application'}
    </button>
</form>
);
}

export default ApplicationForm;