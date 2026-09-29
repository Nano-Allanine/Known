
import { useState, useRef } from "react";
import "../styles/verify-identity.css";

function VerifyIdentity() {
  const [selectedMethod, setSelectedMethod] = useState("face");
  const [cameraActive, setCameraActive] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);
  const [cameraError, setCameraError] = useState("");

  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  async function startCamera() {
    try {
      setCameraError("");

      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: false,
      });

      if (!videoRef.current) {
        return;
      }

      videoRef.current.srcObject = stream;

      setCameraActive(true);

      await videoRef.current.play();

    } catch (error) {
      console.error("Camera error:", error);

      setCameraError(
        "Unable to access the camera. Please check your browser permissions."
      );
    }
  }

  function captureFace() {
    const video = videoRef.current;
    const canvas = canvasRef.current;

    if (!video || !canvas) {
      console.log("Video or canvas not available.");
      return;
    }

    if (video.videoWidth === 0 || video.videoHeight === 0) {
      console.log("Camera is not ready yet.");
      return;
    }

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const context = canvas.getContext("2d");

    context.drawImage(
      video,
      0,
      0,
      canvas.width,
      canvas.height
    );

    const image = canvas.toDataURL("image/jpeg");

    setCapturedImage(image);
  }

  function handleFaceButton() {
    if (!cameraActive) {
      startCamera();
      return;
    }

    if (!capturedImage) {
      captureFace();
    }
  }

  function stopCamera() {
    const video = videoRef.current;

    if (video && video.srcObject) {
      const tracks = video.srcObject.getTracks();

      tracks.forEach((track) => {
        track.stop();
      });

      video.srcObject = null;
    }

    setCameraActive(false);
  }

  function retakeFace() {
    setCapturedImage(null);
    setCameraError("");
  }

  function handleMethodChange(method) {
    stopCamera();
    setCapturedImage(null);
    setCameraError("");
    setSelectedMethod(method);
  }

  return (
    <div className="verify-page">

      {/* PAGE HEADER */}

      <div className="page-header">
        <div>
          <h1>Verify Identity</h1>

          <p>
            Verify an identity using facial recognition or QR code.
          </p>
        </div>
      </div>


      {/* VERIFICATION METHODS */}

      <div className="verification-methods">

        {/* FACIAL RECOGNITION */}

        <div
          className={`method-card ${
            selectedMethod === "face" ? "active" : ""
          }`}
          onClick={() => handleMethodChange("face")}
        >

          <div className="method-icon">
            ◉
          </div>

          <div>
            <h3>Facial Recognition</h3>

            <p>
              Verify an identity using facial biometric
              information.
            </p>
          </div>

          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              handleMethodChange("face");
            }}
          >
            Start Verification
          </button>

        </div>


        {/* QR CODE */}

        <div
          className={`method-card ${
            selectedMethod === "qr" ? "active" : ""
          }`}
          onClick={() => handleMethodChange("qr")}
        >

          <div className="method-icon">
            ▣
          </div>

          <div>
            <h3>QR Code</h3>

            <p>
              Scan a KNOWN QR credential to verify an identity.
            </p>
          </div>

          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              handleMethodChange("qr");
            }}
          >
            Scan QR Code
          </button>

        </div>

      </div>


      {/* VERIFICATION WORKSPACE */}

      <div className="verification-workspace">


        {/* CAMERA PANEL */}

        <div className="camera-panel">

          <div className="camera-header">

            <h3>
              {selectedMethod === "face"
                ? "Facial Verification"
                : "QR Verification"}
            </h3>

            <span>
              {selectedMethod === "face"
                ? capturedImage
                  ? "Captured"
                  : cameraActive
                    ? "Camera Active"
                    : "Ready"
                : "Ready"}
            </span>

          </div>


          {/* CAMERA AREA */}

          <div className="camera-area">

            {selectedMethod === "face" ? (

              capturedImage ? (

                <img
                  src={capturedImage}
                  alt="Captured face"
                  className="captured-face"
                />

              ) : cameraActive ? (

                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted
                  className="camera-video"
                />

              ) : (

                <div className="face-frame">

                  <div className="corner top-left"></div>

                  <div className="corner top-right"></div>

                  <div className="corner bottom-left"></div>

                  <div className="corner bottom-right"></div>

                  <p>
                    Camera ready
                  </p>

                </div>

              )

            ) : (

              <div className="qr-scanner">

                <p>
                  Position QR code inside the scanner
                </p>

              </div>

            )}

          </div>


          {/* CAMERA ERROR */}

          {cameraError && (
            <p className="camera-error">
              {cameraError}
            </p>
          )}


          {/* FACE ACTIONS */}

          {selectedMethod === "face" && (

            <div className="camera-actions">

              {!capturedImage ? (

                <button
                  type="button"
                  className="capture-button"
                  onClick={handleFaceButton}
                >
                  {!cameraActive
                    ? "Start Face Verification"
                    : "Capture Face"}
                </button>

              ) : (

                <div className="captured-actions">

                  <button
                    type="button"
                    className="capture-button"
                    onClick={retakeFace}
                  >
                    Retake Face
                  </button>

                  <button
                    type="button"
                    className="capture-button"
                  >
                    Continue
                  </button>

                </div>

              )}

            </div>

          )}


          {/* QR ACTION */}

          {selectedMethod === "qr" && (

            <button
              type="button"
              className="capture-button"
            >
              Scan QR Code
            </button>

          )}

        </div>


        {/* VERIFICATION INFORMATION */}

        <div className="verification-info">

          <h3>
            Verification Information
          </h3>


          <div className="info-item">

            <span>
              Verification Method
            </span>

            <strong>
              {selectedMethod === "face"
                ? "Facial Recognition"
                : "QR Code"}
            </strong>

          </div>


          <div className="info-item">

            <span>
              Status
            </span>

            <strong className="ready">

              {selectedMethod === "face"
                ? capturedImage
                  ? "Face Captured"
                  : cameraActive
                    ? "Camera Active"
                    : "Ready"
                : "Ready"}

            </strong>

          </div>


          <div className="info-item">

            <span>
              Security Level
            </span>

            <strong>
              High
            </strong>

          </div>


          <div className="info-item">

            <span>
              System
            </span>

            <strong>
              KNOWN
            </strong>

          </div>

        </div>

      </div>


      {/* HIDDEN CANVAS */}

      <canvas
        ref={canvasRef}
        style={{ display: "none" }}
      />

    </div>
  );
}

export default VerifyIdentity;

