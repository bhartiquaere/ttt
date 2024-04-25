import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Button, Col, Form, FormGroup, Input, Label, Row } from 'reactstrap';
import CreatableSelect from "react-select/creatable";
import DatePicker from "react-datepicker";
import { createUserAPI } from '../../api';
const Register = () => {
    const [mode,setMode]=useState("Register")
    const [startDate, setStartDate] = useState();
    const navigate = useNavigate();
    const [gender, setGender] = useState('');
    const [selectedHobbies, setSelectedHobbies] = useState([]);
    const {
        register,
        handleSubmit,
        watch,
        setValue,
        trigger,
        reset,
        formState: { errors },
    } = useForm();
    const handleStatusChange = (e) => {
        setValue("status", e || "");
        trigger("status");
    };
    const passwordMatch = (password, confirm) => {
        return password === confirm;
    };
    const handleCheckboxChange = (event) => {
        setGender(event.target.value);
    };
    const isGenderSelected = () => {
        return gender === 'male' || gender === 'female' || gender === 'other';
    }
    const handleHobbiesChange = (event) => {
        const hobby = event.target.value;
        if (event.target.checked) {
            setSelectedHobbies([...selectedHobbies, hobby]);
        } else {
            setSelectedHobbies(selectedHobbies.filter(selectedHobby => selectedHobby !== hobby));
        }
    };
    const areEnoughHobbiesSelected = () => {
        return selectedHobbies.length >= 2;
    }
    const State = [
        { id: 1, value: '1', label: 'Up' },
        { id: 2, value: '2', label: 'Bihar' },
    ];
    const [stateOptions, setStateOptions] = useState(State);
    const [districtOptions, setDistrictOptions] = useState([]);
    const [cityOptions, setCityOptions] = useState([]);

    const district = [
        { id: 1, value: '1', label: 'lucknow' },
        { id: 2, value: '2', label: 'Bhagalpur' },
    ];
    const city = [
        { id: 1, value: '1', label: 'Barabanki' },
        { id: 2, value: '2', label: 'Champa Nagri' },
    ];
    const handleStateChange = (e) => {
        setValue("state", e || "");
        trigger("state");
        setDistrictOptions(district);
    };

    const handleDistrictChange = (e) => {
        setValue("district", e || "");
        trigger("district");
        setCityOptions(city);
    };
    const handleCityChange = (e) => {
        setValue("city", e || "");
        trigger("city")
    }
    const onFormSubmit = (data) => {
        const formData = new FormData();
        formData.append('fname', data?.fname);
        formData.append('Mname', data?.Mname);
        formData.append('lname', data?.lname);
        formData.append('mobile', data?.mobile);
        formData.append('email', data?.email);
        formData.append('user_name', data?.user_name);
        formData.append('password', data?.password);
        formData.append('conPass', data?.conPass);
        formData.append('gender', gender);
        formData.append('dob', startDate);
        formData.append('hobbies', selectedHobbies);
        formData.append('state', data.state?.label);
        formData.append('district', data.district?.label);
        formData.append('city', data.city?.label);
        formData.append('status', data.status?.label);
        formData.append('profileImage', data?.profileImg);
        formData.append('document', data?.docImg);


        console.log(formData, "register");
        createUserAPI(formData)
            .then((res) => {
                if (res.data.status === "Success") {
                    navigate("/login")
                } else {
                    console.error("Registration failed:", res.error);
                }
            })
            .catch((err) => {
                console.error("Request failed:", err);
            });
    };


    return (
        <>
            <div className="account-page">
                <div className="main-wrapper">
                    <div className="account-content">
                        <div className="container">
                            <div className="account-box">
                                <div className="account-wrapper outer">
                                    <h3 className="account-title">User Registration Form</h3>
                                    <div className={`row-12 mt-5`}>
                                        <Form onSubmit={handleSubmit(onFormSubmit)} action="/multiple-upload" method="POST" enctype="multipart/form-data" >
                                            <Row>
                                                <Col md={4}>
                                                    <Label for="name">
                                                        First Name
                                                    </Label>
                                                    <input
                                                        placeholder="Enter First Name ."
                                                        type="text"
                                                        id="fname"
                                                        {...register("fname", {
                                                            required: true,
                                                            pattern: /^[a-zA-Z]{3,8}$/
                                                        })}
                                                        className="form-control inputbox"
                                                        value={watch(`fname`)}
                                                    />
                                                    <span className="invalid"
                                                        style={{ color: "#e85347", fontSize: "11px", fontStyle: "italic" }}
                                                    >
                                                        {errors.fname?.type === "required" && "First Name is Required."}
                                                        {errors.fname?.type === "pattern" && "First Name must be 3-8 characters with no digits."}
                                                    </span>

                                                </Col>
                                                <Col md={4}>
                                                    <Label for="Mname">
                                                        Middle Name
                                                    </Label>
                                                    <input
                                                        placeholder="Enter Middle Name ."
                                                        type="text"
                                                        id="Mname"
                                                        {...register("Mname", {
                                                            required: true,
                                                            pattern: /^[a-zA-Z]{3,8}$/
                                                        })}
                                                        className="form-control inputbox"
                                                        value={watch(`Mname`)}
                                                    />
                                                    <span className="invalid"
                                                        style={{ color: "#e85347", fontSize: "11px", fontStyle: "italic" }}
                                                    >
                                                        {errors.Mname?.type === "required" && "Middle Name is Required."}
                                                        {errors.Mname?.type === "pattern" && "Middle Name must be 3-8 characters with no digits."}
                                                    </span>

                                                </Col>
                                                <Col md={4}>
                                                    <Label for="lname">
                                                        Last Name
                                                    </Label>
                                                    <input
                                                        placeholder="Enter Last Name ."
                                                        type="text"
                                                        id="lname"
                                                        {...register("lname", {
                                                            required: true,
                                                            pattern: /^[a-zA-Z]{3,8}$/
                                                        })}
                                                        className="form-control inputbox"
                                                        value={watch(`lname`)}
                                                    />
                                                    <span className="invalid"
                                                        style={{ color: "#e85347", fontSize: "11px", fontStyle: "italic" }}
                                                    >
                                                        {errors.lname?.type === "required" && "Last Name is Required."}
                                                        {errors.lname?.type === "pattern" && "Last Name must be 3-8 characters with no digits."}
                                                    </span>
                                                </Col>
                                            </Row>
                                            <Row className="mt-5 ">
                                                <Col md={4}>
                                                    <Label for="mobile">
                                                        Mobile
                                                    </Label>
                                                    <input
                                                        placeholder="Enter Contact No."
                                                        type="text"
                                                        id="mobile"
                                                        {...register("mobile", {
                                                            required: true,
                                                            pattern: /^[6-9]\d{9}$/
                                                        })}
                                                        className="form-control inputbox"
                                                        value={watch(`mobile`)}
                                                    />
                                                    <span className="invalid"
                                                        style={{ color: "#e85347", fontSize: "11px", fontStyle: "italic" }}
                                                    >
                                                        {errors.mobile?.type === "required" && "Mobile is Required."}
                                                        {errors.mobile?.type === "pattern" && "Enter a valid mobile number starting with 6-9"}

                                                    </span>

                                                </Col>
                                                <Col md={4}>
                                                    <Label for="email">
                                                        Email
                                                    </Label>
                                                    <input
                                                        placeholder="Enter Email."
                                                        type="email"
                                                        id="email"
                                                        {...register("email", { required: true })}
                                                        className="form-control inputbox"
                                                        value={watch(`email`)}
                                                    />
                                                    <span className="invalid"
                                                        style={{ color: "#e85347", fontSize: "11px", fontStyle: "italic" }}
                                                    >
                                                        {errors.email?.type === "required" && "Email is Required."}
                                                        {errors.email?.type === "email" && "Enter a valid email address"}

                                                    </span>

                                                </Col>
                                                <Col md={4}>
                                                    <Label for="department">
                                                        User Name
                                                    </Label>
                                                    <input
                                                        placeholder="Enter User Name ."
                                                        type="text"
                                                        id="user_name"
                                                        {...register("user_name", {
                                                            required: true,
                                                            pattern: /^[a-z0-9]+$/
                                                        })}
                                                        className="form-control inputbox"
                                                        value={watch(`user_name`)}
                                                    />
                                                    <span className="invalid"
                                                        style={{ color: "#e85347", fontSize: "11px", fontStyle: "italic" }}
                                                    >
                                                        {errors.user_name?.type === "required" && "User Name is Required."}
                                                        {errors.user_name?.type === "pattern" && "User Name should contain only lowercase letters and digits"}

                                                    </span>

                                                </Col>
                                            </Row>
                                            <Row className="mt-5 ">
                                                <Col md={5}>
                                                    <Label for="mobile">
                                                        Password
                                                    </Label>
                                                    <input
                                                        placeholder="Enter Password."
                                                        type="password"
                                                        id="password"
                                                        {...register("password", { required: true })}
                                                        className="form-control inputbox"
                                                        value={watch(`password`)}
                                                    />
                                                    <span className="invalid"
                                                        style={{ color: "#e85347", fontSize: "11px", fontStyle: "italic" }}
                                                    >
                                                        {errors.password?.type === "required" && "Password is Required."}
                                                    </span>

                                                </Col>
                                                <Col md={5}>
                                                    <Label for="conPass">
                                                        Confirm Password
                                                    </Label>
                                                    <input
                                                        placeholder="Enter Confirm Password."
                                                        type="conPass"
                                                        id="conPass"
                                                        {...register("conPass", { required: true })}
                                                        className="form-control inputbox"
                                                        value={watch(`conPass`)}
                                                    />
                                                    <span className="invalid"
                                                        style={{ color: "#e85347", fontSize: "11px", fontStyle: "italic" }}
                                                    >
                                                        {errors.conPass?.type === "required" && "Confirm Password is Required."}
                                                        {watch("password") !== watch("conPass") && "Passwords do not match"}
                                                    </span>

                                                </Col>

                                            </Row>
                                            <Row className='mt-5'>
                                                <Col md={5}>
                                                    <Label for="department">
                                                        Gender
                                                    </Label>
                                                    <br />
                                                    <Input className='mx-3' type="checkbox" value="male" onChange={handleCheckboxChange} checked={gender === 'male'} />{' '}
                                                    Male
                                                    <Input className='mx-3' type="checkbox" value="female" onChange={handleCheckboxChange} checked={gender === 'female'} />{' '}
                                                    Female
                                                    <Input className='mx-3' type="checkbox" value="other" onChange={handleCheckboxChange} checked={gender === 'other'} />{' '}
                                                    other
                                                    <br />
                                                    {!isGenderSelected() && <span className="invalid"
                                                        style={{ color: "#e85347", fontSize: "11px", fontStyle: "italic" }}
                                                    >
                                                        Please select a gender.
                                                    </span>}
                                                </Col>

                                                <Col md="3">
                                                    <Label>
                                                        DOB Date
                                                    </Label>
                                                    <DatePicker
                                                        className="form-control inputbox datepicker"

                                                        selected={startDate}
                                                        onChange={(date) => setStartDate(date)}
                                                        maxDate={new Date()}
                                                    />
                                                </Col>
                                            </Row>
                                            <Row className='mt-4'>
                                                <Col md={12}>
                                                    <Label for="hobbies">
                                                        Hobbies
                                                    </Label>
                                                    <br />
                                                    <Input className='mx-5' type="checkbox" value="reading" onChange={handleHobbiesChange} checked={selectedHobbies.includes('reading')} />{' '}
                                                    Reading
                                                    <Input className='mx-5' type="checkbox" value="writing" onChange={handleHobbiesChange} checked={selectedHobbies.includes('writing')} />{' '}
                                                    Writing
                                                    <Input className='mx-5' type="checkbox" value="painting" onChange={handleHobbiesChange} checked={selectedHobbies.includes('painting')} />{' '}
                                                    Painting
                                                    <Input className='mx-5' type="checkbox" value="coding" onChange={handleHobbiesChange} checked={selectedHobbies.includes('coding')} />{' '}
                                                    Coding
                                                    <br />
                                                    {!areEnoughHobbiesSelected() && <span
                                                        className="invalid"
                                                        style={{ color: "#e85347", fontSize: "11px", fontStyle: "italic" }}
                                                    >
                                                        Please select at least two hobbies</span>}
                                                </Col>
                                            </Row>
                                            <Row className='mt-4'>
                                                <Label className="from-label" htmlFor="status">
                                                    Address :-
                                                </Label>
                                                <Col md={`4`}>
                                                    <div className="form-group">
                                                        <Label className="from-label" htmlFor="state">
                                                            State
                                                        </Label>
                                                        <div className="form-control-wrap">
                                                            <CreatableSelect
                                                                id="status"
                                                                {...register("state", { required: true })}
                                                                options={stateOptions}
                                                                onChange={handleStateChange}
                                                                value={watch(`state`)}
                                                            />
                                                            <span className="invalid"
                                                                style={{ color: "#e85347", fontSize: "11px", fontStyle: "italic" }}
                                                            >
                                                                {errors.status?.type === "required" && "Status is Required."}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </Col>
                                                <Col md={`4`}>
                                                    <div className="form-group">
                                                        <Label className="from-label" htmlFor="district">
                                                            District
                                                        </Label>
                                                        <div className="form-control-wrap">
                                                            <CreatableSelect
                                                                id="status"
                                                                {...register("district", { required: true })}
                                                                options={districtOptions}
                                                                onChange={handleDistrictChange}
                                                                value={watch(`district`)}
                                                            />
                                                            <span className="invalid"
                                                                style={{ color: "#e85347", fontSize: "11px", fontStyle: "italic" }}
                                                            >
                                                                {errors.status?.type === "required" && "Status is Required."}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </Col>
                                                <Col md={`4`}>
                                                    <div className="form-group">
                                                        <Label className="from-label" htmlFor="city">
                                                            City
                                                        </Label>
                                                        <div className="form-control-wrap">
                                                            <CreatableSelect
                                                                id="city"
                                                                {...register("city", { required: true })}
                                                                options={cityOptions}
                                                                onChange={handleCityChange}
                                                                value={watch(`city`)}
                                                            />
                                                            <span className="invalid"
                                                                style={{ color: "#e85347", fontSize: "11px", fontStyle: "italic" }}
                                                            >
                                                                {errors.city?.type === "required" && "City is Required."}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </Col>

                                            </Row>
                                            <Row className='mt-4'>
                                                <Col md={`5`}>
                                                    <div className="form-group">
                                                        <Label className="from-label" htmlFor="status">
                                                            Status
                                                        </Label>
                                                        <div className="form-control-wrap">
                                                            <CreatableSelect
                                                                id="status"
                                                                {...register("status", { required: true })}
                                                                options={[
                                                                    { value: false, label: "InActive" },
                                                                    { value: true, label: "Active" },
                                                                ]}
                                                                onChange={handleStatusChange}
                                                                value={watch(`status`)}
                                                            />
                                                            <span className="invalid"
                                                                style={{ color: "#e85347", fontSize: "11px", fontStyle: "italic" }}
                                                            >
                                                                {errors.status?.type === "required" && "Status is Required."}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </Col>

                                            </Row>
                                            <Row className='mt-4'>
                                                <Col md={`6`}>
                                                    <div className="form-group">
                                                        <Label className="from-label" htmlFor="status">
                                                            Profile
                                                        </Label>
                                                        <div className="form-control-wrap">
                                                            <input
                                                                type="file"
                                                                name="profileImg"
                                                                accept="image/png, image/gif, image/jpeg"
                                                                onChange={(e) => setValue('profileImg', e.target.files[0])}

                                                            />
                                                        </div>
                                                    </div>
                                                </Col>
                                                <Col md={`6`}>
                                                    <div className="form-group">
                                                        <Label className="from-label" htmlFor="status">
                                                            Document
                                                        </Label>
                                                        <div className="form-control-wrap">
                                                            <input
                                                                type="file"
                                                                name="Document"
                                                                accept="application/pdf"
                                                                onChange={(e) => setValue('docImg', e.target.files[0])}

                                                            />
                                                        </div>
                                                    </div>
                                                </Col>
                                            </Row>
                                            <Row className='mt-4'>
                                                <Col md={8} className='mt-4'>
                                                    <Button color='primary' className='mx-5' type='submit'>
                                                        Register
                                                    </Button>
                                                    <Link to={"/"}><Button color='primary'>
                                                        Login
                                                    </Button></Link>
                                                </Col>
                                            </Row>
                                        </Form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Register;
