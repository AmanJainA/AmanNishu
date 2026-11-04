import { useEffect, useRef, useState } from 'react';
import { PHONE_PATTERN, lookupEntry, submitEntry, updateEntry } from '../services/api';

const EMPTY = {
  name: '', contactno: '', arrangement: '', side: '', arrivaldate: '', arrivaltime: '',
  comingfrom: '', mode: '', flightno: '', trainname: '', adult: '1', children: '0',
};
const range = (from, to) => Array.from({ length: to - from + 1 }, (_, i) => from + i);

function Field({ label, children, className = 'col-md-6 fv-row' }) {
  return (
    <div className={className}>
      {label && <label className="fs-5 fw-semibold mb-2">{label}</label>}
      {children}
    </div>
  );
}

/** mode="new" -> "For Stay Arrangement", mode="edit" -> "Edit Stay Arrangement" */
export default function StayForm({ mode }) {
  const [editing, setEditing] = useState(mode === 'edit');
  const isEdit = editing;
  const [v, setV] = useState(EMPTY);
  const [locked, setLocked] = useState(false); // edit: number found, field read-only
  const [notice, setNotice] = useState(null); // { type: 'success' | 'danger', text }
  const [busy, setBusy] = useState(false);
  const noticeRef = useRef(null);

  const set = (e) => setV((s) => ({ ...s, [e.target.name]: e.target.value }));
  const needsTravel = v.arrangement === 'Yes';

  // Edit page: fetch the saved entry as soon as a valid 10-digit number is typed.
  useEffect(() => {
    if (!isEdit || locked || !PHONE_PATTERN.test(v.contactno)) return;
    let cancelled = false;
    lookupEntry(v.contactno)
      .then((entry) => {
        if (cancelled) return;
        if (!entry) {
          setNotice({ type: 'danger', text: 'Please Enter Your Register Number' });
          return;
        }
        setNotice(null);
        setLocked(true);
        setV({
          ...EMPTY,
          ...Object.fromEntries(Object.entries(entry).map(([k, x]) => [k, x ?? ''])),
          arrivaltime: String(entry.arrivaltime || '').slice(0, 5),
          adult: String(entry.adult || '1'),
          children: String(entry.children || '0'),
          contactno: v.contactno,
        });
      })
      .catch((err) => !cancelled && setNotice({ type: 'danger', text: err.message }));
    return () => { cancelled = true; };
  }, [isEdit, locked, v.contactno]);

  useEffect(() => {
    if (notice) noticeRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }, [notice]);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (isEdit && !locked) {
      setNotice({ type: 'danger', text: 'Please enter the contact number you registered with.' });
      return;
    }
    setBusy(true);
    setNotice(null);
    const travel = needsTravel;
    const payload = {
      ...v,
      side: travel ? v.side : '',
      arrivaldate: travel ? v.arrivaldate : '',
      arrivaltime: travel ? v.arrivaltime : '',
      comingfrom: travel ? v.comingfrom : '',
      mode: travel ? v.mode : '',
      flightno: travel && v.mode === 'Flight' ? v.flightno : '',
      trainname: travel && v.mode === 'Train' ? v.trainname : '',
    };
    try {
      const res = await (isEdit ? updateEntry : submitEntry)(payload);
      setNotice({ type: 'success', text: res.message || (isEdit ? 'Updated Successfully' : 'Submitted Successfully') });
      setV(EMPTY);
      setLocked(false);
    } catch (err) {
      setNotice({ type: 'danger', text: err.message });
    } finally {
      setBusy(false);
    }
  };

  const contactInput = (
    <input
      type="tel" inputMode="numeric" autoComplete="tel" maxLength={10}
      className="form-control form-control-solid" placeholder="Contact Number"
      name="contactno" id="contactno" value={v.contactno} onChange={set}
      pattern="[6789][0-9]{9}" title="Please enter valid contact number"
      readOnly={locked} required
    />
  );

  const arrangementSelect = (
    <Field label="Stay Arrangement">
      <select className="form-control form-control-solid" name="arrangement" id="want"
        value={v.arrangement} onChange={set} required>
        <option value="">{isEdit ? '' : '---Select---'}</option>
        <option value="Yes">Required</option>
        <option value="No">Not Required</option>
      </select>
    </Field>
  );

  return (
    <div className="wpo-contact-form-area">
      <div className="wpo-section-title">
        <h3>{isEdit ? 'Edit Stay Arrangement' : 'For Stay Arrangement'}</h3>
      </div>
      <form onSubmit={onSubmit} className="contact-validation-active">
        <div className="col-md-12" ref={noticeRef}>
          {notice && (
            <div className={`alert alert-${notice.type} text-gray-500 fw-semibold fs-6`} role="alert">
              {notice.text}
            </div>
          )}
        </div>

        {isEdit ? (
          <>
            <div className="row">
              <div className="col-md-12 fv-row">
                {contactInput}
                {locked && (
                  <p className="mt-1 mb-0 text-end">
                    <a href="#change" onClick={(e) => { e.preventDefault(); setV(EMPTY); setLocked(false); setNotice(null); }}>
                      Use a different number
                    </a>
                  </p>
                )}
              </div>
            </div>
            <div className="row">
              <Field label="Name">
                <input type="text" className="form-control form-control-solid" placeholder="Name"
                  name="name" id="name" value={v.name} onChange={set} autoComplete="name" required />
              </Field>
              {arrangementSelect}
            </div>
          </>
        ) : (
          <>
            <div className="row">
              <Field>
                <input type="text" className="form-control form-control-solid" placeholder="Name"
                  name="name" value={v.name} onChange={set} autoComplete="name" required />
              </Field>
              <Field>{contactInput}</Field>
            </div>
            <div className="row">{arrangementSelect}</div>
          </>
        )}

        {needsTravel && (
          <>
            <div className="row" id="lists">
              <Field label="From whose side you are?">
                <select className="form-control form-control-solid" name="side" id="side"
                  value={v.side} onChange={set} required>
                  <option value="">{isEdit ? '' : '---Select---'}</option>
                  <option value="Aman">Aman</option>
                  <option value="Nishu">Nishu</option>
                </select>
              </Field>
              <Field label="Arrival Date">
                <input type="date" className="form-control form-control-solid" name="arrivaldate"
                  id="arrivaldate" value={v.arrivaldate} onChange={set} required />
              </Field>
              <Field label="Arrival Time">
                <input type="time" className="form-control form-control-solid" name="arrivaltime"
                  id="arrivaltime" value={v.arrivaltime} onChange={set} required />
              </Field>
              <Field label="Coming From">
                <input type="text" className="form-control form-control-solid" name="comingfrom"
                  id="comingfrom" placeholder="Coming From" value={v.comingfrom} onChange={set} required />
              </Field>
            </div>
            <div className="row" id="mode">
              <Field label="Mode of Travel">
                <select className="form-control form-control-solid" name="mode" id="yesno"
                  value={v.mode} onChange={set} required>
                  <option value="">{isEdit ? '' : '---Select---'}</option>
                  <option value="Flight">Flight</option>
                  <option value="Train">Train</option>
                  <option value="Own Vehicle">Own Vehicle</option>
                  <option value="Bus">Bus</option>
                </select>
              </Field>
              {v.mode === 'Flight' && (
                <Field label="Flight Number">
                  <input type="text" name="flightno" id="flightno" className="form-control form-control-solid"
                    placeholder="Flight No" value={v.flightno} onChange={set} required />
                </Field>
              )}
              {v.mode === 'Train' && (
                <Field label="Train No. & Name">
                  <input type="text" name="trainname" id="trainname" className="form-control form-control-solid"
                    placeholder="Train No. & Name" value={v.trainname} onChange={set} required />
                </Field>
              )}
            </div>
          </>
        )}

        <div className="row">
          <h4>Members (Including Self)</h4>
          <Field label="Adult ">
            <select name="adult" id="adult" className="form-control form-control-solid" value={v.adult} onChange={set}>
              {range(1, 8).map((n) => <option key={n}>{n}</option>)}
            </select>
          </Field>
          <Field label="Children ">
            <select name="children" id="children" className="form-control form-control-solid" value={v.children} onChange={set}>
              {range(0, 8).map((n) => <option key={n}>{n}</option>)}
            </select>
          </Field>
        </div>

        <div className="d-grid mb-3">
          <button type="submit" className="btn btn-primary" disabled={busy}>
            {busy ? 'please wait…' : isEdit ? 'Update' : 'submit'}
          </button>
        </div>
      </form>
      {!isEdit ? (
        <p className="text-center mt-3">
          <button type="button" className="stay-form-link" onClick={() => {
            setV(EMPTY);
            setLocked(false);
            setNotice(null);
            setEditing(true);
          }}>
            Click here to edit your stay arrangement
          </button>
        </p>
      ) : (
        <p className="text-center mt-3">
          <button type="button" className="stay-form-link" onClick={() => {
            setV(EMPTY);
            setLocked(false);
            setNotice(null);
            setEditing(false);
          }}>
            Back to new stay arrangement
          </button>
        </p>
      )}
    </div>
  );
}
