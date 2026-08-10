import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getDatabase, ref, get } from "firebase/database";

function Redirect() {

  const { alias } = useParams();
  const [status, setStatus] = useState("loading"); // loading | notfound | error

  useEffect(() => {

    const db = getDatabase();

    get(ref(db, "/" + alias))
      .then((snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          window.location.href = data.longURL;
        } else {
          setStatus("notfound");
        }
      })
      .catch(() => {
        setStatus("error");
      });

  }, [alias]);

  return (
    <div className="container">

      <div className="ticket-header">
        <h3>{status === "loading" ? "REDIRECTING" : "LINK NOT FOUND"}</h3>
        <p className="ticket-subtitle">
          {status === "loading"
            ? "Hold on — we're sending you to your destination."
            : "This short link doesn't match anything in our records."}
        </p>
      </div>

      <div className="redirect-body">

        {status === "loading" &&
          <>
            <div className="redirect-spinner" aria-hidden="true"></div>
            <p className="redirect-note">Looking up...</p>
          </>
        }

        {(status === "notfound" || status === "error") &&
          <>
            <div className="redirect-error-icon" aria-hidden="true">!</div>
            <p className="redirect-message">
              {status === "notfound"
                ? "It may have expired, been mistyped, or never existed."
                : "Something went wrong while looking up this link. Please try again."}
            </p>
            <Link to="/" className="redirect-back-link">
              <button className="btn btn-primary" type="button">
                Shorten a new link
              </button>
            </Link>
          </>
        }

      </div>

    </div>
  );
}

export default Redirect;
