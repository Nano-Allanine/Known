
import { useEffect, useRef, useState } from "react";
import "../styles/verify-identity.css";

function VerifyIdentity() {
  const [selectedMethod, setSelectedMethod] = useState("face");
  const [cameraActive, setCameraActive] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);
  const [cameraError, setCameraError] = useState("");

  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);

  // Attach the camera stream after React renders the video element.
  useEffect(() => {
    const video = videoRef.current;
    const stream = streamRef.current;

    if (
      !cameraActive ||
      selectedMethod !== "face" ||
      capturedImage ||
      !video ||
      !stream
    ) {
      return;
    }

    video.srcObject = stream;

    video.play().catch((error) => {
      console.error("Unable to play camera:", error);
      setCameraError("The camera could not start. Please try again.");
    });
  }, [cameraActive, selectedMethod, capturedImage]);

  // Stop the camera when this component is removed.
  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => {
          track.stop();
        });

        streamRef.current = null;
      }
    };
  }, []);

  async function startCamera() {
    try {
      setCameraError("");

      if (!navigator.mediaDevices?.getUserMedia) {
        setCameraError(
          "Camera access is unavailable. Use HTTPS or localhost."
        );
        return;
      }

      // Prevent multiple camera streams.
      stopCamera();

      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: "user",
        },
        audio: false,
      });

      streamRef.current = stream;
      setCameraActive(true);
    } catch (error) {
      console.error("Camera error:", error);

      if (error.name === "NotAllowedError") {
        setCameraError(
          "Camera permission was denied. Allow camera access in your browser."
        );
      } else if (error.name === "NotFoundError") {
        setCameraError("No camera was found on this device.");
      } else {
        setCameraError(
          "Unable to access the camera. Check permissions and try again."
        );
      }
    }
  }

  function stopCamera() {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => {
        track.stop();
      });

      streamRef.current = null;
    }

    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }

    setCameraActive(false);
  }

  function captureFace() {
    const video = videoRef.current;
    const canvas = canvasRef.current;

    if (!video || !canvas) {
      setCameraError("The camera preview is not available.");
      return;
    }

    if (!video.videoWidth || !video.videoHeight) {
      setCameraError(
        "The camera is still starting. Please wait a moment and try again."
      );
      return;
    }

    const context = canvas.getContext("2d");

    if (!context) {
      setCameraError("Unable to capture the image. Please try again.");
      return;
    }

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    context.drawImage(
      video,
      0,
      0,
      canvas.width,
      canvas.height
    );

    const image = canvas.toDataURL("image/jpeg", 0.9);

    setCapturedImage(image);
    setCameraError("");
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

  function handleContinue() {
    if (!capturedImage) {
      setCameraError("Capture a face before continuing.");
      return;
    }

    setCameraError(
      "Face captured successfully. Facial matching is not connected to the Django API yet."
    );
  }

  function handleQRScan() {
    setCameraError(
      "QR scanning has not been implemented yet."
    );
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
          <div className="method-icon">◉</div>

          <div>
            <h3>Facial Recognition</h3>
            <p>
              Verify an identity using facial biometric information.
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
          <div className="method-icon">▣</div>

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
              {selectedMethod === "qr"
                ? "Ready"
                : capturedImage
                  ? "Captured"
                  : cameraActive
                    ? "Camera Active"
                    : "Ready"}
            </span>
          </div>

          {/* CAMERA AREA */}
          <div className="camera-area">
            {selectedMethod === "face" ? (
              <>
                {/* Keep the video mounted while the camera is active. */}
                {cameraActive && !capturedImage && (
                  <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    muted
                    className="camera-video"
                  />
                )}

                {capturedImage ? (
                  <img
                    src={capturedImage}
                    alt="Captured face for verification"
                    className="captured-face"
                  />
                ) : !cameraActive ? (
                  <div className="face-frame">
                    <div className="corner top-left" />
                    <div className="corner top-right" />
                    <div className="corner bottom-left" />
                    <div className="corner bottom-right" />

                    <p>Camera ready</p>
                  </div>
                ) : null}
              </>
            ) : (
              <div className="qr-scanner">
                <p>QR scanner will appear here.</p>
                <p>Position a KNOWN QR code inside the scanner.</p>
              </div>
            )}
          </div>

          {/* CAMERA ERROR AND STATUS */}
          {cameraError && (
            <p className="camera-error" role="status">
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
                    onClick={handleContinue}
                  >
                    Continue
                  </button>
                </div>
              )}

              {cameraActive && (
                <button
                  type="button"
                  className="capture-button"
                  onClick={stopCamera}
                >
                  Stop Camera
                </button>
              )}
            </div>
          )}

          {/* QR ACTION */}
          {selectedMethod === "qr" && (
            <div className="camera-actions">
              <button
                type="button"
                className="capture-button"
                onClick={handleQRScan}
              >
                Scan QR Code
              </button>
            </div>
          )}
        </div>

        {/* VERIFICATION INFORMATION */}
        <div className="verification-info">
          <h3>Verification Information</h3>

          <div className="info-item">
            <span>Verification Method</span>
            <strong>
              {selectedMethod === "face"
                ? "Facial Recognition"
                : "QR Code"}
            </strong>
          </div>

          <div className="info-item">
            <span>Status</span>
            <strong className="ready">
              {selectedMethod === "qr"
                ? "Ready"
                : capturedImage
                  ? "Face Captured"
                  : cameraActive
                    ? "Camera Active"
                    : "Ready"}
            </strong>
          </div>

          <div className="info-item">
            <span>Security Level</span>
            <strong>Pending verification</strong>
          </div>

          <div className="info-item">
            <span>System</span>
            <strong>KNOWN</strong>
          </div>
        </div>
      </div>

      {/* HIDDEN CANVAS USED TO CAPTURE THE VIDEO FRAME */}
      <canvas
        ref={canvasRef}
        style={{ display: "none" }}
      />
    </div>
  );
}

export default VerifyIdentity;