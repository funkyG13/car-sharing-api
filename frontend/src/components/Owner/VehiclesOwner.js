import * as React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { Modal } from 'react-bootstrap';
import 'bootstrap/js/dist/modal.js';
import Table from 'react-bootstrap/Table';
import {useEffect} from "react";
import EditData from "../../hooks/editData";
import GetData from '../../hooks/getData';
import AddData from '../../hooks/addData'
import DeleteData from "../../hooks/deleteData";
import HeaderOwner from "./HeaderOwner";


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

export default function VehiclesOwner() {

    const [data, setData] = React.useState([])
    const [photo, setPhoto] = React.useState('');
    const [model, setModel] = React.useState('');
    const [cubic, setCubic] = React.useState('');
    const [year, setYear] = React.useState('');
    const [pricePerDay, setPricePerDay] = React.useState('');
    const [latitude, setLatitude] = React.useState('');
    const [longitude, setLongitude] = React.useState('');
    const [address, setAddress] = React.useState('');
    const [isAvailable, setIsAvailable] = React.useState('YES');
    const [comments, setComments] = React.useState('');
    const [editVehicleIndex, setEditVehicleIndex] = React.useState(null);
    const [open, setOpen] = React.useState(false);
    const fetchVehicles = GetData(`http://localhost:8080/vehicle/user/${localStorage.getItem('email')}`);
    const { createData, loadingCreate, errorCreate } = AddData();
    const { editData, loadingEdit, errorEdit } = EditData();
    const { deleteData, loadingDelete, errorDelete } = DeleteData();

    useEffect(() => {
        setData(fetchVehicles.data);
    }, [fetchVehicles.data]);


    const handleOpen = (vehicleId) => {
        setPhoto('');
        setModel('');
        setCubic('');
        setYear('');
        setPricePerDay('');
        setLatitude('');
        setLongitude('');
        setAddress('');
        setIsAvailable('YES');
        setComments('');

        if (vehicleId !== null) {
            const vehicle = data.find(item => item.id === vehicleId);
            setPhoto(vehicle.photo);
            setModel(vehicle.model);
            setCubic(vehicle.cubic);
            setYear(vehicle.year);
            setPricePerDay(vehicle.pricePerDay);
            setLatitude(vehicle.latitude);
            setLongitude(vehicle.longitude);
            setAddress(vehicle.address);
            setIsAvailable(vehicle.isAvailable);
            setComments(vehicle.comments);
            setEditVehicleIndex(vehicleId);
        }

        setOpen(true);
    };

    const handleClose = () => setOpen(false);

    const handleEdit = (vehicleId) => {
        const vehicle = data.find(item => item.id === vehicleId);
        setPhoto(vehicle.photo);
        setModel(vehicle.model);
        setCubic(vehicle.cubic);
        setYear(vehicle.year);
        setPricePerDay(vehicle.pricePerDay);
        setLatitude(vehicle.latitude);
        setLongitude(vehicle.longitude);
        setAddress(vehicle.address);
        setIsAvailable(vehicle.isAvailable);
        setComments(vehicle.comments);

        const formData = new FormData();

        formData.append('vehicle', JSON.stringify({ 'id': vehicleId, 'model': model, 'cubic': cubic,
            'year': year, 'pricePerDay': pricePerDay, 'latitude': latitude, 'longitude': longitude, 'address': address,
            'isAvailable': isAvailable, 'comments': comments }));

        formData.append('email', localStorage.getItem('email'))

        if (photo) {
            formData.append('image', photo);
        }

        editData('http://localhost:8080/vehicle', formData)
            .then((updatedVehicle) => {
                setPhoto('');
                setModel('');
                setCubic('');
                setYear('');
                setPricePerDay('');
                setLatitude('');
                setLongitude('');
                setAddress('');
                setIsAvailable('YES');
                setComments('');
                const updatedVehicles = data.map(vehicle => vehicle.id === vehicleId ? updatedVehicle : vehicle);
                setData(updatedVehicles);
            });
        handleClose();
    }

    const handleAddVehicle = (event) => {
        event.preventDefault()

        if (open === false) {
            return;
        }

        if (model === '' || cubic === '') {
            alert('Model and cubic are required!');
            return;
        }

        if (editVehicleIndex !== null) {
            handleEdit(editVehicleIndex)
            setEditVehicleIndex(null)
            return;
        }

        if (photo === '') {
            alert('Choose a photo!');
            return;
        }

        const formData = new FormData();
        formData.append('vehicle', JSON.stringify({ 'model': model, 'cubic': cubic, 'year': year, 'pricePerDay': pricePerDay, 'latitude': latitude, 'longitude': longitude, 'address': address, 'isAvailable': 'YES', 'comments': comments }));
        formData.append('image', photo);
        formData.append('email', localStorage.getItem('email'))

        createData('http://localhost:8080/vehicle', formData)
            .then((newVehicle) => {
                setPhoto('');
                setModel('');
                setCubic('');
                setYear('');
                setPricePerDay('');
                setLatitude('');
                setLongitude('');
                setAddress('');
                setIsAvailable('YES');
                setComments('');
                setData(prevData => [...prevData, newVehicle]);
            });

        handleClose();
    }

    const handleDelete = (vehicleId) => {
        const vehicle = data.find(item => item.id === vehicleId);
        if (window.confirm("Are you sure you want to delete vehicle '" + vehicle.model + "' ?")) {
            deleteData("http://localhost:8080/vehicle", vehicleId)
            setData(prevData => prevData.filter((item) => item.id !== vehicleId));
        }
    }

    return (
        <div>
            <HeaderOwner />
            <div style={{display: 'flex', justifyContent: 'center', marginTop: '20px', marginBottom: '20px'}}>
                <button type="button" className="btn btn-dark" onClick={() => handleOpen(null)}>Add Vehicle</button>
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
                                    <button type="button" className="btn btn-primary" onClick={() => handleOpen(item.id)}>
                                        Edit
                                    </button>
                                    <button type="button" className="btn btn-danger"
                                            onClick={() => handleDelete(item.id)}>Delete
                                    </button>
                                </div>
                            </td>
                        </tr>
                    )
                })}
                </tbody>
            </Table>

            <Modal
                show={open}
                onHide={handleClose}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Vehicle</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={handleAddVehicle}>
                        <div className="form-group">
                            <label htmlFor="model">Model</label>
                            <input type="text" className="form-control" id="model" aria-describedby="model"
                                   placeholder="Enter model" value={model} onChange={e => setModel(e.target.value)}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="cubic">Cubic</label>
                            <input type="text" className="form-control" id="cubic" aria-describedby="cubic"
                                   placeholder="Enter cubic" value={cubic} onChange={e => setCubic(e.target.value)}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="year">Year</label>
                            <input type="text" className="form-control" id="year" aria-describedby="year"
                                   placeholder="Enter year" value={year} onChange={e => setYear(e.target.value)}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="address">Address</label>
                            <input type="text" className="form-control" id="address" aria-describedby="address"
                                   placeholder="Enter address" value={address}
                                   onChange={e => setAddress(e.target.value)}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="pricePerDay">Price Per Day</label>
                            <input type="text" className="form-control" id="pricePerDay" aria-describedby="pricePerDay"
                                   placeholder="Enter price per day" value={pricePerDay}
                                   onChange={e => setPricePerDay(e.target.value)}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="chooseImage">Image</label> <br/>
                            <input type="file" className="form-control-file" id="chooseImage"
                                   onChange={e => setPhoto(e.target.files[0])}/>
                        </div>
                        <br/>
                        <div style={{display: 'flex', gap: '20px'}}>
                            <button type="submit" className="btn btn-primary">Submit</button>
                            <button className="btn btn-danger" onClick={() => handleClose()}>Cancel</button>
                        </div>
                    </form>
                </Modal.Body>
            </Modal>
        </div>
    )
}


