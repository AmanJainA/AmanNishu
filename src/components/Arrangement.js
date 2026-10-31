
import React, { useState } from "react";
import "./Arrangement.css";

export default function Arrangement() {
  const [arrangement, setArrangement] = useState("");
  const [mode, setMode] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    try {
      // Connect this endpoint to your PHP backend.
      const response = await fetch("/api/submit-arrangement.php", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();
      setMessage(result.message || "Submitted successfully.");
    } catch (error) {
      setMessage("Unable to submit. Please try again.");
    }
  };

  return (
    <main className="page-wrapper arrangement-page">
      <section
        className="wpo-contact-section-s4 section-padding"
        id="rsvp"
        style={{
          backgroundImage: "url('/assets/images/rsvp/bg2.jpg')",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      >
        <div className="wpo-contact-section-inner">
          <div className="container-fluid">
            <div className="row align-items-center">
              <div className="col col-xl-5 col-lg-5 col-md-12 col-12">
                <div className="wpo-contact-section-wrapper">
                  <div className="wpo-contact-form-area">
                    <div className="wpo-section-title">
                      <h3>For Stay Arrangement</h3>
                    </div>

                    <form
                      className="contact-validation-active"
                      onSubmit={handleSubmit}
                    >
                      {message && (
                        <div className="alert alert-info">{message}</div>
                      )}

                      <div className="row">
                        <div className="col-md-6 fv-row">
                          <input
                            type="text"
                            className="form-control form-control-solid"
                            placeholder="Name"
                            name="name"
                            required
                          />
                        </div>

                        <div className="col-md-6 fv-row">
                          <input
                            type="tel"
                            className="form-control form-control-solid"
                            placeholder="Contact Number"
                            name="contactno"
                            pattern="[6789][0-9]{9}"
                            title="Please enter valid contact number"
                            required
                          />
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-md-6 fv-row">
                          <label>Stay Arrangement</label>
                          <select
                            className="form-control form-control-solid"
                            name="arrangement"
                            value={arrangement}
                            onChange={(e) => setArrangement(e.target.value)}
                            required
                          >
                            <option value="">---Select---</option>
                            <option value="Yes">Required</option>
                            <option value="No">Not Required</option>
                          </select>
                        </div>
                      </div>

                      {arrangement === "Yes" && (
                        <>
                          <div className="row">
                            <div className="col-md-6 fv-row">
                              <label>From whose side are you?</label>
                              <select
                                className="form-control form-control-solid"
                                name="side"
                                required
                              >
                                <option value="">---Select---</option>
                                <option value="Manasvi">Manasvi</option>
                                <option value="Spandan">Spandan</option>
                              </select>
                            </div>

                            <div className="col-md-6 fv-row">
                              <label>Arrival Date</label>
                              <input
                                type="date"
                                className="form-control form-control-solid"
                                name="arrivaldate"
                                required
                              />
                            </div>

                            <div className="col-md-6 fv-row">
                              <label>Arrival Time</label>
                              <input
                                type="time"
                                className="form-control form-control-solid"
                                name="arrivaltime"
                                required
                              />
                            </div>

                            <div className="col-md-6 fv-row">
                              <label>Coming From</label>
                              <input
                                type="text"
                                className="form-control form-control-solid"
                                name="comingfrom"
                                placeholder="Coming From"
                                required
                              />
                            </div>
                          </div>

                          <div className="row">
                            <div className="col-md-6 fv-row">
                              <label>Mode of Travel</label>
                              <select
                                className="form-control form-control-solid"
                                name="mode"
                                value={mode}
                                onChange={(e) => setMode(e.target.value)}
                                required
                              >
                                <option value="">---Select---</option>
                                <option value="Flight">Flight</option>
                                <option value="Train">Train</option>
                                <option value="Own Vehicle">Own Vehicle</option>
                                <option value="Bus">Bus</option>
                              </select>
                            </div>

                            {mode === "Flight" && (
                              <div className="col-md-6 fv-row">
                                <label>Flight Number</label>
                                <input
                                  type="text"
                                  name="flightno"
                                  className="form-control form-control-solid"
                                  placeholder="Flight No."
                                  required
                                />
                              </div>
                            )}

                            {mode === "Train" && (
                              <div className="col-md-6 fv-row">
                                <label>Train No. & Name</label>
                                <input
                                  type="text"
                                  name="trainname"
                                  className="form-control form-control-solid"
                                  placeholder="Train No. & Name"
                                  required
                                />
                              </div>
                            )}
                          </div>
                        </>
                      )}

                      <div className="row">
                        <h4>Members (Including Self)</h4>

                        <div className="col-md-6 fv-row">
                          <label>Adult</label>
                          <select
                            name="adult"
                            className="form-control form-control-solid"
                            defaultValue="1"
                          >
                            {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                              <option key={n} value={n}>{n}</option>
                            ))}
                          </select>
                        </div>

                        <div className="col-md-6 fv-row">
                          <label>Children</label>
                          <select
                            name="children"
                            className="form-control form-control-solid"
                            defaultValue="0"
                          >
                            {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                              <option key={n} value={n}>{n}</option>
                            ))}
                          </select>
                        </div>
                      </div>

                      <div className="d-grid mb-3">
                        <button type="submit" className="btn btn-primary">
                          Submit
                        </button>
                      </div>
                    </form>

                    <p className="text-center">
                      <a href="/editarrangement">
                        Click here to edit your stay arrangement
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
