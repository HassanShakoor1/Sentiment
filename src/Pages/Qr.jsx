import React from "react";
import { QRCode } from "react-qrcode-logo";
import { useParams } from "react-router-dom";

const Qr = () => {
  const { id } = useParams();
  const origin = window.location.origin;
  return (
    <div className="w-[100%] h-[100vh] flex justify-center items-center bg-white">
      <QRCode id="qrCodeEl" value={origin + "/viewprofile/" + id} size="171" />
    </div>
  );
};

export default Qr;
