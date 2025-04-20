import React, { useEffect } from "react";
import { QRCode } from "react-qrcode-logo";
import { useParams, useNavigate } from "react-router-dom";

const Qr = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const origin = window.location.origin;

  useEffect(() => {
    // Check if we're accessing the QR page directly (not through the app)
    const isDirectAccess = !document.referrer.includes(window.location.origin);
    if (isDirectAccess) {
      // Redirect to the profile page
      navigate(`/viewprofile/${id}`);
    }
  }, [id, navigate]);

  return (
    <div className="w-[100%] h-[100vh] flex justify-center items-center bg-white">
      <QRCode id="qrCodeEl" value={origin + "/viewprofile/" + id} size="171" />
    </div>
  );
};

export default Qr;
