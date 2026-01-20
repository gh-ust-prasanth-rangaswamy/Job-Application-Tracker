import { useState } from "react";
import { addApplication } from "../services/applicationService";

function ApplicationForm({ refresh }) {
    const [form, setForm] = useState({
        candidateName: "",
        company: "",
        role: "",
        Description: "",
        status: "Applied",
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await addApplication(form);
        refresh();
        setForm({
            candidateName: "",
            company: "",
            role: "",
            Description: "",
            status: "Applied",
        });
    };

    return (
        <form onSubmit={handleSubmit} className="row g-3">

            <div className="col-lg-3 col-md-6 col-12">
                <input
                    className="form-control"
                    name="candidateName"
                    placeholder="Name"
                    value={form.candidateName}
                    onChange={handleChange}
                    required
                />
            </div>

            <div className="col-lg-3 col-md-6 col-12">
                <input
                    className="form-control"
                    name="company"
                    placeholder="Company"
                    value={form.company}
                    onChange={handleChange}
                    required
                />
            </div>

            <div className="col-lg-3 col-md-6 col-12">
                <input
                    className="form-control"
                    name="role"
                    placeholder="Role"
                    value={form.role}
                    onChange={handleChange}
                    required
                />
            </div>

            <div className="col-lg-3 col-md-6 col-12">
                <input
                    className="form-control"
                    name="Description"
                    placeholder="Description"
                    value={form.Description}
                    onChange={handleChange}
                    required
                />
            </div>

            <div className="col-lg-3 col-md-6 col-12">
                <select
                    className="form-select"
                    name="status"
                    value={form.status}
                    onChange={handleChange}
                >
                    <option value="Applied">Applied</option>
                    <option value="Interview">Interview</option>
                    <option value="Rejected">Rejected</option>
                </select>
            </div>

            {/* Button */}
            <div className="col-12 d-flex justify-content-center mt-3">
                <button type="submit" className="btn btn-primary px-5">
                    Add
                </button>
            </div>

        </form>
    );
}

export default ApplicationForm;
