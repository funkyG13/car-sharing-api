import * as React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { Modal } from 'react-bootstrap';
import 'bootstrap/js/dist/modal.js';
import Table from 'react-bootstrap/Table';
import {useEffect} from "react";
import GetData from '../../hooks/getData';
import DeleteData from "../../hooks/deleteData";
import HeaderRenter from "./HeaderRenter";
import map from "../../assets/images/map.png"


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function VehiclesRenter() {

    const [data, setData] = React.useState([])
    const [open, setOpen] = React.useState(false);
    const fetchVehicles = GetData('http://localhost:8080/vehicle');
    const { deleteData, loadingDelete, errorDelete } = DeleteData();

    const [reviews, setReviews] = React.useState([]);
    const [showReviewsModal, setShowReviewsModal] = React.useState(false);
    const [showImageModal, setShowImageModal] = React.useState(false);


    const [reservation, setReservation] = React.useState({
        renter: null,
        vehicle: null,
        dateFrom: '',
        dateTo: '',
        status: 'SENT',
        addressOfDeliver: '',
        totalPrice: 0
    });
    const [showReservationModal, setShowReservationModal] = React.useState(false);

    const handleRent = (vehicleId) => {
        const vehicle = data.find(item => item.id === vehicleId);
        setReservation(prevState => ({ ...prevState, vehicle: vehicle }));
        setShowReservationModal(true);
    }

    const handleAddReservation = (event) => {
        event.preventDefault();

        if (showReservationModal === false) {
            return;
        }

        if (reservation.dateFrom === '' || reservation.dateTo === '' || reservation.addressOfDeliver === '') {
            alert('Date From, Date To, and Address of Delivery are required!');
            return;
        }

        const userEmail = localStorage.getItem('email'); // Get the user email from local storage
        const newReservation = {
            ...reservation,
            renter: { email: userEmail },
            vehicle: { id: reservation.vehicle.id },
            dateFrom: new Date(reservation.dateFrom),
            dateTo: new Date(reservation.dateTo)
        };

        fetch(`http://localhost:8080/reservations?email=${userEmail}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newReservation)
        })
            .then(response => response.json())
            .then((addedReservation) => {
                setShowReservationModal(false);
                setReservation({
                    renter: null,
                    vehicle: null,
                    dateFrom: '',
                    dateTo: '',
                    status: 'SENT',
                    addressOfDeliver: '',
                    totalPrice: 0
                });
            });
    }

    const handleViewReviews = (vehicleId) => {
        console.log(vehicleId);
        fetch(`http://localhost:8080/review/vehicle/${vehicleId}`)
            .then(response => response.json())
            .then(data => {
                setReviews(data);
                setShowReviewsModal(true);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }

    useEffect(() => {
        setData(fetchVehicles.data);
    }, [fetchVehicles.data]);


    const handleOpen = () => {
        setShowImageModal(true);
    };

    const handleClose = () => setOpen(false);

    const handleDelete = (vehicleId) => {
        const vehicle = data.find(item => item.id === vehicleId);
        if (window.confirm("Are you sure you want to delete vehicle '" + vehicle.model + "' ?")) {
            deleteData("http://localhost:8080/vehicle", vehicleId)
            setData(prevData => prevData.filter((item) => item.id !== vehicleId));
        }
    }

    return (
        <div>
            <HeaderRenter/>
            <div style={{display: 'flex', justifyContent: 'center', marginTop: '20px', marginBottom: '20px'}}>
                <button type="button" className="btn btn-dark" style={{marginRight: '10px'}}
                        onClick={() => handleOpen(null)}>Show in map
                </button>
                <button type="button" className="btn btn-dark">Sort by destination</button>
            </div>
            <Table striped bordered hover responsive="sm">
                <thead>
                <tr>
                    <th scope="col">Model</th>
                    <th scope="col">Cubic</th>
                    <th scope="col">Year</th>
                    <th scope="col">Price Per Day</th>
                    <th scope="col">Address</th>
                    <th scope="col">Photo</th>
                    <th scope="col">Action</th>
                </tr>
                </thead>
                <tbody>
                {data.map((item, index) => {
                    return (
                        <tr key={item.id}>
                            <th scope="row" key={item.id}>{item.model}</th>
                            <td>{item.cubic}</td>
                            <td>{item.year}</td>
                            <td>{item.pricePerDay}</td>
                            <td>{item.address}</td>
                            <td>
                                <img
                                    src={`http://localhost:8080/images/${item.photo}`}
                                    alt={item.model} style={{width: '100px', height: '100px'}}/>
                            </td>
                            <td>
                                <div style={{display: 'flex', gap: '5px'}}>
                                    <button type="button" className="btn btn-info"
                                            onClick={() => handleViewReviews(item.id)}>
                                        View Reviews
                                    </button>
                                    <button type="button" className="btn btn-primary"
                                            onClick={() => handleRent(item.id)}>
                                        I Want to Rent It
                                    </button>
                                </div>
                            </td>
                        </tr>
                    )
                })}
                </tbody>
            </Table>

            {showReservationModal && (
                <Modal show={true} onHide={() => setShowReservationModal(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Create Reservation</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form>
                            <div className="form-group">
                                <label htmlFor="dateFrom">Date From</label>
                                <input type="date" className="form-control" id="dateFrom" value={reservation.dateFrom}
                                       onChange={(e) => setReservation({...reservation, dateFrom: e.target.value})}/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="dateTo">Date To</label>
                                <input type="date" className="form-control" id="dateTo" value={reservation.dateTo}
                                       onChange={(e) => setReservation({...reservation, dateTo: e.target.value})}/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="addressOfDeliver">Address of Delivery</label>
                                <input type="text" className="form-control" id="addressOfDeliver"
                                       value={reservation.addressOfDeliver} onChange={(e) => setReservation({
                                    ...reservation,
                                    addressOfDeliver: e.target.value
                                })}/>
                            </div>
                            <button type="button" className="btn btn-primary" onClick={handleAddReservation}>Submit
                            </button>
                        </form>
                    </Modal.Body>
                </Modal>
            )}

            {showImageModal && (
                <Modal show={true} onHide={() => setShowImageModal(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Map</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <img src={map} alt="Map" style={{width: '100%', height: 'auto'}}/>
                    </Modal.Body>
                </Modal>
            )}

            {showReviewsModal && (
                <Modal show={true} onHide={() => setShowReviewsModal(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Reviews</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {reviews.length === 0 ? (
                            <p>No reviews for this vehicle</p>
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

        </div>
    )
}


