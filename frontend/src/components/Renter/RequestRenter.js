import * as React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { Modal } from 'react-bootstrap';
import 'bootstrap/js/dist/modal.js';
import Table from 'react-bootstrap/Table';
import {useEffect} from "react";
import GetData from '../../hooks/getData';
import AddData from '../../hooks/addData'
import HeaderRenter from "./HeaderRenter";


export default function RequestRenter() {
    const [data, setData] = React.useState([])
    const fetchReservations = GetData('http://localhost:8080/reservations');
    const [showReviewModal, setShowReviewModal] = React.useState(false);
    const [review, setReview] = React.useState({ comment: '', stars: 0 });
    const [selectedReservation, setSelectedReservation] = React.useState(null);
    const { addData } = AddData();

    useEffect(() => {
        setData(fetchReservations.data);
    }, [fetchReservations.data]);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString();
    }

    const handleReview = (reservationId) => {
        const reservation = data.find(item => item.id === reservationId);
        setSelectedReservation(reservation);
        setShowReviewModal(true);
    }

    const handleAddReview = () => {
        const newReview = {
            email: null,
            reservationId: selectedReservation.id,
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
                setSelectedReservation(null);
            })
            .catch((error) => {
                alert("Already reviewed")
                setShowReviewModal(false);
                setSelectedReservation(null);
            });
    }

    const handleCancel = (reservationId) => {
        fetch(`http://localhost:8080/reservations/${reservationId}`, {
            method: 'DELETE'
        })
            .then(response => {
                if (response.ok) {
                    const updatedReservations = data.map(reservation =>
                        reservation.id === reservationId ? { ...reservation, status: 'CANCELED_FROM_RENTER' } : reservation
                    );
                    setData(updatedReservations);
                } else {
                    console.error('Failed to approve reservation');
                }
            });
    }

    return (
        <div>
            <HeaderRenter />
            <Table striped bordered hover responsive="sm">
                <tr>
                    <th scope="col">Vehicle</th>
                    <th scope="col">Date From</th>
                    <th scope="col">Date To</th>
                    <th scope="col">Status</th>
                    <th scope="col">Action</th>
                </tr>
                <tbody>
                {data.map((item, index) => {
                    return (
                        <tr key={item.id}>
                            <th scope="row" key={item.id}>{item.vehicle.model}</th>
                            <td>{formatDate(item.dateFrom)}</td>
                            <td>{formatDate(item.dateTo)}</td>
                            <td>{item.status}</td>
                            <td>
                                <div style={{display: 'flex', gap: '5px'}}>
                                    {item.status === 'SENT' && (
                                        <button type="button" className="btn btn-danger" onClick={() => handleCancel(item.id)}>
                                            Cancel
                                        </button>
                                    )}
                                    {item.status === 'APPROVED' && (
                                        <button type="button" className="btn btn-primary" disabled>
                                            Approved
                                        </button>
                                    )}
                                    {item.status === 'DECLINED' && (
                                        <button type="button" className="btn btn-warning" disabled>
                                            Declined
                                        </button>
                                    )}
                                    {item.status === 'CANCELED_FROM_RENTER' && (
                                        <button type="button" className="btn btn-danger" disabled>
                                            Canceled
                                        </button>
                                    )}
                                    {item.status === 'COMPLETED' && (
                                        <>
                                            <button type="button" className="btn btn-success" disabled>
                                                Completed
                                            </button>
                                            <button type="button" className="btn btn-info" onClick={() => handleReview(item.id)}>
                                                Review
                                            </button>
                                        </>
                                    )}
                                </div>
                            </td>
                        </tr>
                    )
                })}
                </tbody>
            </Table>

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

