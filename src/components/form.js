import React from "react";
import { nanoid } from "nanoid";
import { getDatabase, ref, set } from "firebase/database";
import { isWebUri } from "valid-url";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";

class Form extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      longURL: '',
      preferredAlias: '',
      generatedURL: '',
      loading: false,
      copied: false,
      errors: [],
      errorMessage: {},
      toolTipMessage: 'copy to clipboard'
    };
  }

  componentWillUnmount() {
    if (this.copyResetTimer) {
      clearTimeout(this.copyResetTimer);
    }
  }

  onSubmit = async (e) => {
    e.preventDefault();

    if (!isWebUri(this.state.longURL)) {
      this.setState({
        errors: ["longURL"],
        errorMessage: { longURL: "Please enter a valid URL" }
      });
      return;
    }

    this.setState({ errors: [], errorMessage: {}, loading: true });

    let generatedKey = nanoid(4);
    let generatedURL = window.location.origin + "/" + generatedKey;

    if (this.state.preferredAlias !== '') {
      generatedKey = this.state.preferredAlias;
      generatedURL = window.location.origin + "/" + this.state.preferredAlias;
    }

    const db = getDatabase();

    set(ref(db, '/' + generatedKey), {
      generatedKey,
      longURL: this.state.longURL,
      preferredAlias: this.state.preferredAlias,
      generatedURL
    }).then(() => {
      this.setState({
        generatedURL: generatedURL,
        loading: false
      });
    }).catch(() => {
      this.setState({
        loading: false,
        errors: ["submit"],
        errorMessage: { submit: "Something went wrong. Please try again." }
      });
    });
  }

  handleChange = (e) => {
    const { id, value } = e.target;
    this.setState({
      [id]: value
    });
  }

  copyToClipBoard = (e) => {
    e.preventDefault();

    navigator.clipboard.writeText(this.state.generatedURL);

    if (this.copyResetTimer) {
      clearTimeout(this.copyResetTimer);
    }

    this.setState({
      toolTipMessage: 'Copied!',
      copied: true
    });

    this.copyResetTimer = setTimeout(() => {
      this.setState({
        toolTipMessage: 'copy to clipboard',
        copied: false
      });
    }, 1600);
  }

  render() {

    return (

      <div className="container">

        <div className="ticket-header">
          <h3>URL SHORTENER</h3>
          <p className="ticket-subtitle">
            Turn a long link into a short one you can actually remember.
            No sign-up required.
          </p>

          <div className="ticket-meta">
            <div className="ticket-meta-item">
              <span className="ticket-meta-label">Type</span>
              <span className="ticket-meta-value">Web link</span>
            </div>
            <div className="ticket-meta-item">
              <span className="ticket-meta-label">Status</span>
              <span className={"ticket-meta-value" + (this.state.generatedURL ? " status-active" : "")}>
                {this.state.generatedURL ? "Active" : "Draft"}
              </span>
            </div>
          </div>
        </div>

        <div className="ticket-body">

          <form autoComplete="off">

            <div className="form-group">

              <label className="custom-color-label">Long URL</label>

              <input
                id="longURL"
                onChange={this.handleChange}
                value={this.state.longURL}
                type="url"
                className={
                  "form-control" +
                  (this.state.errors.includes("longURL") ? " is-invalid" : "")
                }
                placeholder="https://example.com/your/long/link"
              />

              {this.state.errors.includes("longURL") &&
                <div className="text-danger mt-1">
                  {this.state.errorMessage.longURL}
                </div>
              }

            </div>

            <div className="form-group">

              <label className="custom-color-label">Custom alias (optional)</label>

              <input
                id="preferredAlias"
                onChange={this.handleChange}
                value={this.state.preferredAlias}
                type="text"
                className="form-control"
                placeholder="my-link"
              />

            </div>

            {this.state.errors.includes("submit") &&
              <div className="text-danger mb-2">
                {this.state.errorMessage.submit}
              </div>
            }

            <button
              className="btn btn-primary"
              type="button"
              disabled={this.state.loading}
              onClick={this.onSubmit}
            >
              {this.state.loading ? "Generating..." : "Shorten link"}
            </button>

            {
              this.state.generatedURL !== '' &&
              <div className="result-wrap">
                <div className="ticket-divider"></div>

                <div className="generatedURL">

                  <svg
                    className="stamp"
                    viewBox="0 0 100 100"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <defs>
                      <path
                        id="stampCircle"
                        d="M 50,50 m -38,0 a 38,38 0 1,1 76,0 a 38,38 0 1,1 -76,0"
                      />
                    </defs>
                    <circle cx="50" cy="50" r="46" fill="none" stroke="#3F6B4E" strokeWidth="2" />
                    <circle cx="50" cy="50" r="38" fill="none" stroke="#3F6B4E" strokeWidth="1.5" strokeDasharray="2 3" />
                    <text fontSize="7.5" fill="#3F6B4E" letterSpacing="1.5">
                      <textPath href="#stampCircle" startOffset="1%">
                        • SHORT LINK READY • SHORT LINK READY
                      </textPath>
                    </text>
                    <path
                      d="M33 51 L44 62 L68 38"
                      fill="none"
                      stroke="#3F6B4E"
                      strokeWidth="6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>

                  <div className="generatedURL-body">
                    <span className="result-label">Your short link</span>

                    <div className="result-row">

                      <input
                        disabled
                        type="text"
                        value={this.state.generatedURL}
                        className="form-control"
                      />

                      <OverlayTrigger
                        placement="top"
                        overlay={
                          <Tooltip>
                            {this.state.toolTipMessage}
                          </Tooltip>
                        }
                      >
                        <button
                          type="button"
                          onClick={this.copyToClipBoard}
                          className={
                            "btn btn-primary btn-copy" +
                            (this.state.copied ? " is-copied" : "")
                          }
                        >
                          {this.state.copied ? "Copied" : "Copy"}
                        </button>
                      </OverlayTrigger>

                    </div>
                  </div>

                </div>

                <div className="ticket-barcode" aria-hidden="true"></div>
              </div>
            }

            <p className="ticket-footer">
              Every link gets a unique code · Free to use · No account required
            </p>

          </form>

        </div>

      </div>

    );

  }

}

export default Form;
