import { useEffect, useState } from "react";
import ApplicationForm from "./components/ApplicationForm";
import ApplicationList from "./components/ApplicationList";
import { getApplications } from "./services/applicationService";
import { getPaginatedApplications } from "./services/applicationService";
import { getStatistics } from "./services/applicationService";
import EditApplicationModal from "./components/EditApplicationModal";

function App() {
    const [applications, setApplications] = useState([]);
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("All");
    const [page, setPage] = useState(0);
    const [totalElements, setTotalElements] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [showEditModal, setShowEditModal] = useState(false);
    const [selectedApplication, setSelectedApplication] = useState(null);
    const [editApp, setEditApp] = useState(null);

    const loadApplications = async () => {
        const res = await getPaginatedApplications(page, 5, search, statusFilter);
        setApplications(res.data.content);
        setTotalPages(res.data.totalPages);
        setTotalElements(res.data.totalElements);
        loadStatistics();
    };


    const [stats, setStats] = useState({
        total: 0,
        applied: 0,
        interview: 0,
        rejected: 0
    });

    useEffect(() => {
        setPage(0);   // reset to first page when filter/search changes
    }, [search, statusFilter]);

    useEffect(() => {
        loadApplications();
    }, [page, search, statusFilter]);

    useEffect(() => {
        loadStatistics();
    }, []);

    const handleEdit = (app) => {
        setEditApp(app);
        setSelectedApplication(app);
        setShowEditModal(true);
    };

    const closeModal = () => {
        setShowEditModal(false);
        setSelectedApplication(null);
    };


    const loadStatistics = async () => {
        const res = await getStatistics();
        setStats(res.data);
    };

    //const total = totalElements;

    // const applied = applications.filter(a => a.status === "Applied").length;
    // const interview = applications.filter(a => a.status === "Interview").length;
    // const rejected = applications.filter(a => a.status === "Rejected").length;


    return (
        <div className="bg-light min-vh-100 py-5">
            <div className="container">
                <div className="card shadow-lg">
                    <div className="card-body p-5">

                        <h2 className="text-center mb-4 text-primary">
                            Job Application Tracker
                        </h2>

                        {/* Counters */}
                        <div className="d-flex justify-content-around mb-4">
                            <span className="badge bg-primary">Total: {stats.total}</span>
                            <span className="badge bg-warning text-dark">Applied: {stats.applied}</span>
                            <span className="badge bg-success">Interview: {stats.interview}</span>
                            <span className="badge bg-danger">Rejected: {stats.rejected}</span>
                        </div>

                        {/* Form */}
                        <div className="card p-4 shadow-sm mb-4">
                            <ApplicationForm refresh={loadApplications} />
                        </div>

                        {/* Search + Status Filter */}
                        <div className="row mb-4">
                            <div className="col-md-8">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Search by candidate name..."
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                />
                            </div>

                            <div className="col-md-4">
                                <select
                                    className="form-select"
                                    value={statusFilter}
                                    onChange={(e) => setStatusFilter(e.target.value)}
                                >
                                    <option value="All">All Status</option>
                                    <option value="Applied">Applied</option>
                                    <option value="Interview">Interview</option>
                                    <option value="Rejected">Rejected</option>
                                </select>
                            </div>
                        </div>

                        {/* Table */}
                        <ApplicationList
                            applications={applications}
                            refresh={loadApplications}
                            onEdit={handleEdit}
                            // search={search}
                            // statusFilter={statusFilter}
                        />
                        {showEditModal && (
                            <EditApplicationModal
                                application={selectedApplication}
                                closeModal={closeModal}
                                refresh={loadApplications}
                            />
                        )}

                        {/* Pagination Buttons */}
                        <div className="d-flex justify-content-center align-items-center gap-4 mt-4">
                            <button
                                className="btn btn-secondary"
                                disabled={page === 0}
                                onClick={() => setPage(page - 1)}
                            >
                                Previous
                            </button>

                            <span className="fw-bold">
                                Page {totalPages === 0 ? 0 : page + 1} of {totalPages}
                            </span>

                            <button
                                className="btn btn-secondary"
                                disabled={page >= totalPages - 1 || totalPages === 0}
                                onClick={() => setPage(page + 1)}
                            >
                                Next
                            </button>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
