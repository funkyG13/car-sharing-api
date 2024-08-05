import * as React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { Modal } from 'react-bootstrap';
import 'bootstrap/js/dist/modal.js';
import Table from 'react-bootstrap/Table';
import {useEffect} from "react";
import GetData from '../../hooks/getData';
import HeaderOwner from "./HeaderOwner";


export default function RequestOwner() {
    const [data, setData] = React.useState([])
    const [selectedRenter, setSelectedRenter] = React.useState(0)
    const fetchReservations = GetData('http://localhost:8080/reservations');
    const [showReviewModal, setShowReviewModal] = React.useState(false);
    const [review, setReview] = React.useState({ comment: '', stars: 0 });
    const [selectedReservation, setSelectedReservation] = React.useState(null);
    const [reviews, setReviews] = React.useState([]);

    useEffect(() => {
        setData(fetchReservations.data);
    }, [fetchReservations.data]);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString();
    }

    const handleAddReview = () => {
        const newReview = {
            email: selectedReservation.renter.email,
            reservationId: null,
            comment: review.comment,
            stars: Number(review.stars)
        };

        fetch('http://localhost:8080/review', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newReview),
        })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
                setShowReviewModal(false);
                setReview({ comment: '', stars: 0 });
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }

    const handleApprove = (reservationId) => {
        fetch(`http://localhost:8080/reservations/approve/${reservationId}`, {
            method: 'PUT'
        })
            .then(response => {
                if (response.ok) {
                    const updatedReservations = data.map(reservation =>
                        reservation.id === reservationId ? { ...reservation, status: 'APPROVED' } : reservation
                    );
                    setData(updatedReservations);
                } else {
                    console.error('Failed to approve reservation');
                }
            });
    }

    const handleComplete = (reservationId) => {
        fetch(`http://localhost:8080/reservations/approve/${reservationId}`, {
            method: 'PUT'
        })
            .then(response => {
                if (response.ok) {
                    const updatedReservations = data.map(reservation =>
                        reservation.id === reservationId ? { ...reservation, status: 'COMPLETED' } : reservation
                    );
                    setData(updatedReservations);
                } else {
                    console.error('Failed to approve reservation');
                }
            });
    }

    const handleReject = (reservationId) => {
        fetch(`http://localhost:8080/reservations/reject/${reservationId}`, {
            method: 'PUT'
        })
            .then(response => {
                if (response.ok) {
                    const updatedReservations = data.map(reservation =>
                        reservation.id === reservationId ? { ...reservation, status: 'DECLINED' } : reservation
                    );
                    setData(updatedReservations);
                } else {
                    console.error('Failed to approve reservation');
                }
            });
    }

    const handleViewRenterDetails = (reservationId) => {
        const reservation = data.find(item => item.id === reservationId);
        const email = reservation?.renter?.email;
        setSelectedRenter(reservation.renter);

        fetch(`http://localhost:8080/review/user/${email}`)
            .then(response => response.json())
            .then(data => {
                setReviews(data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }

    const handleReview = (reservationId) => {
        const reservation = data.find(item => item.id === reservationId);
        setSelectedReservation(reservation);
        setShowReviewModal(true);
    }

    return (
        <div>
            <HeaderOwner />
            <Table striped bordered hover responsive="sm">
                <thead>
                <tr>
                    <th scope="col">Renter</th>
                    <th scope="col">Vehicle</th>
                    <th scope="col">Date From</th>
                    <th scope="col">Date To</th>
                    <th scope="col">Status</th>
                    <th scope="col">Action</th>
                </tr>
                </thead>
                <tbody>
                {data.map((item, index) => {
                    return (
                        <tr key={item.id}>
                            <th scope="row" key={item.id}>{item.renter.username}</th>
                            <td>{item.vehicle.model}</td>
                            <td>{formatDate(item.dateFrom)}</td>
                            <td>{formatDate(item.dateTo)}</td>
                            <td>{item.status}</td>
                            <td>
                                <div style={{display: 'flex', gap: '5px'}}>
                                    <div style={{display: 'flex', gap: '5px'}}>
                                        {item.status === 'SENT' && (
                                            <>
                                                <button type="button" className="btn btn-success"
                                                        onClick={() => handleApprove(item.id)}>
                                                    Approve
                                                </button>
                                                <button type="button" className="btn btn-danger"
                                                        onClick={() => handleReject(item.id)}>
                                                    Reject
                                                </button>
                                            </>
                                        )}
                                        {item.status === 'APPROVED' && (
                                            <>
                                                <button type="button" className="btn btn-primary" disabled>
                                                    Approved
                                                </button>
                                                <button type="button" className="btn btn-success"
                                                        onClick={() => handleComplete(item.id)}>
                                                    Complete
                                                </button>
                                            </>

                                        )}
                                        {item.status === 'DECLINED' && (
                                            <button type="button" className="btn btn-danger" disabled>
                                                Declined
                                            </button>
                                        )}
                                        {item.status === 'CANCELED_FROM_RENTER' && (
                                            <button type="button" className="btn btn-warning" disabled>
                                                Canceled
                                            </button>
                                        )}
                                        {item.status === 'COMPLETED' && (
                                            <>
                                                <button type="button" className="btn btn-success" disabled>
                                                    Completed
                                                </button>
                                                <button type="button" className="btn btn-info"
                                                        onClick={() => handleReview(item.id)}>
                                                    Review
                                                </button>
                                            </>
                                        )}
                                        <button type="button" className="btn btn-info"
                                                onClick={() => handleViewRenterDetails(item.id)}>
                                            View Renter Details
                                        </button>
                                    </div>
                                </div>
                            </td>
                        </tr>
                    )
                })}
                </tbody>
            </Table>

            {selectedRenter && (
                <Modal show={true} onHide={() => {
                    setSelectedRenter(0);
                    setReviews([]);
                }}>
                    <Modal.Header closeButton>
                        <Modal.Title>Renter Details</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {selectedRenter && (
                            <div>
                                <p><strong>Username:</strong> {selectedRenter.username}</p>
                                <p><strong>Email:</strong> {selectedRenter.email}</p>
                                <p><strong>Driver licence date:</strong> {formatDate(selectedRenter.driverLicenceDate)}</p>
                                <p><strong>Birthday:</strong> {formatDate(selectedRenter.birthday)}</p>
                            </div>
                        )}
                        {reviews.length === 0 ? (
                            <div>
                                <h5>Reviews</h5>
                                <p>No reviews for this user</p>
                            </div>
                        ) : (
                            reviews.map((review, index) => (
                                <div key={index}>
                                    <p>Comment: {review.comment}</p>
                                    <p>Stars: {review.stars} / 5</p>
                                    <hr/>
                                </div>
                            ))
                        )}
                    </Modal.Body>
                </Modal>
            )}

            {showReviewModal && (
                <Modal show={true} onHide={() => setShowReviewModal(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Add Review</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form>
                            <div className="form-group">
                                <label htmlFor="comment">Comment</label>
                                <textarea className="form-control" id="comment" rows="3" value={review.comment} onChange={(e) => setReview({ ...review, comment: e.target.value })}></textarea>
                            </div>
                            <div className="form-group">
                                <label htmlFor="stars">Stars</label>
                                <input type="number" className="form-control" id="stars" min="1" max="5" value={review.stars} onChange={(e) => setReview({ ...review, stars: e.target.value })} />
                            </div>
                            <button type="button" className="btn btn-primary" onClick={handleAddReview}>Submit</button>
                        </form>
                    </Modal.Body>
                </Modal>
            )}

        </div>
    )
}

