
import React, { useState } from "react";
import "./Arrangement.css";

const initialForm = {
  name: "",
  contactno: "",
  arrangement: "",
  side: "",
  arrivaldate: "",
  arrivaltime: "",
  comingfrom: "",
  mode: "",
  flightno: "",
  trainname: "",
  adult: "1",
  children: "0",
};

export default function EditArrangement() {
  const [form, setForm] = useState(initialForm);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("info");
  const [loading, setLoading] = useState(false);
  const [lookupDone, setLookupDone] = useState(false);

  const updateField = (e) => {
    const { name, value } = e.target;

    setForm((prev) => {
      const updated = { ...prev, [name]: value };

      if (name === "arrangement" && value !== "Yes") {
        updated.side = "";
        updated.arrivaldate = "";
        updated.arrivaltime = "";
        updated.comingfrom = "";
        updated.mode = "";
        updated.flightno = "";
        updated.trainname = "";
      }

      if (name === "mode") {
        updated.flightno = "";
        updated.trainname = "";
      }

      return updated;
    });
  };

  const showMessage = (text, type = "info") => {
    setMessage(text);
    setMessageType(type);
  };

  // Fetch registered arrangement using contact number
  const fetchArrangement = async () => {
    if (!/^[6789][0-9]{9}$/.test(form.contactno)) {
      showMessage("Please enter a valid 10-digit contact number.", "danger");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const response = await fetch(
        "/api/information.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: new URLSearchParams({
            contactno: form.contactno,
          }),
        }
      );

      const result = await response.json();

      if (!response.ok || result.error) {
        showMessage(result.message || "Registered number not found.", "danger");
        setLookupDone(false);
        return;
      }

      setForm((prev) => ({
        ...prev,
        ...result,
        contactno: prev.contactno,
        name: result.name || "",
        arrangement: result.arrangement || "",
        side: result.side || "",
        arrivaldate: result.arrivaldate || "",
        arrivaltime: result.arrivaltime || "",
        comingfrom: result.comingfrom || "",
        mode: result.mode || "",
        flightno: result.flightno || "",
        trainname: result.trainname || "",
        adult: String(result.adult || "1"),
        children: String(result.children ?? "0"),
      }));

      setLookupDone(true);
      showMessage("Your arrangement details have been loaded.", "success");
    } catch (error) {
      showMessage("Unable to fetch details. Please try again.", "danger");
      setLookupDone(false);
    } finally {
      setLoading(false);
    }
  };

  // Update existing arrangement
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!lookupDone) {
      showMessage("Please verify your registered contact number first.", "danger");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/update-arrangement.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const result = await response.json();

      if (!response.ok || result.error) {
        showMessage(result.message || "Unable to update arrangement.", "danger");
      } else {
        showMessage(result.message || "Updated Successfully", "success");
      }
    } catch (error) {
      showMessage("Unable to update. Please try again.", "danger");
    } finally {
      setLoading(false);
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
                      <h3>Edit Stay Arrangement</h3>
                    </div>

                    <form onSubmit={handleSubmit}>
                      {message && (
                        <div className={`alert alert-${messageType}`}>
                          {message}
                        </div>
                      )}

                      {/* Contact Number Lookup */}
                      <div className="row">
                        <div className="col-md-12 fv-row">
                          <label>Registered Contact Number</label>
                          <div className="edit-contact-row">
                            <input
                              type="tel"
                              className="form-control form-control-solid"
                              placeholder="Contact Number"
                              name="contactno"
                              value={form.contactno}
                              onChange={(e) => {
                                setForm((prev) => ({
                                  ...prev,
                                  contactno: e.target.value,
                                }));
                                setLookupDone(false);
                              }}
                              pattern="[6789][0-9]{9}"
                              maxLength={10}
                              required
                            />

                            <button
                              type="button"
                              className="btn btn-primary"
                              onClick={fetchArrangement}
                              disabled={loading}
                            >
                              {loading ? "Please wait..." : "Verify"}
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Remaining fields appear after lookup */}
                      {lookupDone && (
                        <>
                          <div className="row">
                            <div className="col-md-6 fv-row">
                              <label>Name</label>
                              <input
                                type="text"
                                className="form-control form-control-solid"
                                placeholder="Name"
                                name="name"
                                value={form.name}
                                onChange={updateField}
                                required
                              />
                            </div>

                            <div className="col-md-6 fv-row">
                              <label>Stay Arrangement</label>
                              <select
                                className="form-control form-control-solid"
                                name="arrangement"
                                value={form.arrangement}
                                onChange={updateField}
                                required
                              >
                                <option value="">---Select---</option>
                                <option value="Yes">Required</option>
                                <option value="No">Not Required</option>
                              </select>
                            </div>
                          </div>

                          {form.arrangement === "Yes" && (
                            <>
                              <div className="row">
                                <div className="col-md-6 fv-row">
                                  <label>From whose side are you?</label>
                                  <select
                                    className="form-control form-control-solid"
                                    name="side"
                                    value={form.side}
                                    onChange={updateField}
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
                                    value={form.arrivaldate}
                                    onChange={updateField}
                                    required
                                  />
                                </div>

                                <div className="col-md-6 fv-row">
                                  <label>Arrival Time</label>
                                  <input
                                    type="time"
                                    className="form-control form-control-solid"
                                    name="arrivaltime"
                                    value={form.arrivaltime}
                                    onChange={updateField}
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
                                    value={form.comingfrom}
                                    onChange={updateField}
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
                                    value={form.mode}
                                    onChange={updateField}
                                    required
                                  >
                                    <option value="">---Select---</option>
                                    <option value="Flight">Flight</option>
                                    <option value="Train">Train</option>
                                    <option value="Own Vehicle">Own Vehicle</option>
                                    <option value="Bus">Bus</option>
                                  </select>
                                </div>

                                {form.mode === "Flight" && (
                                  <div className="col-md-6 fv-row">
                                    <label>Flight Number</label>
                                    <input
                                      type="text"
                                      className="form-control form-control-solid"
                                      name="flightno"
                                      placeholder="Flight No."
                                      value={form.flightno}
                                      onChange={updateField}
                                      required
                                    />
                                  </div>
                                )}

                                {form.mode === "Train" && (
                                  <div className="col-md-6 fv-row">
                                    <label>Train No. & Name</label>
                                    <input
                                      type="text"
                                      className="form-control form-control-solid"
                                      name="trainname"
                                      placeholder="Train No. & Name"
                                      value={form.trainname}
                                      onChange={updateField}
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
                                value={form.adult}
                                onChange={updateField}
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
                                value={form.children}
                                onChange={updateField}
                              >
                                {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                                  <option key={n} value={n}>{n}</option>
                                ))}
                              </select>
                            </div>
                          </div>

                          <div className="d-grid mb-3">
                            <button
                              type="submit"
                              className="btn btn-primary"
                              disabled={loading}
                            >
                              {loading ? "Updating..." : "Update"}
                            </button>
                          </div>
                        </>
                      )}
                    </form>
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
